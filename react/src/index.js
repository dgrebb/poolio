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
      playerInputText: 'Search for or add new player.'
    };

  }

  render () {

    const playerInputChange = (playerInputText) => {
      this.setState({ playerInputText });
    }

    const onNewPlayerAdd = (playerName) => {
      // console.log(playerName);
      var players = this.state.players.slice();
      players.push(playerName);
      this.setState({players});
      console.log(players);
    }

    return (
      <div>
        <h1 className="text-xs-center">Poolio</h1>
        <SearchBar
          newPlayer={this.state.newPlayer}
          onPlayerInputChange={playerInputChange}
        />
        <AddButton
          player={this.state.playerInputText}
          onPlayerAdd={onNewPlayerAdd}
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
