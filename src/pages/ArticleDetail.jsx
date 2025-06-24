import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/ArticleDetail.css";

export default function ArticleDetail() {
  const BASE_URL = "https://efficient-gentleness-production.up.railway.app";
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy chi tiết bài viết
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/articles/${id}`)
      .then((res) => {
        setArticle(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Lấy danh sách bài viết khác
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/articles`)
      .then((res) => setArticles(res.data.data.data))
      .catch((err) => console.error(err));
  }, []);

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

  if (loading)
    return <div className="container mt-4">Đang tải bài viết...</div>;
  if (!article)
    return (
      <div className="container mt-4 text-danger">Không tìm thấy bài viết.</div>
    );

  const relatedArticles = articles.filter((a) => a.id !== parseInt(id));
  console.log("Tổng số bài viết:", articles.length);
  console.log("Sau khi loại bài đang đọc:", relatedArticles.length);

  return (
    <div className="container mt-4 pt-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {article.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Nội dung chính */}
        <div className="col-md-8 article-content mb-4 mb-md-0">
          <h2>{article.title}</h2>
          <p className="text-muted" style={{ fontSize: "0.875rem" }}>
            🕒 {formatVietnamTime(article.created_at)}
          </p>

          <img
            src={`${BASE_URL}/storage/${article.thumbnail}`}
            className="img-fluid w-100 mb-3 rounded"
            alt={article.title}
          />

          {/* Hiển thị nội dung HTML nếu cần */}
          <div
            className="article-body article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Bên phải - Tin tức khác */}
        <div className="col-md-4">
          <h4 className="mb-3">📰 Các tin tức khác</h4>
          <ul className="list-group">
            {articles
              .filter((a) => a.id !== parseInt(id)) // 1. Lọc bài khác bài đang đọc
              .slice(0, 6) // 2. Lấy đúng 6 bài sau khi lọc

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
  );
}
