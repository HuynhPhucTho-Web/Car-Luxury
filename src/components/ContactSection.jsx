import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import "./ContactSection.css"; // Tạo file CSS riêng để style

function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu đến server hoặc xử lý ở đây
    console.log("Liên hệ:", formData);
    setSubmitted(true);
    setFormData({ fullName: "", email: "", phone: "" });
  };

  return (
    <div className="contact-section">
      <Container className="py-5">
        <h2 className="text-white text-center mb-4">📞 Liên hệ tư vấn</h2>
        <p className="text-light text-center mb-4">
          Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn nhanh nhất!
        </p>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3 justify-content-center">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="tel"
                placeholder="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md="auto">
              <Button type="submit" variant="warning">
                Gửi tư vấn
              </Button>
            </Col>
          </Row>
        </Form>

        {submitted && (
          <Alert
            variant="success"
            className="mt-4 text-center"
            onClose={() => setSubmitted(false)}
            dismissible
          >
            ✅ Cảm ơn bạn! Chúng tôi sẽ liên hệ tư vấn sớm nhất.
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default ContactSection;
