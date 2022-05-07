import React from "react";

export default function TodoList(props) {
  return (
    <div className="todo-list" onClick={props.deleteCheck}>
      {props.taskList.map((todo) => {
        return todo.completed ? (
          <p
            key={todo._id}
            id={todo._id}
            style={{
              textDecorationLine: "line-through",
              textDecorationStyle: "solid",
            }}
            className="completed"
          >
            {todo.description}

            <button className="complete">complete</button>
            <button className="trash-btn">delete</button>
          </p>
        ) : (
          <p
            key={todo._id}
            id={todo._id}
            style={{
              textDecorationLine: "none",
              textDecorationStyle: "none",
            }}
          >
            {todo.description}

            <button className="complete">complete</button>
            <button className="trash-btn">delete</button>
          </p>
        );
      })}
    </div>
  );
}
