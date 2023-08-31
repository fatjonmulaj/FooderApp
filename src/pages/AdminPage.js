import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('https://localhost:44334/api/produkti')
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const handleCreateProduct = () => {
        axios.post('https://localhost:44334/api/produkti', {
        emri: productName,
        pershkrimi: productDescription,
        // Other fields
        })
        .then(response => {
        console.log('Product created successfully');
        fetchProducts(); // Refresh the product list
        })
        .catch(error => {
        console.error('Error creating product:', error);
        });
    };

    const handleDeleteProduct = (productID) => {
        axios.delete(`https://localhost:44334/api/produkti/${productID}`)
        .then(response => {
        console.log('Product deleted successfully');
        fetchProducts(); // Refresh the product list
        })
        .catch(error => {
        console.error('Error deleting product:', error);
        });
    };

    return (
        <div>
        <h2>Admin Page - Product Management</h2>
        
        {/* Product Creation Form */}
        <div>
            <h3>Create New Product</h3>
            <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            />
            <textarea
            placeholder="Product Description"
            value={productDescription}
            onChange={e => setProductDescription(e.target.value)}
            />
            <button onClick={handleCreateProduct}>Create Product</button>
        </div>
        
        {/* List of Products */}
        <div>
            <h3>Product List</h3>
            <ul>
            {products.map(product => (
                <li key={product.produktiID}>
                <img src={product.fotopath} alt={product.emri} width="100px" />
                <h4>{product.emri}</h4>
                <p>{product.pershkrimi}</p>
                <button onClick={() => handleDeleteProduct(product.produktiID)}>Delete</button>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
    }

export default AdminPage;
