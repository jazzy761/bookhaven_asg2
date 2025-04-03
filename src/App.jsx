import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetail from './pages/BookDetail';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div 
          className="min-h-screen bg-gradient-to-b from-emerald-50 to-white"
        >
          <div className="min-h-screen">
            <Navbar />
            <main className="content-overlay">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
