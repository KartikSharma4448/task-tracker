// Status badge with colored indicator.

import { STATUS_COLORS } from '../../constants';

const LABELS = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed'
};

function StatusBadge({ status }) {
  return (
    <span className="status-badge" style={{ '--badge-color': STATUS_COLORS[status] }}>
      <span className="status-dot" />
      {LABELS[status] || status}
    </span>
  );
}

export default StatusBadge;
