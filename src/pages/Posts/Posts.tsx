import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useGetPostsQuery } from "../../app/services/posts";
import { formatDate, truncate } from "../../utils";
import User from "../Users/model";
import { selectAllUsers } from "../Users/usersSlice";
import Post from "./model";

const className = {
  container:
    "justify-between flex flex-row gap-4 flex-wrap after:content-[''] after:flex-auto p-[5px]",
  card: "relative border border-gray-400 shadow-md bg-white w-[270px] h-[150px] rounded-md p-2 flex flex-col", // two last properties needed to apply the last styles on price to be at the bottom of the card
  title: "font-bold text-center",
  author: "text-center from-neutral-400",
  body: "mx-2 my-2 text-sm flex-1",
  postPageLink: "text-sm",
  date: "text-xs italic items-center flex"
};

export default function Posts() {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();
  const allUsers = useSelector(selectAllUsers);

  const getUser = useCallback(
    (userId: number) =>
      allUsers?.find((user: User) => user.id === userId)?.name,
    [allUsers]
  );

  let content;
  if (isLoading) content = <p>Loading..</p>;
  if (isSuccess)
    content = (
      <div className={className.container}>
        {posts?.map((post: Post) => (
          <div className={className.card} key={post.id}>
            <p className={className.title}>{truncate(post.title, 20)}</p>
            <p className={className.author}>by {getUser(post.userId)}</p>
            <p className={className.body} title={post.body}>
              {truncate(post.body, 50)}
            </p>
            <div className="flex justify-between">
              <Link to={`/posts/${post.id}`}>
                <button className={className.postPageLink}>View post</button>
              </Link>
              {post?.date && (
                <span className={className.date}>{formatDate(post?.date)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  if (isError) content = <p>{error.toString()}</p>;

  return <>{content}</>;
}
