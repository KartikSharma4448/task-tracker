// Individual task card component with actions.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineCalendar } from 'react-icons/hi2';
import { useTasks } from '../context/TaskContext';
import { formatRelativeDate, truncateText } from '../utils/helpers';
import { STATUS_COLORS, PRIORITY_COLORS } from '../constants';
import ConfirmModal from './ui/ConfirmModal';
import StatusBadge from './ui/StatusBadge';

function TaskCard({ task }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { removeTask } = useTasks();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await removeTask(task._id);
    setShowConfirm(false);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <>
      <article className="task-card">
        <div className="task-card-header">
          <StatusBadge status={task.status} />
          <span
            className="priority-dot"
            style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
            title={task.priority}
          />
        </div>

        <h3 className="task-card-title">{task.title}</h3>

        {task.description && (
          <p className="task-card-desc">{truncateText(task.description, 100)}</p>
        )}

        <div className="task-card-footer">
          <div className="task-card-meta">
            {task.dueDate && (
              <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>
                <HiOutlineCalendar size={14} />
                {formatRelativeDate(task.dueDate)}
              </span>
            )}
          </div>
          <div className="task-card-actions">
            <button
              className="btn btn-icon btn-sm"
              onClick={() => navigate(`/tasks/${task._id}/edit`)}
              aria-label="Edit task"
            >
              <HiOutlinePencil size={16} />
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger"
              onClick={() => setShowConfirm(true)}
              aria-label="Delete task"
            >
              <HiOutlineTrash size={16} />
            </button>
          </div>
        </div>
      </article>

      <ConfirmModal
        open={showConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

export default TaskCard;
