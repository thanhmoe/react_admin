import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { MENU_ITEMS } from "../utils/constants";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside>
      {MENU_ITEMS.map((item, index) => (
        <ul
          className="list-aside"
          key={index}
          onClick={() => navigate(item.path)}
        >
          <li>{item.name}</li>
        </ul>
      ))}
    </aside>
  );
};

export default Sidebar;
