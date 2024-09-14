import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Component/Login/Login';
import Dashboard from '../Component/Dashboard';
import { AuthProvider } from '../context/AuthContext';
import Vendor from '../Component/Vendor';
import ProtectedRoute from './ProtectedRoute';
import ManageProduct from '../Component/ManageProduct';
import ManageVendor from '../Component/ManageVendor';
import EditForm from '../Component/Forms/EditForm';
import Layout from '../Component/Layout/Layout'; // Import your Layout component

const RoutingApp = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/vendor" element={<Vendor />} />
              <Route path="/EditForm" element={<EditForm />} />
              <Route path="/manageProduct" element={<ManageProduct />} />
              <Route path="/manageVendor" element={<ManageVendor />} />
              </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default RoutingApp;
