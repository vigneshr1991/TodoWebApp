/* eslint-disable no-console */
const TodoService = require('./todo.service');

const getTodos =  async (req, res) => {
  try{
    const { dueDate, isOverdue, pageNumber } = req.query;
    const todo = await TodoService.getTodos(dueDate, isOverdue, pageNumber);
    return res.status(200).json(todo);
  } catch(e) {
    console.error("Error in GET TODO api :", e)
    return res.status(500).json(e.message);
  }
};

const addTodo =  async (req, res) => {
  const { text, dueDate } = req.body;
  try {
    const todo = await TodoService.addTodo(text, dueDate);
    return res.status(201).json(todo);
  } catch(e) {
    console.error("Error in ADD TODO api :", e)
    return res.status(500).json(e.message);
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const todo = await TodoService.updateTodo(id, completed);
    return res.status(200).json(todo);
  } catch(e) {
    console.error("Error in UPDATE TODO api :", e)
    return res.status(500).json(e.message);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await TodoService.deleteTodo(id);
    return res.status(203).json("SUCCESS");
  } catch(e) {
    console.error("Error in DELETE TODO api :", e)
    return res.status(500).json(e.message);
  }
};

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
}
