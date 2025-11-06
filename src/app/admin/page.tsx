"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KDramaPost } from "@/lib/posts";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<KDramaPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Safety redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch posts from markdown files
  useEffect(() => {
    async function fetchPosts() {
      try {
        // Since getAllPostsData is a server function, we need to call it via API
        const response = await fetch("/api/posts");
        if (response.ok) {
          const postsData = await response.json();
          setPosts(postsData);
        } else {
          console.error("Error fetching posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status]);

  // Show loading state
  if (status === "loading" || (status === "authenticated" && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ff8ba7]"></div>
      </div>
    );
  }

  // Create a safer sign out function that uses the standard approach
  const handleSignOut = () => {
    window.location.href = "/api/auth/signout?callbackUrl=/";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-[#ff8ba7] hover:text-[#ff7b9c] transition-colors"
          >
            My K-Diary
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{session?.user?.name || ""}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-[#ff8ba7]">
              Panel de Administración
            </h2>

            <Link
              href="/admin/new-post"
              className="px-4 py-2 bg-[#ff8ba7] hover:bg-[#ff7b9c] text-white rounded-md transition-colors"
            >
              Crear Nuevo K-Drama
            </Link>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-[#ff8ba7] mb-4">
              Mis K-Dramas
            </h3>

            {posts.length === 0 ? (
              <p className="text-gray-600 italic">No hay entradas aún.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-pink-50">
                      <th className="p-3 text-left text-gray-700">Título</th>
                      <th className="p-3 text-left text-gray-700">Estado</th>
                      <th className="p-3 text-left text-gray-700">Rating</th>
                      <th className="p-3 text-left text-gray-700">Fecha</th>
                      <th className="p-3 text-left text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr
                        key={post.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium">{post.title}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              post.status === "Finalizado"
                                ? "bg-green-100 text-green-700"
                                : post.status === "Abandonado"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="p-3">{post.rating} / 5</td>
                        <td className="p-3">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Link
                              href={`/posts/${post.id}`}
                              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm transition-colors"
                            >
                              Ver
                            </Link>
                            <Link
                              href={`/admin/edit/${post.id}`}
                              className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-sm transition-colors"
                            >
                              Editar
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
