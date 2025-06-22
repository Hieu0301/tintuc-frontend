import React from "react";
import aboutImage from "../assets/aboutus.jpg";
import aboutImage2 from "../assets/exactly.jpg";
import aboutImage3 from "../assets/trust.jpg";
import aboutImage4 from "../assets/faster.jpg"; // nhớ thay ảnh của bạn
import "../css/AboutUs.css";
export default function AboutUs() {
  return (
    <div
      className="about-page py-5 mt-3"
      style={{ backgroundColor: "#f7f8fa" }}
    >
      <div className="container">
        <div className="row align-items-center mb-5">
          {/* Hình ảnh minh họa */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={aboutImage}
              alt="Giới thiệu"
              className="img-fluid rounded shadow core-value-img"
            />
          </div>

          {/* Nội dung giới thiệu */}
          <div className="col-md-6">
            <h2 className="mb-4">Về Chúng Tôi</h2>
            <p className="text-muted" style={{ lineHeight: "1.8" }}>
              Chào mừng bạn đến với <strong>TinTuc.VN</strong> – nơi cập nhật
              nhanh chóng và chính xác những tin tức nóng hổi trong nước và quốc
              tế.
            </p>
            <p className="text-muted" style={{ lineHeight: "1.8" }}>
              Chúng tôi tự hào là một đội ngũ trẻ trung, năng động và đầy tâm
              huyết, luôn đặt chất lượng nội dung và sự hài lòng của độc giả lên
              hàng đầu.
            </p>
            <p className="text-muted" style={{ lineHeight: "1.8" }}>
              Với sứ mệnh lan tỏa thông tin minh bạch và chính xác, chúng tôi
              không ngừng nỗ lực đổi mới, áp dụng công nghệ hiện đại nhằm mang
              lại trải nghiệm đọc tin tốt nhất cho bạn.
            </p>
          </div>
        </div>

        {/* Giá trị cốt lõi */}
        <div className="row text-center">
          <h3 className="mb-4">Giá Trị Cốt Lõi</h3>
          <div className="col-md-4 mb-3">
            <h5>✨ Chính xác</h5>
            <p className="text-muted">
              Mỗi thông tin đều được kiểm chứng kỹ lưỡng.
            </p>
            <img
              src={aboutImage2}
              alt="Giới thiệu"
              className="img-fluid rounded shadow core-value-img"
            />
          </div>
          <div className="col-md-4 mb-3">
            <h5>🚀 Nhanh chóng</h5>
            <p className="text-muted">
              Tin tức được cập nhật liên tục, theo thời gian thực.
            </p>
            <img
              src={aboutImage4}
              alt="Giới thiệu"
              className="img-fluid rounded shadow core-value-img"
            />
          </div>
          <div className="col-md-4 mb-3">
            <h5>🤝 Uy tín</h5>
            <p className="text-muted">
              Luôn giữ vững đạo đức nghề nghiệp và trách nhiệm xã hội.
            </p>
            <img
              src={aboutImage3}
              alt="Giới thiệu"
              className="img-fluid rounded shadow core-value-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
