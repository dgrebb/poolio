import React from 'react';

const AddButton = () => {
  return (
    <button
      className="col-md-1"
      type="submit"
      onClick={() => { console.log('adding player') }}
    >+
    </button>
  )
}

export default AddButton;
