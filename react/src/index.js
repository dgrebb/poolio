import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Import our custom components.
 */
import SearchBar from './components/searchbar';
import AddButton from './components/add-button';

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
        <h1 className="text-xs-center">Poolio</h1>
        <SearchBar />
        <AddButton />
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