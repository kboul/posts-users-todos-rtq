import { FormEvent, useState } from "react";

import { useAddTodoMutation, useGetTodosQuery } from "../../app/services/todos";
import TodosTable from "./TodosTable";

const className = {
  header: "text-xl font-bold my-2",
  form: "flex flex-col mt-2",
  content: "flex flex-col",
  loader: "flex h-[100vh] justify-center items-center",
  label: "mb-1 text-xs tracking-wide text-gray-600",
  input:
    "text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border w-4/12 py-2 focus:outline-none",
  button:
    "flex w-4/12 justify-center my-2 text-black text-sm px-4 py-2 border rounded-2xl text-center bg-blue-300 hover:bg-blue-400",
  container: "flex justify-center items-center"
};

export default function Todos() {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();

  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo) return;
    addTodo({
      userId: todos && todos[todos?.length - 1].id + 1,
      title: newTodo,
      completed: false
    });
    setNewTodo("");
  };

  const newTodoContent = (
    <form className={className.form} onSubmit={handleSubmit}>
      <label htmlFor="new-todo" className={className.label}>
        Enter a new todo item
      </label>
      <input
        className={className.input}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
        value={newTodo}
      />
      <button className={className.button}>Add</button>
    </form>
  );

  let content;
  if (isLoading) content = <p className={className.loader}>Loading...</p>;
  if (isSuccess)
    content = (
      <div className={className.content}>
        {newTodoContent}
        <h1 className={className.header}>Todo List</h1>
        <TodosTable todos={todos} />
      </div>
    );
  if (isError) content = error;

  return (
    <div className={className.container}>
      <>{content}</>
    </div>
  );
}
