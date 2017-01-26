import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Import our custom components.
 */
import SearchBar from './components/searchbar';
import AddButton from './components/add-button';
import PlayerList from './components/player-list';
import StartButton from './components/start-button';

/**
 * Main application container.
 * @type {object}
 */
const container = document.querySelector('.container');

/**
 * Main Application class.
 */
class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      players: ['Dan', 'Steve'],
      player: 'George'
    };

  }

  addPlayer(player) {
    console.log('add play func: ' + player);
    this.setState({
      player: player
    });
  };

  render () {
    return (
      <div>
        <h1 className="text-xs-center">Poolio</h1>
        <SearchBar />
        <AddButton
          onAddNewPlayer={() => {this.addPlayer('Harry')}}
        />
        <PlayerList
          players={this.state.players}
        />
        <StartButton />
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
