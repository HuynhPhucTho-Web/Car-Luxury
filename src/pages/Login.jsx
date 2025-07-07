import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // Tạo file CSS nếu cần tùy chỉnh riêng

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
      onLogin(foundUser);
      navigate("/cars");
    } else {
      setError("❌ Tài khoản hoặc mật khẩu không đúng!");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <video autoPlay muted loop className="login-video-bg">
        <source src="/videos/loginbackground.mp4" type="video/mp4" />
      </video>
      <div className="login-overlay" />

      <div className="login-card card shadow-lg p-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-white">Login Car-Luxury</h2>
          <p className="text-light small">Cuxury Car Store</p>
        </div>

        {error && <div className="alert alert-danger text-center py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">Account Name</label>
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
            <label htmlFor="password" className="form-label text-white">Account Password</label>
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
            <button type="submit" className="btn btn-primary">LOGIN</button>
          </div>
        </form>

        <div className="mt-3 text-center">
          <button className="btn btn-outline-light btn-sm me-2" onClick={handleRegisterClick}>Register</button>
          <button className="btn btn-danger btn-sm">
            <i className="bi bi-google me-1"></i> Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
