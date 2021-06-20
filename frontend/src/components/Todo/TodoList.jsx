import { useState, useRef, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Paper, Box, CircularProgress } from "@material-ui/core";

import { useAppState } from "../../AppState";
import { getTodos, toggleTodoCompleted, deleteTodo } from "./todoActions"
import Alert from '../Shared/Alerts';
import Todo from './Todo';
import todoStyles from './Styles';

const DEFAULT_PAGE_SIZE = 8;

const TodoList = (props) => {
  const classes = todoStyles();
  const [{ todos: todoState }, dispatch] = useAppState();
  const observer = useRef(null);
  const [ showAlert, setShowAlert] = useState(false);
  const [ alertMessage, setAlertMessage] = useState(null);

  const { todos, pageNumber, hasMore, loading } = todoState;
  const { todoType } = props;
  const currentPageSize = DEFAULT_PAGE_SIZE * pageNumber;

  useEffect(() => {
    getTodos({ isOverdue: todoType === 'OVERDUE_TODOS' }, dispatch);
  }, []);

  function handleOnDragEnd(result) {
    if (!result || !result.destination) {
      return;
    }
    const items = [...todos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: 'GET_TODO', payload: items });
  }

  const lastTodoElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && (todos.length <= currentPageSize)) {
        dispatch({ type: 'INCREMENT_PAGE_NUMBER' });
        getTodos({ dueDate: null, pageNumber: pageNumber + 1 }, dispatch);
      }
    })
    if (node) observer.current.observe(node);
  }, [hasMore, pageNumber])

  const handleOnToggleTodo = (todo) => {
    toggleTodoCompleted({...todo, callback: (statusSuccess) => {
      setShowAlert(true);
      setAlertMessage(`TODO: ${todo.text} marked ${!todo.completed ? 'completed' : 'incomplete'}`);
    }}, dispatch)
  }

  const handleOnDeleteTodo = (todo) => {
    deleteTodo({...todo, callback: (statusSuccess) => {
      setShowAlert(true);
      setAlertMessage(`TODO: ${todo.text} deleted successfully`);
    }}, dispatch)
  }

  if(!loading && (!todos || !todos.length)) {
    return null;
  }

  return (
    <>
      <Alert
        showAlert={showAlert}
        alertMessage={alertMessage}
        handleOnALertClose={() => setShowAlert(false)}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <Paper
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={classes.todosContainer}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="stretch"
              >
                {todos.map((todo, index) => {
                  return(
                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                      {(provided) => {
                        return(
                          <div ref={todos.length === index + 1 ? lastTodoElementRef : null}>
                            <Todo
                              todo={todo}
                              draggableProvided={provided}
                              handleOnToggleTodo={handleOnToggleTodo}
                              handleOnDeleteTodo={handleOnDeleteTodo}
                            />
                          </div>
                        )
                      }}
                    </Draggable>
                  )
                })}
              </Box>
              {loading && <div className={classes.loader}><CircularProgress disableShrink /></div>}
            </Paper>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default TodoList;