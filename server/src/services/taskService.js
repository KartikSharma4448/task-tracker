// Business logic layer for task operations.

const Task = require('../models/Task');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

async function getTasks(filters = {}) {
  const { status, priority, search, sortBy, order, page, limit } = filters;

  const query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const currentPage = parseInt(page) || DEFAULT_PAGE;
  const perPage = parseInt(limit) || DEFAULT_LIMIT;
  const skip = (currentPage - 1) * perPage;

  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;
  } else {
    sortOptions.createdAt = -1;
  }

  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sortOptions).skip(skip).limit(perPage).lean(),
    Task.countDocuments(query)
  ]);

  return {
    tasks,
    pagination: {
      page: currentPage,
      limit: perPage,
      total,
      pages: Math.ceil(total / perPage)
    }
  };
}

async function getTaskById(id) {
  const task = await Task.findById(id);
  if (!task) {
    const err = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }
  return task;
}

async function createTask(data) {
  const task = await Task.create(data);
  return task;
}

async function updateTask(id, data) {
  const task = await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!task) {
    const err = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }
  return task;
}

async function deleteTask(id) {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    const err = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }
  return task;
}

async function getTaskStats() {
  const stats = await Task.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const result = { pending: 0, 'in-progress': 0, completed: 0, total: 0 };
  stats.forEach(s => {
    result[s._id] = s.count;
    result.total += s.count;
  });

  return result;
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, getTaskStats };
