import React from 'react';
import './node.css';

const Node = ({ row, col, isStart, isFinish, isWall, isVisited, isPath, onMouseDown, onMouseEnter, onMouseUp }) => {
  const extraClassName = isFinish 
    ? 'node-finish' 
    : isStart 
    ? 'node-start' 
    : isWall 
    ? 'node-wall' 
    : isPath
    ? 'node-path'
    : isVisited
    ? 'node-visited'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
    </div>
  );
};

export default Node; 