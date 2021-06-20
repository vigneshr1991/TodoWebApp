export const userInitialState = {
    users: [],
    pageNumber: 1,
    loading: false,
    hasMore: false,
};

const userReducer = (state = userInitialState, action = {}) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {...state, loading: action.payload}
        case 'USER_INCREMENT_PAGE_NUMBER':
            return {...state, pageNumber: state.pageNumber + 1}
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.payload] };
        case 'GET_USER':
            return { ...state, users: [...new Set([...state.users, ...action.payload])], hasMore: action.payload.length > 0 };
        case 'UPDATE_USER':
            const previousUsers = [...state.users];
            const modifiedTodoIndex = previousUsers.findIndex((user) => user.id === action.payload);
            previousUsers[modifiedTodoIndex] = { ...previousUsers[modifiedTodoIndex], completed: !previousUsers[modifiedTodoIndex].completed };
            return { ...state, users: [...previousUsers] };
        case 'DELETE_USER':
            return { ...state, users: [...state.users.filter((user) => user.id !== action.payload)] };
        default:
            return state;
    }
}

export default userReducer;