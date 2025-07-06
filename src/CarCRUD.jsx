import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CarCRUD.css";


export default function MacbookCRUD() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [macbook, setMacbook] = useState({
    Name: "",
    Year: "",
    CPU: "",
    RAM: "",
    Storage: "",
    Graphics: "",
    Price: "",
    Image: "",
    IsNew: false,
    IsBestSale: false,
 
  });
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("create"); 
  const [dbId, setDbId] = useState(""); 

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/update") && id) {
      setMode("update");
      fetchMacbook(id);
    } else if (currentPath.includes("/delete") && id) {
      setMode("delete");
      fetchMacbook(id);
    } else if (currentPath.includes("/add")) {
      setMode("create");
    } else {
      setMode("create");
    }
  }, [id]);

  const fetchMacbook = async (macbookId) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/laptop");
      const targetLaptop = res.data.find((item) => item.Index == macbookId);

      if (targetLaptop) {
        setMacbook(targetLaptop);
        setDbId(targetLaptop._id || targetLaptop.id); // lưu _id để dùng khi PUT/DELETE
      } else {
        throw new Error("Không tìm thấy sản phẩm");
      }
    } catch (error) {
      console.error("Error fetching macbook:", error);
      alert("Không thể tải thông tin sản phẩm. Vui lòng kiểm tra ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "IsNew" && checked) {
        setMacbook((prev) => ({ ...prev, IsNew: true, IsBestSale: false }));
      } else if (name === "IsBestSale" && checked) {
        setMacbook((prev) => ({ ...prev, IsNew: false, IsBestSale: true }));
      } else {
        setMacbook((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setMacbook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        const allLaptops = await axios.get("http://localhost:5000/laptop");
        const maxIndex =
          allLaptops.data.length > 0
            ? Math.max(...allLaptops.data.map((laptop) => laptop.Index || 0))
            : 0;

        const newMacbook = { ...macbook, Index: maxIndex + 1 };
        await axios.post("http://localhost:5000/laptop", newMacbook);
        alert("Thêm sản phẩm thành công!");
      } else if (mode === "update") {
        if (!dbId) throw new Error("Không tìm thấy ID để cập nhật");
        const updateData = { ...macbook, Index: parseInt(id) };
        await axios.put(`http://localhost:5000/laptop/${dbId}`, updateData);
        alert("Cập nhật sản phẩm thành công!");
      }

      navigate("/macbooks");
    } catch (error) {
      console.error(`Error ${mode}ing macbook:`, error);
      alert(
        `Có lỗi xảy ra khi ${
          mode === "create" ? "thêm" : "cập nhật"
        } sản phẩm: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setLoading(true);
      try {
        if (!dbId) throw new Error("Không tìm thấy ID để xóa");
        await axios.delete(`http://localhost:5000/laptop/${dbId}`);
        alert("Xóa sản phẩm thành công!");
        navigate("/macbooks");
      } catch (error) {
        console.error("Error deleting macbook:", error);
        alert(`Có lỗi xảy ra khi xóa sản phẩm: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "create":
        return "Thêm Macbook Mới";
      case "update":
        return "Cập Nhật Macbook";
      case "delete":
        return "Xóa Macbook";
      default:
        return "Quản Lý Macbook";
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case "create":
        return "Thêm Sản Phẩm";
      case "update":
        return "Cập Nhật";
      case "delete":
        return "Xác Nhận Xóa";
      default:
        return "Lưu";
    }
  };

  const getButtonClass = () => {
    switch (mode) {
      case "create":
        return "btn-success";
      case "update":
        return "btn-primary";
      case "delete":
        return "btn-danger";
      default:
        return "btn-primary";
    }
  };

  if (loading && mode !== "create") {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">{getTitle()}</h3>
            </div>
            <div className="card-body">
              {mode === "delete" ? (
                <div>
                  <div className="alert alert-warning">
                    <strong>ERROR!</strong> This action cannot be undon and will permanently delete the product.
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src="/images/MacBookPro14inchM4Max-300x250.jpg"
                        className="img-fluid rounded"
                        alt={macbook.Name}
                      />
                    </div>
                    <div className="col-md-8">
                      <h5>{macbook.Name}</h5>
                      <p><strong>CPU:</strong> {macbook.CPU}</p>
                      <p><strong>RAM:</strong> {macbook.RAM}</p>
                      <p><strong>Storage:</strong> {macbook.Storage}</p>
                      <p><strong>Price:</strong> {macbook.Price}</p>
                    </div>
                  </div>
                  <div className="d-flex gap-2 mt-4">
                    <button
                      className={`btn ${getButtonClass()}`}
                      onClick={handleDelete}
                      disabled={loading}
                    >
                      {loading ? "Đang xóa..." : getButtonText()}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate("/macbooks")}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Name" className="form-label">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                        value={macbook.Name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Year" className="form-label">
                        Year
                      </label>
                      <input
                      type="number"
                      className="form-control"
                      id="Year"
                      name="Year"
                      value={macbook.Year}
                      onChange={handleInputChange}
                      placeholder="vd:2023"
                      />
                      
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="CPU" className="form-label">
                        CPU *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="CPU"
                        name="CPU"
                        value={macbook.CPU}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="RAM" className="form-label">
                        RAM *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="RAM"
                        name="RAM"
                        value={macbook.RAM}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Storage" className="form-label">
                        Storage *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Storage"
                        name="Storage"
                        value={macbook.Storage}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Graphics" className="form-label">
                        Graphics
                      </label>    
                      <input
                        type="text"
                        className="form-control"
                        id="Graphics"
                        name="Graphics"
                        value={macbook.Graphics}
                        onChange={handleInputChange}
                        placeholder="VD: M1 Pro, M1 Max, M2 Pro, M2 Max"
                      />
                    </div>
                  </div>


                  <div className="mb-3">
                    <label htmlFor="Price" className="form-label">
                      Price *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Price"
                      name="Price"
                      value={macbook.Price}
                      onChange={handleInputChange}
                      placeholder="VD: 25.000.000₫"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Product Status</label>
                    <div className="d-flex gap-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="IsNew"
                          name="IsNew"
                          checked={macbook.IsNew}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="IsNew">
                          New
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="IsBestSale"
                          name="IsBestSale"
                          checked={macbook.IsBestSale}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="IsBestSale">
                          Hot
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className={`btn ${getButtonClass()}`}
                      disabled={loading}
                    >
                      {loading ? "Đang xử lý..." : getButtonText()}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/macbooks")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
