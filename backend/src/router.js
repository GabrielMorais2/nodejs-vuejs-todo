const express = require('express');
const router = express.Router();
const tasksController = require('./controllers/tasksController');
const taskMiddleware = require("./middlewares/taksMiddleware");

router.get('/tasks', tasksController.getAll);
router.post('/tasks', taskMiddleware.validateFieldTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',  taskMiddleware.validateFieldTitle, tasksController.updateTask);
router.put('/tasks/status/:id', taskMiddleware.validateFieldStatus, tasksController.updateStatusTask);



module.exports = router;