// Displays task statistics overview.

import { useTasks } from '../context/TaskContext';
import { HiOutlineClock, HiOutlinePlay, HiOutlineCheck, HiOutlineClipboard } from 'react-icons/hi2';

function StatsBar() {
  const { stats } = useTasks();

  const items = [
    { label: 'Total', value: stats.total, icon: HiOutlineClipboard, color: 'stat-total' },
    { label: 'Pending', value: stats.pending, icon: HiOutlineClock, color: 'stat-pending' },
    { label: 'In Progress', value: stats['in-progress'], icon: HiOutlinePlay, color: 'stat-progress' },
    { label: 'Completed', value: stats.completed, icon: HiOutlineCheck, color: 'stat-completed' }
  ];

  return (
    <div className="stats-bar">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className={`stat-card ${color}`}>
          <div className="stat-icon">
            <Icon size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;
