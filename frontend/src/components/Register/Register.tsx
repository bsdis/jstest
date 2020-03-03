import React, { useState } from "react";
import { useForm, FormContext, ErrorMessage } from "react-hook-form";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();

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

  interface User {
    id: number;
    username: string;
    email: string;
  }
  interface ServerData {
    token: string;
    user: User;
  }
  interface ServerResponse {
    data: ServerData;
  }

  const onSubmit = (indata: FormData) => {
    /*
    axios
      .request<ServerData>({
        method: "post",
        url: "/api/profiles/auth/register",
        data: {
          username: indata.username,
          email: indata.email,
          password: indata.password
        },
        transformResponse: (r: ServerResponse) => r.data
      })
      .then(response => {
        // `response` is of type `AxiosResponse<ServerData>`
        const { data } = response;
        console.log(data);
        // `data` is of type ServerData, correctly inferred
      });
      */

    axios
      .post<ServerData>("/api/profiles/auth/register", {
        username: indata.username,
        email: indata.email,
        password: indata.password
      })
      .then(function(res: ServerResponse) {
        localStorage.setItem("tkn", res.data.token);
        closeAction();
        history.push("/");
        console.log("====");
        console.log(res.data);
        console.log("====");
        //let dec = jwtDecode<TokenDto>(res.data["access"]);
        //localStorage.setItem("jwt_accesst", res.data["access"]);
        //localStorage.setItem("jwt_requestt", res.data["refresh"]);
        //localStorage.setItem("jwt_exp", dec.exp.toString());
      });
  };
  /*
  const onSubmit = data => {
    alert(JSON.stringify(data));
  };*/
  /*
  const onSubmit2 = handleSubmit(
    ({ username, email, password, repeatpassword }) => {
      //http://127.0.0.1:8000/api/profiles/auth/register
      axios
        .post("/api/profiles/auth/register", {
          username: username,
          email: email,
          password: password
        })
        .then(function(res) {
          console.log("====");
          console.log(res.data);
          console.log("====");
          //let dec = jwtDecode<TokenDto>(res.data["access"]);
          //localStorage.setItem("jwt_accesst", res.data["access"]);
          //localStorage.setItem("jwt_requestt", res.data["refresh"]);
          //localStorage.setItem("jwt_exp", dec.exp.toString());
        });
      console.log({ username, email, password, repeatpassword });
    }
  );*/

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
          {/*data => console.log(data)*/}
          <FormContext {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
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
