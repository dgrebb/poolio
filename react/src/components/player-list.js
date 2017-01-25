import React, { Component } from 'react';

class PlayerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: props.players
    }
  };

  render () {

    const players = this.state.players.map( (player, i) => {
      let id = 'player-' + i;
      return (
        <li key={id}>{player}</li>
      );
    });

    return (
      <ul className="col-md-offset-2 col-md-8">
        {players}
      </ul>
    );
  };
}

export default PlayerList;
