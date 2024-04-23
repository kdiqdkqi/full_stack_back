const express = require('express');
const tasksController = require('./controller')
const router = express.Router();

router.post('/tasks',tasksController.createTask)
 
module.exports = router;