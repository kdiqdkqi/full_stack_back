const TasksService = require('./service')
const models = require('./../../models');
const {body,isISO8601, validationResult } = require('express-validator');

const Task = models.Task;
const User = models.User;
const tasksService = new TasksService({Task,User})

function createTask(req,res){
    const paramsValidation = [
        body('userId').notEmpty().withMessage('userId is required'),
        body('dueDate').notEmpty().withMessage('dueDate is required').isISO8601().withMessage('duedate must be a valid date')

    ];

    Promise.all(paramsValidation.map((validation)=> validation.run(req)))
    .then(async() => {
        const validationErr = validationResult(req);

        if (!validationErr.isEmpty()){
            return res.status(400).send ({
                error: validationErr.array()
            })
        }
        const response = await tasksService.createTask(req.body);

        return res.send(response)
    })
    .catch((_err)=>{
        return res.status(400).send({
            message: 'Something went wrong',
        });
    });
    

}

function updateTask(req,res){
    const paramsValidation = [
        param('_id').notEmpty().withMessage('_id is required'),
        body('userId').notEmpty().withMessage('userId is required'),
        body('dueDate').notEmpty().withMessage('dueDate is required').isISO8601().withMessage('duedate must be a valid date')

    ];

    Promise.all(paramsValidation.map((validation)=> validation.run(req)))
    .then(async() => {
        const validationErr = validationResult(req);

        if (!validationErr.isEmpty()){
            return res.status(400).send ({
                error: validationErr.array()
            })
        }
        const response = await tasksService.updateTask(req.param._id,req.body)

        return res.send(response)
    })
    .catch((_err)=>{
        return res.status(500).send({
            message: 'Something went wrong',
        });
    });
    

}

module.exports = {
    createTask,
    updateTask,
};