import React, { useState } from "react";
import icon_play_todolist from "../image/play.png";
import icon_plus_todolist from "../image/plus.png";
import { uuid } from "uuidv4";

const TodoList = () => {
  const todos = [
    {
      id: uuid(),
      title: "The First Thing To Do Today",
      completed: false,
    },
    {
      id: uuid(),
      title: "The Second Thing To Do Today",
      completed: false,
    },
    {
      id: uuid(),
      title: "The Third Thing To Do Today",
      completed: false,
    },
    {
      id: uuid(),
      title: "The Forth Thing To Do Today",
      completed: false,
    },
    {
      id: uuid(),
      title: "The Completed Thing To Do Today",
      completed: true,
    },
  ];
  const [todo, setTodo] = useState(todos);

  const handleCheckChange = (e, id) => {
    let newTodo = [...todo].map((item) => {
      if (item.id === id) item.completed = e.checked;
      return item;
    });
    setTodo(newTodo);
  };

  return (
    <div className="todolist_container">
      <div className="todolist">
        <ul className="todolist_list">
          {todo.map((todo) => {
            return !todo.completed ? (
              <li>
                <div class="todo_item">
                  <input
                    id={"todo_toggle-" + todo.id}
                    className="todo_toggle"
                    type="checkbox"
                    onChange={(e) => handleCheckChange(e.target, todo.id)}
                  />
                  <label
                    className="todo_content"
                    for={"todo_toggle-" + todo.id}
                  >
                    <p>{todo.title}</p>
                  </label>
                  <button className="todo_play">
                    <img
                      src={icon_play_todolist}
                      className="icon_play_todolist"
                      alt="todo play button"
                    />
                  </button>
                </div>
              </li>
            ) : null;
          })}
        </ul>
        <div className="todo_inputPart">
          <input
            className="todo_input"
            type="text"
            placeholder="Add A New Mission..."
          />
          <button className="todo_plus">
            <img
              src={icon_plus_todolist}
              className="icon_plus_todolist"
              alt="todo plus button"
            />
          </button>
        </div>
      </div>
      <div className="todo_completePart">
        <div className="complete_title">
          <span>Recently completed--</span>
          <a href="/">More</a>
        </div>
        {todo.map((todo) => {
          return todo.completed ? (
            <div className="complete_item">
              <input
                id={"complete_content-" + todo.id}
                className="complete_check"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => handleCheckChange(e.target, todo.id)}
              />
              <label
                className="complete_content"
                for={"complete_content-" + todo.id}
              >
                <p>{todo.title}</p>
              </label>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default TodoList;
