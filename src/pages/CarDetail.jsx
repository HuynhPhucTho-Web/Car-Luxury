import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./CarDetail.css";

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/car")
      .then((res) => {
        const found = res.data.find((item) => String(item.id) === id);
        if (found) {
          setCar(found);
          setError(null);
        } else {
          setError("Không tìm thấy xe!");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Lỗi khi tải dữ liệu!");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Đang tải...</div>;
  if (error || !car) return <div className="text-center mt-5 text-danger">{error}</div>;

  const labelMap = {
    name: "Tên xe",
    brand: "Thương hiệu",
    type: "Dòng xe",
    engine: "Động cơ",
    powerHP: "Công suất (HP)",
    acceleration: "Tăng tốc (0-100km/h)",
    topSpeed: "Tốc độ tối đa",
    priceUSD: "Giá (USD)",
    year: "Năm sản xuất",
    fuelType: "Nhiên liệu",
    transmission: "Hộp số",
    seats: "Số chỗ",
    originCountry: "Xuất xứ",
    description: "Mô tả",
  };

  const excludedFields = ["image", "isNew", "id"];

  return (
    <Container className="mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">← Quay lại</Link>
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Img
              variant="top"
              src={car.image}
              alt={car.name}
              style={{
                objectFit: "cover",
                maxHeight: "450px",
                padding: "1rem",
                background: "#f8f9fa",
              }}

            />
            <div className="div-image">
              {car.subImages && car.subImages.length > 0 ? (
                car.subImages.map((subImage, index) => (
                  <img
                    key={index}
                    src={subImage}
                    alt={`${car.name} Sub ${index + 1}`}
                  />
                ))
              ) : (
                <p>Không có ảnh phụ</p>
              )}
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <div className="product-detail">
            <h2 className="mb-3 text-dark fw-bold">{car.name}</h2>
            <h4 className="mb-3 text-muted">{car.brand} - {car.type}</h4>
            <h3 className="mb-4 text-danger fw-bold">
              {car.priceUSD.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </h3>

            <div className="mb-3">
              <span className={`badge ${car.isNew ? "bg-success" : "bg-secondary"}`}>
                {car.isNew ? "Xe mới" : "Đã qua sử dụng"}
              </span>
            </div>

            <p className="text-muted">{car.description}</p>

            <div className="d-flex gap-3 mb-4">
              <Button variant="success" className="px-4">Mua Ngay</Button>
              <Button variant="outline-dark">Thêm vào giỏ</Button>
              <Button variant="outline-dark">Mua Trả Góp</Button>
            </div>

            <div className="mb-4">
              <strong>Liên hệ tư vấn:</strong>{" "}
              <a href="tel:0936096900" className="text-decoration-none fw-bold text-primary">0936 096 900</a>
            </div>
          </div>
        </Col>
      </Row>

      <hr className="my-5" />

      <Row>
        <Col>
          <h4 className="mb-4 text-dark fw-bold">Thông số kỹ thuật</h4>
          <Row className="g-4">
            {Object.entries(car)
              .filter(([key]) => !excludedFields.includes(key))
              .map(([key, value], idx) => (
                <Col md={6} key={idx}>
                  <div className="p-3 bg-light rounded border">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{labelMap[key] || key}</span>
                      <strong className="text-dark">{String(value)}</strong>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CarDetail;
