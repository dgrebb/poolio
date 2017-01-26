import React, { Component } from 'react';

class SearchBar extends Component {

  constructor( props ) {
    super(props);
    this.state = {
      playerInputText: props.playerInputText
    };
  }

  render () {
    return(
      <div>
        <input
          type="text"
          className="col-md-11"
          placeholder={this.state.playerInputText}
          onChange={(e) => {
            this.onInputChange(e.target.value);
          }}
        />
      </div>
    );
  };

  onInputChange(playerInputText) {
    this.setState({playerInputText});
    this.props.onPlayerInputChange(playerInputText);
  };

};

export default SearchBar;
