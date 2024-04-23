class TasksService {
    constructor({ Task,User }) {
        this.Task = Task;
        this.User = User;
    }

    async createTask(taskData){
        const {userId} = taskData;
        const _user = await this.User.findByIdAndUpdate(userId);

        if (!_user){
            return {
                error: 'User Not Found',
            };
        }

        const _task = await this.Task.create(taskData);

        _user.taks.push(_task)
        await _user.save();

        // await this.User.updateOne({_id: userId},{$push:{tasks: _task._id}})
    }

    async updateTask(taskId,taskData){
        const {userId} = taskData;
        const _user = await this.User.findByIdAndUpdate(userId);

        if (!_user){
            return {
                error: 'User Not Found',
            };
        }

        const _task = await this.Task.findByIdAndUpdate(taskId,taskData,{new: true})

        if (_task){
            return{
                message: 'Task updated successfully',
                task: _task,
            };
        }

        return{
            error: 'Task not found'
        };

    }

    async deleteTask(taskId){
        

        const _task = await this.Task.findByIdAndUpdate(taskid)

        if(_task){
            const _user = await this.User.findOne({tasks: taskId});

            if (_user){
                _user.tasks.pull(taskId);
            }
            

            return {
                message: 'Task deleted successfully'
            };
        }

        return {
            message: 'Task not found'
        }

        
    }
}
 
module.exports = TasksService;