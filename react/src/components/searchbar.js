import React, { Component } from 'react';

class SearchBar extends Component {

  constructor( props ) {
    super(props);
    this.state = {
      newPlayer: props.newPlayer
    };
  }

  render () {
    return(
      <div>
        <input
          type="text"
          className="col-md-11"
          placeholder={this.state.newPlayer}
          onChange={(e) => {
            this.onInputChange(e.target.value);
          }}
        />
      </div>
    );
  };

  onInputChange(newPlayer) {
    this.setState({newPlayer});
    this.props.onNewPlayerNameChange(newPlayer);
  }

};

export default SearchBar;
