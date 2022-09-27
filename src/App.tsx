import { ApiProvider } from "@reduxjs/toolkit/query/react";

import { Todos } from "./components";
import { todosSlice } from "./components/Todos/todosSlice";

export default function App() {
  return (
    <ApiProvider api={todosSlice}>
      <Todos />
    </ApiProvider>
  );
}
