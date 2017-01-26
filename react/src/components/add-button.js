import React, { Component } from 'react';

class AddButton extends Component {

  constructor(props) {
    super(props);
  };

  // console.log(props.onAddNewPlayer)
  render() {
    return (
      <button
        className="col-md-1"
        type="submit"
        onClick={this.props.onAddNewPlayer}
      >+
      </button>
    );
  };
}

export default AddButton;
