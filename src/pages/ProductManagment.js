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
        fetchProducts(); 
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
      emri: editedProduct.emri, 
      pershkrimi: editedProduct.pershkrimi || "",
      cmimi: parseFloat(editedProduct.cmimi) || 0,
      sasia: parseInt(editedProduct.sasia) || 0,
      lloji: editedProduct.lloji || ""
    };

    axios.put(`https://localhost:44334/api/produkti/${editedProduct.produktiID}`, updatedProduct)
      .then(response => {
        console.log('Product updated successfully:', response.data);
        fetchProducts(); 
        setEditingProductId(null); 
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

const handleAddProduct = async () => {
  try {
      const emri = document.querySelector('input[name="emri"]').value;
      const pershkrimi = document.querySelector('input[name="pershkrimi"]').value;
      const cmimi = document.querySelector('input[name="cmimi"]').value;
      const sasia = document.querySelector('input[name="sasia"]').value;
      const lloji = document.querySelector('input[name="lloji"]').value;
      const kompletFotoPath = document.querySelector('input[name="fotopath"]').value;

      const parts = kompletFotoPath.split('\\'); 
      const fotopath = parts[parts.length - 1];

      const dt = {
        emri,
        pershkrimi,
        cmimi ,
        sasia  ,
        fotopath ,
        lloji       
      };
      console.log(dt)
    const response = await axios.post('https://localhost:44334/api/produkti', dt);
    console.log(response.data);
    
  alert('Product Added Succesfully!')
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div>
      <h2 className='text-light'>Product Management</h2>
      <div className='text-light my-4 '>
        <h3>Add New Product</h3>
        <input type='text' name='emri'placeholder='Product Name' value={editedProduct.emri || ""} onChange={(e) => setEditedProduct({ ...editedProduct, emri: e.target.value })}/>
        <input type='text' name='pershkrimi' placeholder='Category' value={editedProduct.pershkrimi || ""} onChange={(e) => setEditedProduct({ ...editedProduct, pershkrimi: e.target.value })}/>
        <input type='number' name='cmimi' placeholder='Price' value={editedProduct.cmimi || ""} onChange={(e) => setEditedProduct({ ...editedProduct, cmimi: e.target.value })}/>
        <input type='number' name='sasia' placeholder='Quantity' value={editedProduct.sasia || ""}onChange={(e) => setEditedProduct({ ...editedProduct, sasia: e.target.value })}/>
        <input type='text' name='lloji' placeholder='Type' value={editedProduct.lloji || ""} onChange={(e) => setEditedProduct({ ...editedProduct, lloji: e.target.value })}/>
        <input type='file' name='fotopath' onChange={(e) => setNewProductImage(e.target.files[0])}  />
        <div id='butoniAddProduct'>
          <button  id='butoniMaIForti' onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>
    <br></br>
      
    <br></br>
      <ul className='produktet' id='productmanagment'>
        {products.map(product => (
          <div height='300px'>
            <li key={product.produktiID}>
              <img src={variables.PHOTO_URL + product.fotopath} alt={product.emri} width="100%" className='rounded' height="260px" />
              <h2>{product.emri}</h2>
              {editingProductId === product.produktiID ? (
                <div>
                  <input type="text" value={editedProduct.pershkrimi || ""} onChange={(e) => setEditedProduct({ ...editedProduct, pershkrimi: e.target.value })}/>
                  <input type="number" value={editedProduct.cmimi || ""} onChange={(e) => setEditedProduct({ ...editedProduct, cmimi: e.target.value })}/>
                  <input type="number" value={editedProduct.sasia || ""} onChange={(e) => setEditedProduct({ ...editedProduct, sasia: e.target.value })}/>
                  <input type="text" value={editedProduct.lloji || ""} onChange={(e) => setEditedProduct({ ...editedProduct, lloji: e.target.value })}/>
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


// onChange={(e) => setNewProductImage(e.target.files[0])}
