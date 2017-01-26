import React, { Component } from 'react';

const PlayerList = (props) => {

  const players = props.players.map( (player, i) => {
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

}

export default PlayerList;
