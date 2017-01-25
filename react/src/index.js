import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Main application container.
 * @type {object}
 */
const container = document.querySelector('.container');

/**
 * Main Application class.
 */
class App extends Component {

  render () {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    );
  }

};

/**
 * Mount main application node to the DOM.
 */
ReactDOM.render(
  <App />,
  container
);
