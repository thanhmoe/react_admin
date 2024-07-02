import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOutStaff } from '../services/account_services';
import { getToken, clearToken } from '../utils/token_utils';
import './index.css';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { notify } from '../main';



const Header = () => {
  const navigate = useNavigate();
  const token = getToken();

  const items = [
    {
      label: <a onClick={() => handleSignOut()}>Sign Out</a>,
      key: '1',
    },
  ];

  const handleSignOut = () => {
    clearToken();
    navigate('/login');
    notify('success', 'You have been log out!');
  };


  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);


  return (
    <header>
      <div>
        <h1 className='label-header' onClick={() => navigate('/')}>Admin</h1>
      </div>
      <div className='admin-profile'>
        <Dropdown
          menu={{ items }}
          trigger={['click']} >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              admin
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
