const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        sendTo:{
            type: String,
        },
        sendAt:{
            type: Date
        },
        sent:{
            type: Boolean,
            default: false
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },{timestamps: true}
);

const TodoSchema = mongoose.model('Todo',todoSchema);
module.exports = TodoSchema;