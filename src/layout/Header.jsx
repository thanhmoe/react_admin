import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
import { Dropdown,Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';



const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('auth_token')

  const items = [
    {
      label: <a onClick={() => handleSignOut()}>Sign Out</a>,
      key: '1',
    },
  ];

  function handleSignOut() {
    localStorage.removeItem('auth_token')
    navigate('/login');
  }


  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])


  return (
    <header>
      <div>
      <h1>Header</h1>
      </div>
      <div>
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
