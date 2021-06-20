const TodoType = `
    type Todo {
        id: ID!
        text: String!
        dueDate: DateTime!
        completed: Boolean!
    }
`;

const GetTodosInput = `
    type GetTodosInput {
        id: ID!
        text: String!
        dueDate: String!
        completed: Boolean!
    }
`;

const TodoCreateInput = `
    input TodoCreateInput {
        text: String!
        dueDate: String!
    }
`;

const TodoUpdateInput = `
    input TodoUpdateInput {
        id: ID!
        completed: Boolean!
    }
`;

const Todos = `
    todos(dueDate: String, isOverdue: String, pageNumber: Int): [Todo!]!
`;

const CreateTodo = `
    createTodo(todoCreateInput: TodoCreateInput): Todo
`;

const UpdateTodo = `
    updateTodo(todoUpdateInput: TodoUpdateInput): Todo
`;

const DeleteTodo = `
    deleteTodo(id: ID!): String
`;

module.exports = {
    TodoType,
    GetTodosInput,
    TodoCreateInput,
    TodoUpdateInput,
    Todos,
    CreateTodo,
    UpdateTodo,
    DeleteTodo
}
