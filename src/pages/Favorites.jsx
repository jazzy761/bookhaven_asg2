import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function Favorites() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const favoriteBooks = books.filter(book => favorites.includes(book.id));

  const removeFavorite = (bookId) => {
    const newFavorites = favorites.filter(id => id !== bookId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Please Login</h1>
          <p className="text-gray-200 mb-4">You need to be logged in to view your favorites.</p>
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-white">My Favorite Books</h1>

        {favoriteBooks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-200 mb-4">You haven't added any favorite books yet.</p>
            <Link to="/" className="btn-primary">
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteBooks.map(book => (
              <div key={book.id} className="group block bg-white/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
                  <p className="text-gray-600 mb-2">{book.author}</p>
                  <p className="text-sm text-gray-500 mb-2">{book.genre}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold">${book.price}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{book.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => removeFavorite(book.id)}
                      className="btn-secondary w-full"
                    >
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 