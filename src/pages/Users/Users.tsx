import { useGetUsersQuery } from "./usersSlice";

export default function Users() {
  const { data: users } = useGetUsersQuery();
  console.log(users);
  return <div>Users</div>;
}
