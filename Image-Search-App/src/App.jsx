import { useState } from 'react';
import axios from 'axios'; // Import axios
import './App.css';

function App() {
  const [searchedValue, setSearchedValue] = useState(""); 
  const [photos, setPhotos] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const search = async () => {
    if (!searchedValue) return;
    setLoading(true);
    try {

      let response = await axios.get(`https://pixabay.com/api/?key=45496333-3fa1d67e86f676313d5f86f45&q=${searchedValue}&image_type=photo`);
      setPhotos(response.data.hits); 
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div>
        <h1 style={{color:"whitesmoke"}}>Image Search App</h1>
        <input style={{height:"35px",marginRight:"20px",borderRadius:"10px", border:"0px"}}
          type="text" 
          value={searchedValue} 
          onChange={(e) => setSearchedValue(e.target.value)} 
          placeholder="Search for images..." 
        />
        <button onClick={search}>Search</button>
      </div>
      <br /><br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="photo-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-item">
              <img src={photo.webformatURL} alt={photo.tags} />
              <p>{photo.tags}</p> {/* Display tags (image description) */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
