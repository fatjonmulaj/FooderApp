import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { variables } from './variables';
import '../styles.css';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProductImage, setNewProductImage] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    emri: '',
    pershkrimi: '',
    cmimi: '',
    sasia: '',
    lloji: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('https://localhost:44334/api/produkti')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`https://localhost:44334/api/produkti/${productId}`)
      .then(() => {
        fetchProducts(); // Refresh the product list after deleting a product
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleEditClick = (productId) => {
    const productToEdit = products.find(product => product.produktiID === productId);
    setEditedProduct(productToEdit);
    setEditingProductId(productId);
  };

  const handleUpdateProduct = () => {
    const updatedProduct = {
      ...editedProduct,
      emri: editedProduct.emri, // Make sure to include the product name
      pershkrimi: editedProduct.pershkrimi || "",
      cmimi: parseFloat(editedProduct.cmimi) || 0,
      sasia: parseInt(editedProduct.sasia) || 0,
      lloji: editedProduct.lloji || ""
    };

    axios.put(`https://localhost:44334/api/produkti/${editedProduct.produktiID}`, updatedProduct)
      .then(response => {
        console.log('Product updated successfully:', response.data);
        fetchProducts(); // Refresh the product list
        setEditingProductId(null); // Exit edit mode
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('emri', editedProduct.emri);
    formData.append('pershkrimi', editedProduct.pershkrimi || "");
    formData.append('cmimi', parseFloat(editedProduct.cmimi) || 0);
    formData.append('sasia', parseInt(editedProduct.sasia) || 0);
    formData.append('lloji', editedProduct.lloji || "");
    formData.append('fotopath', newProductImage); // Include the image here

    const headers = {
      'Content-Type': 'multipart/form-data', // Set the content type to "multipart/form-data"
    };

    axios.post('https://localhost:44334/api/produkti', formData, { 
      headers:{
        'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Product added successfully:', response.data);
        fetchProducts(); // Refresh the product list
        setEditedProduct({
          emri: '',
          pershkrimi: '',
          cmimi: '',
          sasia: '',
          lloji: '',
        });
        setNewProductImage(null); // Clear the selected image after adding the product
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h2 className='text-light'>Product Management</h2>
      <div className='text-light my-4 '>
        <h3>Add New Product</h3>
        <input
          type='text' // Add this input for the product name (emri)
          placeholder='Product Name'
          value={editedProduct.emri || ""}
          onChange={(e) => setEditedProduct({ ...editedProduct, emri: e.target.value })}
        />
        <input
          type='text'
          placeholder='Category'
          value={editedProduct.pershkrimi || ""}
          onChange={(e) => setEditedProduct({ ...editedProduct, pershkrimi: e.target.value })}
        />
        <input
          type='number'
          placeholder='Price'
          value={editedProduct.cmimi || ""}
          onChange={(e) => setEditedProduct({ ...editedProduct, cmimi: e.target.value })}
        />
        <input
          type='number'
          placeholder='Quantity'
          value={editedProduct.sasia || ""}
          onChange={(e) => setEditedProduct({ ...editedProduct, sasia: e.target.value })}
        />
        <input
          type='text'
          placeholder='Type'
          value={editedProduct.lloji || ""}
          onChange={(e) => setEditedProduct({ ...editedProduct, lloji: e.target.value })}
        />
        <input type='file' onChange={(e) => setNewProductImage(e.target.files[0])} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <ul className='' id='productmanagment'>
        {products.map(product => (
          <div height='300px'>
            <li key={product.produktiID}>
              <img src={variables.PHOTO_URL + product.fotopath} alt={product.emri} width="100%" className='rounded' height="260px" />
              <h2>{product.emri}</h2>
              {editingProductId === product.produktiID ? (
                <div>
                  <input
                    type="text"
                    value={editedProduct.pershkrimi || ""}
                    onChange={(e) => setEditedProduct({ ...editedProduct, pershkrimi: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editedProduct.cmimi || ""}
                    onChange={(e) => setEditedProduct({ ...editedProduct, cmimi: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editedProduct.sasia || ""}
                    onChange={(e) => setEditedProduct({ ...editedProduct, sasia: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editedProduct.lloji || ""}
                    onChange={(e) => setEditedProduct({ ...editedProduct, lloji: e.target.value })}
                  />
                  <input type="file" onChange={(e) => setNewProductImage(e.target.files[0])} />
                  <button onClick={handleUpdateProduct}>Save</button>
                  <button onClick={() => setEditingProductId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>Category: {product.pershkrimi}</p>
                  <p>Price: {product.cmimi}</p>
                  <p>Quantity: {product.sasia}</p>
                  <p>Type: {product.lloji}</p>
                  <button onClick={() => handleEditClick(product.produktiID)}>Edit <FontAwesomeIcon icon={faEdit} /></button>
                  <button onClick={() => handleDeleteProduct(product.produktiID)}>Delete</button>
                </div>
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ProductManagement;
