import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
import { MENUITEMS } from '../constant';
const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <aside> 
      {MENUITEMS.map((item, index) => (
          <ul className='list-aside' key={index} onClick={() => navigate(item.path)}>
           <li>{(item.name)}</li> 
          </ul>
        ))}
    </aside>
  )
};

export default Sidebar;
