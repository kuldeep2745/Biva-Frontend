import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/task-list">Task List</Link>
        </li>
        <li>
          <Link to="/chart">Chart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
