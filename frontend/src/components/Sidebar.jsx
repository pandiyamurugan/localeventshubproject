import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import {
  FaTachometerAlt,
 
  FaSignOutAlt,
 
} from "react-icons/fa";

import {
  FiHome,
  FiBarChart2,
  FiBookmark,
  FiUser,
  FiSettings,
} from "react-icons/fi";

export default function Sidebar({ role = "user" }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

 
  const renderLink = (path, name, icon) => (
  <li className="nav-item mb-2 d-flex justify-content-center" key={name}>
    <Link
      to={path}
      className={`nav-link sidebar-link ${
        location.pathname === path ? "active" : "unactive"
      }`}
      style={{ color: "white" }}
    >
      <span className="icon">{icon}</span>
        <span className="tooltip-text">{name}</span>
      {/* {!collapsed && (
        <span className="ms-3">{name}</span>
      )} */}
    </Link>
  </li>
);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      
      <div className="text-end p-2">
        <p
  onClick={() => setCollapsed((prev) => !prev)} 
  className=""
>
  {/* <FaArrowLeft className={collapsed ? "rotate" : ""} /> */}
</p>
      </div>

      
      <ul className="nav flex-column px-2 mt-3 flex-grow-1">

        {role === "user" && (
          <>
            {renderLink("/dashboard", "Dashboard", <FiHome />)}
            {renderLink("/analytics", "Analytics", <FiBarChart2 />)}
            {renderLink("/bookmark", "Bookmark", <FiBookmark />)}
            {renderLink("/profile", "Profile", <FiUser />)}
            {renderLink("/settings", "Settings", <FiSettings />)}
          </>
        )}

        {role === "admin" && (
          <>
            {renderLink("/admin", "Admin Dashboard", <FaTachometerAlt />)}
           
          </>
        )}

      </ul>

      {/* Logout */}
      <div className="p-2">
        <button className="btn py-3 btn-dark w-100 d-flex align-items-center justify-content-center">
          <FaSignOutAlt />
          {/* {!collapsed && <span className="ms-2">Logout</span>} */}
        </button>
      </div>
    </div>
  );
}