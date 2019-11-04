import React, { Component } from "react";
import Form from "./Form";
import List from "./List";
import Recomendo from "../container/Recomendo";
import firebase from "firebase/app"; //必須
import "firebase/firestore"; //必要なモジュールごとにimport
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./App.scss";
import "react-tabs/style/react-tabs.css";

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
  }

  async getAllTodo() {
    const querySnapshot = await db.collection("todo").get();
    const newTodos = querySnapshot.docs.map(doc => {
      return { id: doc.id, title: doc.data().name };
    });
    this.setState({ todos: newTodos });
  }

  handleAdd = async event => {
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
  };

  handleRemove = async (key, event) => {
    console.log(event);
    console.log(this);
    // TODO: 例外処理
    await db
      .collection("todo")
      .doc(this.state.todos[key].id)
      .delete();
    const newTodos = this.state.todos;
    newTodos.splice(key, 1);
    this.setState({ todos: newTodos });
    console.log("Document successfully deleted");
  };

  componentDidMount() {
    this.getAllTodo();
  }

  render() {
    return (
      <div className="siimple-box siimple--bg-dark">
        <div className="siimple-box-title siimple--color-white siimple--mb-2">
          Todo App
        </div>

        <Tabs>
          <TabList>
            <Tab>Recomndo</Tab>
            <Tab>Todos</Tab>
          </TabList>

          <TabPanel>
            <Recomendo db={db} />
          </TabPanel>
          <TabPanel>
            <Form handleAdd={this.handleAdd} />
            <div className="siimple-rule"></div>
            <List todos={this.state.todos} handleRemove={this.handleRemove} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
