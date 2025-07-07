import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarList.css";
import { Link } from "react-router-dom";
import SaleSection from "../components/SaleSection";
import ContactSection from "../components/ContactSection";
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
    fetch("http://localhost:5000/car")
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

  const types = [...new Set(cars.map((car) => car.type))].filter(Boolean).sort();

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

  if (loading) return <div className="text-center mt-5">All</div>;

  return (
    <body>
      <div className="container-fluid px-4 py-4 bg-dark-200 text-white body-list">
        <h1 className="mb-4 text-center">Danh sách các loại xe</h1>

        {/* Bộ lọc theo loại xe */}
        <div className="d-flex justify-content-center flex-wrap mb-4">
          {types.map((cat) => (
            <button
              key={cat}
              className={`btn me-2 mb-2 ${type === cat ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => {
                setType(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
          <button
            className={`btn mb-2 ${type === "" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => {
              setType("");
              setPage(1);
            }}
          >
            All
          </button>
        </div>

        {/* Tìm kiếm và sắp xếp */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm loại xe bạn muốn."
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

        {/* Danh sách card xe */}
        <div className="row g-4">
          {pagedCars.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h5>Không tìm thấy xe phù hợp</h5>
              <p>Hãy thử từ khóa khác hoặc thay đổi bộ lọc</p>
            </div>
          ) : (
            pagedCars.map((car) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={car.id}>
                <Link
                  to={`/cars/${car.id}`}
                  className="text-decoration-none text-dark d-block h-100"
                >
                  <div className="car-card shadow-sm rounded-3 overflow-hidden h-100">
                    <img
                      src={car.image || "https://via.placeholder.com/300x200"}
                      className="img-fluid car-card-img"
                      alt={car.name}
                    />
                    <div className="car-card-body p-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h6 className="m-0 text-uppercase text-muted fw-semibold">
                          USD {car.priceUSD.toLocaleString()}
                        </h6>
                        {car.isNew && (
                          <span className="badge bg-warning text-dark new-badge">NEW</span>
                        )}
                      </div>
                      <h5 className="fw-bold mb-2 text-uppercase">{car.name}</h5>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-dark btn-sm">Direct Chat</button>
                        <button className="btn btn-gold btn-sm">Book Now</button>
                      </div>
                    </div>
                  </div>
                </Link>
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
        <br></br>
        <div>
          <SaleSection />
        </div>
        <br></br>
        <div>
          <ContactSection />
        </div>

      </div>

    </body>
  );
}

export default CarList;
