import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const Downloads = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/form/downloads');
            setEntries(response.data);
        } catch (error) {
            console.error("Error fetching form data:", error);
        }
    };

    return (
        <div className="p-4">
            <h3 className="mb-4">Download Submissions</h3>
            <Row xs={1} md={2} lg={3} className="g-4">
                {entries.map((entry, index) => (
                    <Col key={index}>
                        <Card className="border-0 shadow-sm">
                            <Card.Body>
                                <Card.Title>{entry.fullName}</Card.Title>
                                <Card.Text>
                                    <strong>DOB:</strong> {entry.dob || 'Not Provided'}<br />
                                    <strong>Phone:</strong> {entry.phone || 'Not Provided'}<br />
                                    <strong>Email:</strong> {entry.email || 'Not Provided'}<br />
                                    <strong>District:</strong> {entry.district || 'Not Provided'}<br />
                                    <strong>Panchayat:</strong> {entry.panchayat || 'Not Provided'}
                                </Card.Text>
                                {entry.image && (
                                    <Card.Img variant="top" src={`http://localhost:3000${form.imageUrl}`} />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Downloads;
