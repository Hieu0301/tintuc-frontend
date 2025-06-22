import React, { useEffect, useState } from "react";
import "../../css/PostCategory.css";
import axios from "axios";
import { Link } from "react-router-dom";
function PostCategory() {
  const [category, setCategory] = useState([]);

  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/api/categories", {
        name: category,
      })
      .then((res) => {
        alert("Thêm danh mục thành công!");
        setCategory(""); // reset input
      })
      .catch((err) => {
        console.error(err);
        alert("Lỗi khi thêm danh mục.");
      });
    console.log("Dữ liệu gửi đi:", category);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-dark text-white p-3 w-100%">
        <div className="container d-flex justify-content-between align-items-center">
          <h4 className="mb-0">🛠️ Admin Dashboard</h4>
          <Link to="/admin/dashboard" className="btn btn-light btn-sm">
            Về trang dashboard
          </Link>
        </div>
      </header>
      <div className="form-category">
        <h1 className="header">Thêm danh mục</h1>

        <label htmlFor="categoryName">Tên danh mục</label>
        <input
          type="text"
          id="categoryName"
          className="post-category"
          placeholder="Nhập tên danh mục..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button className="btn-submit" onClick={handleSubmit}>
          Thêm
        </button>
      </div>
    </div>
  );
}

export default PostCategory;
