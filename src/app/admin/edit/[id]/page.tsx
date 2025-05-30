"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import KDramaForm from "@/components/admin/KDramaForm";
import { KDramaPost } from "@/lib/posts";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<KDramaPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>("");

  // Get the id from params
  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    getParams();
  }, [params]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch the post data
  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      try {
        const response = await fetch(`/api/posts/${id}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          console.error("Error fetching post:", response.statusText);
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated" && id) {
      fetchPost();
    }
  }, [status, id, router]);

  // Show loading state
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ff8ba7]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Post no encontrado
          </h2>
          <Link href="/admin" className="text-[#ff8ba7] hover:underline">
            Volver al panel de administración
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/admin" className="text-2xl font-bold text-[#ff8ba7]">
            My K-Diary Admin
          </Link>
          <div>
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
            >
              Volver al Panel
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <h2 className="text-3xl font-semibold text-[#ff8ba7] mb-6">
          Editar: {post.title}
        </h2>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
          <KDramaForm initialData={post} isEditing={true} postId={id} />
        </div>
      </main>
    </div>
  );
}
