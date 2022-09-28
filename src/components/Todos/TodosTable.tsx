import { ChangeEvent } from "react";
import Todo from "./model";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "./todosSlice";

interface TodosTableProps {
  todos: Todo[];
}

const className = {
  tableWrapper: "overflow-x-auto relative",
  table: "w-full text-sm text-left text-gray-500 dark:text-gray-400",
  thead:
    "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
  th: "py-3 px-6",
  td: "py-4 px-6",
  tbodyTr: "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
  inputTd: "flex justify-center items-center",
  input: "w-4 h-4",
  deleteButton:
    "flex w-full justify-center text-white text-sm px-4 py-2 border rounded-2xl text-center bg-blue-300 hover:bg-blue-400"
};

export default function TodosTable({ todos }: TodosTableProps) {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleCompletedChange = (
    e: ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    updateTodo({ ...todo, completed: e.target.checked });
  };

  const handleDeleteClick = (todoId: number) => () =>
    deleteTodo({ id: todoId });

  return (
    <div className={className.tableWrapper}>
      <table className={className.table}>
        <thead className={className.thead}>
          <tr>
            <th className={className.th}>Id</th>
            <th className={className.th}>Title</th>
            <th className={className.th}>Completed</th>
            <th className={className.th}></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: Todo) => (
            <tr key={todo.id} className={className.tbodyTr}>
              <td className={className.td}>{todo.id}</td>
              <td className={className.td}>{todo.title}</td>
              <td className={`${className.td} ${className.inputTd}`}>
                <input
                  className={className.input}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => handleCompletedChange(e, todo)}
                />
              </td>
              <td>
                <button
                  className={className.deleteButton}
                  onClick={handleDeleteClick(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Source: https://flowbite.com/docs/components/tables/
