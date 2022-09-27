import { useGetTodosQuery } from "./todosSlice";
import TodosTable from "./TodosTable";

export default function Todos() {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTodosQuery();

  let content;

  if (isLoading)
    content = (
      <p className="flex h-[100vh] justify-center items-center">Loading...</p>
    );
  if (isSuccess)
    content = (
      <div className="flex flex-col">
        <h1 className="text-xl font-bold my-2">Todo List</h1>
        <TodosTable todos={todos} />
      </div>
    );
  if (isError) content = <p>{error}</p>;

  return (
    <div className="flex justify-center items-center">
      <>{content}</>
    </div>
  );
}
