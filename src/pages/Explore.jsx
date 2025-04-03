import { useState } from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/mockData';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Get unique genres from books
  const genres = [...new Set(books.map(book => book.genre))];

  // Filter books based on search term and selected genre
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Explore Books</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            className="group block bg-white/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
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
            </div>
          </Link>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No books found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Explore; 