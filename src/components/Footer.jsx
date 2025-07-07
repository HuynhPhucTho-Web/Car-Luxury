import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

export default function FooterCPN() {
  return (
    <footer className="footer">
      {/* Top icons row */}
      <div className="footer-top">
        <Container>
          <Row className="text-center text-md-start footer-top-row">
            <Col md>
              <div className="footer-item">
                <i className="bi bi-truck footer-icon"></i>
                <span>
                  GIAO XE TẬN NƠI
                  <br />
                  <span className="footer-sub">Miễn phí giao xe toàn quốc</span>
                </span>
              </div>
            </Col>
            <Col md>
              <div className="footer-item">
                <i className="bi bi-arrow-repeat footer-icon"></i>
                <span>
                  ĐỔI TRẢ LINH HOẠT
                  <br />
                  <span className="footer-sub">Hỗ trợ đổi trong 7 ngày</span>
                </span>
              </div>
            </Col>
            <Col md>
              <div className="footer-item">
                <i className="bi bi-shield-check footer-icon"></i>
                <span>
                  XE CHÍNH HÃNG
                  <br />
                  <span className="footer-sub">Bảo hành toàn quốc</span>
                </span>
              </div>
            </Col>
            <Col md>
              <div className="footer-item">
                <i className="bi bi-cash-coin footer-icon"></i>
                <span>
                  THANH TOÁN LINH HOẠT
                  <br />
                  <span className="footer-sub">Chuyển khoản, trả góp, thẻ</span>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main footer content */}
      <Container className="footer-main">
        <Row className="gy-4">
          <Col md={4}>
            <div className="footer-logo">
              <img src="/images/logov4.png" alt="CarLuxury Logo" />
            </div>
            <div className="footer-info">
              CarLuxury là hệ thống phân phối xe sang uy tín tại Việt Nam
              <br /><br />
              <span className="footer-bold">Công ty TNHH CarLuxury</span>
              <br />
              Mã số doanh nghiệp: 0123456789
              <br />
              Tư vấn mua xe: <a href="tel:0909090909" className="footer-link">0909 090 909</a>
              <br />
              Bảo hành & Dịch vụ: <a href="tel:0988988898" className="footer-link">0988 988 898</a>
              <br />
              Thời gian làm việc: <span className="footer-bold">8:00 – 20:00</span>
              <br />
              Email: <a href="mailto:info@carluxury.vn" className="footer-email">info@carluxury.vn</a>
            </div>
            <div className="footer-social-title">KẾT NỐI VỚI CHÚNG TÔI</div>
            <div className="footer-social">
              <a href="#" className="footer-social-icon facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="footer-social-icon youtube">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#" className="footer-social-icon instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>

          <Col md={2}>
            <div className="footer-title">DỊCH VỤ</div>
            <div className="footer-links">
              <a href="#">Giới thiệu</a>
              <a href="#">Mua xe trả góp</a>
              <a href="#">Dịch vụ bảo dưỡng</a>
              <a href="#">Bán xe đã qua sử dụng</a>
              <a href="#">Tin tức & Khuyến mãi</a>
              <a href="#">Liên hệ</a>
            </div>
          </Col>

          <Col md={3}>
            <div className="footer-title">CHÍNH SÁCH</div>
            <div className="footer-links">
              <a href="#">Chính sách bảo hành</a>
              <a href="#">Chính sách giao hàng</a>
              <a href="#">Chính sách thanh toán</a>
              <a href="#">Chính sách bảo mật</a>
              <a href="#">Điều khoản sử dụng</a>
            </div>
          </Col>

          <Col md={3}>
            <div className="footer-title">SHOWROOM CHÍNH</div>
            <div className="footer-address">Hà Nội: 99 Trần Duy Hưng, Cầu Giấy</div>
            <div className="footer-phone">
              SĐT: <a href="tel:0977666555">0977 666 555</a>
            </div>
            <div className="footer-address">TP.HCM: 123 Nguyễn Văn Trỗi, Q.3</div>
            <div className="footer-phone">
              SĐT: <a href="tel:0933111222">0933 111 222</a>
            </div>
            <div className="footer-note">Có bãi đỗ xe ô tô rộng rãi</div>
          </Col>
        </Row>

        <div className="footer-bottom">
          Các thương hiệu nổi bật: <span className="footer-bold">Ferrari | Lamborghini | Porsche | Rolls-Royce | BMW | Mercedes-Benz | Tesla</span>
          <br />
          Copyright © 2025 - CarLuxury. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
