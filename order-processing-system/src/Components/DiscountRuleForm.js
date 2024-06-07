import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DiscountRuleForm = ({ show, handleClose, handleSave, discountRule }) => {
  const initialFormValues = {
    type: 'flat',
    value: '',
    applicableTo: 'product',
    productId: '',
    categoryId: '',
    minOrderQuantity: '',
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    if (discountRule) {
      setFormValues(discountRule);
    } else {
      setFormValues(initialFormValues);
    }
  }, [discountRule]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formValues);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{discountRule ? 'Update Discount Rule' : 'Create Discount Rule'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" name="type" value={formValues.type} onChange={handleChange}>
              <option value="flat">Flat</option>
              <option value="percentage">Percentage</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="value">
            <Form.Label>Value</Form.Label>
            <Form.Control type="number" name="value" value={formValues.value} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="applicableTo">
            <Form.Label>Applicable To</Form.Label>
            <Form.Control as="select" name="applicableTo" value={formValues.applicableTo} onChange={handleChange}>
              <option value="product">Product</option>
              <option value="category">Category</option>
              <option value="orderQuantity">Order Quantity</option>
            </Form.Control>
          </Form.Group>
          {formValues.applicableTo === 'product' && (
            <Form.Group controlId="productId">
              <Form.Label>Product ID</Form.Label>
              <Form.Control type="text" name="productId" value={formValues.productId} onChange={handleChange} />
            </Form.Group>
          )}
          {formValues.applicableTo === 'category' && (
            <Form.Group controlId="categoryId">
              <Form.Label>Category ID</Form.Label>
              <Form.Control type="text" name="categoryId" value={formValues.categoryId} onChange={handleChange} />
            </Form.Group>
          )}
          {formValues.applicableTo === 'orderQuantity' && (
            <Form.Group controlId="minOrderQuantity">
              <Form.Label>Minimum Order Quantity</Form.Label>
              <Form.Control type="number" name="minOrderQuantity" value={formValues.minOrderQuantity} onChange={handleChange} />
            </Form.Group>
          )}
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DiscountRuleForm;
