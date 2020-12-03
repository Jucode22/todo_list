import { nanoid } from "nanoid";
import React from "react";
import Todo from "./todo/todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";

resetServerContext();
class TodoList extends React.Component {
  state = {
    text: "",
    todos: [],
  };

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.addTodo({
      text: this.state.text,
      id: nanoid(),
      complete: false,
      edit: false,
    });
    this.setState({
      text: "",
    });
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
  render() {
    return (
      <div className="App">
        <form className="TodoForm" onSubmit={this.handleSubmit}>
          <input
            placeholder="add todo ..."
            onChange={this.handleChange}
            type="text"
            value={this.state.text}
          />
          <button onSubmit={this.handleSubmit}>Add Todo</button>
        </form>
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
        Number of Active Todos :
        {this.state.todos.filter((todo) => !todo.complete).length}
      </div>
    );
  }
}
export default TodoList;
