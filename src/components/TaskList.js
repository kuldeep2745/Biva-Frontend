import React, { useState } from 'react';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const [month, day, year] = new Date(dateString).toLocaleDateString(undefined, options).split('/');
    return `${day}/${month}/${year}`;
  };

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const renderTasks = currentTasks.map((task) => (
    <li key={task._id} className=" list mt-2 list-group-item">
      {task.name} - {formatDate(task.dueDate)}
      <button className="m-1 btn btn-primary ml-2" onClick={() => onEdit(task)}>
        Edit
      </button>
      <button className="btn btn-danger ml-2" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h2 className="mt-4">Task List</h2>
      <ul className="list-group">
        {renderTasks}
      </ul>
      <nav className="mt-3">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TaskList;
