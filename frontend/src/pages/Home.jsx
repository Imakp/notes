import React, { useState } from "react";
import Tile from "../components/Tile";

const Home = () => {
  const [tiles, setTiles] = useState([]);
  const [newTile, setNewTile] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addTile = () => {
    if (newTile) {
      setTiles([...tiles, newTile]);
      setNewTile("");
      setShowModal(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add Tile
      </button>
      <div className="grid grid-cols-3 gap-4">
        {tiles.map((tile, index) => (
          <Tile key={index} title={tile} />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Add New Tile</h2>
            <input
              type="text"
              value={newTile}
              onChange={(e) => setNewTile(e.target.value)}
              placeholder="Tile Name"
              className="border p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white p-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={addTile}
                className="bg-green-500 text-white p-2 rounded"
              >
                Add Tile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
