import React from "react";
import PropTypes from "prop-types";
import styles from "./Home.module.css";
import { Card, Button, Container } from "react-bootstrap";
const Home = ({ userInfo, logout }) => (
  <div className={styles.Home}>
    <Container>
      <Card>
        <Card.Header>
          You logged in as <b>{userInfo.name}</b>.
        </Card.Header>
        <div className={styles.content}>
          <b>name </b>
          <div>{userInfo.name}</div>
          <b>email </b>
          <div>{userInfo.email}</div>
        </div>
        <div>
          <Button className="my-2" onClick={logout}>
            Logout
          </Button>
        </div>
      </Card>
    </Container>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
