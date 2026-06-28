// Validation rules for task-related endpoints.

const { body, query } = require('express-validator');

const STATUSES = ['pending', 'in-progress', 'completed'];
const PRIORITIES = ['low', 'medium', 'high'];
const SORT_FIELDS = ['createdAt', 'dueDate', 'priority', 'title'];

const createTaskRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(STATUSES).withMessage(`Status must be one of: ${STATUSES.join(', ')}`),
  body('priority')
    .optional()
    .isIn(PRIORITIES).withMessage(`Priority must be one of: ${PRIORITIES.join(', ')}`),
  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601().withMessage('Due date must be a valid date')
];

const updateTaskRules = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(STATUSES).withMessage(`Status must be one of: ${STATUSES.join(', ')}`),
  body('priority')
    .optional()
    .isIn(PRIORITIES).withMessage(`Priority must be one of: ${PRIORITIES.join(', ')}`),
  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601().withMessage('Due date must be a valid date')
];

const queryRules = [
  query('status')
    .optional()
    .isIn(STATUSES).withMessage(`Invalid status filter`),
  query('priority')
    .optional()
    .isIn(PRIORITIES).withMessage(`Invalid priority filter`),
  query('sortBy')
    .optional()
    .isIn(SORT_FIELDS).withMessage(`Sort must be one of: ${SORT_FIELDS.join(', ')}`),
  query('order')
    .optional()
    .isIn(['asc', 'desc']).withMessage('Order must be asc or desc'),
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
];

module.exports = { createTaskRules, updateTaskRules, queryRules };
