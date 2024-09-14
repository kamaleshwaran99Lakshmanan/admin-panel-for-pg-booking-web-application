import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaChartBar } from 'react-icons/fa';
function Dashboard() {
    return (
        <Container fluid>
            <div className="d-flex">
                <div className="dashboard w-100 align-left flex-grow-1 p-3">
                    <div className="main-content text-start flex-column w-100 p-4">
                        <div className='text-start w-100'>
                            <h1><b>Dashboard</b></h1>
                        </div>

                        <Row className="mb-4 w-100">
                            <Col md={3}>
                                <Card className="text-white bg-primary">
                                    <Card.Body>
                                        <Card.Title>Total Orders</Card.Title>
                                        <Card.Text>393</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="text-white bg-info">
                                    <Card.Body>
                                        <Card.Title>Total Sales</Card.Title>
                                        <Card.Text>99.5K</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="text-white bg-success">
                                    <Card.Body>
                                        <Card.Title>Total Customers</Card.Title>
                                        <Card.Text>871</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="text-white bg-secondary">
                                    <Card.Body>
                                        <Card.Title>People Online</Card.Title>
                                        <Card.Text>0</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row className='w-100'>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>World Map</Card.Header>
                                    <Card.Body>
                                        <div className="world-map-placeholder">
                                            <FaMapMarkerAlt size={150} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Header>Sales Analytics</Card.Header>
                                    <Card.Body>
                                        <div className="sales-chart-placeholder">
                                            <FaChartBar size={150} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div className="dashboard-table w-70 h-100 px-4 bg-light mx-auto">
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Dashboard;
