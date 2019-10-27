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
    this.state = {
      todos: []
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  async getAllTodo() {
    const querySnapshot = await db.collection("todo").get();
    const newTodos = querySnapshot.docs.map(doc => {
      return { id: doc.id, title: doc.data().name };
    });
    this.setState({ todos: newTodos });
  }

  async handleAdd(event) {
    // TODO: preventDefaultはこの手の操作で必須なのか？要調査。
    // TODO: 例外処理
    event.preventDefault();
    event.persist();

    const title = event.target.title.value;
    const querySnapshot = await db.collection("todo").add({ name: title });
    const newTodos = this.state.todos;

    newTodos.push({ id: querySnapshot.id, title: title });
    this.setState({ todos: newTodos });
    event.target.title.value = "";
    console.log("Document successfully written");
  }

  async handleRemove(event) {
    // TODO: 例外処理
    await db
      .collection("todo")
      .doc(this.state.todos[event].id)
      .delete();
    const newTodos = this.state.todos;
    newTodos.splice(event, 1);
    this.setState({ todos: newTodos });
    console.log("Document successfully deleted");
  }

  componentDidMount() {
    this.getAllTodo();
  }

  render() {
    return (
      <div className="siimple-box siimple--bg-dark">
        <div className="siimple-box-title siimple--color-white siimple--mb-2">
          Todo App
        </div>
        <Form handleAdd={this.handleAdd} />
        <div className="siimple-rule"></div>
        <List todos={this.state.todos} handleRemove={this.handleRemove} />
      </div>
    );
  }
}
