const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: generateId } = require('uuid');

const todoSchema = new Schema({
    id: {
        type: String,
        default: generateId
    },
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
