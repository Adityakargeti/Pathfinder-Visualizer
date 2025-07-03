# Dijkstra's Pathfinding Visualization

A React-based interactive visualization of Dijkstra's shortest path algorithm, featuring real-time animation, user interaction, and a professional UI.

---

## 🚀 Features

- Interactive grid-based pathfinding visualization
- Real-time algorithm animation with smooth transitions
- User-controlled start/end node placement
- Dynamic wall creation (click and drag)
- Responsive, modern UI with gradient backgrounds and animations

---

## 🏗️ Project Structure

```
pathfinder/
├── src/
│   ├── algorithms/
│   │   └── dijkstra.js          # Core algorithm implementation
│   ├── pathfinder/
│   │   ├── pathfinder.jsx       # Main visualization component
│   │   ├── pathfinder.css       # Main styling
│   │   └── node/
│   │       ├── node.jsx         # Individual grid cell component
│   │       └── node.css         # Node-specific styling
│   └── App.js                   # Root component
├── package.json
└── README.md
```

---

## 🧠 How It Works

- **Grid:** 20x20, each cell is a node with properties (start, finish, wall, visited, etc.)
- **User Interaction:**  
  - Place start/finish nodes  
  - Draw walls by dragging  
  - Click "Visualize" to run the algorithm
- **Algorithm:**  
  - Dijkstra’s algorithm finds the shortest path  
  - Animates visited nodes and shortest path in real time
- **Animations:**  
  - Visited nodes: blue gradient, scaling effect  
  - Shortest path: yellow highlight  
  - Start/Finish: pulsing animation  
  - Walls: appear with animation

---

## 🛠️ Tech Stack

- React (with hooks: useState, useCallback)
- JavaScript (ES6+)
- CSS3 (animations, gradients, responsive design)

---

## 🕹️ Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the app:**
   ```bash
   npm start
   ```
3. **Open** [http://localhost:3000](http://localhost:3000) **in your browser.**

---

## 📈 Advanced Features (Ideas)

- Add more algorithms (A*, BFS, DFS)
- Weighted edges and diagonal movement
- Mobile/touch support
- Speed controls and step-by-step explanation mode

---

## 📚 Learn More

- Clean, maintainable code with separation of concerns
- Professional UI/UX and performance optimizations
- Great for learning algorithms and React!
