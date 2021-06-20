const TodoService = require('../../todo/todo.service');

module.exports = {
    todos: async args => {
        const { dueDate, isOverdue, pageNumber } = args;
        const todo = await TodoService.getTodos(dueDate, isOverdue, pageNumber);
        return todo;
    },
    createTodo: async args => {
        const { todoCreateInput } = args;
        const { text, dueDate } = todoCreateInput;
        const todo = await TodoService.addTodo(text, dueDate);
        return todo;
    },
    updateTodo: async args => {
        const { todoUpdateInput } = args;
        const { id, completed } = todoUpdateInput;
        const todo = await TodoService.updateTodo(id, completed);
        return todo;
    },
    deleteTodo: async args => {
        const { id } = args;
        const todo = await TodoService.deleteTodo(id);
        return todo;
    }
}