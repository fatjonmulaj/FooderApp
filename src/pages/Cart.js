import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the API
    axios.get('https://localhost:44334/api/shportaBlerjeve')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (perdoruesiID) => {
    // Send a DELETE request to the API
    axios.delete(`https://localhost:44334/api/shportaBlerjeve/${perdoruesiID}`)
      .then(response => {
        // Remove the item from the local cart state
        setCartItems(cartItems.filter(item => item.perdoruesiID !== perdoruesiID));
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
  };

  return (
    <div id='cartpage'>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.perdoruesiID}>
            <h3>{item.emri}</h3>
            <p>Price: {item.cmimi}</p>
            <p>Quantity: {item.sasia}</p>
            <button onClick={() => removeFromCart(item.perdoruesiID)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
