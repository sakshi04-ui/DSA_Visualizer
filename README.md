# DSA Visualizer

DSA Visualizer is an interactive platform designed to help users understand and visualize various data structures and algorithms. It provides step-by-step execution, real-time comparisons, and detailed insights into algorithm behavior, making learning more engaging and effective.

project is deplopyed on netlify and here is the link.

## 🚀 Live Deployment
[DSA Visualizer](https://dsa-visulaizers.netlify.app/)

## 🎯 Project Goal
The primary goal of this project is to create an intuitive and interactive platform that simplifies complex algorithms through visual representation. This helps students, educators, and professionals understand DSA concepts with ease.

## 🛠 Features
- **Algorithm Visualization:** Real-time execution of sorting and searching algorithms with animations.
- **Race Mode:** Side-by-side comparison of multiple algorithms with execution speed tracking and leaderboard.
- **Custom Inputs:** Users can enter their own datasets for personalized visualization.
- **Step-by-Step Execution:** Pause, resume, and navigate through each algorithm's execution stages.
- **Performance Metrics:** Display key information like the number of swaps, comparisons, and execution time.
- **Interactive UI:** User-friendly interface with smooth transitions and animations.
- **Dark Theme:** Modern and aesthetically pleasing color scheme for an immersive experience.
- **Theory Section:** Explanation of each algorithm with detailed insights and complexity analysis.

## 📂 Project Structure
```
📦 DSA Visualizer
├── 📁 components/             # UI components
│   ├── AlgorithmVisualizer.js
│   ├── SortingVisualizer.js
│   ├── SearchingVisualizer.js
│   ├── RaceMode.js
│   ├── TheorySection.js
├── 📁 algorithms/             # Sorting & searching implementations
│   ├── bubbleSort.js
│   ├── quickSort.js
│   ├── mergeSort.js
│   ├── binarySearch.js
│   ├── linearSearch.js
│   ├── insertionSort.js
│   ├── selectionSort.js
├── 📁 pages/                  # Application views
│   ├── Home.js
│   ├── Sorting.js
│   ├── Searching.js
│   ├── Race.js
│   ├── Theory.js
├── 📁 assets/                 # Images, animations, styles
├── 📁 styles/                 # CSS/SCSS for styling
│   ├── global.css
│   ├── Header.css
│   ├── Home.css
│   ├── RaceMode.css
├── 📄 App.js                  # Main application entry point
├── 📄 index.js                # React DOM rendering
├── 📄 package.json            # Dependencies & scripts
├── 📄 README.md               # Project documentation
└── 📂 public/                 # Static files
```

## 📦 Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/sakshi04-ui/DSA_Visualizer.git
   cd dsa-visualizer
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npx parcel public/index.html
   ```
4. Open in the browser:
   ```
   http://localhost:1234/
   ```

## 🚀 Deployment
The project is deployed on **Netlify**. To deploy your own version:
1. Connect your GitHub repository to Netlify.
2. Set the build command:
   ```sh
   npm run build
   ```
3. Set the publish directory to `/dist/`.
4. Deploy and obtain the live link.

## 🏆 Hackathon Participation
This project is part of a **NEXUS Hackathon organised by Rohit negi**, focusing on the following judging criteria:
- **UI/UX Design:** Clean, modern, and intuitive interface.
- **Interactivity:** Real-time user interactions and algorithm animations.
- **Performance & Optimization:** Efficient execution of algorithms.
- **Innovation:** Unique features such as Race Mode, Theory Section, and Interactive Inputs.
- **Code Quality:** Modular, scalable, and well-documented codebase.

## 🔥 Future Enhancements
- **Graph Algorithms:** Addition of BFS, DFS, Dijkstra's Algorithm, and more.
- **Dynamic Problem Solving:** Users can input problem statements and visualize step-by-step solutions.
- **User Accounts & Progress Tracking:** Save algorithm progress and create custom practice sessions.
- **Mobile Optimization:** Fully responsive design for mobile and tablet users.
- **Community Challenges:** Users can compete in solving DSA problems through interactive challenges.

## 👥 Contributors
- **Sakshi Jain(https://github.com/your-github-profile)** (Lead Developer)

---
🌟 If you find this project helpful, give it a ⭐ on GitHub!
