import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import RestaurantCard from '../components/RestaurantCard';
import restaurants from '../utils/restaurants';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize Navigate Hook

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if token exists
    if (!token) {
      alert("You must log in first!");
      navigate('/login'); // Redirect to Login Page if not authenticated
    }
  }, [navigate]);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search restaurants or cuisines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="restaurants-grid">
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Home;
