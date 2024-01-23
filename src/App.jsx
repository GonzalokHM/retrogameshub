import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { lazy } from 'react';
import Home from './components/pages/Home/Home';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import './App.css';

const TicTacToe = lazy(() => import('./components/pages/Tic-Tac-Toe/TicTacToe'));
const Hangman = lazy(() => import('./components/pages/Hangman/Hangman'));
const Sudoku = lazy(() => import('./components/pages/Sudoku/Sudoku'));

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Tic-Tac-Toe"
          element={
            <React.Suspense fallback={<h2>cargando...</h2>}>
              <TicTacToe />
            </React.Suspense>
          }
        />
        <Route
          path="/Hangman"
          element={
            <React.Suspense fallback={<h2>cargando...</h2>}>
              <Hangman />
            </React.Suspense>
          }
        />
        <Route
          path="/Sudoku"
          element={
            <React.Suspense fallback={<h2>cargando...</h2>}>
              <Sudoku />
            </React.Suspense>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
