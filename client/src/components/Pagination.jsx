// Pagination controls for navigating task pages.

import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = generatePageNumbers(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="btn btn-icon btn-sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <HiOutlineChevronLeft size={18} />
      </button>

      <div className="pagination-numbers">
        {pages.map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={page}
              className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className="btn btn-icon btn-sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <HiOutlineChevronRight size={18} />
      </button>
    </nav>
  );
}

function generatePageNumbers(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [1];
  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}

export default Pagination;
