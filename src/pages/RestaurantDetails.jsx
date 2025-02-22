// src/pages/RestaurantDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import {menuItems} from '../utils/menuItems'; // Adjust the path as needed

const RestaurantDetails = ({ addToCart }) => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const restaurantId = parseInt(id); // Convert it to an integer
  const restaurantMenu = menuItems.find(menu => menu.restaurantId === restaurantId);

  if (!restaurantMenu) {
    return <div>No menu found for this restaurant.</div>;
  }

  return (
    <div className="restaurant-details">
      <h1>{restaurantMenu.name} - Menu</h1>
      <div className="menu-items">
        {restaurantMenu.items.map(item => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <div className="menu-item-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>₹{item.price}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
