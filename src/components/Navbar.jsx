import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Carousel,
  NavDropdown
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // giữ nguyên đường dẫn này
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";


const CarShopNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };
  const [showMain, setShowMain] = useState(false);
  const [showSedan, setShowSedan] = useState(false);
  const [showSuv, setShowSuv] = useState(false);
  const [showElectric, setShowElectric] = useState(false);
  const [showLuxury, setShowLuxury] = useState(false);
  const [showHatchback, setShowHatchback] = useState(false);
  const [showTruck, setShowTruck] = useState(false);


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

          <Nav className="me-auto gap-4 text-white">
            <NavDropdown
              title="Vehicle type"
              show={showMain}
              onMouseEnter={() => setShowMain(true)}
              onMouseLeave={() => {
                setShowMain(false);
                setShowSedan(false);
                setShowSuv(false);
                setShowElectric(false);
                setShowLuxury(false);
                setShowHatchback(false);
                setShowTruck(false);
              }}
              className="custom-dropdown text-white"
            >
              {/* Sedan */}
              <NavDropdown
                title="Sedan"
                drop="end"
                show={showSedan}
                onMouseEnter={() => setShowSedan(true)}
                onMouseLeave={() => setShowSedan(false)}
              >
                <NavDropdown.Item as={Link} to="/cars/sedan/luxury">Luxury Sedan</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/sedan/standard">Standard Sedan</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/sedan/compact">Compact Sedan</NavDropdown.Item>
              </NavDropdown>

              {/* SUV */}
              <NavDropdown
                title="SUV"
                drop="end"
                show={showSuv}
                onMouseEnter={() => setShowSuv(true)}
                onMouseLeave={() => setShowSuv(false)}
              >
                <NavDropdown.Item as={Link} to="/cars/suv/offroad">Offroad SUV</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/suv/city">City SUV</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/suv/fullsize">Full-size SUV</NavDropdown.Item>
              </NavDropdown>

              {/* Hatchback */}
              <NavDropdown
                title="Hatchback"
                drop="end"
                show={showHatchback}
                onMouseEnter={() => setShowHatchback(true)}
                onMouseLeave={() => setShowHatchback(false)}
              >
                <NavDropdown.Item as={Link} to="/cars/hatchback/compact">Compact Hatchback</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/hatchback/sport">Sport Hatchback</NavDropdown.Item>
              </NavDropdown>

              {/* Truck */}
              <NavDropdown
                title="Truck"
                drop="end"
                show={showTruck}
                onMouseEnter={() => setShowTruck(true)}
                onMouseLeave={() => setShowTruck(false)}
              >
                <NavDropdown.Item as={Link} to="/cars/truck/utility">Utility Truck</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/truck/luxury">Luxury Truck</NavDropdown.Item>
              </NavDropdown>

              {/* Electric */}
              <NavDropdown
                title="Electric"
                drop="end"
                show={showElectric}
                onMouseEnter={() => setShowElectric(true)}
                onMouseLeave={() => setShowElectric(false)}
              >
                <NavDropdown.Item as={Link} to="/cars/electric/sedan">Electric Sedan</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/electric/suv">Electric SUV</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/electric/hatchback">Electric Hatchback</NavDropdown.Item>
              </NavDropdown>

              {/* Luxury */}
              <NavDropdown
                title="Luxury"
                drop="end"
                show={showLuxury}
                onMouseEnter={() => setShowLuxury(true)}
                onMouseLeave={() => setShowLuxury(false)}
              >
                <NavDropdown.Item as={Link} to="/cars/luxury/sedan">Luxury Sedan</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/luxury/suv">Luxury SUV</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cars/luxury/coupe">Luxury Coupe</NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>

          </Nav>

          <Nav className="ms-auto d-flex align-items-center">

            <Nav.Link href="#cart"><i className="bi bi-cart"></i></Nav.Link>

            {user && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" size="sm" className="ms-3 text-dark">
                  <i className="bi bi-person-circle me-2 person-profile"></i>
                  {user.fullName} {/* ✅ Sử dụng fullName ở đây */}
                  {user.role === "admin" && <span className="badge bg-danger text-white ms-2">Admin</span>}
                  {user.role === "staff" && <span className="badge bg-warning text-white ms-2">Staff</span>}
                  {user.role === "customer" && <span className="badge bg-info text-white ms-2">Customer</span>}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.ItemText>
                    <small className="text-white">
                      Họ tên: {user.fullName}<br />
                      Tài khoản: {user.username}<br />
                      Vai trò: {user.role === "admin" ? "Quản trị viên" : user.role === "staff" ? "Nhân viên" : "Khách hàng"}
                    </small>
                  </Dropdown.ItemText>


                  <Dropdown.Divider />

                  {/* Các mục thao tác riêng biệt */}
                  <Dropdown.Item>
                    <i className="bi bi-cart me-2"></i>Giỏ hàng
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="bi bi-person-circle me-2"></i>Hồ sơ cá nhân
                  </Dropdown.Item>
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
          <video
            className="d-block w-100"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/videocar1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Carousel.Caption>
            <h3>Car-Luxury</h3>
            <p>Siêu xe hiệu năng cao</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <video
            className="d-block w-100"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/videocar2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Carousel.Caption>
            <h3>Car-Luxury</h3>
            <p>Hiệu suất tốt</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <video
            className="d-block w-100"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/videocar3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Carousel.Caption>
            <h3>Car-Luxury</h3>
            <p>Đầy đủ tính năng</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <video
            className="d-block w-100"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/videocar4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Carousel.Caption>
            <h3>Car-Luxury</h3>
            <p>An toàn tuyệt đối</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


    </>
  );
};

export default CarShopNavbar;
