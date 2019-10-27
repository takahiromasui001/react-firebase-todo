import React from "react";
import "./List.scss";

let style = {
  maxWidth: "700px"
};

let btn = {
  cursor: "pointer"
};

const List = props => (
  <div className="todo-list">
    <ul>
      {props.todos.map((todo, i) => {
        return (
          <li
            key={i}
            className="siimple-list-item siimple--bg-white siimple--display-flex"
            style={style}
          >
            <div className="title">{todo.title}</div>
            <div
              className="siimple-tag siimple-tag--error siimple-hover"
              style={btn}
              onClick={() => props.handleRemove(i)}
            >
              Delete
            </div>
          </li>
        );
      })}
      ;
    </ul>
  </div>
);

export default List;
