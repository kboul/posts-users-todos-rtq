import Post from "../../pages/Posts/model";
import { api } from "./app";

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      transformResponse: (res: Post[]) =>
        res.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Post", id } as const)),
        { type: "Post" as const, id: "LIST" }
      ]
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Post", id }]
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (post: Post) => ({
        url: "posts",
        method: "POST",
        body: post
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }]
    }),
    updatePost: builder.mutation<Post, Partial<Post>>({
      query: (post: Post) => ({
        url: `posts/${post.id}`,
        method: "PATCH",
        body: { ...post, date: new Date().toISOString() }
      }),
      invalidatesTags: (post) => [{ type: "Post", id: post?.id }]
    }),
    deletePost: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id: number) => ({
        url: `posts/${id}`,
        method: "DELETE",
        body: id
      }),
      invalidatesTags: (post) => [{ type: "Post", id: post?.id }]
    })
  })
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postsApi;
