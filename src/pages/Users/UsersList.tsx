import { Link } from "react-router-dom";

import { useGetUsersQuery } from "./usersSlice";

const className = {
  pageHeader: "flex justify-center font-bold text-xl m-4",
  list: "flex justify-center"
};

export default function UsersList() {
  const { data: users } = useGetUsersQuery();

  const renderedUsers = users?.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2 className={className.pageHeader}>Users</h2>

      <div className={className.list}>
        <ul>{renderedUsers}</ul>
      </div>
    </section>
  );
}
