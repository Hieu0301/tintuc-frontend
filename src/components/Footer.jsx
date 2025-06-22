import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <div className="container">
        <div className="row">
          {/* Cột 1: Giới thiệu */}
          <div className="col-md-4 mb-3">
            <h5>Về Chúng Tôi</h5>
            <p>
              Trang tin tức hàng đầu cập nhật nhanh chóng các sự kiện trong nước
              và quốc tế. Chúng tôi cam kết mang đến thông tin chính xác, đáng
              tin cậy.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="col-md-4 mb-3">
            <h5>Liên Kết Nhanh</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  Giới Thiệu
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Liên Hệ
                </a>
              </li>
              <li>
                <a href="/category" className="text-white text-decoration-none">
                  Chuyên Mục
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Mạng xã hội */}
          <div className="col-md-4 mb-3">
            <h5>Theo Dõi Chúng Tôi</h5>
            <a href="https://facebook.com" className="text-white me-3">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="text-white me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com" className="text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Tin Tức 24h. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
