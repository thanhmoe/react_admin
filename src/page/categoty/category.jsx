import React, { useEffect, useState } from 'react';
import { fetchCategory, addCategory } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import './category.css'

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
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

    const handleEdit = (categoryId)=>{
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
    <div>
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

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {categories.length > 0 ?(
                categories.map((category)=>(
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                            <button onClick={()=> handleEdit(category.id)}> Edit</button>
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
  </div>
  );
}


  