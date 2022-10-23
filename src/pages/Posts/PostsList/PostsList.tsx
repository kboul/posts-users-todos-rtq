import { Link, useNavigate } from "react-router-dom";

import { useGetPostsQuery } from "../../../app/services/posts";
import { Button } from "../../../components";
import { formatDate, getUserName, truncate } from "../../../utils";
import { useGetUsersQuery } from "../../Users/usersSlice";
import Post from "./model";

const className = {
  container:
    "justify-between flex flex-row gap-4 flex-wrap after:content-[''] after:flex-auto p-[4px]",
  card: "relative border border-gray-400 shadow-md bg-white w-[270px] h-[150px] rounded-md p-2 flex flex-col", // two last properties needed to apply the last styles on price to be at the bottom of the card
  title: "font-bold text-center",
  author: "text-center from-neutral-400",
  body: "mx-2 my-2 text-sm flex-1",
  editBtnDateContainer: "flex justify-between",
  btnsContainer: "flex",
  editBtn: "text-xs",
  date: "text-xs italic items-center flex",
  addPostButton: "m-1"
};

export default function PostsList() {
  const navigate = useNavigate();
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();
  const { data: users } = useGetUsersQuery();

  const handlePostAdd = () => navigate("/addPost");

  let content;
  if (isLoading) content = <p>Loading..</p>;
  if (isSuccess)
    content = (
      <>
        <Button
          classname={className.addPostButton}
          label="Add Post"
          onClick={handlePostAdd}
        />
        <div className={className.container}>
          {posts?.map((post: Post) => (
            <div className={className.card} key={post.id}>
              <p className={className.title} title={post.title}>
                {truncate(post.title, 25)}
              </p>
              <p className={className.author}>
                by {getUserName(users, post.userId)}
              </p>
              <p className={className.body} title={post.body}>
                {truncate(post.body, 50)}
              </p>
              <div className={className.editBtnDateContainer}>
                <Link to={`/posts/${post.id}`}>
                  <button className={className.editBtn}>Edit</button>
                </Link>
                {post?.date && (
                  <span className={className.date}>
                    {formatDate(post?.date)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  if (isError) content = <p>{error.toString()}</p>;

  return <>{content}</>;
}
