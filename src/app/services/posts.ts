import Post from "../../pages/Posts/model";
import { apiSlice } from "./app";

type PostsResponse = Post[];

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => "posts",
      transformResponse: (res: Post[]) =>
        res.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
      providesTags: ["Post"]
    })
  })
});

export const { useGetPostsQuery } = postsApi;
