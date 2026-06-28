// Task state management with context API.

import { createContext, useContext, useReducer, useCallback } from 'react';
import * as taskApi from '../services/taskApi';
import toast from 'react-hot-toast';

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  stats: { pending: 0, 'in-progress': 0, completed: 0, total: 0 },
  pagination: { page: 1, limit: 12, total: 0, pages: 0 },
  filters: { status: '', priority: '', search: '', sortBy: 'createdAt', order: 'desc' },
  loading: false,
  error: null
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
        pagination: action.payload.pagination,
        loading: false
      };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const queryParams = { ...state.filters, ...params };
      Object.keys(queryParams).forEach(key => {
        if (!queryParams[key]) delete queryParams[key];
      });
      const response = await taskApi.fetchTasks(queryParams);
      dispatch({ type: 'SET_TASKS', payload: response });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      toast.error('Failed to load tasks');
    }
  }, [state.filters]);

  const fetchStats = useCallback(async () => {
    try {
      const stats = await taskApi.fetchStats();
      dispatch({ type: 'SET_STATS', payload: stats });
    } catch {
      // Stats failure is non-critical
    }
  }, []);

  const addTask = async (data) => {
    const task = await taskApi.createTask(data);
    toast.success('Task created');
    await fetchTasks();
    await fetchStats();
    return task;
  };

  const editTask = async (id, data) => {
    const task = await taskApi.updateTask(id, data);
    toast.success('Task updated');
    await fetchTasks();
    await fetchStats();
    return task;
  };

  const removeTask = async (id) => {
    await taskApi.deleteTask(id);
    toast.success('Task deleted');
    await fetchTasks();
    await fetchStats();
  };

  const setFilters = (newFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const value = {
    ...state,
    fetchTasks,
    fetchStats,
    addTask,
    editTask,
    removeTask,
    setFilters,
    resetFilters
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
}
