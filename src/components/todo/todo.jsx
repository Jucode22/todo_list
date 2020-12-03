import React from "react";
import { Draggable } from "react-beautiful-dnd";
import EditPopUp from "../editPopUp";
import "./todo.style.css";
import { resetServerContext } from "react-beautiful-dnd";

resetServerContext();

const Todo = ({
  todo,
  deleteTodo,
  toggleComplete,
  toggleEdit,
  editTodo,
  index,
}) => {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="Todo"
          style={{
            height: "30px",
            border: "black",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{ textDecoration: todo.complete ? "line-through" : "" }}
            onClick={toggleComplete}
          >
            - {todo.edit ? "" : todo.text}
          </div>
          {!todo.complete && !todo.edit ? (
            <button onClick={toggleEdit}> edit</button>
          ) : (
            ""
          )}

          {todo.edit ? (
            <EditPopUp
              todo={todo}
              toggleEdit={toggleEdit}
              editTodo={editTodo}
            />
          ) : (
            ""
          )}
          {!todo.edit ? <button onClick={deleteTodo}>x</button> : ""}
        </li>
      )}
    </Draggable>
  );
};

export default Todo;