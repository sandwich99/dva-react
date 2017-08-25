import React from 'react';
import { connect } from 'dva-react2';
import {
  HashRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import styles from './IndexPage.css';
import Example from '../components/Example';

function IndexPage(props) {
  const { count } = props;
  return (
    <Router>
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva-react2!</h1>
        <ul className={styles.list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/topic">topic</Link>
          </li>
        </ul>
        <Route exact path="/" component={() => <Example text={`home ${count}`} />} />
        <Route path="/about" component={() => <Example text={`about ${count}`} />} />
        <Route path="/topic" component={() => <Example text={`topic ${count}`} />} />
      </div>
    </Router>
  );
}

IndexPage.propTypes = {
};

export default connect(({ example: { count } }) => ({ count }))(IndexPage);
