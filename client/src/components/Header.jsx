// Application header with navigation and theme toggle.

import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMoon, HiOutlineSun, HiOutlinePlus } from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">✓</span>
          <span className="logo-text">TaskTracker</span>
        </Link>
        <nav className="header-actions">
          {isHome && (
            <Link to="/tasks/new" className="btn btn-primary btn-sm">
              <HiOutlinePlus />
              <span className="btn-label">New Task</span>
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="btn btn-icon"
            aria-label="Toggle theme"
          >
            {darkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
