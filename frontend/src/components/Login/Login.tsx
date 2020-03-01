import React, { useState } from "react";
import axios from "axios";
//import jwtDecode from "jwt-decode";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Form
} from "react-bootstrap";
//import PropTypes from "prop-types";
// jwt auth, see
// https://medium.com/@viewflow/full-stack-django-quick-start-with-jwt-auth-and-react-redux-part-ii-be9cf6942957
//import styles from "./Login.module";
const styles = require("./Login.scss");

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = (): boolean => {
    return username.length <= 0 || password.length <= 0;
  };

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    interface TokenDto {
      token_type: string;
      exp: number;
      jti: string;
      user_id: number;
    }
    axios
      .post("/api/token/", {
        username: username,
        password: password
      })
      .then(function(res) {
        console.log("====");
        //let dec = jwtDecode<TokenDto>(res.data["access"]);
        localStorage.setItem("jwt_accesst", res.data["access"]);
        localStorage.setItem("jwt_requestt", res.data["refresh"]);
        //localStorage.setItem("jwt_exp", dec.exp.toString());
      });
    //.then(res => localStorage.setItem("jwt", res.data));
    // axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={(x: React.FormEvent<FormControl & HTMLInputElement>) => {
              setUsername(x.currentTarget.value);
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
        <Button block size="lg" disabled={isDisabled()} type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
