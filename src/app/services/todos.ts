import Todo from "../../components/Todos/model";
import { apiSlice } from "./app";

type TodosResponse = Todo[];

export const todosApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<TodosResponse, void>({
      query: () => "todos",
      transformResponse: (res: Todo[]) => {
        const lastIndex = res.findIndex(
          (todo) => todo.id === res[res.length - 1].id
        );
        res.unshift(res.splice(lastIndex, 1)[0]);
        return res;
      },
      providesTags: ["Todo"]
    }),
    addTodo: build.mutation<Todo, Partial<Todo>>({
      query: (todo: Todo) => ({
        url: "todos",
        method: "POST",
        body: todo
      }),
      invalidatesTags: ["Todo"]
    }),
    updateTodo: build.mutation({
      query: (todo: Todo) => ({
        url: `todos/${todo.id}`,
        method: "PATCH",
        body: todo
      }),
      invalidatesTags: ["Todo"]
    }),
    deleteTodo: build.mutation({
      query: ({ id }: { id: number }) => ({
        url: `todos/${id}`,
        method: "DELETE",
        body: id
      }),
      invalidatesTags: ["Todo"]
    })
  })
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todosApi;