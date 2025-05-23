import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md border-b border-emerald-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            BookHaven
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`text-emerald-600 hover:text-emerald-700 transition-colors ${
                location.pathname === '/' ? 'font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`text-emerald-600 hover:text-emerald-700 transition-colors ${
                location.pathname === '/explore' ? 'font-semibold' : ''
              }`}
            >
              Explore
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/favorites"
                  className={`text-emerald-600 hover:text-emerald-700 transition-colors ${
                    location.pathname === '/favorites' ? 'font-semibold' : ''
                  }`}
                >
                  Favorites
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-emerald-600 hover:text-emerald-700 transition-colors ${
                    location.pathname === '/login' ? 'font-semibold' : ''
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`text-emerald-600 hover:text-emerald-700 transition-colors ${
                    location.pathname === '/register' ? 'font-semibold' : ''
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 