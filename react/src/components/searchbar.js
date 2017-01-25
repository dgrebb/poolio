import React, { Component } from 'react';

class SearchBar extends Component {

  render () {
    return(
      <div>
        <input
          type="text"
          placeholder="Search for or add new player."
          className="col-md-11"
        />
      </div>
    );
  };

};

export default SearchBar;
