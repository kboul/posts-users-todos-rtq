import Todo from "./model";

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
  input: "w-4 h-4"
};

export default function TodosTable({ todos }: TodosTableProps) {
  return (
    <div className={className.tableWrapper}>
      <table className={className.table}>
        <thead className={className.thead}>
          <tr>
            <th className={className.th}>Id</th>
            <th className={className.th}>Title</th>
            <th className={className.th}>Completed</th>
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
                  onChange={() => {}}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Source: https://flowbite.com/docs/components/tables/
