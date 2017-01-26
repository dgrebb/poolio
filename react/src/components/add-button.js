import React from 'react';

const AddButton = (props) => {
  console.log(props.newPlayerName);
  return (
    <button
      className="col-md-1"
      type="submit"
      onClick={() => {
        console.log(props.newPlayerName);
      }}
    >+
    </button>
  )
}

export default AddButton;
