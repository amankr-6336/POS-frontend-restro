import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Table from "./pages/Tables/Table";
import Menu from "./pages/Menu/Menu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="table" element={<Table/>}  />
        <Route path="menu"  element={<Menu/>} />
        <Route path="order"  />
        <Route path="report"  />
        <Route path="notification"  />
        <Route path="setting"  />
      </Route>
    </Routes>
  );
}

export default App;
