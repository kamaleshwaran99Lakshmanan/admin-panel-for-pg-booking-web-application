import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth(); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect if already authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        login();
        navigate('/'); // Redirect to the dashboard
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Row className="shadow-lg p-2 bg-white rounded-4" style={{ width: '60%', border: "50px solid #B780CD" }}>
        <Col md={6} className="d-none me-3 d-md-block shadow">
          <div className="img"></div>
        </Col>
        <Col md={5} className="pt-5 pb-5 ps-3 shadow-start d-flex flex-column">
          <h2 className="mb-4 text-decoration-overline" id="overline">Login as Admin</h2>
          <Form className='w-100' onSubmit={handleLogin}>
            {error && <p className="text-danger">{error}</p>}
            <Form.Group controlId="formEmail" className="w-100 mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                className='p-2 ps-3 rounded-5'
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className='p-2 ps-3 rounded-5'
                type="password"
                placeholder="Enter 6 characters or more"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" id="login-btn" type="submit" className="w-100 mb-3 rounded-5">
              <b>Login</b>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
