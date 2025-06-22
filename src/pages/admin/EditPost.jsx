import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/EditPost.css";

function EditPost() {
  const { id } = useParams(); // ID bài viết cần sửa
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [oldThumbnail, setOldThumbnail] = useState(""); // ảnh cũ
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.extend({
        addAttributes() {
          return {
            src: { default: null }, // Link ảnh
            alt: { default: null }, // Alt text (chú thích)
            class: { default: "img-fluid w-100 mb-3 rounded" }, // Bootstrap: ảnh đẹp, bo góc
          };
        },
        renderHTML({ HTMLAttributes }) {
          return ["img", HTMLAttributes];
        },
      }),
    ],
    content: "<p>Đang tải nội dung...</p>",
  });

  // Lấy danh mục
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy danh mục:", err));
  }, []);

  // Lấy dữ liệu bài viết hiện tại
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/articles/${id}`)
      .then((res) => {
        const data = res.data.data;
        setTitle(data.title);
        setOldThumbnail(data.thumbnail);
        setSelectedCategoryId(data.category_id);
        if (editor) {
          editor.commands.setContent(data.content || "");
        }
      })
      .catch((err) => console.error("Lỗi khi tải bài viết:", err));
  }, [id, editor]);

  // Upload ảnh vào nội dung
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !editor) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/upload-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const imageUrl = res.data.url; //Lấy đường dẫn ảnh từ kết quả trả về.
      editor.chain().focus().setImage({ src: imageUrl }).run(); //ảnh được chèn ngay vị trí con trỏ trong editor.
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
      alert("Lỗi upload ảnh");
    }
  };

  // Gửi cập nhật bài viết
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editor || !selectedCategoryId) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (thumbnail) formData.append("thumbnail", thumbnail); // ảnh mới (nếu có)
    formData.append("content", editor.getHTML());
    formData.append("category_id", selectedCategoryId);
    formData.append("_method", "PUT"); // Laravel hỗ trợ PUT qua POST

    axios
      .post(`http://localhost:8000/api/articles/${id}`, formData)
      .then(() => {
        alert("Đã cập nhật bài viết thành công!");
        navigate("/"); // hoặc navigate về danh sách bài viết
      })
      .catch((err) => {
        console.error(err);
        alert("Lỗi khi cập nhật bài viết");
      });
  };

  return (
    <div className="container mt-4">
      <h3>✏️ Chỉnh sửa bài viết</h3>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
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

        {/* Chuyên mục */}
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
          />
          {oldThumbnail && !thumbnail && (
            <div className="mt-2">
              <img
                src={`http://localhost:8000/storage/${oldThumbnail}`}
                alt="Ảnh cũ"
                className="img-thumbnail"
                style={{ width: 200 }}
              />
            </div>
          )}
        </div>

        {/* Nội dung */}
        <div className="mb-3">
          <label className="form-label">Nội dung bài viết</label>
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

        {/* Nút cập nhật */}
        <button type="submit" className="btn btn-success">
          Cập nhật bài viết
        </button>
      </form>
    </div>
  );
}

export default EditPost;
