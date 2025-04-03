import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AddBook() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    coverImage: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    if (!formData.coverImage.trim()) {
      newErrors.coverImage = 'Cover image URL is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please login to add a book');
      return;
    }

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // In a real app, this would be an API call
    const newBook = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      reviews: []
    };

    // Simulate adding the book
    console.log('New book added:', newBook);
    alert('Book added successfully!');
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Book</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input-field ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`input-field ${errors.author ? 'border-red-500' : ''}`}
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`input-field ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={`input-field ${errors.price ? 'border-red-500' : ''}`}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Cover Image URL</label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className={`input-field ${errors.coverImage ? 'border-red-500' : ''}`}
          />
          {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="btn-primary">
            Add Book
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 