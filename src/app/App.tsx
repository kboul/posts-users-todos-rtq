import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import { Navbar, Todos } from "../components";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/todos" element={<Todos />} />
          <Route path="*" element={<Navigate to="/todos" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
