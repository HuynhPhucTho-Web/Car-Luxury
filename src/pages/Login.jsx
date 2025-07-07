import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername("");
    setPassword("");
    setError("");

    // ✅ Giả lập fetch từ server JSON (có thể thay URL nếu bạn dùng JSON Server)
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setError("Không thể tải dữ liệu người dùng!"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!users) {
      setError("Dữ liệu người dùng chưa được tải!");
      return;
    }

    const allUsers = [
      ...(users.admin || []),
      ...(users.staff || []),
      ...(users.customers || [])
    ];

    const foundUser = allUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      onLogin(foundUser); // Lưu cả object gồm username, role,...
      navigate("/cars");
    } else {
      setError("❌ Tài khoản hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: "linear-gradient(135deg, #f0f4ff, #d9e8ff)" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "1rem" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Đăng Nhập Hệ Thống</h2>
          <p className="text-muted small">Quản lý siêu xe cao cấp</p>
        </div>

        {error && <div className="alert alert-danger text-center py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Tài khoản
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Nhập tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Đăng Nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
