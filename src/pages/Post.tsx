import { useParams } from "react-router-dom";

import { Button, Form, Input } from "../components";

const className = {
  container: "flex justify-center",
  form: "w-3/12"
};

export default function Post() {
  const { postId } = useParams();
  console.log(postId);

  const handleSumbit = () => {};
  return (
    <div className={className.container}>
      <Form classname={className.form} onSubmit={handleSumbit}>
        <Input label="title" onChange={() => {}} value="" />
        <Input label="author" onChange={() => {}} value="" />
        <Input label="body" onChange={() => {}} value="" />
        <Button label="Edit post" />
      </Form>
    </div>
  );
}
