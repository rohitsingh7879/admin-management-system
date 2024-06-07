import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, getProduct } from '../Services/ProductService';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    const response = await getProduct(id);
    setName(response.data.name);
    setDescription(response.data.description);
    setBasePrice(response.data.basePrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, description, basePrice };
    if (id) {
      await updateProduct(id, product);
    } else {
      await createProduct(product);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Update Product' : 'Create Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Base Price</label>
          <input value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
