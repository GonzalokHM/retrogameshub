import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import TicTacToe from './components/pages/Tic-Tac-Toe/TicTacToe';
import Hangman from './components/pages/Hangman/Hangman';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tic-Tac-Toe" element={<TicTacToe />} />
        <Route path="/Hangman" element={<Hangman />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
