import { Link } from 'react-router-dom';
import { books } from '../data/mockData';
import { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get featured books (first 3 books)
  const featuredBooks = books.slice(0, 3);
  
  // Get books by category
  const getBooksByGenre = (genre) => {
    return books.filter(book => book.genre === genre).slice(0, 6);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-emerald-800">Welcome to BookHaven</h1>
        <p className="text-xl text-emerald-600 mb-8">Find Your Next Great Read</p>
      </div>

      {/* Featured Books Carousel */}
      <div className="relative mb-16 overflow-hidden rounded-lg shadow-xl">
        <div className="relative h-[400px]">
          {featuredBooks.map((book, index) => (
            <div
              key={book.id}
              className={`absolute w-full h-full transition-all duration-500 transform ${
                index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="relative h-full bg-gradient-to-r from-emerald-900/80 to-transparent">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="absolute w-full h-full object-cover -z-10"
                />
                <div className="relative z-10 h-full flex items-center">
                  <div className="p-8 max-w-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">{book.title}</h2>
                    <p className="text-white/90 mb-4">{book.description}</p>
                    <Link
                      to={`/book/${book.id}`}
                      className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-emerald-800/50 text-white rounded-full hover:bg-emerald-800/70 transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-emerald-800/50 text-white rounded-full hover:bg-emerald-800/70 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Categories */}
      {['Classic', 'Fantasy', 'Mystery'].map(genre => {
        const genreBooks = getBooksByGenre(genre);
        if (genreBooks.length === 0) return null;

        return (
          <div key={genre} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-emerald-800">{genre}</h2>
              <Link to="/explore" className="text-emerald-600 hover:text-emerald-500 transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {genreBooks.map((book) => (
                <Link
                  to={`/book/${book.id}`}
                  key={book.id}
                  className="group block bg-white shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 border border-emerald-100"
                >
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2 text-emerald-900">{book.title}</h3>
                    <p className="text-xs text-emerald-600 mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-emerald-600 font-semibold">${book.price}</span>
                      <div className="flex items-center">
                        <span className="text-emerald-500 mr-1">★</span>
                        <span className="text-sm text-emerald-600">{book.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home; 