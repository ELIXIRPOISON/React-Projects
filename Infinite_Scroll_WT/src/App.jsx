// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [photosArray, setPhotosArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('galaxy'); // Default query

  const count = 10;
  const apiKey = "45496333-3fa1d67e86f676313d5f86f45";
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=${count}&page=${page}`;

  const getPhotos = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPhotosArray((prevPhotos) => [...prevPhotos, ...data.hits]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPhotosArray([]); // Clear existing photos
    setPage(1); // Reset page number
    getPhotos(); // Fetch photos with new query
  };

  useEffect(() => {
    getPhotos();
  }, [page, query]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Photo Gallery</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Gallery</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Image Container */}
      <div id="img-container" className="image-container">
        {photosArray.map((photo) => (
          <a
            key={photo.id}
            href={photo.pageURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={photo.webformatURL}
              alt={photo.tags}
              title={photo.tags}
            />
          </a>
        ))}
      </div>
      {loading && <p>Loading more images...</p>}
    </div>
  );
};

export default App;
