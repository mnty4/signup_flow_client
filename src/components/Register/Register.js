import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Register.module.css";
import { Card, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setJwt }) => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Sends a request to add a new user with the current values of the refs
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    if (!response.ok) return setErrorMsg(await response.text());

    setErrorMsg("");

    // set jwt as the response body
    await setJwt(await response.text());

    // await setJwt(response.headers['x-auth-token']);

    navigate("../", { replace: true });
  };

  return (
    <div className={styles.Register}>
      <Card>
        <Card.Header>
          <Card.Title as="h3">Register</Card.Title>
        </Card.Header>
        <Card.Body className={styles.cardBody}>
          <Form onSubmit={handleRegister}>
            <Row className="mb-3">
              <Form.Group className={styles.group}>
                <Form.Label className="">Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={nameRef}
                  placeholder="John Doe"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group className={styles.group}>
                <Form.Label className="">Email</Form.Label>
                <Form.Control
                  type="text"
                  ref={emailRef}
                  placeholder="john@email.com"
                />
              </Form.Group>
            </Row>
            <Row className="mb-1">
              <Form.Group className={styles.group}>
                <Form.Label className="">Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Text className="text-muted">
                We won't share your info with anyone, we promise.
              </Form.Text>
            </Row>
            <Button variant="primary" type="submit" className="mb-2">
              Register
            </Button>
          </Form>
          <Link to="/login">Already have an account?</Link>
          {errorMsg !== "" && (
            <Card.Text className="text-danger mt-2">{errorMsg}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
