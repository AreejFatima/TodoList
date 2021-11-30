/* eslint-disable react-hooks/exhaustive-deps */
import { useState, memo, ChangeEvent, useMemo } from "react";
import { todoType } from "../types";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  console.log("rendered list");
  const [todos, setTodos] = useState<todoType[]>([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSearch = () => {
    setSearch(text);
  };

  const filteredList = useMemo(
    () =>
      todos.filter((todo) => {
        console.log("Filter function is running ...");
        return todo.text.toLowerCase().includes(search.toLowerCase());
      }),
    [search]
  );
  console.log(filteredList);

  const addTodo = (todo: todoType) => {
    if (todo.text) {
      const newTodoList = [todo, ...todos];
      setTodos(newTodoList);
    }
  };

  const editTodo = (editedTodo: todoType): void => {
    if (editedTodo.text) {
      setTodos((prev) =>
        prev.map((item) => (item.id === editedTodo.id ? editedTodo : item))
      );
    }
  };

  const deleteTodo = (id: number): void => {
    const filteredTodos = [...todos].filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div>
      <h1>To-do List</h1>
      <input
        className="todo-input"
        style={{ marginBottom: "4px", marginTop: "6px" }}
        value={text}
        onChange={handleText}
      />
      <button className="todo-button" onClick={handleSearch}>
        Search
      </button>

      <TodoForm onSubmit={addTodo} />
      {filteredList.length === 0 ? (
        <Todo todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
      ) : (
        <Todo
          todos={filteredList}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      )}
    </div>
  );
}

export default memo(TodoList);
