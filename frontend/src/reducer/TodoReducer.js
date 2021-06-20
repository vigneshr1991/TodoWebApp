const DEFAULT_PAGE_SIZE = 8;

export const todoInitialState = {
    todos: [],
    isDueDate: false,
    isDueToday: false,
    pageNumber: 1,
    loading: false,
    hasMore: false,
};

const todoReducer = (state = todoInitialState, action = {}) => {
    switch (action.type) {
        case 'RESET_TODO_STATE':
            return todoInitialState;
        case 'TOGGLE_DUE_TODAY':
            return {... state, isDueToday: !state.isDueToday};
        case 'TOGGLE_DUE_DATE':
            return {... state, isDueDate: !state.isDueDate};
        case 'TODO_LOADING':
            return {...state, loading: action.payload};
        case 'INCREMENT_PAGE_NUMBER':
            return {...state, pageNumber: state.pageNumber + 1};
        case 'ADD_TODO':
            return { ...state, todos: [action.payload, ...state.todos] };
        case 'GET_TODO':
            return { ...state, todos: [...new Set([...state.todos, ...action.payload])], hasMore: action.payload.length >= DEFAULT_PAGE_SIZE };
        case 'UPDATE_TODO':
            const previousTodos = [...state.todos];
            const modifiedTodoIndex = previousTodos.findIndex((todo) => todo.id === action.payload);
            previousTodos[modifiedTodoIndex] = { ...previousTodos[modifiedTodoIndex], completed: !previousTodos[modifiedTodoIndex].completed };
            return { ...state, todos: [...previousTodos] };
        case 'DELETE_TODO':
            return { ...state, todos: [...state.todos.filter((todo) => todo.id !== action.payload)] };
        default:
            return state;
    }
}

export default todoReducer;