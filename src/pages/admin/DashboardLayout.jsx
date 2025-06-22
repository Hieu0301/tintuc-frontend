// src/components/admin/DashboardLayout.js
import React from "react";
import { Link } from "react-router-dom";
import "../../css/DashboardLayout.css";
import CreatePost from "./CreatePost";
export default function DashboardLayout({ children }) {
  return (
    <div>
      {/* Header */}
      <header className="bg-dark text-white p-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h4 className="mb-0">🛠️ Admin Dashboard</h4>
          <Link to="/" className="btn btn-light btn-sm">
            Về trang chính
          </Link>
        </div>
      </header>

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside className="bg-light p-3" style={{ width: "220px" }}>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/admin" className="nav-link">
                📋 Danh sách bài viết
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/createPost" className="nav-link">
                ➕ Thêm bài viết
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/categoryPost" className="nav-link">
                ➕ Thêm danh mục
              </Link>
            </li>
          </ul>
        </aside>

        {/* Nội dung chính */}
        <main className="flex-grow-1 p-4">{children}</main>
      </div>

      <footer className="bg-dark text-white text-center py-2 m-0">
        <small>© {new Date().getFullYear()} Admin Panel - Tin tức</small>
      </footer>
    </div>
  );
}
