import React from "react";
import { nanoid } from "nanoid";

class TodoForm extends React.Component {
  state = {
    text: "",
  };

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      text: this.state.text,
      id: nanoid(),
      complete: false,
      edit: false,
    });
    this.setState({
      text: "",
    });
  };
  render() {
    return (
      <form className="TodoForm" onSubmit={this.handleSubmit}>
        <input
          placeholder="add a todo ..."
          onChange={this.handleChange}
          type="text"
          value={this.state.text}
        />
        <button onSubmit={this.handleSubmit}>Add Todo</button>
      </form>
    );
  }
}

export default TodoForm;
