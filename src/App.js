import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="table"  />
        <Route path="menu"  />
        <Route path="order"  />
        <Route path="report"  />
        <Route path="notification"  />
        <Route path="setting"  />
      </Route>
    </Routes>
  );
}

export default App;
