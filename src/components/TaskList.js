import React from 'react';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2 className="mt-4">Task List</h2>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className=" list mt-2 list-group-item">
            {task.name} - {formatDate(task.dueDate)}
            <button className="btn btn-primary ml-2" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button className="btn btn-danger ml-2" onClick={() => onDelete(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
