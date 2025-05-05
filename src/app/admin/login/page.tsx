"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/admin";

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#ff8ba7]"></div>
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-[0_20px_50px_rgba(255,183,197,0.3)] p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-br from-[#ff8ba7] to-[#ffc6c7] text-transparent bg-clip-text mb-6">
            My K-Diary Admin
          </h1>

          <p className="text-gray-600 mb-8 text-center">
            Accede para administrar tu colección de K-dramas
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-3 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Image
              src="/google-logo.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Iniciar sesión con Google
          </button>
        </div>
      </main>
    </div>
  );
}
