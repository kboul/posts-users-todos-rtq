import { api } from "../../app/services/app";
import User from "./model";

type UsersResponse = User[];

export const usersSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => "users"
    })
  })
});

export const { useGetUsersQuery } = usersSlice;
