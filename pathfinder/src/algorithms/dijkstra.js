// Dijkstra's Algorithm for Pathfinding
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);
  
  // Set distance of start node to 0, others to infinity
  startNode.distance = 0;
  
  while (unvisitedNodes.length) {
    // Sort unvisited nodes by distance
    sortNodesByDistance(unvisitedNodes);
    
    // Get the closest node
    const closestNode = unvisitedNodes.shift();
    
    // If we're trapped by walls, return
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    
    // Mark node as visited
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    // If we found the finish node, we're done
    if (closestNode === finishNode) return visitedNodesInOrder;
    
    // Update distances of neighboring nodes
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

// Get all nodes from the grid
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Sort nodes by distance (closest first)
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// Update distances of neighboring nodes
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

// Get unvisited neighboring nodes
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  
  // Check all 4 directions: up, right, down, left
  if (row > 0) neighbors.push(grid[row - 1][col]); // Up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
  if (col > 0) neighbors.push(grid[row][col - 1]); // Left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  
  // Filter out visited nodes and walls
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

// Get the shortest path by backtracking from finish node
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return nodesInShortestPathOrder;
} 