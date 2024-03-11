import anger from '../img/anger.png';
import stress from '../img/stress.png';
import fear from '../img/fear.png';
import happy from '../img/happy.png';
import sadness from '../img/sadness.png';
import './NavBar.css';
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

//Renders the navbar which will always be present at the top of the page.
export default function NavBar() {
  return (
    <>
    <div>
      <Navbar className="color-nav" aria-label="NavBar">
        <Container>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="">Home</Nav.Link>
            <Nav.Link as={Link} to="/About">About</Nav.Link>
          </Nav>
          <Navbar.Brand className="mx-auto">Emote.</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/Quizcopy1">Quiz</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle aria-label="Emotions" className="dropdown" id="dropdown-button">
                <div className="dropdown-name">Resources</div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown">
                <Dropdown.Item className="anger">
                  <NavLink aria-label="anger" to="/anger" className="nav-link" id="nav-li" activeClassName={"activeLink"}>
                    <img className="dropdown-image" src={anger} alt="anger" />
                    <p className="dropdown-text">Anger</p>
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item className="stress">
                  <NavLink aria-label="stress" to="/stress" className="nav-link" id="nav-li" activeClassName={"activeLink"}>
                    <img className="dropdown-image" src={stress} alt="stress" />
                    <p className="dropdown-text">Stress</p>
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item className="fear">
                  <NavLink aria-label="fear" to="/fear" className="nav-link" id="nav-li" activeClassName={"activeLink"}>
                    <img className="dropdown-image" src={fear} alt="fear" />
                    <p className="dropdown-text">Fear</p>
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item className="happy">
                  <NavLink aria-label="happy" to="/happy" className="nav-link" id="nav-li" activeClassName={"activeLink"}>
                    <img className="dropdown-image" src={happy} alt="happy" />
                    <p className="dropdown-text">Happy</p>
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item className="sadness">
                  <NavLink aria-label="sadness" to="/sad" className="nav-link" id="nav-li" activeClassName={"activeLink"}>
                    <img className="dropdown-image" src={sadness} alt="sadness" />
                    <p className="dropdown-text">Sad</p>
                  </NavLink>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  </>
);
}