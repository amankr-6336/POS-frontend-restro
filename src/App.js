import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Table from "./pages/Tables/Table";
import Menu from "./pages/Menu/Menu";
import Order from "./pages/Order/Order";
import Login from "./pages/login/Login";
import SignUp from "./pages/singup/SignUp";
import RequireUser from "./utils/RequireUser";
import OnlyifNotLoggedIn from "./utils/OnlyifNotLoggedIn";

function App() {
  return (
    <Routes element={<RequireUser />}>
      <Route path="/" element={<Layout />}>
        <Route path="table" element={<Table />} />
        <Route path="menu" element={<Menu />} />
        <Route path="order" element={<Order />} />
        <Route path="report" />
        <Route path="notification" />
        <Route path="setting" />
      </Route>
      <Route >
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
