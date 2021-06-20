import { useState } from "react";
import { Typography, Button, Icon, Paper, Box, TextField,
    Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";
import moment from 'moment';

import { useAppState } from "../../AppState";
import { addTodo, getTodos } from './todoActions'
import todoStyles from './Styles';

const today = moment().utc();
const todayDate = today.format("YYYY-MM-DD");

const Header = () => {
    const [{ todos: todoState }, dispatch] = useAppState();
    const classes = todoStyles();

    const [text, setText] = useState("");
    const [dueDate, setDueDate] = useState(today);
    const [fetchDueToday, setFetchDueToday] = useState(false);
    const [errorText, setErrorText] = useState("");

    const HandleOnDueTodayChage = (event) => {
        dispatch({type: 'RESET_TODO_STATE'});
        dispatch({type: 'TOGGLE_DUE_DATE'});
        setFetchDueToday(!fetchDueToday);
        if(event.target.checked) {
            getTodos({ dueDate: todayDate }, dispatch);
        } else {
            getTodos({ dueDate: null }, dispatch);
        }
    }

    const createTodo = () => {
        addTodo({ text, dueDate, callback: () => {
            setText("");
            setDueDate(today);
        }}, dispatch);
    }

    const setTodoText = () => {
        if (text.trim("") !== "") {
            createTodo();
            setErrorText("");
        } else {
            setErrorText("Required");
        }
    }

    return (
        <>
            <Typography variant="h3" component="h1" gutterBottom>
                Todos
            </Typography>
            <Paper className={classes.addTodoContainer}>
                <Box display="flex" flexDirection="row">
                    <Box flexGrow={1}>
                        <TextField
                            className={classes.textBox}
                            fullWidth
                            error={errorText.length === 0}
                            value={text}
                            helperText={errorText.length === 0 ? null : errorText}
                            onKeyPress={(event) => {
                                if(event.key === "Enter") {
                                    setTodoText();
                                }
                            }}
                            onChange={(event) => setText(event.target.value)}
                        />
                    </Box>
                    <TextField
                        id="date"
                        // label="Due Date"
                        type="date"
                        value={dueDate.format("YYYY-MM-DD")}
                        // defaultValue={todayDate}
                        className={classes.textField}
                        inputProps={{
                            min: todayDate
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => setDueDate(moment(event.target.value))}
                    />
                    <Button
                        className={classes.addTodoButton}
                        color="secondary"
                        startIcon={<Icon>add</Icon>}
                        onClick={setTodoText}
                    >
                        Add
                    </Button>
                </Box>
            </Paper>
            <Box display="flex" flexDirection="row">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fetchDueToday}
                                color="primary"
                                onChange={HandleOnDueTodayChage}
                            />
                        }
                        label="Due Today"
                    />
                </FormGroup>
            </Box>
        </>
    );
}

export default Header;
