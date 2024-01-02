import React, { useState, useEffect } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Due Date:
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>
      <button type="submit">{taskToEdit ? 'Update' : 'Submit'}</button>
    </form>
  );
};

export default TaskForm;
