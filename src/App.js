// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArticleDetail from "./pages/ArticleDetail";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import PostList from "./pages/admin/PostList";
import Dashboard from "./pages/admin/Dashboard";
import UserLayout from "./pages/UserLayout";
import CreatePost from "./pages/admin/CreatePost";
import EditPost from "./pages/admin/EditPost";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import PostCategory from "./pages/admin/PostCategory";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route người dùng với layout có Navbar + Footer */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>

        {/* Route admin riêng (không dùng UserLayout) */}
        <Route path="/admin" element={<PostList />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/createPost" element={<CreatePost />} />
        <Route path="/admin/editPost/:id" element={<EditPost />} />
        <Route path="/admin/categoryPost" element={<PostCategory />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
