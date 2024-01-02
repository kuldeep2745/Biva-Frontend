import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ".././App.css";

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString(undefined, options)
      .split("/");
    return `${day}/${month}/${year}`;
  };

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const showNotification = (taskName, operation) => {
    toast.info(`${operation}: ${taskName}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showNotifications = (taskName, operation) => {
    toast.error(`${taskName}: ${operation}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="mt-4">Task List Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Task Name</th>
            <th scope="col">Task Description</th>
            <th scope="col">Task Due Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task._id}>
              <td
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {task.name}
              </td>
              <td
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {task.description}
              </td>
              <td>{formatDate(task.dueDate)}</td>
              <td>
                <button
                  className="m-1 btn btn-primary"
                  onClick={() => {
                    onEdit(task);
                    showNotification(task.name, "Editing Task");
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => {
                    onDelete(task._id);
                    showNotifications(task.name, "Task Deleted");
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="mt-3">
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(tasks.length / itemsPerPage) },
            (_, i) => i + 1
          ).map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
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
