import Post from "../../pages/Posts/model";
import { apiSlice } from "./app";

type PostsResponse = Post[];

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => "posts",
      providesTags: ["Post"]
    })
  })
});

export const { useGetPostsQuery } = postsApi;
