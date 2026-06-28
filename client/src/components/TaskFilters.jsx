// Filter panel for searching, filtering, and sorting tasks.

import { useState, useEffect, useCallback } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel, HiOutlineXMark } from 'react-icons/hi2';
import { useTasks } from '../context/TaskContext';
import { useDebounce } from '../hooks/useDebounce';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS } from '../constants';

function TaskFilters() {
  const { filters, setFilters, resetFilters, fetchTasks } = useTasks();
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilters({ search: debouncedSearch });
    }
  }, [debouncedSearch]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters({ [key]: value });
  }, [setFilters]);

  const handleReset = () => {
    setSearchInput('');
    resetFilters();
  };

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="filters-section">
      <div className="filters-top">
        <div className="search-box">
          <HiOutlineMagnifyingGlass className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          {searchInput && (
            <button className="search-clear" onClick={() => setSearchInput('')}>
              <HiOutlineXMark size={16} />
            </button>
          )}
        </div>
        <button
          className={`btn btn-outline btn-sm ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <HiOutlineFunnel size={16} />
          Filters
        </button>
        {hasActiveFilters && (
          <button className="btn btn-ghost btn-sm" onClick={handleReset}>
            Clear all
          </button>
        )}
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {PRIORITY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Sort by</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="filter-select"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Order</label>
            <select
              value={filters.order}
              onChange={(e) => handleFilterChange('order', e.target.value)}
              className="filter-select"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskFilters;
