import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Game from './Game';
import ProductCatalog from './ProductCatalog';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game">Tic-Tac-Toe Game</Link>
            </li>
            <li>
              <Link to="/catalog">Product Catalog</Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/game" element={<Game />} />
            <Route path="/catalog" element={<ProductCatalog />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Welcome to My React App</h1>;
}

export default App;