import React, { useState } from 'react';

const Node = ({ node, onDragStart, onDrag, onDragEnd, onClick }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(e, node);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      onDrag(e, node);
    }
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    onDragEnd(e, node);
  };

  return (
    <div
      className="absolute bg-gray-200 p-2 rounded cursor-pointer"
      style={{ top: node.y, left: node.x }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onClick={() => onClick(node)}
    >
      <div className="tooltip">{node.keyword}</div>
    </div>
  );
};

export default Node;