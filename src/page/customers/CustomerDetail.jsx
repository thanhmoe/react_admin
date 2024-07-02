import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCustomers } from '../../services/customer_services';

const CustomerDetail = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCustomers();
        if (data.success && data.data) {
          const thisCustomer = data.data.find(item => item.id === parseInt(customerId));
          setCustomer(thisCustomer);
        } else {
          setError(data.message || 'Failed to fetch customers');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Đã xảy ra lỗi khi lấy dữ liệu khách hàng. Vui lòng thử lại sau.');
      }
    };

    fetchData();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));

    // Check form validity
    validateForm({ ...customer, [name]: value });
  };

  const validateForm = (updatedCustomer) => {
    const { email, gender, dob, phone_number } = updatedCustomer;
    const isValid =
      email &&
      gender &&
      dob &&
      phone_number &&
      email.trim() !== '' &&
      gender.trim() !== '' &&
      dob.trim() !== '' &&
      phone_number.trim() !== '';
    setIsFormValid(isValid);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('Please fill in all fields correctly.');
      return;
    }

    try {
      const response = await updateCustomer(customerId, customer);
      if (response.success) {
        alert('Customer updated successfully');
      } else {
        alert('Failed to update customer');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Đã xảy ra lỗi khi cập nhật dữ liệu khách hàng. Vui lòng thử lại sau.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-detail-container">
      <h2>Edit Customer</h2>
      <form className="customer-detail-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={customer.gender}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={new Date(customer.dob).toISOString().split('T')[0]}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={customer.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="is_active">Is Active</label>
          <select
            id="is_active"
            name="is_active"
            value={customer.is_active}
            onChange={handleChange}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>
        <button className='btn-save' onClick={handleSave} disabled={!isFormValid}>
          Save
        </button>
      </form>
    </div>
  );
};

export default CustomerDetail;
