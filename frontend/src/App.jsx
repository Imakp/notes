import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TileView from "./pages/TileView";
import GraphProvider from "./context/GraphContext";

const App = () => {
  return (
    <GraphProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Zettelkasten</h1>
              <div>
                <a href="/" className="mr-4">
                  Home
                </a>
              </div>
            </div>
          </nav>
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tile/:tileName" element={<TileView />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GraphProvider>
  );
};

export default App;
