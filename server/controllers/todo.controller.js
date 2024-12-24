const Todo = require('../models/todo.models');
const User = require('../models/user.models');

module.exports.addTodo = async(req,res,next) =>{
    const {title,description,sendAt} = req.body;
    
    const user = await User.findById(req.user._id);
    const newTodo = await Todo.create({title,description,sendAt,createdBy: req.user._id,sendTo: user.email});
    
    user.tasks.push(newTodo._id);
    await user.save();
    

    res.json({newTodo});
}

module.exports.getTodo = async(req,res,next)=>{
    try {
        const userId = req.user._id
        const user = await User.findById(userId).populate('tasks');
        
        return res.status(200).json({user});
    } catch (error) {
        console.log('error');   
    }
}

module.exports.deleteTodo = async(req,res)=>{
    try {
        const deletedTask = await Todo.deleteOne({_id:req.query._id});

        if(deletedTask){
            res.status(200).json({deletedTask});
            alert('Task deleted');
        } else {
            alert('something went wrong');
        }
    } catch (error) {
        console.log('Error ',error.message);
    }
}