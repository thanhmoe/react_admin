import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCategory, addCategory } from '../../services/category_services';
import './category.css';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategory();
        if (data.success && data.data) {
          const thisCategory = data.data.find(item => item.id === parseInt(categoryId));
          setCategory(thisCategory);
        } else {
          setError(data.message || 'Failed to fetch category');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
        setError('Đã xảy ra lỗi khi lấy dữ liệu category. Vui lòng thử lại sau.');
      }
    };

    fetchData();
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await updateCategory(categoryId, category);
      if (response.success) {
        alert('Category updated successfully');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="category-detail-container">
      <h2>Edit Category</h2>
      <form className="category-detail-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className='category-name-input'
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className='textarea-category-input'
            id="description"
            name="description"
            value={category.description}
            onChange={handleChange}
          />
        </div>
        <button className='btn-save' onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default CategoryDetail;
