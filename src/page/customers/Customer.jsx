import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchCustomers } from '../../services/customer_services';

import './customer.css';
import { Button, Pagination } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import CustomerModal from './component/CustomerModal';

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const navigate = useNavigate();

  // Calculate current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

  const handleView = (customerId) => {
    const customer = customers.find(customer => customer.id === customerId);
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCustomers();
        if (data.success && data.data) {
          setCustomers(data.data); // Update customer list from API
        } else {
          setError(data.message || 'Failed to fetch customers');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('An error occurred while fetching customer data. Please try again later.');
        // setError(data.message);
      }
    };

    fetchData(); // Fetch data on initial component load
  }, []);


  return (
    <div className="customer-container">
      <h2>Customer List</h2>
      {error && <div className="error-message">{error}</div>}
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Is Active</th>
            <th>Create At</th>
            <th>Modify At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.email}</td>
                <td>{customer.gender}</td>
                <td>{new Date(customer.dob).toLocaleDateString()}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.is_active ? 'Yes' : 'No'}</td>
                <td>{new Date(customer.create_at).toLocaleDateString()}</td>
                <td>{new Date(customer.modify_at).toLocaleDateString()}</td>
                <td>
                  <Button type='primary' ghost onClick={() => handleView(customer.id)}>View</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        defaultCurrent={currentPage}
        total={customers.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        className="pagination"
      />
      <CustomerModal
        open={modalOpen}
        onClose={handleCloseModal}
        customer={selectedCustomer}
      />
    </div>
  );
}
