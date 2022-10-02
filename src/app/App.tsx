import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import { Navbar } from "../components";
import { Posts, Todos, Users } from "../pages";
import { usersSlice } from "../pages/Users/usersSlice";
import store from "./store";

export default function App() {
  store.dispatch(usersSlice.endpoints.getUsers.initiate());

  return (
    <Provider store={store}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
