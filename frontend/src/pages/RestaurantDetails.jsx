import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { menuItems } from '../utils/menuItems'; // Adjust the path as needed

const RestaurantDetails = ({ addToCart }) => {
  const { id } = useParams();
  const restaurantId = parseInt(id);
  const restaurantMenu = menuItems.find(menu => menu.restaurantId === restaurantId);

  // State to track which item was recently added
  const [addedItem, setAddedItem] = useState(null);

  if (!restaurantMenu) {
    return <div>No menu found for this restaurant.</div>;
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItem(item.id);

    // Remove the "Added" message after 1 second
    setTimeout(() => setAddedItem(null), 1000);
  };

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
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              {addedItem === item.id && <span className="added-msg">✔ Added!</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
