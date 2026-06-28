// Handles all task-related API requests.

const taskService = require('../services/taskService');

async function getAllTasks(req, res, next) {
  try {
    const result = await taskService.getTasks(req.query);
    res.json({ success: true, data: result.tasks, pagination: result.pagination });
  } catch (error) {
    next(error);
  }
}

async function getTask(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ success: true, data: task, message: 'Task created successfully' });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json({ success: true, data: task, message: 'Task updated successfully' });
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
}

async function getStats(req, res, next) {
  try {
    const stats = await taskService.getTaskStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask, getStats };
