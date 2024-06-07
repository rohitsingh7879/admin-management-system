import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import DiscountRuleForm from './DiscountRuleForm';

const DiscountRuleList = () => {
    const [discountRules, setDiscountRules] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentDiscountRule, setCurrentDiscountRule] = useState(null);

    useEffect(() => {
        fetchDiscountRules();
    }, []);

    const fetchDiscountRules = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/discount-rules');
            setDiscountRules(response.data);
        } catch (error) {
            console.error('Error fetching discount rules:', error);
        }
    };

    const handleSave = async (discountRule) => {
        // try {
        if (currentDiscountRule) {
            await axios.put(`http://localhost:5000/api/discount-rules/${currentDiscountRule._id}`, discountRule);
        } else {
            console.log(discountRule)
            const res = await axios.post('http://localhost:5000/api/discount-rules', discountRule);
            console.log(res)
        }
        fetchDiscountRules();
        setShowForm(false);
        setCurrentDiscountRule(null);
        // } catch (error) {
        //   console.error('Error saving discount rule:', error);
        // }
    };

    const handleEdit = (discountRule) => {
        setCurrentDiscountRule(discountRule);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/discount-rules/${id}`);
            fetchDiscountRules();
            setCurrentDiscountRule(null);
        } catch (error) {
            console.error('Error deleting discount rule:', error);
        }
    };

    //updating discount rules
    const initialFormValues = {
        type: 'flat',
        value: '',
        applicableTo: 'product',
        productId: '',
        categoryId: '',
        minOrderQuantity: '',
    };

    const [show2, setShow2] = useState(false);
    const [discountRuleId, setdiscountRuleId] = useState();
    const handleClose2 = () => setShow2(false);
    const handleShow2 = (id) => {
        setdiscountRuleId(id)
        setShow2(true)
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handelUpdate = async (e) => {
        e.preventDefault();

        const res = await axios.put(`http://localhost:5000/api/discount-rules/${discountRuleId}`, { formValues })
        if(res.status===200){
            handleClose2()
            fetchDiscountRules()
        }
    }
    return (
        <div>
            <h1 className='mx-4 mt-2'>DiscountRules Management</h1>
            <Button variant="success"  className="mx-4 mt-2" onClick={() => { setCurrentDiscountRule(null); setShowForm(true); }}>
                Create Discount Rule
            </Button>
            <Table striped bordered hover className='table-responsive mx-4 mt-4'>
                <thead>
                    <tr className='bg-dark table-dark bg-blackbg-gradient'>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Applicable To</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {discountRules.map((rule) => (
                        <tr key={rule._id}>
                            <td>{rule.type}</td>
                            <td>{rule.value}</td>
                            <td>{rule.applicableTo}</td>
                            <td>
                                <Button variant="warning" className='mx-2' onClick={() => handleShow2(rule._id)}>Edit</Button>{' '}
                                <Button variant="danger" className='mx-2' onClick={() => handleDelete(rule._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DiscountRuleForm
                show={showForm}
                handleClose={() => setShowForm(false)}
                handleSave={handleSave}
                discountRule={currentDiscountRule}
            />

            {/* //Modal for updating discount rules */}
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Discount Rule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handelUpdate}>
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
        </div>
    );
};

export default DiscountRuleList;
