import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.Loader}>
    <div className={styles.loaderWheel}></div>
  </div>
);

Loader.propTypes = {};

Loader.defaultProps = {};

export default Loader;
