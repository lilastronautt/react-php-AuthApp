import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import InitialPage from "./components/InitialPage";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <>
          <Route path="/*" element={<InitialPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin/panel" element={<AdminPanel />} />
        </>
      </Routes>
    </Router>
  );
}

export default App;
