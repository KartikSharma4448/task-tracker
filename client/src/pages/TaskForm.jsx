// Form page for creating and editing tasks.

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { fetchTaskById } from '../services/taskApi';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../constants';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTask, editTask } = useTasks();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function loadTask() {
      try {
        const task = await fetchTaskById(id);
        if (cancelled) return;
        setFormData({
          title: task.title,
          description: task.description || '',
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ''
        });
      } catch (err) {
        toast.error('Failed to load task');
        navigate('/');
      } finally {
        if (!cancelled) setFetching(false);
      }
    }

    loadTask();
    return () => { cancelled = true; };
  }, [id, navigate]);

  function validate() {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }
    if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = { ...formData };
      if (!payload.dueDate) payload.dueDate = null;

      if (isEditing) {
        await editTask(id, payload);
      } else {
        await addTask(payload);
      }
      navigate('/');
    } catch (err) {
      if (err.errors?.length) {
        const fieldErrors = {};
        err.errors.forEach(e => { fieldErrors[e.field] = e.message; });
        setErrors(fieldErrors);
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  if (fetching) {
    return (
      <div className="form-loading">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <h1 className="form-title">{isEditing ? 'Edit Task' : 'Create Task'}</h1>
        <p className="form-subtitle">
          {isEditing ? 'Update the details below' : 'Fill in the details to create a new task'}
        </p>
      </div>

      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="title" className="form-label">
            Title <span className="required">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'input-error' : ''}`}
            placeholder="What needs to be done?"
            autoFocus
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
            placeholder="Add more details (optional)"
            rows={4}
          />
          <span className="char-count">{formData.description.length}/500</span>
          {errors.description && <span className="field-error">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-input"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-input"
            >
              {PRIORITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
