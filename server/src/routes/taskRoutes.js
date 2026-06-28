// Defines REST endpoints for task operations.

const { Router } = require('express');
const controller = require('../controllers/taskController');
const { validate } = require('../middleware/validate');
const { createTaskRules, updateTaskRules, queryRules } = require('../validators/taskValidator');

const router = Router();

router.get('/stats', controller.getStats);

router
  .route('/')
  .get(validate(queryRules), controller.getAllTasks)
  .post(validate(createTaskRules), controller.createTask);

router
  .route('/:id')
  .get(controller.getTask)
  .put(validate(updateTaskRules), controller.updateTask)
  .delete(controller.deleteTask);

module.exports = router;
