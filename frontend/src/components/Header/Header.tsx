import React, { useState, MouseEvent } from "react";
import { Navbar, Nav, NavDropdown, FormControl, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import SignupTypeList from "../SignupTypeList";
const theme = require("./Header.scss");

export default function Header() {
  const [showSignupModal, setShowSignupModal] = useState(false);

  function handleSignupClick(e: MouseEvent) {
    e.preventDefault();
    setShowSignupModal(true);
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">SoulSistahh</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>

          <Form inline>
            <Nav.Link className="text-weight-bold" href="#home">
              Opret gruppe
            </Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="#" onClick={handleSignupClick}>
              Sign up
            </Nav.Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <SignupTypeList
        open={showSignupModal}
        closeAction={() => setShowSignupModal(false)}
      />
    </>
  );
}
