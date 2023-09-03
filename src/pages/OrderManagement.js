import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function OrderManagement() {
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {
          let result = null;
          result = await axios.get(`https://localhost:44334/api/porosia`);
          const orders = result.data;
          setOrders(orders);
        }
    
        fetchData();
      }, []);

      const handleRemoveItem = async (porosiaID) => {
        try {
          
          await axios.delete(`https://localhost:44334/api/porosia/${porosiaID}`);
          window.location.reload();
        } catch (error) {
          console.error('Error removing item:', error);
        }
      };
    
      const formatDateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return `${date} - ${time}`;
      };
    return (
        <div id='orderedProducts'>
        {orders.length > 0 ? (
          <>
            <h2 className='my-3'>Ordered Products</h2>
            <Table striped bordered hover className='mb-5 pb-5'>
              <thead>
                <tr>
                  <th>Nr.</th>
                  <th>Person</th>
                  <th>Quantity</th>
                  <th>Price</th>                 
                  <th>Total Price</th>
                  <th>Date and Time</th>
                  <th>Status</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.emriMbiemri}</td>
                    <td>{item.sasia}</td>
                    <td>{item.cmimi} €</td>
                    <td>{item.totali} €</td>
                    <td>{formatDateTime(item.dataOra)} </td>                   
                    <td>{item.statusi}</td>
                    <td>
                      <button onClick={() => handleRemoveItem(item.porosiaID)}>Cancel Order</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
          </>
        ) : (
          <h2 className='my-3 text-light'>No Products are Ordered!</h2>
        )}
        
      </div>
    );
    }

export default OrderManagement;
