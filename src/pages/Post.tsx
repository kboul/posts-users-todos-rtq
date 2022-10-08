import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from "../components";
import { useGetPostQuery, useUpdatePostMutation } from "../app/services/posts";
import { getUserName } from "../utils";
import { selectAllUsers } from "./Users/usersSlice";

const className = {
  pageHeader: "flex justify-center font-bold text-xl mt-4",
  container: "flex justify-center",
  form: "w-3/12"
};

interface PostProps {
  use: string;
}

export default function Post({ use }: PostProps) {
  const { postId } = useParams();
  const navigate = useNavigate();

  console.log(postId);

  const allUsers = useSelector(selectAllUsers);
  const { data: post } = useGetPostQuery(Number(postId));
  const [updatePost] = useUpdatePostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title && body) {
      await updatePost({ id: Number(postId), title, body });
      navigate("/posts");
    }
  };

  if (post)
    return (
      <>
        <h1 className={className.pageHeader}>{use} post</h1>
        <div className={className.container}>
          <Form classname={className.form} onSubmit={handleSumbit}>
            <Input
              label="title"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              value={title}
            />
            <Input
              disabled
              label="author"
              onChange={() => {}}
              value={getUserName(allUsers, post.userId) ?? ""}
            />
            <Input
              label="content"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBody(e.target.value)
              }
              value={body}
            />
            <Button label={`${use} post`} />
          </Form>
        </div>
      </>
    );
  return null;
}
