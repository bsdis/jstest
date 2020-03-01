import React, { useState } from "react";
import { useForm, FormContext, ErrorMessage } from "react-hook-form";
import axios from "axios";
// See https://github.com/i18next/react-i18next/blob/master/test/typescript/examples.test.tsx
import {
  useTranslation,
  Trans,
  withTranslation,
  WithTranslation
} from "react-i18next";
import * as Yup from "yup";

import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  Modal,
  Navbar,
  Nav
} from "react-bootstrap";
import PropTypes, { InferProps } from "prop-types";
const styles = require("./Register.scss");

type FormData = {
  username: string;
  email: string;
  password: string;
  repeatpassword: string;
};

Register.propTypes = {
  open: PropTypes.bool.isRequired,
  closeAction: PropTypes.func.isRequired
};

export default function Register({
  open,
  closeAction
}: InferProps<typeof Register.propTypes>) {
  const { t, i18n } = useTranslation();

  const methods = useForm<FormData>({
    validationSchema: Yup.object().shape({
      username: Yup.string().required(t("Insert name")),
      email: Yup.string()
        .email(t("Invalid email"))
        .required(t("Insert email")),
      password: Yup.string()
        .required(t("Password is required"))
        .min(8, t("Password is too short - should be 8 chars minimum."))
        .matches(/[a-zA-Z]/, t("Password can only contain Latin letters.")),
      repeatpassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        t("Passwords must match")
      )
    })
  });
  const { register, handleSubmit, watch, errors } = methods;

  const onSubmit = handleSubmit(
    ({ username, email, password, repeatpassword }) => {
      console.log({ username, email, password, repeatpassword });
    }
  );

  return (
    <>
      <Modal size="sm" show={open} onHide={closeAction}>
        <Modal.Header closeButton>
          <Modal.Title id="signup-title">{t("Sign up")}</Modal.Title>
        </Modal.Header>
        <Modal.Body id="signup-modal-body">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">{t("Already a member?")}</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto"></Nav>
              <Form inline>
                <Nav.Link className="text-weight-bold" href="#">
                  {t("Login")}
                </Nav.Link>
              </Form>
            </Navbar.Collapse>
          </Navbar>

          <FormContext {...methods}>
            <Form onSubmit={handleSubmit(data => console.log(data))} noValidate>
              <FormGroup controlId="username">
                <FormLabel>{t("Username")}</FormLabel>
                <FormControl
                  name="username"
                  type="text"
                  ref={register}
                  isInvalid={!!errors.username}
                ></FormControl>
                <ErrorMessage
                  type="invalid"
                  name="username"
                  errors={errors}
                  as={Form.Control.Feedback}
                />
              </FormGroup>
              <FormGroup controlId="email">
                <FormLabel>{t("E-mail")}</FormLabel>
                <FormControl
                  name="email"
                  type="email"
                  ref={register}
                  isInvalid={!!errors.email}
                ></FormControl>
                <ErrorMessage
                  type="invalid"
                  name="email"
                  errors={errors}
                  as={Form.Control.Feedback}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel>{t("Password")}</FormLabel>
                <FormControl
                  name="password"
                  type="password"
                  ref={register}
                  isInvalid={!!errors.password}
                ></FormControl>
                <ErrorMessage
                  type="invalid"
                  name="password"
                  errors={errors}
                  as={Form.Control.Feedback}
                />
              </FormGroup>
              <FormGroup controlId="repeatpassword">
                <FormLabel>{t("Retype password")}</FormLabel>
                <FormControl
                  name="repeatpassword"
                  type="password"
                  ref={register}
                  isInvalid={!!errors.repeatpassword}
                ></FormControl>
                <ErrorMessage
                  type="invalid"
                  name="repeatpassword"
                  errors={errors}
                  as={Form.Control.Feedback}
                />
              </FormGroup>
              <Button
                name="registersubmit"
                block
                size="lg"
                type="submit"
                ref={register}
              >
                {t("Login")}
              </Button>
            </Form>
          </FormContext>
        </Modal.Body>
      </Modal>
    </>
  );
}
