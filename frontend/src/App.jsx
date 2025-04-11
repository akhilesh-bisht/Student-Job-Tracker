import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboards";
import AddJob from "./pages/AddJob";

import LoginPage from "./pages/Login";
import SignupPage from "./pages/Sign";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes under Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="add" element={<AddJob />} />
      </Route>
    </Routes>
  );
}

export default App;
