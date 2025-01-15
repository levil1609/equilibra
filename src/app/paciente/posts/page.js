"use client";

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function PatientPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/paciente/posts");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          console.error("Error al cargar los posts.");
        }
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando posts...
      </div>
    );
  }

  return (
    <>
      <Navbar role="PATIENT" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Posts sobre Salud Mental</h1>
        <ul className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id} className="border p-4 rounded">
                <h2 className="font-bold">{post.title}</h2>
                <p>{post.content}</p>
                <p className="text-gray-500 text-sm">
                  Publicado el {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No hay posts disponibles.</p>
          )}
        </ul>
      </div>
    </>
  );
}
