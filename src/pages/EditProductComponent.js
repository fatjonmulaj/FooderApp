import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProductComponent() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState('');
  const [newProductPhoto, setNewProductPhoto] = useState(null);
  const [newProductType, setNewProductType] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('emri', newProductName);
    formData.append('pershkrimi', newProductDescription);
    formData.append('cmimi', newProductPrice);
    formData.append('sasia', newProductQuantity);
    formData.append('lloji', newProductType);
    formData.append('fotopath', newProductPhoto);

    axios.post('https://localhost:44334/api/produkti', formData)
      .then(response => {
        console.log('Product added successfully:', response.data);
        setNewProductName('');
        setNewProductDescription('');
        setNewProductPrice('');
        setNewProductQuantity('');
        setNewProductPhoto(null);
        setNewProductType('');
        fetchProducts();
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  const handlePhotoChange = event => {
    setNewProductPhoto(event.target.files[0]);
  };

  const handleDeleteProduct = productId => {
    axios.delete(`https://localhost:44334/api/produkti/${productId}`)
      .then(response => {
        console.log('Product deleted successfully:', response.data);
        fetchProducts();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleEditProduct = product => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    const updatedProduct = {
      ...editingProduct,
      emri: newProductName,
      pershkrimi: newProductDescription,
      cmimi: parseFloat(newProductPrice),
      sasia: parseInt(newProductQuantity),
      lloji: newProductType
      // Make sure to handle the photo update as needed
    };

    axios.put(`https://localhost:44334/api/produkti/${editingProduct.produktiID}`, updatedProduct)
      .then(response => {
        console.log('Product updated successfully:', response.data);
        setEditingProduct(null);
        fetchProducts();
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div>
      <h2>Product Management</h2>
      <div>
        <h3>Add New Product</h3>
        {/* Input fields for new product */}
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <h3>Existing Products</h3>
        <ul>
          {products.map(product => (
            <li key={product.produktiID}>
              <img src={product.fotopath} alt={product.emri} width="100" />
              <h4>{product.emri}</h4>
              <p>{product.pershkrimi}</p>
              {/* Other product details */}
              <div>
                <button onClick={() => handleDeleteProduct(product.produktiID)}>
                  Delete
                </button>
                {editingProduct && editingProduct.produktiID === product.produktiID ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingProduct(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditProduct(product)}>Edit</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EditProductComponent;

