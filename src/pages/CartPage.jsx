import React, { useState, useEffect } from "react";
import "./CartPage.css"; // Tùy chỉnh style

function CartPage({ user }) {
  const [cart, setCart] = useState([]);

  // Giả lập fetch từ JSON (có thể thay thế bằng API nếu cần)
  useEffect(() => {
    fetch(`http://localhost:3000/carts?userID=${user?.id}`)
      .then((res) => res.json())
      .then((data) => setCart(data[0]?.items || []));
  }, [user]);

  const handleQuantityChange = (id, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🛒 Giỏ hàng của bạn</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên xe</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td><img src={item.image} alt={item.name} height="80" /></td>
                    <td>{item.name}</td>
                    <td>${item.priceUSD.toLocaleString()}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, Math.max(1, parseInt(e.target.value)))
                        }
                        min="1"
                        className="form-control"
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>${(item.priceUSD * item.quantity).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h4 className="text-end">Tổng cộng: ${totalPrice.toLocaleString()}</h4>
          <div className="text-end mt-3">
            <button className="btn btn-success">Tiến hành thanh toán</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
