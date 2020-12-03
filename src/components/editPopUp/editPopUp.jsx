import React from "react";
import "./editPopUp.css";
class EditPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.todo.text };
  }
  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.editTodo(this.props.todo.id, this.state.text);
    this.setState({
      text: "",
    });
    this.props.toggleEdit();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.text}
            onChange={this.handleChange}
          ></textarea>
          <button onClick={this.handleSubmit}>save</button>
          <button onClick={this.props.toggleEdit}>exit</button>
        </form>
      </div>
    );
  }
}

export default EditPopUp;
