import { useState,memo } from "react";
import TodoForm from "./TodoForm";
import { todoType } from "../types";

interface propType {
  todos: todoType[];
  deleteTodo: (id: number) => void;
  editTodo: (todo: todoType) => void;
}

const Todo = (props: propType) => {
    console.log("rendered todo")
  const { todos, deleteTodo, editTodo } = props;
  const [edit, setEdit] = useState({
    id: -1,
    text: "",
  });

  const handleEdit = (value: todoType) => {
    editTodo(value);
    setEdit({
      id: -1,
      text: "",
    });
  };

  if (edit.id!==-1) {
    return <TodoForm edit={edit} onSubmit={handleEdit} />;
  }
  const handleDelete=(id:number)=>{
      deleteTodo(id)
  }

  return (
    <>
      {todos.map((todo, index) => (
        <div
          className= "todo-row"
          key={index}
        >
          <div key={todo.id} >
            {todo.text}
          </div>
          <div className="icons">
            <button
              onClick={()=>handleDelete(todo.id)}
              className="delete-icon"
            >Delete</button>
            <button
              onClick={() => setEdit({ id: todo.id, text: todo.text })}
              className="edit-icon"
            >Edit</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default memo(Todo);
