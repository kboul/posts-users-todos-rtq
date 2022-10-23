import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input, Select } from "../../components";
import User from "../../models";
import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation
} from "../../app/services/posts";
import { getUserName } from "../../utils";
import { useGetUsersQuery } from "../Users/usersSlice";

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

  const { data: users } = useGetUsersQuery();
  const { data: post } = useGetPostQuery(numPostId, { skip: !isEditPost });
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const userIdForEdit =
    post &&
    users?.find((user: User) => user.name === getUserName(users, post?.userId))
      ?.id;

  const [editPost, setEditPost] = useState({
    title: "",
    body: "",
    userId: isEditPost ? userIdForEdit : users && users[0].id
  });

  const { title, body, userId } = editPost;

  useEffect(() => {
    if (post)
      setEditPost({ title: post.title, body: post.body, userId: post.userId });
  }, [post]);

  const buttonDisabled = Boolean(!title || !body || !userId);

  const handlePostAddUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (buttonDisabled) return;

    isEditPost
      ? await updatePost({ id: numPostId, title, body, userId: Number(userId) })
      : await addPost({
          title,
          body,
          userId: Number(userId),
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

  const inputLabel = `${isEditPost ? use : "Enter a new"}`;

  return (
    <>
      <h1 className={className.pageHeader}>{use} post</h1>
      <div className={className.container}>
        <Form classname={className.form}>
          <Input
            label={`${inputLabel} title`}
            name="title"
            onChange={handleChange}
            value={title}
          />
          <Select
            name="userId"
            options={{ data: users ?? [], option: "name", value: "id" }}
            label="Select author"
            onChange={handleChange}
            value={userId}
          />
          <Input
            label={`${inputLabel} content`}
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
