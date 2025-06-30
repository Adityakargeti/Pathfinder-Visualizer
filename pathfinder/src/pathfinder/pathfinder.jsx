import React, { useState, useCallback } from 'react';
import './pathfinder.css';
import Node from './node/node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

const Pathfinder = () => {
  const GRID_SIZE = 20;
  const [grid, setGrid] = useState(() => createInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [nodeType, setNodeType] = useState('wall');

  function createInitialGrid() {
    const newGrid = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 15,
          isWall: false,
          distance: Infinity,
          isVisited: false,
          isPath: false,
          previousNode: null,
        });
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  }

  const getStartNode = useCallback(() => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].isStart) return grid[row][col];
      }
    }
  }, [grid]);

  const getFinishNode = useCallback(() => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].isFinish) return grid[row][col];
      }
    }
  }, [grid]);

  // No animation: update all visited and path nodes instantly
  const visualizeDijkstra = useCallback(() => {
    const startNode = getStartNode();
    const finishNode = getFinishNode();
    if (!startNode || !finishNode) return;

    // Reset grid
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        distance: Infinity,
        isVisited: false,
        isPath: false,
        previousNode: null,
      }))
    );
    const freshStartNode = newGrid[startNode.row][startNode.col];
    const freshFinishNode = newGrid[finishNode.row][finishNode.col];
    
    // Run Dijkstra's algorithm
    const visitedNodesInOrder = dijkstra(newGrid, freshStartNode, freshFinishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(freshFinishNode);

    // Mark visited nodes
    visitedNodesInOrder.forEach(node => {
      newGrid[node.row][node.col].isVisited = true;
    });
    // Mark shortest path
    nodesInShortestPathOrder.forEach(node => {
      newGrid[node.row][node.col].isPath = true;
    });
    setGrid(newGrid);
  }, [grid, getStartNode, getFinishNode]);

  const handleMouseDown = useCallback((row, col) => {
    if (nodeType === 'wall') {
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    } else if (nodeType === 'start') {
      setStartNode(row, col);
    } else if (nodeType === 'finish') {
      setFinishNode(row, col);
    }
  }, [grid, nodeType]);

  const handleMouseEnter = useCallback((row, col) => {
    if (!mouseIsPressed || nodeType !== 'wall') return;
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
  }, [mouseIsPressed, grid, nodeType]);

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false);
  }, []);

  const toggleWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const setStartNode = (row, col) => {
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(rowArray =>
        rowArray.map(node => ({
          ...node,
          isStart: false
        }))
      );
      newGrid[row][col] = {
        ...newGrid[row][col],
        isStart: true,
        isWall: false,
      };
      return newGrid;
    });
  };

  const setFinishNode = (row, col) => {
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(rowArray =>
        rowArray.map(node => ({
          ...node,
          isFinish: false
        }))
      );
      newGrid[row][col] = {
        ...newGrid[row][col],
        isFinish: true,
        isWall: false,
      };
      return newGrid;
    });
  };

  return (
    <div className="pathfinder">
      <div className="controls">
        <button onClick={visualizeDijkstra} className="visualize-btn">
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => setGrid(createInitialGrid())} className="clear-btn">
          Clear Grid
        </button>
        <div className="node-type-controls">
          <button 
            onClick={() => setNodeType('wall')} 
            className={`node-type-btn ${nodeType === 'wall' ? 'active' : ''}`}
          >
            Wall
          </button>
          <button 
            onClick={() => setNodeType('start')} 
            className={`node-type-btn ${nodeType === 'start' ? 'active' : ''}`}
          >
            Start
          </button>
          <button 
            onClick={() => setNodeType('finish')} 
            className={`node-type-btn ${nodeType === 'finish' ? 'active' : ''}`}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node) => (
              <Node
                key={`${node.row}-${node.col}`}
                row={node.row}
                col={node.col}
                isStart={node.isStart}
                isFinish={node.isFinish}
                isWall={node.isWall}
                isVisited={node.isVisited}
                isPath={node.isPath}
                onMouseDown={() => handleMouseDown(node.row, node.col)}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pathfinder; 