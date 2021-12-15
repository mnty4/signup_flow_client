import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoginOrRegister.module.css';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginOrRegister = () => (
  <div className={styles.LoginOrRegister}>
    <Card>
      <Card.Header>
        <Card.Title as='h3'>Signup</Card.Title>
      </Card.Header>
      <Card.Body className='mx-5'>
        <div className={styles.buttonsWrapper}>
          <Link to='login'><Button variant='primary' className={styles.button}>Login</Button></Link>
          <Link to='register'><Button variant='primary' className={styles.button}>Register</Button></Link>
        </div>
          
      </Card.Body>
    </Card>
  </div>
);

LoginOrRegister.propTypes = {};

LoginOrRegister.defaultProps = {};

export default LoginOrRegister;
