import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function Cart() {
  const perdoruesiID = localStorage.getItem('perdoruesiId');
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState([]);


  useEffect(() => {
    async function fetchData() {
      let result = null;
      result = await axios.get(`https://localhost:44334/api/shportaBlerjeve/${perdoruesiID}`);
      const cartItems = result.data;
      setCartItems(cartItems);
    }

    fetchData();
  }, []);

  const handleCheckout = async () => {

    cartItems.forEach(async (item) => {
      const dt = {
        sasia: item.sasia,
        produktiID: item.produktiID,
        perdoruesiID: perdoruesiID,
        dataOra: new Date().toISOString(),
        statusi: 'On Route',
        cmimi: item.cmimi,
      };
    
      try {
        console.log(dt)
        console.log(dt.cmimi)
        const response = await axios.post('https://localhost:44334/api/porosia', dt);
        console.log(response.data); 
      } catch (error) {
        console.error(error);
      }
    })
   try{
      await axios.delete(`https://localhost:44334/api/shportaBlerjeve/checkout/${perdoruesiID}`);
      alert('You have successfully checked out the products!');
      window.location.reload();
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  
  

  const handleRemoveItem = async (itemID) => {
    try {
      
      await axios.delete(`https://localhost:44334/api/shportaBlerjeve/${itemID}`);
      window.location.reload();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div id='cartpage'>
      {cartItems.length > 0 ? (
        <>
          <h2 className='my-3'>Cart Products</h2>
          <Table striped bordered hover className='mb-5 pb-5'>
            <thead>
              <tr>
                <th>Nr.</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.emri}</td>
                  <td>{item.sasia}</td>
                  <td>{item.cmimi} €</td>
                  <td>{item.totali} €</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.ID)}>Remove item</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div id='butoniAddProduct'>
        <button id='butoniMaIForti' onClick={() => handleCheckout()}>Checkout</button>
      </div>
        </>
      ) : (
        <h2 className='my-3'>You dont have any product in your cart</h2>
      )}
      
    </div>
  );
}

export default Cart;





