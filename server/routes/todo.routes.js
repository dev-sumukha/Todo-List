const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/auth.middleware');

const todoController = require('../controllers/todo.controller');

router.post('/addTodo',authMiddleware,todoController.addTodo);
router.get('/getTodo',authMiddleware,todoController.getTodo);
router.delete('/deleteTodo',authMiddleware,todoController.deleteTodo);

module.exports = router;