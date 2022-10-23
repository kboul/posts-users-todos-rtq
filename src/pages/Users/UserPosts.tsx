import { useParams } from "react-router-dom";

export default function UserPosts() {
  const { userId } = useParams();
  const numUserId = Number(userId);
  return <div>UserPosts {numUserId}</div>;
}
