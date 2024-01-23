import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} type="button">
        ☰
      </button>
      <nav id="nav" className={menuOpen ? 'open' : ''}>
        <ul id="links">
          <li className={`link ${isActive('/') ? 'active' : ''}`}>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className={`link ${isActive('/Tic-Tac-Toe') ? 'active' : ''}`}>
            <Link to="/Tic-Tac-Toe" onClick={closeMenu}>
              Tic-Tac-Toe
            </Link>
          </li>
          <li className={`link ${isActive('/Hangman') ? 'active' : ''}`}>
            <Link to="/Hangman" onClick={closeMenu}>
              Hangman
            </Link>
          </li>
          <li className={`link ${isActive('/Sudoku') ? 'active' : ''}`}>
            <Link to="/Sudoku" onClick={closeMenu}>
              Sudoku
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
