import todoReducer, { todoInitialState } from './TodoReducer';
import userReducer, { userInitialState } from './userReducer';

export const initialState = {
    todos: todoInitialState,
    users: userInitialState,
}

const rootReducer = ({ todos, users }, action) => {
    return {
        todos: todoReducer(todos, action),
        users: userReducer(users, action),
    };
};
  
export default rootReducer;