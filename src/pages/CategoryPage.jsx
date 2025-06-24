import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/CategoryPage.css";
export default function CategoryPage() {
  const BASE_URL = "https://efficient-gentleness-production.up.railway.app";
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [article, setArticle] = useState([]);

  // Gọi API khi thay đổi id
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/categories/${id}/articles`)
      .then((res) => {
        setArticles(res.data.data);
        setCategoryName(res.data.category);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/categories`)
      .then((res) => setCategory(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/articles`)
      .then((res) => setArticle(res.data.data.data))
      .catch((err) => console.error(err));
  });

  // Format thời gian theo giờ Việt Nam
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

  if (loading) {
    return <div className="container mt-4">Đang tải bài viết...</div>;
  }

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {categoryName}
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">📂 Chuyên mục: {categoryName}</h2>

          {articles.length === 0 ? (
            <div className="alert alert-warning">Chưa có bài viết nào.</div>
          ) : (
            <div className="row">
              {articles.map((article) => (
                <div className="col-md-12 mb-3" key={article.id}>
                  <div className="card flex-row shadow-sm">
                    <img
                      src={`${BASE_URL}/storage/${article.thumbnail}`}
                      className="card-img-left"
                      alt={article.title}
                      style={{
                        width: "200px",
                        height: "150px",
                        objectFit: "cover",
                        borderTopLeftRadius: "5px",
                        borderBottomLeftRadius: "5px",
                      }}
                    />

                    <div className="card-body">
                      <Link
                        to={`/article/${article.id}`}
                        className="text-decoration-none"
                      >
                        <h5 className="card-title">{article.title}</h5>
                      </Link>
                      <p
                        className="text-muted mb-1"
                        style={{ fontSize: "0.875rem" }}
                      >
                        🕒 {formatVietnamTime(article.created_at)}
                      </p>
                      <div className="card-text">
                        {article.content.replace(/<[^>]+>/g, "").slice(0, 100)}
                        ...
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-md-4">
          {/* Banner 1 */}
          <h4 className="mb-3">📰 Tin ở các danh mục khác</h4>
          <div className="d-flex flex-wrap gap-2">
            {category
              .filter((cat) => cat.id !== parseInt(id)) // loại bỏ danh mục hiện tại
              .map((cat) => (
                <span className="badge bg-dark" key={cat.id}>
                  {cat.name}
                </span>
              ))}
          </div>
          <div className="d-flex flex-wrap gap-2 mt-3">
            <ul className="list-group">
              {article
                .filter((a) => a.category_id !== parseInt(id)) // ẩn bài đang đọc
                .slice(0, 6)
                .map((item) => (
                  <li className="list-group-item d-flex" key={item.id}>
                    <img
                      src={`${BASE_URL}/storage/${item.thumbnail}`}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <Link
                        to={`/article/${item.id}`}
                        className="text-decoration-none fw-bold d-block"
                      >
                        {item.title.length > 50
                          ? item.title.slice(0, 50) + "..."
                          : item.title}
                      </Link>
                      <p
                        className="text-muted mb-0"
                        style={{ fontSize: "0.75rem" }}
                      >
                        🕒 {formatVietnamTime(item.created_at)}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
