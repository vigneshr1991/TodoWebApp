import {
    Typography,
    Button,
    Icon,
    Box,
    Checkbox,
} from "@material-ui/core";
import moment from "moment";

import todoStyles from './Styles';

const today = moment();

const Todo = (props) => {
    const classes = todoStyles();

    const { todo, draggableProvided, handleOnToggleTodo, handleOnDeleteTodo } = props;
    const { id, text, dueDate, completed } = todo;

    return(
        <Box
            key={id}
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={`${classes.todoContainer} ${today.isSame(dueDate, 'day') && classes.alertDueTodo}`}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            ref={draggableProvided.innerRef}
        >
            <Checkbox
                checked={completed}
                onChange={() => handleOnToggleTodo(todo)}
            />
            <Box flexGrow={1}>
                <Typography
                    className={completed ? `${classes.todoTextCompleted} ${classes.todoText}` : classes.todoText}
                    component="span"
                    variant="body1"
                >
                    {text}
                </Typography>
                <Typography
                    className={classes.todoDueDate}
                    component="span"
                    variant="body2"
                >
                    | Due on {moment(dueDate).format("MMM DD, YYYY")}
                </Typography>
            </Box>
            <Button
                className={classes.deleteTodo}
                startIcon={<Icon>delete</Icon>}
                onClick={() => handleOnDeleteTodo(todo)}
            >
                Delete
            </Button>
        </Box>
    )
}

export default Todo;