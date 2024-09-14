import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    propertyName: '',
    location: '',
  });

  // Extract vendor data from location state
  const vendor = location.state?.vendor;

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name,
        contactInfo: vendor.contactInfo,
        propertyName: vendor.propertyName,
        location: vendor.location,
      });
    }
  }, [vendor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/VendorData/${vendor._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert('Failed to update vendor');
      } else {
        const updatedVendor = await response.json();
        // Handle the update logic here, if necessary
        alert('Vendor updated successfully');
        navigate('/manageVendor'); // Navigate back to the table or other route
      }
    } catch (err) {
      alert('Network error');
      console.log('Network error', err);
    }
  };

  if (!vendor) {
    return <div>No vendor data available</div>;
  }

  return (
    <div className='edit-form mx-auto h-100'>
      <div className="module-header rounded-2 d-flex w-100 px-3 pt-3"><h3><b>Vendor Module</b></h3><div className='py-1 ps-1 text-secondary'><p>. Update vendor</p></div></div>
      <form  onSubmit={handleSubmit} className="w-100 justify-content-center h-80  px-4 rounded-2 font-size-xl font-weight-bold">
       <div className="w-100">
       <div className="w-100 mb-5"><h4><b>Update vendor</b></h4>
       <p>use the form below to update the vendor</p>
       </div>
        <div className="d-flex flex-row">
        <div className='col d-flex flex-column me-4'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            autoFocus="on"
          />
          <label>Contact Info</label>
          <input
            type='text'
            name='contactInfo'
            value={formData.contactInfo}
            onChange={handleInputChange}
          />
        </div>
        <div className='col d-flex flex-column mx-2 ms-4'>
          <label>Property Name</label>
          <input
            type='text'
            name='propertyName'
            value={formData.propertyName}
            onChange={handleInputChange}
          />
          <label>Location</label>
          <input
            type='text'
            name='location'
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        </div>
        <br />
        <div className="submit me-5 w-100 d-flex justify-content-end">
        <button type='submit' className='btn me-2 btn rounded-5'>Save</button>
        <button type='button' className='submit btn rounded-5 bg-danger' onClick={() => navigate('/manageVendor')}>Cancel</button>
        </div>
        </div>
      </form>
    </div>
  );
}
