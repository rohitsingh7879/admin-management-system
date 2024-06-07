import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import Select from 'react-select';

// Sample data for states and cities
import { states, cities } from './indiaStatesAndCities'; // Make sure to replace with your actual data
import axios from 'axios';

const TaxRuleManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [newRule, setNewRule] = useState({
        taxRate: '',
        description: ''
    });
    const [taxRules, setTaxRules] = useState([]);

    // Dummy function to generate unique IDs
    const getTaxRule = async () => {
        const res = await axios.get('http://localhost:5000/api/tax-rules')
        setTaxRules(res.data)
    }

    useEffect(() => {
        getTaxRule()
    }, [])
    // Handle state change
    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        setSelectedCity(null);
        setNewRule({
            ...newRule,
            state: selectedOption.value
        });
    };

    // Handle city change
    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
        setNewRule({
            ...newRule,
            city: selectedOption.value
        });
    };

    // Handle tax rate change
    const handleTaxRateChange = (e) => {
        setNewRule({
            ...newRule,
            taxRate: parseFloat(e.target.value)
        });
    };

    // Handle description change
    const handleDescriptionChange = (e) => {
        setNewRule({
            ...newRule,
            description: e.target.value
        });
    };

    // Create a new tax rule
    const createTaxRule = async () => {
        const newTaxRule = {
            state: newRule.state,
            city: newRule.city,
            taxRate: newRule.taxRate,
            description: newRule.description,
            country: "INDIA"
        };
        // setTaxRules([...taxRules, newTaxRule]);
        const res = await axios.post('http://localhost:5000/api/tax-rules', newTaxRule)
        console.log(res)
        if (res.status === 201) {
            getTaxRule()
            setShowModal(false);
            setNewRule({
                taxRate: '',
                description: ''
            });
        }
    };

    // Delete a tax rule
    const deleteTaxRule = async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/tax-rules/${id}`)
        if (res.status === 201) {
            getTaxRule()
            setNewRule({
                taxRate: '',
                description: ''
            });
        }
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [taxRuleId, setTaxRuleId] = useState()
    const handleShow = (id) => {
        console.log(id)
        setTaxRuleId(id)
        setShow(true)
    };
    const updateTaxRule = async () => {
        if (taxRuleId) {
            const newTaxRule = {
                state: newRule.state,
                city: newRule.city,
                taxRate: newRule.taxRate,
                description: newRule.description,
                country: "INDIA"
            };
            const res = await axios.put(`http://localhost:5000/api/tax-rules/${taxRuleId}`, newTaxRule)
            if (res.status === 201) {
                handleClose()
                getTaxRule()
                setNewRule({
                    taxRate: '',
                    description: ''
                });
            }
        }
    }


    return (
        <div className="container">
            <h1 className='mx-4'>Tax Rule Management</h1>

            {/* Button to open modal */}
            <Button variant="success" className='mx-4 mt-2' onClick={() => setShowModal(true)}>Add Tax Rule</Button>

            {/* Modal for creating new tax rule */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Tax Rule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="stateSelect">
                            <Form.Label>Select State</Form.Label>
                            <Select
                                value={selectedState}
                                onChange={handleStateChange}
                                options={states}
                                placeholder="Select State"
                            />
                        </Form.Group>
                        <Form.Group controlId="citySelect">
                            <Form.Label>Select City</Form.Label>
                            <Select
                                value={selectedCity}
                                onChange={handleCityChange}
                                options={selectedState ? cities[selectedState.value].map(city => ({ value: city, label: city })) : []}
                                placeholder="Select City"
                                isDisabled={!selectedState}
                            />
                        </Form.Group>
                        <Form.Group controlId="taxRateInput">
                            <Form.Label>Tax Rate (%)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Tax Rate"
                                value={newRule.taxRate}
                                onChange={handleTaxRateChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="descriptionInput">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={newRule.description}
                                onChange={handleDescriptionChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={createTaxRule}>Add Tax Rule</Button>
                </Modal.Footer>
            </Modal>

            {/* modal for updating tax rules */}
            <Modal show={show} onHide={() => handleClose(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Tax Rule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="stateSelect">
                            <Form.Label>Select State</Form.Label>
                            <Select
                                value={selectedState}
                                onChange={handleStateChange}
                                options={states}
                                placeholder="Select State"
                            />
                        </Form.Group>
                        <Form.Group controlId="citySelect">
                            <Form.Label>Select City</Form.Label>
                            <Select
                                value={selectedCity}
                                onChange={handleCityChange}
                                options={selectedState ? cities[selectedState.value].map(city => ({ value: city, label: city })) : []}
                                placeholder="Select City"
                                isDisabled={!selectedState}
                            />
                        </Form.Group>
                        <Form.Group controlId="taxRateInput">
                            <Form.Label>Tax Rate (%)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Tax Rate"
                                value={newRule.taxRate}
                                onChange={handleTaxRateChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="descriptionInput">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={newRule.description}
                                onChange={handleDescriptionChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose(false)}>Close</Button>
                    <Button variant="primary" onClick={updateTaxRule}>Add Tax Rule</Button>
                </Modal.Footer>
            </Modal>
            {/* Table to display tax rules */}
            <Table striped bordered hover className='table-responsive mx-4 w-100 mt-4'>
                <thead>
                    <tr className='bg-dark table-dark bg-blackbg-gradient'>
                        <th>State</th>
                        <th>City</th>
                        <th>Tax Rate (%)</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {taxRules.map(rule => (
                        <tr key={rule._id}>
                            <td>{rule.state}</td>
                            <td>{rule.city}</td>
                            <td>{rule.taxRate}</td>
                            <td>{rule.description}</td>
                            <td>
                                <Button variant="warning" className='mx-2'  onClick={() => handleShow(rule._id)}>Update</Button>
                                <Button variant="danger"  className='mx-2' onClick={() => deleteTaxRule(rule._id)}>Delete</Button>
                                {/* Add update functionality here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TaxRuleManagement;
