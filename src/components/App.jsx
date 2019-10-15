import React, { Component } from "react";
import Form from "./Form";
import List from "./List";
import firebase from "firebase/app"; //必須
import "firebase/firestore"; //必要なモジュールごとにimport

firebase.initializeApp({
  projectId: "react-firebase-todo-db7c5"
});

const db = firebase.firestore();

export default class App extends Component {
  constructor(props) {
    super(props);
    // console.log(this.getTodoFromFirestore());
    this.state = {
      todos: []
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    db.collection("todo")
      .get()
      .then(response => {
        response.forEach(doc => {
          const newTodos = this.state.todos;
          newTodos.push({ id: doc.id, title: doc.data().name });
          this.setState({ todos: this.state.todos });
        });
      });
  }

  handleAdd(e) {
    e.preventDefault();
    console.log(e.target.title.value);
    const title = e.target.title.value;
    db.collection("todo")
      .add({ name: e.target.title.value })
      .then(docRef => {
        const newTodos = this.state.todos;
        newTodos.push({ id: docRef.id, title: title });
        this.setState({ todos: this.state.todos });
        console.log("Document successfully written");
      });
    e.target.title.value = "";
  }

  handleRemove(e) {
    console.log(this.state.todos[e].id);
    db.collection("todo")
      .doc(this.state.todos[e].id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted");
        const newTodos = this.state.todos;
        newTodos.splice(e, 1);
        this.setState({ todos: newTodos });
      });
    // this.state.todos.splice(e, 1);
    // this.setState({ todos: this.state.todo });
  }

  render() {
    return (
      <div className="siimple-box siimple--bg-dark">
        <h1 className="siimple-box-title siimple--color-white">
          React Todo App
        </h1>
        <Form handleAdd={this.handleAdd} />
        <div className="siimple-rule"></div>
        {console.log(this.state.todos)}
        {console.log(this.state.todos)}
        <List todos={this.state.todos} handleRemove={this.handleRemove} />
      </div>
    );
  }
}
