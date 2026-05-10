import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Layout from "./components/Layout";
function App() {
  return (
   <Routes>

  <Route
    path="/"
    element={<Login />}
  />

  <Route
    path="/register"
    element={<Register />}
  />

  <Route element={<Layout />}>

    <Route
      path="/dashboard"
      element={<Dashboard />}
    />

    <Route
      path="/projects"
      element={<Projects />}
    />

    <Route
      path="/tasks"
      element={<Tasks />}
    />

    <Route
      path="/team"
      element={<Team />}
    />

  </Route>

</Routes>
    
  );
}

export default App;