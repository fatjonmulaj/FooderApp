import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { variables } from './variables';
import { Link } from 'react-router-dom';

function Products({ addToCart, userRole }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:44334/api/produkti')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleAddProductToCart = async (produktiID) => {
    if (localStorage.getItem('kaPerdorues')) {
      try {
        const inputFieldName = `sasia-${produktiID}`; // Generate the unique input field name
        const sasia = document.querySelector(`input[name="${inputFieldName}"]`).value;
        const perdoruesiID = localStorage.getItem('perdoruesiId');
  
        const dt = {
          sasia,
          produktiID,
          perdoruesiID
        };
        console.log(dt);
  
        const response = await axios.post('https://localhost:44334/api/shportaBlerjeve', dt);
        console.log(response.data);
  
        alert('Added To Cart Successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('You must log in first!');
    }
  };
  

  return (
    <div id='products'>
      <div><h1>Products</h1></div>
      <ul>
        {products.map(product => (
          <li key={product.produktiID}>
            <img src={variables.PHOTO_URL + product.fotopath} alt={product.emri} width="100%" className='rounded ' height="220px" />
            <h2>{product.emri}</h2>
            <p>Category: {product.pershkrimi}</p>
            <p>Price: {product.cmimi}</p>
            <div id='sasiaTeProdukti'>
              <p>Quantity: {product.sasia}</p>
              <input
        type='number'
        name={`sasia-${product.produktiID}`} // Use a unique identifier
        min='1'
        max={product.sasia.toString()}
      />
            </div>
            <p>Type: {product.lloji}</p>
            <div className="d-grid gap-2 d-md-block w-100">
              <button className="btn btn-primary w-100" type="button" onClick={() => handleAddProductToCart(product.produktiID)}>Add To Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
