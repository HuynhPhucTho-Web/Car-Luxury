import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CarList from "./pages/CarList";
import CarDetail from "./pages/CarDetail";
import MaconeNavbar from "./components/Navbar";
import CarCRUD from "./CarCRUD";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import "./App.css";

// ✅ Protected Route Component
const ProtectedRoute = ({ children, requiredRole, user }) => {
  if (!user) return <Navigate to="/" replace />;

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/cars" replace />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(null);

  // ✅ Check for saved login state
  useEffect(() => {
    const savedUser = localStorage.getItem("macone_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("macone_user");
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("macone_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("macone_user");
  };

  return (
    <BrowserRouter>
      {user && <MaconeNavbar user={user} onLogout={handleLogout} />}
      <Routes>
        {/* Đăng nhập / Trang chủ */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/cars" replace /> : <Login onLogin={handleLogin} />
          }
        />

        {/* Danh sách siêu xe */}
        <Route
          path="/cars"
          element={
            <ProtectedRoute user={user}>
              <CarList user={user} />
            </ProtectedRoute>
          }
        />

        {/* CRUD */}
        <Route
          path="/cars/add"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <CarCRUD />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars/update/:id"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <CarCRUD />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars/delete/:id"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <CarCRUD />
            </ProtectedRoute>
          }
        />

        {/* Chi tiết siêu xe */}
        <Route
          path="/cars/:id"
          element={
            <ProtectedRoute user={user}>
              <CarDetail />
            </ProtectedRoute>
          }
        />

        {/* Redirect nếu không có route khớp */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {user && <Footer />}
    </BrowserRouter>
  );
}

export default App;
