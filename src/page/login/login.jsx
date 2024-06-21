import React, { useState } from 'react';
import './login.css';
import { loginStaff } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginStaff(user);
      // Xử lý kết quả trả về từ API
      if (response.success) {
        // Đăng nhập thành công, chuyển hướng đến trang chính
        navigate('/'); // Chuyển hướng đến trang chính của ứng dụng
      } else {
        // Đăng nhập thất bại, hiển thị thông báo lỗi
        setError(response.message);
      }
    } catch (error) {
      // Xử lý lỗi từ phía client hoặc server
      console.error('Login error:', error);
      setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
    }
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const { username, password } = user;

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
