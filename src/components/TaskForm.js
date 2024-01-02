import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ onSubmit, taskToEdit }) => {
  const initialValues = {
    name: taskToEdit ? taskToEdit.name || '' : '',
    description: taskToEdit ? taskToEdit.description || '' : '',
    dueDate: taskToEdit ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] || '' : '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Task Name is required'),
    description: Yup.string().required('Description is required'),
    dueDate: Yup.date().required('Due Date is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      showNotification(values.name, taskToEdit ? 'Task Updated' : 'Task Added');
    },
    enableReinitialize: true,
  });

  React.useEffect(() => {
    formik.setValues({
      name: taskToEdit ? taskToEdit.name || '' : '',
      description: taskToEdit ? taskToEdit.description || '' : '',
      dueDate: taskToEdit ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] || '' : '',
    });
  }, [taskToEdit]);

  const showNotification = (taskName, operation) => {
    toast.success(`${taskName}: ${operation}`, {
      position: 'top-right',
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
      <div className="card w-50 p-3 container mt-4 d-flex justify-content-center align-items-center">
        <div className="glassmorphism-border p-4 rounded">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Task Name:</label>
              <input
                type="text"
                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                value={formik.values.name}
                onChange={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.description && formik.errors.description ? 'is-invalid' : ''
                }`}
                value={formik.values.description}
                onChange={formik.handleChange('description')}
                onBlur={formik.handleBlur('description')}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="invalid-feedback">{formik.errors.description}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Due Date:</label>
              <input
                type="date"
                className={`form-control ${
                  formik.touched.dueDate && formik.errors.dueDate ? 'is-invalid' : ''
                }`}
                value={formik.values.dueDate}
                onChange={formik.handleChange('dueDate')}
                onBlur={formik.handleBlur('dueDate')}
              />
              {formik.touched.dueDate && formik.errors.dueDate && (
                <div className="invalid-feedback">{formik.errors.dueDate}</div>
              )}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                {taskToEdit ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
