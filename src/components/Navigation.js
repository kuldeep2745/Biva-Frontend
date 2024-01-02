import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navbar sticky-top bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/task-list' ? 'active' : ''}`}
              to="/"
            >
              Task List
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/chart' ? 'active' : ''}`}
              to="/chart"
            >
              Chart
            </Link>
          </li>
        </ul>

        <span className="navbar-brand mx-auto">Biva Task</span>

        <div className="ms-auto">
          <img
            src="https://res.cloudinary.com/dwd3qhggm/image/upload/f_auto,q_auto/xrjslp7mams4hpt2mmcn"
            alt="Profile"
            style={{ width: '60px', height: 'auto', borderRadius: '50%' }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
