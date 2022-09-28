import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Todo from "./model";

type TodosResponse = Todo[];

const tagTypes = ["Todos"];

export const todosSlice = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/"
  }),
  tagTypes,
  endpoints: (builder) => ({
    getTodos: builder.query<TodosResponse, void>({
      query: () => "todos",
      transformResponse: (res: Todo[]) => {
        const lastIndex = res.findIndex(
          (todo) => todo.id === res[res.length - 1].id
        );
        res.unshift(res.splice(lastIndex, 1)[0]);
        return res;
      },
      providesTags: tagTypes
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo: Todo) => ({
        url: "todos",
        method: "POST",
        body: todo
      }),
      invalidatesTags: tagTypes
    }),
    updateTodo: builder.mutation({
      query: (todo: Todo) => ({
        url: `todos/${todo.id}`,
        method: "PATCH",
        body: todo
      }),
      invalidatesTags: tagTypes
    }),
    deleteTodo: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `todos/${id}`,
        method: "DELETE",
        body: id
      }),
      invalidatesTags: tagTypes
    })
  })
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todosSlice;
