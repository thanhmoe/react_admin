import React, { useState } from 'react'
import './login.css'
import { loginStaff } from '../../services/account_services'
import { useNavigate } from 'react-router-dom'
import { setUserData } from '../../utils/user_data_utils'
import { notify } from '../../utils/notify_utils'
import { NOTIFY_STATUS } from '../../utils/constants'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await loginStaff(user)
      if (response.success) {
        setUserData({
          token: response.data.auth_token,
          role: response.data.role
        })
        navigate('/')
      } else {
        notify(NOTIFY_STATUS.error, response.data.message)
      }
    } catch (error) {
      notify(NOTIFY_STATUS.error, "Error!, login failed!")
    }
  }

  const handleInputChange = (type, value) => {
    setUser({
      ...user,
      [type]: value
    })
  }



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={user.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </div>
        <button className='btn-login' type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
