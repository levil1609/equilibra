"use client"

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const fetchPosts = async () => {
    const res = await fetch("/api/administrador/posts");
    const data = await res.json();
    setPosts(data);
  };

  const createPost = async () => {
    await fetch("/api/administrador/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: { "Content-Type": "application/json" },
    });
    fetchPosts();
    setNewPost({ title: "", content: "" });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar role="ADMIN" />
      <div className="p-6">
        <h1 className="text-xl font-bold">Administrar Posts</h1>
        <div className="mt-4">
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Título"
            className="border p-2 w-full rounded"
          />
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Contenido"
            className="border p-2 w-full mt-2 rounded"
          />
          <button onClick={createPost} className="bg-blue-500 text-white p-2 rounded mt-2">
            Crear Post
          </button>
        </div>
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 mt-2 rounded">
              <h2 className="font-bold">{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
