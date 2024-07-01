import React, { useEffect, useState } from 'react';
import { fetchCategory, addCategory } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import './category.css'

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategory();
        if (data.success && data.data) {
          setCategories(data.data);
        } else {
          setError(data.message || 'Failed to fetch categoies');
        }
      } catch (error) {
        console.error('Error fetching categoies:', error);
      }
    };
    fetchData(); // Fetch data on initial component load
  }, []);

  // Calculate current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (categoryId) => {
    navigate(`/category/${categoryId}`)
  }

  const handleAddCategory = async () => {
    try {
      const result = await addCategory(formData);
      if (result.success) {
        setShowForm(false); // Đóng form sau khi thêm thành công
        setFormData({ name: '', description: '' }); // Đặt lại dữ liệu trong form
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Add category error:', error);
    }
  };


  return (
    <div className='category-container'>
      <h2>Category List</h2>
      <button className="add-button" onClick={() => setShowForm(true)}>
        Add Category
      </button>
      {showForm && (
        <div className="form-container">
          <h3>Add New Category</h3>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
          <button onClick={handleAddCategory}>Add</button>
        </div>
      )}
      <table className='category-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            currentItems.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button className='btn-edit' onClick={() => handleEdit(category.id)}><EditOutlined /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        defaultCurrent={currentPage}
        total={categories.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        className="pagination"
      />
    </div>
  );
}


