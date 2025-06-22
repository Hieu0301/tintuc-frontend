import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../css/Navbar.css";
export default function Navbar() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategory(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Tin Tức
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto d-flex align-items-center">
            {category.slice(0, 5).map((categories) => (
              <li className="nav-item" key={categories.id}>
                <Link className="nav-link" to={`/category/${categories.id}`}>
                  {categories.name}
                </Link>
              </li>
            ))}

            {category.length > 5 && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="moreCategories"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Danh mục khác
                </a>
                <ul className="dropdown-menu" aria-labelledby="moreCategories">
                  {category.slice(5).map((categories) => (
                    <li key={categories.id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${categories.id}`}
                      >
                        {categories.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}

            {/* 👉 Mục Liên hệ */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Liên hệ
              </Link>
            </li>
            {/* 👉 Mục giới thiệu*/}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Giới thiệu
              </Link>
            </li>
          </ul>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}
