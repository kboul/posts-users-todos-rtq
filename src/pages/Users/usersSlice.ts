import { api } from "../../app/services/app";
import User from "./model";

type PostsResponse = User[];

export const usersSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<PostsResponse, void>({
      query: () => "users",
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "User", id } as const)),
        { type: "User" as const, id: "LIST" }
      ]
    })
  })
});

export const { useGetUsersQuery } = usersSlice;
