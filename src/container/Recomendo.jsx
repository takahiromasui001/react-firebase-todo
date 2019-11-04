import React, { Component } from "react";
import "firebase/firestore"; //必要なモジュールごとにimport
import "./Recomendo.scss";

export default class Recomendo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      targetTodo: String
    };
  }

  async getTargetTodos() {
    const querySnapshot = await this.props.db.collection("todo").get();
    const newTodos = querySnapshot.docs.map(doc => {
      return { id: doc.id, title: doc.data().name };
    });
    return new Promise(resolve => {
      this.setState({ todos: newTodos }, resolve);
    });
  }

  reloadRecomendo() {
    const todos = this.state.todos.map(todo => todo.title);
    const targetTodo = todos[Math.floor(Math.random() * todos.length)];
    this.setState({ targetTodo: targetTodo });
  }

  async componentDidMount() {
    await this.getTargetTodos();
    const todos = this.state.todos.map(todo => todo.title);
    const targetTodo = todos[Math.floor(Math.random() * todos.length)];
    this.setState({ targetTodo: targetTodo });
  }

  render() {
    return (
      <div className="recomendo">
        <p className="siimple-label siimple--color-white">How is this?</p>
        <div className="siimple-card">
          <div className="siimple-card-body siimple--bg-white">
            <h1 className="recomend-todo">{this.state.targetTodo}</h1>
          </div>
        </div>
        <div
          className="siimple-btn siimple-btn--teal"
          onClick={() => this.reloadRecomendo()}
        >
          Reload
        </div>
      </div>
    );
  }
}
