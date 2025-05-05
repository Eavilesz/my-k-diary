"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Safety redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Show loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ff8ba7]"></div>
      </div>
    );
  }

  // Create a safer sign out function that uses the standard approach
  const handleSignOut = () => {
    // Use window.location for a full page reload on sign out
    window.location.href = "/api/auth/signout?callbackUrl=/";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#ff8ba7]">
            My K-Diary Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{session?.user?.email || ""}</span>
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
          <h2 className="text-3xl font-semibold text-[#ff8ba7] mb-6">
            Panel de Administración
          </h2>

          <div className="flex justify-end mb-6">
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

            {/* This will be populated later */}
            <p className="text-gray-600 italic">No hay entradas aún.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
