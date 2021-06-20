import { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';

import { useAppState } from "../../AppState";
import todoStyles from './Styles';
import TodoList from './TodoList';

const PENDING_TODOS = "PENDING_TODOS";
const OVERDUE_TODOS = "OVERDUE_TODOS";

const TabPanel = (props) => {
    const { children, value, index } = props;
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    )
}

const TodoTab = () => {
    const classes = todoStyles();
    const [value, setValue] = useState(0);
    const [{ todos: todoState }, dispatch] = useAppState();

    const handleChange = (event, newValue) => {
        dispatch({ type: 'RESET_TODO_STATE'});
        setValue(newValue);
    };

    return(
        <div >
            <Tabs
                className={classes.tabHeader}
                value={value} onChange={handleChange}
                aria-label="simple tabs example"
                variant="fullWidth"
            >
                <Tab label="Pending Todos" />
                <Tab label="Overdue Todos" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <TodoList todoType={PENDING_TODOS} />    
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TodoList todoType={OVERDUE_TODOS} />
            </TabPanel>
        </div>
    )
}

export default TodoTab;