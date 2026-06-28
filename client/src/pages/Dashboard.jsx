// Main dashboard that combines stats, filters, and task listing.

import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import StatsBar from '../components/StatsBar';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import Pagination from '../components/Pagination';

function Dashboard() {
  const { fetchTasks, fetchStats, filters, pagination } = useTasks();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handlePageChange = (page) => {
    fetchTasks({ page });
  };

  return (
    <div className="dashboard">
      <StatsBar />
      <TaskFilters />
      <TaskList />
      {pagination.pages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Dashboard;
