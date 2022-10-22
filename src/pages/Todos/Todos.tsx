import { ChangeEvent, FormEvent, useState } from "react";

import { Button, Form, Input } from "../../components";
import TodosTable from "./TodosTable";
import { useAddTodoMutation, useGetTodosQuery } from "../../app/services/todos";

const className = {
  form: "w-6/12",
  newTodoContainer: "flex justify-center",
  header: "text-xl font-bold my-2",
  content: "flex flex-col",
  loader: "flex h-[100vh] justify-center items-center",
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
    <div className={className.newTodoContainer}>
      <Form classname={className.form} onSubmit={handleSubmit}>
        <Input
          label="todo"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
          value={newTodo}
        />
        <Button label="Add todo" />
      </Form>
    </div>
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
