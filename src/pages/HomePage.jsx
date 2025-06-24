import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/stylesHomePage.css";

export default function HomePage() {
  const BASE_URL = "https://efficient-gentleness-production.up.railway.app";

  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1); // tổng số trang
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/articles`)
      .then((res) => setArticles(res.data.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/categories`)
      .then((res) => setCategory(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/articles?page=${currentPage}`)
      .then((res) => {
        setArticles(res.data.data.data);
        setLastPage(res.data.data.last_page);
      })
      .catch((err) => console.error(err));
  }, [currentPage]);

  const handleSubscribe = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/subscribe`, {
        email,
      });

      setMessage(res.data.message);
      setEmail("");
    } catch (error) {
      if (error.response?.data?.errors?.email) {
        setMessage(error.response.data.errors.email[0]); // lỗi validate
      } else {
        setMessage("Đã xảy ra lỗi khi đăng ký.");
      }
    }
  };

  //Time
  const formatVietnamTime = (isoString) => {
    const date = new Date(isoString);
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

  // Hàm xử lý khi người dùng nhập vào ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc sản phẩm theo tên (không phân biệt hoa thường)
  const filteredPosts = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5 pt-2">
      <div className="row">
        {/* Cột trái: Bài báo chính */}
        <div className="col-md-8">
          <h2>Tin mới nhất</h2>
          <div className="row">
            {filteredPosts.map((article) => (
              <div className="col-md-12 mb-3" key={article.id}>
                <div className="card flex-row">
                  <img
                    src={`${BASE_URL}/storage/${article.thumbnail}`}
                    className="card-img-left"
                    alt={article.title}
                    style={{ width: "300px", objectFit: "cover" }}
                  />

                  <div className="card-body">
                    <Link
                      to={`/article/${article.id}`}
                      className="text-decoration-none"
                    >
                      <h5 className="card-title">{article.title}</h5>
                    </Link>
                    <p className="text-muted" style={{ fontSize: "0.875rem" }}>
                      🕒 {formatVietnamTime(article.created_at)}
                    </p>
                    <div className="card-text">
                      {article.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: Tin tức khác */}
        <div className="col-md-4">
          <h4 className="mb-3">📰 Tin khác</h4>
          <div className="card mt-4 mb-3">
            <div className="card-body">
              <h6>🔍 Tìm kiếm</h6>
              <input
                className="form-control me-2 mb-2"
                type="search"
                placeholder="Tìm tin tức..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {/* <button className="btn btn-dark btn-sm w-100">Tìm kiếm</button> */}
            </div>
          </div>
          <ul className="list-group">
            {articles.slice(0, 5).map((article) => (
              <li className="list-group-item" key={article.id}>
                <div className="d-flex">
                  <img
                    src={`${BASE_URL}/storage/${article.thumbnail}`}
                    alt={article.title}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      marginRight: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <div>
                    <Link
                      to={`/article/${article.id}`}
                      className="text-decoration-none fw-bold d-block mb-1"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {article.title.length > 50
                        ? article.title.slice(0, 50) + "..."
                        : article.title}
                    </Link>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.75rem" }}
                    >
                      🕒 {formatVietnamTime(article.created_at)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h5 className="mt-4">🏷️ Chuyên mục nổi bật</h5>
          <div className="d-flex flex-wrap gap-2">
            {category.map((categories) => (
              <span className="badge bg-dark">{categories.name}</span>
            ))}
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h6>📬 Nhận tin mới sớm nhất</h6>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="btn btn-dark btn-sm w-100"
                onClick={handleSubscribe}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}
