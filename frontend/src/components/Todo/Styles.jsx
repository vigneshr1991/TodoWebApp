import { makeStyles } from "@material-ui/core/styles";

const todoStyles = makeStyles({
  tabHeader: {
    backgroundColor: '#6292fd',
    color: '#fff',
  },
  alertDueTodo: {
    background: '#ffcbcb'
  },
  loader: {
    textAlign: 'center',
  },
  textBox: { padding: "0px 10px" },
  addTodoContainer: { padding: 10 },
  addTodoButton: { marginLeft: 5 },
  todosContainer: {
    marginTop: 10,
    padding: 10,
    maxHeight: 260,
    overflowX: "auto",
  },
  todoContainer: {
    borderTop: "1px solid #bfbfbf",
    // marginTop: 5,
    // borderRadius: 10,
    margin: '1px 0px',
    "&:first-child": {
      margin: 0,
      borderTop: "none",
    },
    "&:hover": {
      "& $deleteTodo": {
        visibility: "visible",
      },
    },
  },
  todoTextCompleted: {
    textDecoration: "line-through",
  },
  todoText: {
    width: 300,
    float: 'left',
  },
  todoDueDate: {
    width: 300,
    float: 'left',
  },
  deleteTodo: {
    visibility: "hidden",
  },
  todoTableHeader: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
  },
  todoTableContentHeader: {
    lineHeight: 42,
    paddingLeft: 54,
    fontSize: 16,
    fontWeight: 600,
  }
})

export default todoStyles; 