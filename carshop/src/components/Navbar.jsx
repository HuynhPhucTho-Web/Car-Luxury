import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Carousel, Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // giữ nguyên đường dẫn này
import 'bootstrap/dist/css/bootstrap.min.css';


const CarShopNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false); // ✅ Toggle search
  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" className="car-navbar" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/home">
            <img
              src="/images/logov4.png"
              height="24"
              className="d-inline-block align-top me-2 logo"
              alt="CarShop Logo"
            />
          </Navbar.Brand>

          <Nav className="me-auto gap-4">
            <Nav.Link as={Link} to="/cars/sedan">Sedan</Nav.Link>
            <Nav.Link as={Link} to="/cars/suv">SUV</Nav.Link>
            <Nav.Link as={Link} to="/cars/hatchback">Hatchback</Nav.Link>
            <Nav.Link as={Link} to="/cars/truck">Truck</Nav.Link>
            <Nav.Link as={Link} to="/cars/electric">Electric</Nav.Link>
            <Nav.Link as={Link} to="/cars/luxury">Luxury</Nav.Link>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">

            <Nav.Link href="#cart"><i className="bi bi-cart"></i></Nav.Link>

            {user && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" size="sm" className="ms-3">
                  <i className="bi bi-person-circle me-2"></i>
                  {user.username}
                  {user.role === "admin" && <span className="badge bg-danger ms-2">Admin</span>}
                  {user.role === "staff" && <span className="badge bg-warning text-dark ms-2">Staff</span>}
                  {user.role === "customer" && <span className="badge bg-info text-dark ms-2">Customer</span>}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.ItemText>
                    <small className="text-muted">
                      Tài khoản: {user.username}<br />
                      Vai trò: {user.role === "admin" ? "Quản trị viên" : user.role === "staff" ? "Nhân viên" : "Khách hàng"}
                    </small>
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/panner1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Car-Luxury</h3>
            <p>Siêu xe hiệu năng cao</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/panner8.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Car-Luxury</h3>
            <p>Tốc độ và phong cách Ý</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/panner9.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Car-Luxury</h3>
            <p>Trải nghiệm đường đua trên phố</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/panner10.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Car-Luxury</h3>
            <p>Siêu xe hiệu năng cao</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/panner12.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Car-Luxury</h3>
            <p>Siêu xe hiệu năng cao</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </>
  );
};

export default CarShopNavbar;
