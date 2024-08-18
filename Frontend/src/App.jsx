import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Shop from "./components/Shop";
import ThemeSwitcher from "./components/ThemeSwiter";
import AdminProductForm from "./components/AdminProductForm";
import Menu from "./components/Menu";
import CategoryForm from "./components/AdminCategoryForm";
import "./index.css";
import "./styles.css";

const AppContent = () => {
  const location = useLocation();
  const showMenu = !["/login", "/register"].includes(location.pathname);
  return (
    <div>
      {showMenu && <Menu />}
      <div className="App">
        <ThemeSwitcher />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/category/form" element={<CategoryForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Shop />} />
          <Route path="/admin/products" element={<AdminProductForm />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
