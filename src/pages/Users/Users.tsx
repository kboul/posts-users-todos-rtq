import { useGetUsersQuery } from "./usersSlice";

export default function Users() {
  const { data: users } = useGetUsersQuery();

  return <div>Users</div>;
}
