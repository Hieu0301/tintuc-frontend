import React, { useState } from "react";
import contactImage from "../assets/gmail.jpg"; // bạn tự thêm ảnh vào thư mục assets

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đã gửi liên hệ:", form);
    alert("Cảm ơn bạn đã liên hệ!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="contact-page py-5"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Ảnh minh họa */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={contactImage}
              alt="Liên hệ"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Form liên hệ */}
          <div className="col-md-6">
            <h2 className="mb-4">Liên hệ với chúng tôi</h2>
            <p className="mb-4 text-muted">
              Nếu bạn có thắc mắc hoặc góp ý, vui lòng điền vào form bên dưới.
              Chúng tôi sẽ phản hồi sớm nhất!
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Tên của bạn</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email của bạn</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nội dung</label>
                <textarea
                  className="form-control"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Gửi liên hệ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
