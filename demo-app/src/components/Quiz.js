import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import questionsData from "../data/questions.json";
import * as d3 from 'd3';
import{ useNavigate }from 'react-router-dom';

// Object defining answer values for each question for each emotion
const answerValues = {
  "sad": [4, 3, 2, 1],
  "happy": [4, 3, 2, 1],
  "anger": [4, 3, 2, 1],
  "fear": [4, 3, 2, 1],
  "stress": [4, 3, 2, 1]
};
// Component for handling button click to navigate to home page
function BubbleStuff() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/happy'); // Navigate to the 'Happy' page
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Go to Home Page</button>
    </div>
  );
}

const BubbleChart = ({ quizResults, onBubbleClick }) => {
  const nav = useNavigate();
  const ref = useRef(null);

// Key Feature #1: Quiz Results Array
  console.log(quizResults);
  useEffect(() => {
    if (quizResults) {
      const data = Object.keys(quizResults).map(emotion => ({
        name: emotion,
        value: quizResults[emotion],
      }));

      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight

      const diameter = Math.min(containerWidth, containerHeight);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const bubble = d3.pack()
        .size([diameter, diameter])
        .padding(1.5);

      const svg = d3.select(ref.current)
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

      svg.append("defs")
        .append("filter")
        .attr("id", "neon-glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%")
        .html(`
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>
          <feComponentTransfer in="blur" result="glow">
            <feFuncA type="table" tableValues="0 1 1 1 1"></feFuncA>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        `);

      const nodes = d3.hierarchy({ children: data })
        .sum(d => d.value);

      const node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(d => !d.children)
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .on("click", (d) => {
          
// Key Feature #2: Check if d and d.data are defined before accessing the 'name' property
          console.log(d)
          if (d) {
            // Call the onBubbleClick function with the emotion name
            // nav("/" + d.target.__data__.data.name);
            const url = `/${d.target.__data__.data.name.toLowerCase()}`;
            window.open(url, '_blank');
            // Use useHistory hook to navigate to the corresponding resource page
            //history.push(`/${d.data.name.toLowerCase()}`); // Assuming your route paths are based on emotion names
          } else {

// Key Feature #2.1: If they aren't defined, then tell the console.
            console.error("Data or data.name is undefined:", d);
          }
        })
        .on("mouseover", function() {
          d3.select(this).selectAll("text")
            .style("fill", "black")
            .style("font-weight", "bold");
          d3.select(this).selectAll("circle")
            .style("fill", "lightyellow")
            .style("filter", "url(#neon-glow)");
        })
        .on("mouseout", function() {
          d3.select(this).selectAll("text")
            .style("fill", "white")
            .style("font-weight", "normal");
          d3.select(this).selectAll("circle")
            .style("fill", d => color(d.data))
            .style("filter", null);
        });

      const screenWidth = window.innerWidth;
      const scale = d3.scaleLinear()
        .domain([0, 2000]) // adjust domain as needed based on your requirement
        .range([10, 40]); // adjust range for bubble radius

      node.append("circle")
        .attr("r", d => d.r)
        .style("fill", d => color(d.data))
        .style("transition", "fill 0.3s ease-in-out");

      node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(d => `${d.data.name} (${d.value})`)
        .style("fill", "white");

        return () => {
          svg.remove();  // Cleanup function to remove SVG element
        };
      }
    }, [quizResults]); // Include history in the dependency array
  return (
    <div className="bubble-chart-container" style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div ref={ref} style={{ margin: "auto" }}></div>
  </div>
  );
};
// Main quiz component
export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(new Array(questionsData.length).fill(null));
  const [quizResults, setQuizResults] = useState(null);
  const questions = questionsData;
 // Update responses array based on selected option
  const handleResponseChange = (responseIndex) => {
    setResponses(prevResponses => {
      const updatedResponses = [...prevResponses];
      updatedResponses[currentQuestion] = responseIndex;
      return updatedResponses;
    });
  };

    // Handle bubble click event
  const handleBubbleClick = (emotion) => {
  };     // Do something when bubble is clicked
  // Move to next question or display quiz results
  const handleNext = () => {
    const currentResponse = responses[currentQuestion];
    const nextQuestion = currentQuestion + 1;
  
    if (currentQuestion < questions.length - 1 && currentResponse !== null) {
      setResponses(prevResponses => {
        const updatedResponses = [...prevResponses];
        updatedResponses[nextQuestion] = null; 
        return updatedResponses;
      });
      setCurrentQuestion(nextQuestion);
    } else {
      displayQuizResults();
    }
  };


  // Calculate and display quiz results

  const displayQuizResults = () => {
    const results = {};
    for (const emotion in answerValues) {
      let score = 0;
      const questionsForEmotion = questions.filter(question => question.emotion === emotion);
      questionsForEmotion.forEach(question => {
        const questionIndex = questions.findIndex(q => q === question);
        const selectedOptionIndex = responses[questionIndex];
        if (selectedOptionIndex !== null) {
          const optionScore = answerValues[emotion][selectedOptionIndex];
          score += optionScore;
        }
      });
      results[emotion] = score;
    }
// Key Feature #3: Ensures quiz results are correct before setting the state. 
    console.log(results);
    setQuizResults(results);
  };




  return (
    <div className="full-height quiz-bg">
      <header>
        <h1 className="quiz-title">{quizResults ? "Quiz Results" : "Quiz"}</h1>
      </header>

      {quizResults ? (
        <div className="quiz-container">
          <BubbleChart quizResults={quizResults} onBubbleClick={() => handleBubbleClick()} />
        </div>
      ) : (
        <div className="contant-div">
          <h2>Question {currentQuestion + 1}/{questions.length}</h2>
          <p>{questions[currentQuestion].question}</p>
          <form className="radio-button">
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index}>
                <input type="radio" id={`option_${index}`} name={`question_${currentQuestion}`} value={index} defaultChecked={false} onChange={() => handleResponseChange(index)} />
                <label htmlFor={`option_${index}`}>{option}</label>
              </div>
            ))}
          </form>
          <Button className="nextBtn" disabled={responses[currentQuestion] === null} onClick={handleNext} alt="Next Button">
            {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </div>
      )}
      <h4 className="quiz-disclaimer" style={{ color: "red" }}>DISCLAIMER: This quiz is NOT a diagnosis!</h4>
    </div>
  );
}


