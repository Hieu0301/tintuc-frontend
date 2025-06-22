// src/pages/admin/PostList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../pages/admin/DashboardLayout";
import axios from "axios";

function PostList() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1); // tổng số trang

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/articles")
      .then((res) => setArticles(res.data.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này không?")) {
      axios
        .delete(`http://localhost:8000/api/articles/${id}`)
        .then(() => setArticles(articles.filter((a) => a.id !== id)))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/articles?page=${currentPage}`)
      .then((res) => {
        setArticles(res.data.data.data);
        setLastPage(res.data.data.last_page);
      })
      .catch((err) => console.error(err));
  }, [currentPage]);

  // Định dạng thời gian Việt Nam
  const formatVietnamTime = (isoString) => {
    if (!isoString) return "Không có thời gian";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Không hợp lệ";

    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    }).format(date);
  };

  return (
    <DashboardLayout>
      <h3>📋 Danh sách bài viết</h3>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Tiêu đề</th>
            <th>Ảnh</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id}>
              <Link
                to={`/article/${a.id}`}
                className="fw-bold d-block "
                style={{ fontSize: "0.95rem" }}
              >
                <td>{a.title}</td>
              </Link>
              <td>
                <img
                  src={`http://localhost:8000/storage/${a.thumbnail}`}
                  alt={a.title}
                  style={{ width: "80px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>
                <p className="text-muted" style={{ fontSize: "0.875rem" }}>
                  🕒 {formatVietnamTime(a.created_at)}
                </p>
              </td>
              <td>
                <Link
                  to={`/admin/editPost/${a.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Sửa
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(a.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀ Trang trước
        </button>

        <span className="align-self-center">
          Trang {currentPage} / {lastPage}
        </span>

        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
        >
          Trang sau ▶
        </button>
      </div>
    </DashboardLayout>
  );
}

export default PostList;
