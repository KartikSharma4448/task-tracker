// Renders the list of tasks with loading and empty states.

import { useTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';
import Spinner from './ui/Spinner';
import EmptyState from './ui/EmptyState';

function TaskList() {
  const { tasks, loading, filters } = useTasks();

  if (loading) {
    return (
      <div className="task-list-loading">
        <Spinner />
      </div>
    );
  }

  if (tasks.length === 0) {
    const hasFilters = filters.search || filters.status || filters.priority;
    return (
      <EmptyState
        title={hasFilters ? 'No matching tasks' : 'No tasks yet'}
        description={
          hasFilters
            ? 'Try adjusting your filters or search query'
            : 'Create your first task to get started'
        }
      />
    );
  }

  return (
    <div className="task-grid">
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
