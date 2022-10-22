import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from "../components";
import {
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation
} from "../app/services/posts";
import { getUserName } from "../utils";
import { selectAllUsers } from "./Users/usersSlice";

const className = {
  pageHeader: "flex justify-center font-bold text-xl mt-4",
  container: "flex justify-center",
  form: "w-6/12"
};

interface PostProps {
  use: string;
}

export default function Post({ use }: PostProps) {
  const { postId } = useParams();
  const numPostId = Number(postId);
  const navigate = useNavigate();

  const allUsers = useSelector(selectAllUsers);
  const { data: post } = useGetPostQuery(numPostId);
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [editPost, setEditPost] = useState({ title: "", body: "" });

  const { title, body } = editPost;

  useEffect(() => {
    if (!post) return;
    setEditPost({ title: post.title, body: post.body });
  }, [post]);

  const buttonDisabled = Boolean(!title || !body);

  const handlePostUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (buttonDisabled) return;

    await updatePost({ id: numPostId, title, body });
    navigate("/posts");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePostDelete = () => {
    deletePost(numPostId);
    navigate("/posts");
  };

  if (post)
    return (
      <>
        <h1 className={className.pageHeader}>{use} post</h1>
        <div className={className.container}>
          <Form classname={className.form}>
            <Input
              label="title"
              name="title"
              onChange={handleChange}
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
              name="body"
              onChange={handleChange}
              textarea
              value={body}
            />
            <Button
              disabled={buttonDisabled}
              label={`${use} post`}
              onClick={handlePostUpdate}
            />
            <Button label="Delete post" onClick={handlePostDelete} />
          </Form>
        </div>
      </>
    );
  return null;
}
