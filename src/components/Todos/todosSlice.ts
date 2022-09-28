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
      query: (id: number) => ({
        url: `todos/${id}`,
        method: "DELETE",
        body: id
      })
    })
  })
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todosSlice;
