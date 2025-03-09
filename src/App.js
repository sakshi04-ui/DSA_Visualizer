import React from "react";
import { Router, Route } from "wouter";
import Home from "./pages/Home";
import Sorting from "./pages/Sorting";
import Searching from "./pages/Searching";
import Race from "./components/RaceMode";
import Header from "./components/Header";
import Footer from "./components/Footer";
import bubbleSort from "./algorithms/bubbleSort";
import insertion from "./algorithms/insertionSort";



const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/" component={Home} />
        <Route path="/sorting" component={Sorting} />
        <Route path="/searching" component={Searching} />
        <Route path="/race" component={Race} />
        {/* <Route path="/bubblesort" component={BubbleSortVisualizer} /> Add route */}
        
      </main>
      <Footer />
    </Router>
  );
};

export default App;
