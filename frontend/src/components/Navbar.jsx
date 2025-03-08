import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, user, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Quick-Bite</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart" className="cart-link">
            Cart ({cartCount})
          </Link>
          {user ? (
            <div className="user-section">
              <span className="welcome-text">Welcome, {user}</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
