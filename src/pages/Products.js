import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { variables } from './variables';

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from your API when the component mounts
    axios.get('https://localhost:44334/api/produkti')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <div id='products'>
      <div><h1>Products</h1></div>
      <ul>
        {products.map(product => (
          <li key={product.produktiID}>
            <img src={variables.PHOTO_URL+product.fotopath} alt={product.emri} width="300px" />
            <h2>{product.emri}</h2>
            <p>Category: {product.pershkrimi}</p>
            <p>Price: {product.cmimi}</p>
            <p>Quantity: {product.sasia}</p> 
            <p>Type: {product.lloji}</p>
            <div class="d-grid gap-2 d-md-block w-100">
              <button class="btn btn-primary w-100" type="button" onClick={() => addToCart(product)}>Add To Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;



// function Products() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch data from your API when the component mounts
//     axios.get('https://localhost:44334/api/produkti')
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []); // The empty array means this effect runs only once, on mount


//   return (
//     <div id='products'>
//       <div><h1>Products</h1></div>
//       <ul>
//         {products.map(product => (
//           <li key={product.produktiID}>
//             <img src={product.fotopath} alt={product.emri} width="300px" />
//             <h2>{product.emri}</h2>
//             <p>{product.pershkrimi}</p>
//             <p>Price: {product.cmimi}</p>
//             <p>Quantity: {product.sasia}</p> 
//             <p>Type: {product.lloji}</p>
//             <div class="d-grid gap-2 d-md-block w-100">
//               <button class="btn btn-primary w-100" type="button">Add To Cart</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// export default Products



