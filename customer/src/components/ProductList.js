import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Navbar';
import { Container, Row, Col } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();   
  }, []);

  return (
    <>
      <Navbar />
      {/* <div className="App">
        <h1>Product List</h1>
        <div className="product-list">
          {products.map(product => (
              <div class="card" style={{width:"18rem"}}>
                <img src={`http://localhost:5000/${product.image}`} class="card-img-top" alt="..." />
                <div class="card-body" style={{display:"flex"}}>
                  <h5 class="card-title">{product.name}</h5>
                  <p class="card-text">{product.description}</p>
                  <p><h3>Price</h3>{product.basePrice}</p>
                  <button className='btn btn-success'>Buy Now</button>
                  <button className='btn btn-primary'>Add to cart</button>
                </div>
            </div>
          ))}
        </div>
      </div> */}

<div className='div-products mt-3' style={{
          width: "100vw", display: 'flex', height: "",
          justifyContent: 'space-evenly'
        }}>
          {
            <Row>
              <h3>Today's Deal</h3>
              {products.map((product) => (
                <Col key={product.productId} className='col-3 mx-5' style={{ height: "400px" }}>
                  {/* <ProductCard product={product} /> */}
                  <div className="card card-shadow" >
                    {/* <NextLink className="dropdown-item" href={"/[Id]"} as={`${product.productId}`}> */}
                      <img src={product.photo} alt="Product" style={{ height: "200px", width: "100%" }} />
                    {/* </NextLink> */}
                    <div className="card-body">
                      <div className="d-flex" style={{ display: 'flex', justifyContent: "center" }}>
                        <h3>{product.brandName} | </h3>
                        <h3 className='mx-2'> {product.productName}</h3>

                      </div>
                      <p>Express yourself powerfully with a thin, light, and elegant design, faster performance, and up to 11.5 hours battery life.</p>
                      <a href="#">shop now <i className="fas fa-chevron-right"></i></a>
                      <h3>&#8377; {product.price}</h3>
                    </div>
                    <div className="d-flex " style={{ justifyContent: "space-evenly" }}>

                      {/* <button className="btn btn-glow-lightblue border border-info mb-3" onClick={() => handelAddToCart(product)}>Add To Cart</button>

                      <button className="btn btn-glow-green border border-success mb-3" onClick={() => paymentHandel(product.price)}>Buy Now</button> */}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          }



        </div>
    </>

  );
};

export default ProductList;
