import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { books } from '../data/mockData';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundBook = books.find(b => b.id === parseInt(id));
        if (!foundBook) {
          setError('Book not found');
          return;
        }
        setBook(foundBook);

        // Check if book is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(foundBook.id));
      } catch (err) {
        setError('Failed to load book details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToFavorites = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(favId => favId !== book.id);
    } else {
      newFavorites = [...favorites, book.id];
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error || 'Book not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <p className="text-gray-600 mb-4">by {book.author}</p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{book.rating}</span>
            </div>
            <p className="text-gray-700 mb-6">{book.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">${book.price}</span>
              {currentUser ? (
                <button
                  onClick={handleAddToFavorites}
                  className={`px-4 py-2 rounded-md ${
                    isFavorite
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors`}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                >
                  Login to Add to Favorites
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail; 