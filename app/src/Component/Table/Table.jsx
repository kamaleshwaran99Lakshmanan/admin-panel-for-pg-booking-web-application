import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Table() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/VendorData');
        if (!response.ok) {
          setData('No data found');
        } else {
          const res = await response.json();
          setData(res);
        }
      } catch (err) {
        console.log('Network error', err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (vendorId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/VendorData/${vendorId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          alert('Failed to delete vendor');
        } else {
          setData(data.filter((vendor) => vendor._id !== vendorId));
          alert('Vendor deleted successfully');
        }
      } catch (err) {
        alert('Network error');
        console.log('Network error', err);
      }
    }
  };

  const handleEditClick = (vendor) => {
    navigate('/EditForm', { state: { vendor } });
  };

  const handleCheck = (vendorId) => {
    let updatedSelectedItems = [...selectedItems];
    if (updatedSelectedItems.includes(vendorId)) {
      updatedSelectedItems = updatedSelectedItems.filter((id) => id !== vendorId);
    } else {
      updatedSelectedItems.push(vendorId);
    }
    setSelectedItems(updatedSelectedItems);
    setSelectAll(updatedSelectedItems.length === data.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((vendor) => vendor._id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete all selected vendors?');
    if (confirmDelete) {
      try {
        await Promise.all(selectedItems.map(async (vendorId) => {
          const response = await fetch(`http://localhost:3000/VendorData/${vendorId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            alert('Failed to delete vendor');
          }
        }));

        setData(data.filter((vendor) => !selectedItems.includes(vendor._id)));
        setSelectedItems([]);
        setSelectAll(false);
        alert('Selected vendors deleted successfully');
      } catch (err) {
        alert('Network error');
        console.log('Network error', err);
      }
    }
  };

  // Filter and sort data
  const filteredData = data
    .filter((vendor) => vendor.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

  // Calculate the data to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Pagination Numbers
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  // Handle page change
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <div className="ps-1 pt-3 w-100">
            <h4 className="w-100 pt-1 d-flex flex-column">
              <div className="custom-overline"></div>
              <b>Vendor List</b>
            </h4>
            <p className="text-secondary w-100">Vendor list is displayed below table</p>
          </div>
          <div className="row w-100 justify-content-end">
            <div className="col-md-12 d-flex flex-row col-sm-12 pt-3">
            <button
            className="btn btn-danger rounded-5 mt-1 me-2 w-50"
            onClick={handleDeleteSelected}
            disabled={selectedItems.length === 0}
          >
            Delete Selected
          </button>
              <div className="input-group mb-4 rounded-5">
                <input
                  type="text"
                  className="form-control rounded-5 ps-4"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <img width="48" height="48" src="https://img.icons8.com/color/48/ms-excel.png" alt="ms-excel" />
              <img width="48" height="48" src="https://img.icons8.com/color/48/pdf.png" alt="pdf" />
            </div>
          </div>
        </div>

        {/* Add the button for deleting selected items */}
        <div className="d-flex justify-content-end align-items-center mb-3">         
          <div className="d-flex justify-content-end">
            <select
              name="pages"
              id="pages"
              className="p-2 text-secondary"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5"><b>5 per page</b></option>
              <option value="10"><b>10 per page</b></option>
              <option value="15"><b>15 per page</b></option>
              <option value="20"><b>20 per page</b></option>
            </select>
            <p className="my-auto text-center ms-2"><b>.</b> {startIndex + 1} - {startIndex + currentPageData.length}</p>
            <div className="d-flex justify-content-center align-items-center ms-1">
              <img
                width="20"
                height="20"
                className='mx-1'
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                src="https://img.icons8.com/ios-filled/50/back.png"
                alt="back"
              />
              <img
                width="20"
                height="20"
                className='mx-1'
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                src="https://img.icons8.com/ios-filled/50/forward--v1.png"
                alt="forward--v1"
              />
            </div>
          </div>
        </div>

        {/* Table wrapper with table-responsive */}
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th className="text-center">
                  <input
                    type="checkbox"
                    className="cb"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Contact Info</th>
                <th>Property Name</th>
                <th>Location</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((vendor) => (
                <tr key={vendor._id} className="text-secondary">
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="cb"
                      checked={selectedItems.includes(vendor._id)}
                      onChange={() => handleCheck(vendor._id)}
                    />
                  </td>
                  <td className={selectedItems.includes(vendor._id) ? "red-text" : ""}>
                    {vendor.name}
                  </td>
                  <td className={selectedItems.includes(vendor._id) ? "red-text" : ""}>
                    {vendor.contactInfo}
                  </td>
                  <td className={selectedItems.includes(vendor._id) ? "red-text" : ""}>
                    {vendor.propertyName}
                  </td>
                  <td className={selectedItems.includes(vendor._id) ? "red-text" : ""}>
                    {vendor.location}
                  </td>
                  <td className="action d-flex justify-content-center">
                    <i
                      className="bi bi-pencil-square text-success me-2"
                      role="button"
                      onClick={() => handleEditClick(vendor)}
                    ></i>
                    <i
                      className="bi bi-trash text-danger"
                      role="button"
                      onClick={() => handleDelete(vendor._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  onClick={goToPreviousPage}
                  className="page-link"
                  aria-label="Previous"
                >
                  &laquo;
                </button>
              </li>
              {pageNumbers.map((pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                >
                  <button
                    onClick={() => setCurrentPage(pageNumber)}
                    className="page-link" style={{backgroundColor:'#d5b6ec',color:'white',border:'none'}}
                  >
                    {pageNumber}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  onClick={goToNextPage}
                  className="page-link"
                  aria-label="Next"
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
