import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './showlist.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching show data:', error);
    }
  };

  return (
    <div className="showlist-container">
      <h2>Show List</h2>
      <div className="showlist-grid">
        {shows.map((show) => (
          <div className="show-card" key={show.show.id}>
            <img src={show.show.image.medium} alt={show.show.name} />
            <div className="show-info">
              <h3>{show.show.name}</h3>
              <p>Genre: {show.show.genres.join(', ')}</p>
              <Link to={`/show/${show.show.id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
