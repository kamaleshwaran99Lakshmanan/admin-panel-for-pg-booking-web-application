import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaChartBar, FaBars, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SideMenu() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => setIsCollapsed(prevState => !prevState);

    return (
        <>
            {/* Sidebar */}
            <div className={`side-menu ${isCollapsed ? 'collapsed' : ''} w-100 h-100 shadow pt-2 pb-5 bg-light`}>
                <Button 
                    onClick={toggleCollapse} 
                    className="mb-3 w-100 d-flex bg-light align-items-center">
                    <FaBars className="text-dark mx-auto" />
                   {!isCollapsed && <div className='mt-1 me-3'><h5><b>Navigation</b></h5>
                    </div>}
                </Button>
                {!isCollapsed ? (
                    <Accordion defaultActiveKey="0">
                            <button><Link to="/"><FaChartBar /> Dashboard</Link></button>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header><FaUsers className='me-2' /> Vendor</Accordion.Header>
                            <Accordion.Body className='p-0'>
                                <Link className="link d-block px-3 py-2" to="/vendor">Add Vendor</Link>
                                <Link className="link d-block px-3 py-2" to="/ManageVendor">Manage Vendor</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header><FaShoppingCart className='me-2' />Property</Accordion.Header>
                            <Accordion.Body className='p-0'>
                                <Link className="link d-block px-3 py-2" to="/AddProduct">Add Product</Link>
                                <Link className="link d-block px-3 py-2" to="/ManageProduct">Manage Product</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header><FaUser className='me-2' /> User</Accordion.Header>
                            <Accordion.Body className='p-0'>
                                <Link className="link d-block px-3 py-2" to="/AddUser">Add User</Link>
                                <Link className="link d-block px-3 py-2" to="/ManageUser">Manage User</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header><FaMapMarkerAlt className='me-2' /> Bookings</Accordion.Header>
                            <Accordion.Body className='p-0'>
                                <Link className="link d-block px-3 py-2" to="/AddBooking">Add Booking</Link>
                                <Link className="link d-block px-3 py-2" to="/ManageBooking">Manage Booking</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header><FaShoppingCart className='me-2' />Payment</Accordion.Header>
                            <Accordion.Body className='p-0'>
                                <Link className="link d-block px-3 py-2" to="/AddPayment">Add Payment</Link>
                                <Link className="link d-block px-3 py-2" to="/ManagePayment">Manage Payment</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ) : (
                    // Collapsed view icons
                    <div className="icons-only text-center">
                        <FaChartBar className="my-2" /><br />
                        <FaUsers className="my-2" /><br />
                        <FaShoppingCart className="my-2" /><br />
                    </div>
                )}
            </div>
        </>
    );
}
