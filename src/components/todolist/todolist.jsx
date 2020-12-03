import React from "react";
import Todo from "../todo/todo";
import TodoForm from "../todoform/todoform";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import "./todolist.css";

resetServerContext();
class TodoList extends React.Component {
  state = {
    todos: [],
  };

  addTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };
  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };
  editTodo = (id, str) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: str,
          };
        } else {
          return todo;
        }
      }),
    });
  };
  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      }),
    });
  };
  toggleEdit = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            edit: !todo.edit,
          };
        } else {
          return todo;
        }
      }),
    });
  };
  updateTodos = (items) => {
    this.setState({
      todos: items,
    });
  };
  handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(this.state.todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.updateTodos(items);
  };
  clearCompletedTodos = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.complete),
    });
  };
  render() {
    return (
      <div className="TodoList">
        <h1>Todo List</h1>
        {/* <form className="TodoForm" onSubmit={this.handleSubmit}>
          <input
            placeholder="add todo ..."
            onChange={this.handleChange}
            type="text"
            value={this.state.text}
          />
          <button onSubmit={this.handleSubmit}>Add Todo</button>
        </form> */}
        <TodoForm onSubmit={this.addTodo} />
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                className="todos"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.state.todos.map((todo, index) => (
                  <Todo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    handleSubmit={() => this.handleSubmit(todo.id)}
                    toggleComplete={() => this.toggleComplete(todo.id)}
                    toggleEdit={() => this.toggleEdit(todo.id)}
                    deleteTodo={() => this.deleteTodo(todo.id)}
                    editTodo={this.editTodo}
                    todos={this.state.todos}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          Number of Active Todos :
          {this.state.todos.filter((todo) => !todo.complete).length}
        </div>
        {this.state.todos.filter((todo) => todo.complete).length ? (
          <button onClick={this.clearCompletedTodos}>Clear completed</button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default TodoList;
