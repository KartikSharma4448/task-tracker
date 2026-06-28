// Empty state placeholder for when no data is available.

import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <HiOutlineClipboardDocumentList className="empty-icon" />
      <h3 className="empty-title">{title}</h3>
      <p className="empty-desc">{description}</p>
    </div>
  );
}

export default EmptyState;
