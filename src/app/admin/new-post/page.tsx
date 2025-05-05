"use client";

import KDramaForm from "@/components/admin/KDramaForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function NewPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
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
          Crear Nuevo K-Drama
        </h2>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
          <KDramaForm />
        </div>
      </main>
    </div>
  );
}
