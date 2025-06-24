import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/CreatePost.css";
function CreatePost() {
  const BASE_URL = "https://efficient-gentleness-production.up.railway.app";
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Khởi tạo editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.extend({
        addAttributes() {
          return {
            src: {
              default: null,
            },
            alt: {
              default: null,
            },
            class: {
              default: "img-fluid w-100 mb-3 rounded",
            },
          };
        },
        renderHTML({ HTMLAttributes }) {
          return ["img", HTMLAttributes];
        },
      }),
    ],
    content: "<p></p>",
  });

  // Lấy danh sách chuyên mục từ API
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/categories`)
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy danh mục:", err));
  }, []);

  // // Upload ảnh vào nội dung bài viết
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file || !editor) return;

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8000/api/upload-image",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     const imageUrl = res.data.url;
  //     editor.chain().focus().setImage({ src: imageUrl }).run();
  //   } catch (err) {
  //     console.error("Lỗi upload ảnh:", err);
  //     alert("Lỗi upload ảnh");
  //   }
  // };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !editor) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${BASE_URL}/api/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.url;

      // 👉 Sử dụng setImage để Tiptap tự áp dụng HTMLAttributes
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
      alert("Lỗi upload ảnh");
    }
  };

  // Submit bài viết
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editor || !selectedCategoryId) {
      alert("Vui lòng chọn chuyên mục và nhập đầy đủ thông tin.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumbnail", thumbnail);
    formData.append("content", editor.getHTML());
    formData.append("category_id", selectedCategoryId);

    // axios
    //   .post(`${BASE_URL}/api/articles`, formData)
    //   .then(() => {
    //     alert("Đã đăng bài thành công!");
    //     setTitle("");
    //     setThumbnail(null);
    //     setSelectedCategoryId("");
    //     editor.commands.setContent("<p>Nhập nội dung bài viết...</p>");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     alert("Lỗi khi đăng bài");
    //   });

    axios
      .post(`${BASE_URL}/api/articles`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Đã đăng bài thành công!");
        setTitle("");
        setThumbnail(null);
        setSelectedCategoryId("");
        editor.commands.setContent("<p>Nhập nội dung bài viết...</p>");
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        alert("Lỗi khi đăng bài");
      });
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
      <div className="form-wrapper">
        <h3>➕ Thêm bài viết mới</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Tiêu đề */}
          <div className="mb-3">
            <label className="form-label">Tiêu đề</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Danh mục */}
          <div className="mb-3">
            <label className="form-label">Chuyên mục</label>
            <select
              className="form-select"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
            >
              <option value="">-- Chọn chuyên mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ảnh đại diện */}
          <div className="mb-3">
            <label className="form-label">Ảnh đại diện</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setThumbnail(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>

          {/* Nội dung */}
          <div className="mb-3">
            <label className="form-label">Nội dung bài viết</label>

            {/* Nút thêm ảnh vào nội dung */}
            <div className="mb-2 article-content d-flex">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control"
              />
            </div>

            {editor && (
              <div className="btn-group mb-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  H1
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  H2
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  H3
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  Đoạn thường
                </button>
              </div>
            )}

            <div className="editor-wrapper">
              <EditorContent editor={editor} className="editor-content" />
            </div>
          </div>

          {/* Nút submit */}
          <button type="submit" className="btn btn-primary">
            Đăng bài
          </button>
        </form>
      </div>
      <footer className="bg-dark text-white p-3 w-100%">
        <div className="container d-flex justify-content-between align-items-center">
          &copy; {new Date().getFullYear()} Tin Tức 24h. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default CreatePost;
