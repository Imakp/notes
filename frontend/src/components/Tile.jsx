import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tile = ({ title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tile/${title}`);
  };

  return (
    <div
      className="bg-blue-500 text-white p-4 rounded cursor-pointer shadow-md transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export default Tile;