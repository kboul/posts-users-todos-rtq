import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";

import { Navbar, Todos } from "./components";
import { todosSlice } from "./components/Todos/todosSlice";

export default function App() {
  return (
    <ApiProvider api={todosSlice}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/todos" element={<Todos />} />
          <Route path="*" element={<Navigate to="/todos" replace />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}
