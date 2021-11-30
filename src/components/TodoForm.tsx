import { useState, ChangeEvent, FormEvent, memo } from "react";
import { todoType } from "../types";

function TodoForm(props: any) {
  console.log("rendered form");
  const [input, setInput] = useState(props.edit ? props.edit.text : "");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const tempTodo: todoType = {
      id: props.edit ? props.edit.id : Math.floor(Math.random() * 10000),
      text: input,
    };
    props.onSubmit(tempTodo);
    setInput("");
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="todo-form">
        {props.edit ? (
          <>
            <input
              placeholder="Update your item"
              value={input}
              onChange={(event) => handleChange(event)}
              name="text"
              className="todo-input edit"
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className="todo-button edit"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <input
              placeholder="Add todo"
              value={input}
              onChange={(event) => handleChange(event)}
              name="text"
              className="todo-input"
            />
            <button onClick={(e) => handleSubmit(e)} className="todo-button">
              Add todo
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default memo(TodoForm);
