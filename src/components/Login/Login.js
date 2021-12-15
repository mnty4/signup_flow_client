import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import { Card, Form, Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setJwt }) => {

  const [ errorMsg, setErrorMsg ] = useState('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Sends a request to verify if email and password match a user currently in the
    // database and sends back a jwt for that user containing their id
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    });
    if (!response.ok) return setErrorMsg(await response.text());
    
    setErrorMsg('');
    // set our jwt as the response body
    setJwt(await response.text());
    navigate('../');
  }

  return (
  <div className={styles.Login}>
    <Card>
      <Card.Header>
        <Card.Title as='h3'>Login</Card.Title>
        </Card.Header>
      <Card.Body className={styles.cardBody}>
          <Form onSubmit={handleLogin}>
          <Row className='mb-3'>
            <Form.Group className={styles.group}>
              <Form.Label>Email</Form.Label>
              <Form.Control type='text' ref={emailRef} placeholder='john@email.com' className='mb-1'/>
              <Form.Text className="text-muted">We won't share your email with anyone, we promise.</Form.Text>
            </Form.Group>
            </Row>
            <Row className='mb-3'>
            <Form.Group className={styles.group}>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} />
            </Form.Group>
            </Row>
            <Button variant='primary' type='submit' className='mb-2'>Login</Button>
            
          </Form>
          <Link to='/register'>Register here if you don't already have an account.</Link>
          {errorMsg !== '' && <Card.Text className='text-danger mt-2'>{errorMsg}</Card.Text>}
      </Card.Body>
    </Card>
  </div>
)}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
