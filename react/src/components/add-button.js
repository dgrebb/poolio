import React from 'react';

const AddButton = ({ player, onPlayerAdd }) => {
  return (
    <button
      className="col-md-1"
      type="submit"
      player={player}
      onClick={() => onPlayerAdd(player)}
    >+
    </button>
  )
}

export default AddButton;
