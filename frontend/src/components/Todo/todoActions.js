const getTodosQuery = `query todos($dueDate: String, $pageNumber: Int, $isOverdue: String) {
    todos(dueDate: $dueDate, pageNumber: $pageNumber, isOverdue: $isOverdue) {
        id
        text
        dueDate
        completed
    }
}`;

const addTodoQuery = `mutation CreateTodo($todoCreateInput: TodoCreateInput) {
    createTodo(todoCreateInput: $todoCreateInput) {
        id
        text
        dueDate
        completed
    }
}`;

const updateTodoQuery = `mutation UpdateTodo($todoUpdateInput: TodoUpdateInput) {
    updateTodo(todoUpdateInput: $todoUpdateInput) {
        id
        text
        dueDate
        completed
    }
}`;

const deleteTodoQuery = `mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
}`;

export const addTodo = ({text, dueDate, callback=null}, dispatch) => {
    fetch("http://localhost:3001/graphql", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ 
            query: addTodoQuery,
            variables: {
                todoCreateInput: {text, dueDate}
            }
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json()
    })
    .then((todo) => {
        const { data } = todo;
        dispatch({type: 'ADD_TODO', payload: data.createTodo});
        callback && callback(true);
    }).catch(e => {
        console.error("Something went wrong in addTodo :", e);
        callback && callback(false);
    });
}

export const getTodos = ({dueDate=null, pageNumber=1, isOverdue=false, callback=null}, dispatch) => {
    fetch("http://localhost:3001/graphql", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            query: getTodosQuery,
            variables: {dueDate, pageNumber, isOverdue: isOverdue.toString()}
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json()
    })
    .then((todos) => {
        const { data } = todos;
        dispatch({type: 'GET_TODO', payload: data.todos});
        callback && callback(true);
    }).catch(e => {
        console.error("Something went wrong in getTodos :", e);
        callback && callback(false);
    });
}

export const toggleTodoCompleted = ({callback=null, ...todo}, dispatch) => {
    fetch(`http://localhost:3001/graphql`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            query: updateTodoQuery,
            variables: {
                todoUpdateInput: {id: todo.id, completed: !todo.completed}
            }
        }),
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch({ type: 'UPDATE_TODO', payload: todo.id });
        callback && callback(true);
    }).catch(e => {
        console.error("Something went wrong in toggleTodoCompleted :", e);
        callback && callback(false);
    });
}

export const deleteTodo = ({callback=null, ...todo}, dispatch) => {
    fetch(`http://localhost:3001/graphql`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            query: deleteTodoQuery,
            variables: {id: todo.id}
        }),
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch({ type: 'DELETE_TODO', payload: todo.id });
        callback && callback(true);
    }).catch(e => {
        console.error("Something went wrong in deleteTodo :", e);
        callback && callback(false);
    });
}

/*

// Rest APi end points

export const addTodo = ({text, dueDate, callback=null}, dispatch) => {
    fetch("http://localhost:3001/", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ text, dueDate }),
    })
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json()
    })
    .then((todo) => {
        dispatch({type: 'ADD_TODO', payload: todo});
        callback && callback(true);
    }).catch(e => {
        console.error("Something went wrong in addTodo :", e);
        callback && callback(false);
    });
}

export const getTodos = ({dueDate=null, pageNumber=1, isOverdue=false, callback=null}, dispatch) => {
    dispatch({type: 'TODO_LOADING', payload: true})
    return fetch(`http://localhost:3001/?dueDate=${dueDate}&pageNumber=${pageNumber}&isOverdue=${isOverdue}`)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json()
    }).then((todos) => {
        dispatch({type: 'GET_TODO', payload: todos});
        callback && callback(true);
    }).catch(e => {
        console.error("Something went wrong in getTodos :", e);
        callback && callback(false);
    }).finally(() => {
        dispatch({type: 'TODO_LOADING', payload: false});
    });
}

export const toggleTodoCompleted = ({callback=null, ...todo}, dispatch) => {
    fetch(`http://localhost:3001/${todo.id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            completed: !todo.completed,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        dispatch({ type: 'UPDATE_TODO', payload: todo.id });
        callback && callback(true);
    }).catch(e => {
        console.error("Something went wrong in toggleTodoCompleted :", e);
        callback && callback(false);
    });
}

export const deleteTodo = ({callback=null, ...todo}, dispatch) => {
    fetch(`http://localhost:3001/${todo.id}`, {
        method: "DELETE",
    }).then((response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
        dispatch({ type: 'DELETE_TODO', payload: todo.id });
        callback && callback(true);
    }).catch(e => {
        console.error("Something went wrong in deleteTodo :", e);
        callback && callback(false);
    });
}
*/