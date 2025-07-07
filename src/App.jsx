import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"; // ✅ Login page
import CarList from "./pages/CarList"; // ✅ Car list
import CarDetail from "./pages/CarDetail"; // (nếu có)
import Navbar from "./components/Navbar"; // (nếu có)
import Footer from "./components/Footer"; // (nếu có)
import CarCRUD from "./CarCRUD"; // (nếu có)

const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  // Kiểm tra login từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("macone_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("macone_user");
      }
    }
  }, []);

  const handleLogin = (data) => {
    setUser(data);
    localStorage.setItem("macone_user", JSON.stringify(data));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("macone_user");
  };

  return (
    <BrowserRouter>
      {user && <Navbar user={user} onLogout={handleLogout} />}

      <Routes>
        {/* Login - Trang chủ */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/cars" replace /> : <Login onLogin={handleLogin} />
          }
        />

        {/* Car list (bắt buộc login) */}
        <Route
          path="/cars"
          element={
            <ProtectedRoute user={user}>
              <CarList />
            </ProtectedRoute>
          }
        />

        {/* Chi tiết nếu có */}
        <Route
          path="/cars/:id"
          element={
            <ProtectedRoute user={user}>
              <CarDetail />
            </ProtectedRoute>
          }
        />

        {/* Chức năng thêm/sửa/xóa nếu là admin */}
        <Route
          path="/cars/add"
          element={
            <ProtectedRoute user={user}>
              <CarCRUD />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {user && <Footer />}
    </BrowserRouter>
  );
}

export default App;
