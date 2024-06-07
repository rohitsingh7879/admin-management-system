import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, createProduct } from '../Services/ProductService';
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table, Col, Row, Form, Dropdown, NavItem } from 'react-bootstrap';
import axios from 'axios';
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };
  const [search, setSearch] = useState('')
  const [image, setimage] = useState()
  const [values, setvalues] = useState({
    name: '',
    description: '',
    basePrice: '',
  })

  const addProduct = async () => {
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("description", values.description);
    formdata.append("basePrice", values.basePrice);
    formdata.append("image", image);

    try {
      const res = await axios.post('http://localhost:5000/api/products', formdata)
      if (res.status === 201) {
        handleClose()
        loadProducts()
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  // for modal to add products
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for updating the prooducts
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const [idforUpdate, setIdforUpdate] = useState()
  const [updatedImg, setUpdatedImg] = useState('')
  const [updateVal, setUpdateVal] = useState({
    name: '',
    description: '',
    basePrice: '',
  })
  const handleShow2 = async (id) => {
    if (id) {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log(res.data);

        // Set the state with the fetched data
        setUpdateVal({
          name: res.data.name,
          description: res.data.description,
          basePrice: res.data.basePrice,
        });

        setIdforUpdate(id);
        setShow2(true);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
  };


  // delete single product
  const handeldelete = async (id) => {
    try {
      if (id) {
        const res = await axios.delete(`http://localhost:5000/api/products/${id}`)
        if (res.status === 200) {
          loadProducts()
        }
      }
    } catch (error) {
    }
  }



  const handelUpdate = async () => {
    const formdata = new FormData();
    formdata.append("name", updateVal.name);
    formdata.append("description", updateVal.description);
    formdata.append("basePrice", updateVal.basePrice);
    formdata.append("image", updatedImg);

    try {
      const res = await axios.put(`http://localhost:5000/api/products/${idforUpdate}`, formdata)
      console.log(res)
      if (res.status === 200) {
        handleClose2()
        loadProducts()
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }
  return (

    <>
      <div className='container' style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
        <div className="pt-4  mb-4 row">
          <div className="col">
            <form class="d-flex" role="search">
              <input class="form-control me-2" onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search by name, description, baseprice" aria-label="Search" />
            </form>
          </div>
          <div className="col">
            <Button class="btn btn-success" type="submit" onClick={handleShow}>+ Add Prodcuts</Button>
          </div>
        </div>
        <h2 className='d-flex justify-content-center'>List of All Prodcuts</h2>
        <div className='table-scroll '>


          <Table striped bordered hover className="table-responsive">
            <thead className=''>
              <tr className='bg-dark table-dark bg-blackbg-gradient'>
                <th className=''>Sr No.</th>
                <th className='thead-sticky'>Name</th>
                <th className=''>Image</th>
                <th className=''>Description</th>
                <th className=''>Base Price</th>
                <th className=''>Update</th>
                <th className=''>Delete</th>

              </tr>
            </thead>
            <tbody>
              {products.filter((item) => {
                return search.toLowerCase() === '' ? item : item.name.toString().toLowerCase().includes(search) || item.description.toLowerCase().includes(search) || item.basePrice.toString().includes(search)
              }).map((item, index) => {
                return (// <h3>{user}</h3>
                  <tr key={index}>
                    <td className=''>{index + 1}</td>
                    <td className='thead-sticky'>{item.name}</td>
                    <td><img src={`http://localhost:5000/${item.image}`} alt="" className='' style={{ height: "50px", width: "50px", borderRadius: "40%" }} /></td>

                    <td className='thead-sticky'>{item.description}</td>
                    <td>{item.basePrice}</td>
                    <td><Button variant="success" onClick={() => handleShow2(item._id)}>
                      Update
                    </Button></td>
                    <td><Button variant="danger" onClick={() => handeldelete(item._id)}>
                      Delete
                    </Button></td>
                    {/* <div class="form-check form-switch">
                        <input className={`form-check-input ${item.status === 'active' ? 'active-checkbox' : 'inactive-checkbox'}`} type="checkbox"
                          //  onChange={() => switchClick(user.uid)} 
                          role="switch" id='flexSwitchCheckChecked' checked={NavItem.status === 'active'} />
                        <label className="form-check-label" for="flexSwitchCheckChecked">{item.status}</label>
                      </div> */}


                  </tr>
                )
              })

              }
            </tbody >
          </Table >
        </div>
      </div >

      {/* // modal for adding products  */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Update Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
            <input type="text" className="form-control" value={updateVal.name} id="exampleFormControlInput1" placeholder="Name" onChange={(e) => setUpdateVal({ ...updateVal, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Description</label>
            <textarea rows={3} className="form-control" value={updateVal.description} id="exampleFormControlInput2" placeholder="Description" onChange={(e) => setUpdateVal({ ...updateVal, description: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">Image Of Product</label>
            <input type="file" className="form-control" id="exampleFormControlInput3" placeholder="Upload an image" onChange={(e) => setUpdatedImg(e.target.files[0])} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput4" className="form-label">Base Price</label>
            <input type="number" className="form-control" value={updateVal.basePrice} id="exampleFormControlInput4" placeholder="Base Price" onChange={(e) => setUpdateVal({ ...updateVal, basePrice: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handelUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* // modal for updating products */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name" onChange={(e) => setvalues({ ...values, name: e.target.value })} />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Description</label>
            <textarea rows={3} cols={5} type="text" class="form-control" id="exampleFormControlInput1" placeholder="description" onChange={(e) => setvalues({ ...values, description: e.target.value })} />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Image Of Product</label>
            <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="upload an image " onChange={(e) => setimage(e.target.files[0])} />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Base Price</label>
            <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="base price" onChange={(e) => setvalues({ ...values, basePrice: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductList;
