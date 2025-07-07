import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./SaleSection.css"; // 👈 CSS cho hiệu ứng và style

function SaleSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="sale-section">
      <div className="hero-video">
        <video autoPlay muted loop className="video-bg">
          <source src="/videos/videosale.mp4" type="video/mp4" />
        </video>
        <div className="overlay" />
        <div className="content">
          <div className="text-box top-box" data-aos="fade-left">
            <h1 className="title">TEST DRIVE GRENADIER</h1>
            <p className="description">
              Trải nghiệm lái thử Grenadier – chiếc SUV mạnh mẽ và linh hoạt trên mọi địa hình.
            </p>
            <a href="#" className="btn-link">REQUEST A TEST DRIVE &rsaquo;</a>
          </div>

          <div className="text-box bottom-box" data-aos="fade-right">
            <h2 className="title">SO, ARE YOU BUILT FOR MORE?</h2>
            <p className="description">
              Tham gia cộng đồng yêu xe địa hình. Nhận thông tin mới nhất, ưu đãi và sự kiện đặc biệt.
            </p>
            <a href="#" className="btn-link">SUBSCRIBE &rsaquo;</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SaleSection;
