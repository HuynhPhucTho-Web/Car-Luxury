import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarList.css";

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu:", err);
        setCars([]);
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchSearch = car.name?.toLowerCase().includes(search.toLowerCase());
    const matchType = type === "" || car.type === type;

    let matchPrice = true;
    const price = car.priceUSD;
    if (priceRange === "under200k") matchPrice = price < 200000;
    else if (priceRange === "200k-500k") matchPrice = price >= 200000 && price <= 500000;
    else if (priceRange === "over500k") matchPrice = price > 500000;

    return matchSearch && matchType && matchPrice;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "price-asc") return a.priceUSD - b.priceUSD;
    if (sortBy === "price-desc") return b.priceUSD - a.priceUSD;
    if (sortBy === "new") return b.isNew - a.isNew;
    if (sortBy === "old") return a.isNew - b.isNew;
    return 0;
  });

  const startIndex = (page - 1) * limit;
  const pagedCars = sortedCars.slice(startIndex, startIndex + limit);

  // Lấy tất cả loại xe duy nhất (type) từ dữ liệu
  const types = [...new Set(cars.map((car) => car.type))];

  if (loading) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

  return (
    <div className="container-fluid px-4 py-4 bg-light">
      <h1 className="mb-4 text-center">Danh sách siêu xe</h1>

      {/* Bộ lọc theo loại (type) */}
      <div className="d-flex justify-content-center flex-wrap mb-4">
        {types.map((t) => (
          <button
            key={t}
            className={`btn me-2 mb-2 ${type === t ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => {
              setType(t);
              setPage(1);
            }}
          >
            {t}
          </button>
        ))}
        <button
          className={`btn mb-2 ${type === "" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => {
            setType("");
            setPage(1);
          }}
        >
          Tất cả
        </button>
      </div>

      {/* Tìm kiếm và sắp xếp */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm tên xe..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Lọc theo giá (USD)</option>
            <option value="under200k">Dưới $200,000</option>
            <option value="200k-500k">$200,000 - $500,000</option>
            <option value="over500k">Trên $500,000</option>
          </select>
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Sắp xếp theo</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="new">Xe mới</option>
            <option value="old">Xe cũ</option>
          </select>
        </div>
      </div>

      {/* Danh sách xe (in trực tiếp card không qua component) */}
      <div className="row g-4">
        {pagedCars.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h5>Không tìm thấy xe phù hợp</h5>
            <p>Hãy thử từ khóa khác hoặc thay đổi bộ lọc</p>
          </div>
        ) : (
          pagedCars.map((car) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={car.id}>
              <div className="car-card card h-100 shadow-sm">
                <div className="position-relative">
                  {car.isBestSale && (
                    <span className="badge bg-danger position-absolute top-0 start-50 translate-middle-x m-2">
                      BÁN CHẠY
                    </span>
                  )}
                  {car.isNew !== undefined && (
                    <span
                      className={`badge position-absolute top-0 start-0 m-2 ${
                        car.isNew ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {car.isNew ? "MỚI" : "CŨ"}
                    </span>
                  )}
                  <img
                    src={
                      car.image?.startsWith("http")
                        ? car.image
                        : `http://localhost:5000${car.image}`
                    }
                    className="card-img-top"
                    alt={car.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/car-default.png";
                    }}
                  />
                </div>
                <div className="card-body text-center px-2">
                  <h6 className="fw-bold">{car.name}</h6>
                  {car.description && (
                    <small className="text-muted d-block mb-1">
                      {car.description}
                    </small>
                  )}
                  <p className="text-danger fw-bold mb-0">
                    {car.priceUSD ? `$${car.priceUSD.toLocaleString()}` : "Liên hệ"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Phân trang */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Trước
        </button>
        <span>Trang {page}</span>
        <button
          className="btn btn-outline-secondary ms-2"
          onClick={() => setPage(page + 1)}
          disabled={startIndex + limit >= sortedCars.length}
        >
          Sau
        </button>
      </div>
    </div>
  );
}

export default CarList;
