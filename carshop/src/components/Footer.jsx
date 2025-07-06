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
                  GIAO HÀNG TẬN NƠI
                  <br />
                  <span className="footer-sub">Miễn phí giao hàng nội thành</span>
                </span>
              </div>
            </Col>
            <Col md>
              <div className="footer-item">
                <i className="bi bi-arrow-repeat footer-icon"></i>
                <span>
                  ĐỔI TRẢ DỄ DÀNG
                  <br />
                  <span className="footer-sub">Miễn phí đổi trong 10 ngày</span>
                </span>
              </div>
            </Col>
            <Col md>
              <div className="footer-item">
                <i className="bi bi-hand-thumbs-up footer-icon"></i>
                <span>
                  HÀNG CHÍNH HÃNG
                  <br />
                  <span className="footer-sub">Cam kết hàng chính hãng 100%</span>
                </span>
              </div>
            </Col>
            <Col md>
              <div className="footer-item">
                <i className="bi bi-currency-dollar footer-icon"></i>
                <span>
                  NHẬN HÀNG TRẢ TIỀN
                  <br />
                  <span className="footer-sub">
                    Tiền mặt, quẹt thẻ, chuyển khoản
                  </span>
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
              <img src="/images/logov4.png" alt="MACONE Logo" />
            </div>
            <div className="footer-info">
              MACONE là đại lý uỷ quyền chính thức của Apple tại Việt Nam (AAR)
              <br />
              <br />
              <span className="footer-bold">Công ty cổ phần MACONE</span>
              <br />
              Giấy phép ĐKKD số: 0108037559
              <br />
              Hotline tư vấn:{" "}
              <a href="tel:0936096900" className="footer-link">
                0936 096 900
              </a>
              <br />
              Khách hàng Doanh nghiệp:{" "}
              <a href="tel:0936368455" className="footer-link">
                0936 368 455
              </a>
              <br />
              Sửa chữa & Bảo hành:{" "}
              <a href="tel:0936363501" className="footer-link">
                0936 363 501
              </a>
              <br />
              Thời gian làm việc: <span className="footer-bold">8h30 – 21h30</span>
              <br />
              Email:{" "}
              <a href="mailto:lienhe@macone.vn" className="footer-email">
                lienhe@macone.vn
              </a>
            </div>
            <div className="footer-social-title">MẠNG XÃ HỘI</div>
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
            <div className="footer-title">HỖ TRỢ KHÁCH HÀNG</div>
            <div className="footer-links">
              <a href="#">Giới thiệu</a>
              <a href="#">Hướng dẫn mua hàng</a>
              <a href="#">Bán hàng Doanh Nghiệp</a>
              <a href="#">Mua trả góp</a>
              <a href="#">Tin công nghệ</a>
              <a href="#">MFix – Trung tâm sửa chữa</a>
              <a href="#">Liên hệ</a>
            </div>
            <div className="footer-cert">
              <img
                src="/images/dathongbao-1-e1542425893350.png"
                alt="Bộ Công Thương Logo"
              />
            </div>
          </Col>

          <Col md={3}>
            <div className="footer-title">CHÍNH SÁCH</div>
            <div className="footer-links">
              <a href="#">Chính sách Bảo Hành & Đổi Trả</a>
              <a href="#">Chính sách đặt hàng</a>
              <a href="#">Chính sách vận chuyển</a>
              <a href="#">Chính sách bảo mật thông tin</a>
              <a href="#">Chính sách thanh toán</a>
              <a href="#">Gói bảo hành vàng MACONE Care</a>
              <a href="#">Gói bảo hành doanh nghiệp</a>
            </div>
          </Col>

          <Col md={3}>
            <div className="footer-title">Hà Nội:</div>
            <div className="footer-address">Cơ sở 1: 113 Hoàng Cầu, Đống Đa</div>
            <div className="footer-phone">
              SĐT: <a href="tel:0342995566">0342 99 55 66</a>
            </div>
            <div className="footer-address">
              Cơ sở 2: 99 Nguyễn Văn Huyên, Cầu Giấy
            </div>
            <div className="footer-phone">
              SĐT: <a href="tel:0773220666">0773 220 666</a>
            </div>
            <div className="footer-title">Thành phố Hồ Chí Minh:</div>
            <div className="footer-address">
              Cơ sở 3: 186 Võ Văn Tần, Q.3, TP.HCM
            </div>
            <div className="footer-phone">
              SĐT: <a href="tel:0386370444">0386 370 444</a>
            </div>
            <div className="footer-note">(Các cơ sở đều có chỗ để xe ô tô)</div>
          </Col>
        </Row>

        <div className="footer-bottom">
          Sản phẩm tiêu biểu:{" "}
          <span className="footer-bold">
            BMW | Lamborini | MacBook Pro | iMac | Mac Mini | MacBook Pro
            M4 | iMac M4 | Mac mini M4 | Mfix.vn
          </span>
          <br />
          Copyright © 2025 - Bản quyền thuộc về MACONE.
        </div>
      </Container>
    </footer>
  );
}
