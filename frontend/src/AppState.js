import { createContext, useReducer, useContext } from 'react';
import { object, func } from 'prop-types';

import rootReducer, { initialState } from './reducer';

const Context = createContext();

export const StateProvider = ({ children }) => {
    const value = useReducer(rootReducer, initialState);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

StateProvider.propTypes = {
    reducer: func,
    initialState: object,
}

export const useAppState = () => useContext(Context);

export function connect(mapStateToProps, mapDispatchToProps) {
    return function(Component) {
        return function () {
            const {state, dispatch} = useContext(Context)
            const stateToProps = mapStateToProps(state)
            const dispatchToProps = mapDispatchToProps(dispatch)
            const props = { ...stateToProps, ...dispatchToProps}
            return (
                <Component {...props} />
            )
        }
    }
}
