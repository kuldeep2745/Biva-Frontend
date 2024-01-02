import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleDelete = (taskId) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        setEditingTask(null);
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleAdd = (newTask) => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((addedTask) => {
        setTasks((prevTasks) => [...prevTasks, addedTask]);
      })
      .catch((error) => console.error('Error creating task:', error));
  };

  const handleEditSubmit = (editedTask) => {
    fetch(`http://localhost:5000/api/tasks/${editingTask._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedTask),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
        setEditingTask(null); 
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  return (
    <div>
      <TaskForm onSubmit={editingTask ? handleEditSubmit : handleAdd} taskToEdit={editingTask} />
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default TaskListPage;
