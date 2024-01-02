import React, { useState, useEffect } from 'react';
import "../App.css";

const TaskForm = ({ onSubmit, taskToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name || '');
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate || '');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, dueDate });
    setName('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className=" card w-50 p-3 container mt-4 d-flex justify-content-center align-items-center">
      <div className="glassmorphism-border p-4 rounded">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Due Date:</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              {taskToEdit ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
