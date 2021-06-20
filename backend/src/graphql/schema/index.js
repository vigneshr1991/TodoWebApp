const { buildSchema } = require('graphql');

const TodoSchema = require('./TodoSchema');

module.exports = buildSchema(`
    scalar DateTime
    ${TodoSchema.TodoType}
    ${TodoSchema.GetTodosInput}
    ${TodoSchema.TodoCreateInput}
    ${TodoSchema.TodoUpdateInput}
    
    type RootQuery {
        ${TodoSchema.Todos}
    }

    type RootMutation {
        ${TodoSchema.CreateTodo}
        ${TodoSchema.UpdateTodo}
        ${TodoSchema.DeleteTodo}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);