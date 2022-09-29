import { useGetPostsQuery } from "../../app/services/posts";
import { truncate } from "../../utils";
import Post from "./model";

const className = {
  container:
    "justify-between flex flex-row gap-4 flex-wrap after:content-[''] after:flex-auto p-4",
  card: "relative border border-gray-400 shadow-md bg-white w-[270px] h-[120px] rounded-md p-2 flex flex-col", // two last properties needed to apply the last styles on price to be at the bottom of the card
  title: "font-bold text-center",
  body: "mx-2 my-2 text-sm"
};

export default function Posts() {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();

  let content;
  if (isLoading) content = <p>Loading..</p>;
  if (isSuccess)
    content = (
      <div className={className.container}>
        {posts?.map((post: Post) => (
          <div className={className.card} key={post.id}>
            <h2 className={className.title}>{truncate(post.title, 20)}</h2>
            <p className={className.body} title={post.body}>
              {truncate(post.body, 90)}
            </p>
          </div>
        ))}
      </div>
    );

  if (isError) content = error;

  return <>{content}</>;
}
