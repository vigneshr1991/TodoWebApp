/* eslint-disable no-console */
const Todo = require('./todo.model');

const moment = require('moment');
const DEFAULT_PAGE_SIZE = 8;

const getTodos =  async (dueDate, isOverdue, pageNumber, limit) => {
  try{
    let where = {};
    let startDay, endDay = null;

    const pageSize = limit || DEFAULT_PAGE_SIZE;

    if (dueDate && dueDate != 'null') {
      startDay = moment(dueDate).startOf('day').toISOString();
      endDay = moment(dueDate).endOf('day').toISOString();
      where = { dueDate: { "$gte": startDay, "$lt": endDay } };
    } else if (isOverdue == 'true') {
      startDay = moment().startOf('day').toISOString();
      where = { dueDate: { "$lt": startDay }, completed: false };
    } else {
      startDay = moment().startOf('day').toISOString();
      where = { dueDate: { "$gte": startDay } };
    }

    const response = await Todo.find(where).sort('dueDate')
                                .skip((pageNumber - 1) * pageSize)
                                .limit(pageSize)
                                .exec();

    return response;
  } catch(e) {
    console.error("Error in GET TODO service :", e);
    throw new Error(e.message);
  }
};

const addTodo =  async (text, dueDate) => {
  try {
    if (typeof text !== 'string') {
      throw new Error("invalid 'text' expected string");
    }

    const todo = new Todo({ text, dueDate });
    const savedTodo = await todo.save();
    return savedTodo;
  } catch(e) {
    console.error("Error in ADD TODO service :", e);
    throw new Error(e.message);
  }
};

const updateTodo = async (id, completed) => {

  try {
    if (typeof completed !== 'boolean') {
      throw new Error("invalid 'completed' expected boolean");
    }

    const todo = await Todo.findOne({ id });
    if(!todo) {
      throw new Error("Todo not found")
    }

    todo.completed = completed;
    await todo.save();
    return todo;
  } catch(e) {
    console.error("Error in UPDATE TODO service :", e);
    throw new Error(e.message);
  }
};

const deleteTodo = async (id) => {
  try {
    const findTodo = await Todo.findOne({ id });
    if(!findTodo) {
      throw new Error("Todo not found")
    }
    await Todo.remove({ id });
    return "SUCCESS";
  } catch(e) {
    console.error("Error in DELETE TODO service :", e);
    throw new Error(e.message);
  }
};

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
}
