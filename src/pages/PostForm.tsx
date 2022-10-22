import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from "../components";
import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation
} from "../app/services/posts";
import { getUserName } from "../utils";
import { selectAllUsers } from "./Users/usersSlice";

const className = {
  pageHeader: "flex justify-center font-bold text-xl mt-4",
  container: "flex justify-center",
  form: "w-6/12",
  buttonContainer: "flex justify-between",
  button: "w-4/12"
};

interface PostFormProps {
  use: string;
}

export default function PostForm({ use }: PostFormProps) {
  const { postId } = useParams();
  const numPostId = Number(postId);
  const navigate = useNavigate();

  const isEditPost = use === "Edit";

  const allUsers = useSelector(selectAllUsers);
  const { data: post } = useGetPostQuery(numPostId, { skip: !isEditPost });
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [editPost, setEditPost] = useState({ title: "", body: "" });

  const { title, body } = editPost;

  useEffect(() => {
    if (post) setEditPost({ title: post.title, body: post.body });
  }, [post]);

  const buttonDisabled = Boolean(!title || !body);

  const handlePostAddUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (buttonDisabled) return;

    isEditPost
      ? await updatePost({ id: numPostId, title, body })
      : await addPost({
          title,
          body,
          userId: 2,
          id: Math.floor(Math.random() * 1001),
          date: new Date().toISOString()
        });

    navigate("/posts");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePostDelete = () => {
    deletePost(numPostId);
    navigate("/posts");
  };

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
          {isEditPost && post && (
            <Input
              disabled
              label="author"
              onChange={() => {}}
              value={getUserName(allUsers, post.userId) ?? ""}
            />
          )}
          <Input
            label="content"
            name="body"
            onChange={handleChange}
            textarea
            value={body}
          />
          <div className={className.buttonContainer}>
            <Button
              classname={className.button}
              disabled={buttonDisabled}
              label={`${use} post`}
              onClick={handlePostAddUpdate}
            />
            {isEditPost && (
              <Button
                classname={className.button}
                label="Delete post"
                onClick={handlePostDelete}
              />
            )}
          </div>
        </Form>
      </div>
    </>
  );
}
