import { createSelector } from "@reduxjs/toolkit";

import { api } from "../../app/services/app";
import User from "../../models";

type UsersResponse = User[];

export const usersSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => "users"
    })
  })
});

export const { useGetUsersQuery } = usersSlice;

const selectAllUsersResult = usersSlice.endpoints.getUsers.select();

export const selectAllUsers = createSelector(
  selectAllUsersResult,
  (usersResult) => usersResult.data
);
