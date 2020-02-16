import React, { useState } from "react";
import {
  Nav,
  Navbar,
  Button,
  Modal,
  FormGroup,
  FormControl,
  FormLabel,
  Form
} from "react-bootstrap";
import PropTypes, { InferProps } from "prop-types";
// SoMe oAuth FE+BE:
// https://codeburst.io/react-authentication-with-twitter-google-facebook-and-github-862d59583105
// https://www.digitalocean.com/community/tutorials/django-authentication-with-facebook-instagram-and-linkedin
//import styles from "./Login.module";
const styles = require("./SignupTypeList.scss");

export default function SignupTypeList({
  open,
  closeAction
}: InferProps<typeof SignupTypeList.propTypes>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = (): boolean => {
    return email.length <= 0 || password.length <= 0;
  };

  function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
  }

  return (
    <>
      <Modal size="sm" show={open} onHide={closeAction}>
        <Modal.Header closeButton>
          <Modal.Title id="signup-title">Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body id="signup-modal-body">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Already a member?</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto"></Nav>
              <Form inline>
                <Nav.Link className="text-weight-bold" href="#">
                  Login
                </Nav.Link>
              </Form>
            </Navbar.Collapse>
          </Navbar>

          <Form>
            <FormGroup controlId="email">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={email}
                onChange={(
                  x: React.FormEvent<FormControl & HTMLInputElement>
                ) => {
                  setEmail(x.currentTarget.value);
                }}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={password}
                onChange={(
                  x: React.FormEvent<FormControl & HTMLInputElement>
                ) => {
                  setPassword(x.currentTarget.value);
                }}
                type="password"
              />
            </FormGroup>
            <Button
              block
              size="lg"
              onSubmit={handleSubmit}
              disabled={isDisabled()}
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

SignupTypeList.propTypes = {
  open: PropTypes.bool.isRequired,
  closeAction: PropTypes.func.isRequired
};

/*
  <div className="Login">
    <Form>
      <FormGroup controlId="email">
        <FormLabel>Email</FormLabel>
        <FormControl
          autoFocus
          type="email"
          value={email}
          onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => {
            setEmail(x.currentTarget.value);
          }}
        />
      </FormGroup>
      <FormGroup controlId="password">
        <FormLabel>Password</FormLabel>
        <FormControl
          value={password}
          onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => {
            setPassword(x.currentTarget.value);
          }}
          type="password"
        />
      </FormGroup>
      <Button
        block
        size="lg"
        onSubmit={handleSubmit}
        disabled={isDisabled()}
        type="submit"
      >
        Login
      </Button>
    </Form>
  </div>
*/
