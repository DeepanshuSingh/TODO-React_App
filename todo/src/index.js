import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
const Todo = props => (
  <li>
    <input type="checkbox" checked={props.checked} onClick={props.onToggle} />
    <button onClick={props.onDelete}>delete</button>
    <span>{props.todo.text}</span>
  </li>
);
let id = 0;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addTodo() {
    const text = prompt("Enter to add TODO");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }]
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }
  render() {
    return (
      <div>
        <div> Total TODOS: {this.state.todos.length}</div>
        <div>
          {" "}
          Unchecked TODOS:{" "}
          {this.state.todos.filter(todo => todo.checked === false).length}
        </div>
        <div>
          {" "}
          Checked TODOS:{" "}
          {this.state.todos.filter(todo => todo.checked === true).length}
        </div>
        <button onClick={() => this.addTodo()}>Add Todo</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
