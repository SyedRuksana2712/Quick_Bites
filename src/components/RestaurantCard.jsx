import React from "react";
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <img src={restaurant.image} alt={restaurant.name} />
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisine}</p>
        <div className="rating-price">
          <span>⭐ {restaurant.rating}</span>
          <span>•</span>
          <span>₹{restaurant.averagePrice} for two</span>
        </div>
      </div>
      <Link to={`/restaurant/${restaurant.id}`} className="view-menu-btn">
        View Menu
      </Link>
    </div>
  );
};

export default RestaurantCard;