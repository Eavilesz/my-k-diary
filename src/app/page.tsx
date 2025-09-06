import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { getLatestPost } from "@/lib/posts";
import StatusBadge from "@/components/StatusBadge";
import Header from "@/components/Header";

export default async function Home() {
  const latestPost = await getLatestPost();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-center bg-gradient-to-br from-[#ff8ba7] via-[#ffc6c7] to-[#faeee7] text-transparent bg-clip-text animate-gradient pb-3 md:pb-6">
            My K-Diary
          </h1>

          {latestPost ? (
            <>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center text-[#ff8ba7] mb-8">
                Último K-Drama: {latestPost.title}
              </h2>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2 mx-auto lg:mx-0 max-w-md lg:max-w-none lg:sticky lg:top-4 self-start bg-white/90 backdrop-blur-sm rounded-xl shadow-[0_20px_50px_rgba(255,183,197,0.3)] p-6 hover:shadow-[0_20px_50px_rgba(255,183,197,0.5)] transition-all duration-300 flex flex-col items-center border border-pink-100/50">
                  <Image
                    src={latestPost.coverImage}
                    alt={`${latestPost.title} Cover`}
                    width={280}
                    height={420}
                    priority
                    className="rounded-lg shadow-md mb-4"
                  />

                  <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-lg border-2 border-[#ff8ba7]/20 shadow-[0_4px_12px_rgba(255,139,167,0.1)]">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`w-8 h-8 ${
                            star <= Math.round(latestPost.rating)
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium bg-gradient-to-r from-[#ff8ba7] to-[#ffc6c7] bg-clip-text text-transparent">
                      {latestPost.rating} de 5
                    </span>
                  </div>
                </div>

                <div className="lg:w-1/2 bg-white rounded-xl shadow-lg p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-medium mb-3 text-[#ff8ba7]">
                      Mi reseña
                    </h2>
                    <div className="prose prose-pink max-w-none">
                      <p className="line-clamp-6">{latestPost.review}</p>
                    </div>
                    <Link
                      href={`/posts/${latestPost.id}`}
                      className="inline-block mt-4 px-4 py-2 bg-[#ff8ba7] hover:bg-[#ff7b9c] text-white rounded-md transition-colors"
                    >
                      Leer más
                    </Link>
                  </div>

                  {latestPost.tags && latestPost.tags.length > 0 && (
                    <div className="mt-6">
                      <h2 className="text-xl font-medium mb-3 text-[#ff8ba7]">
                        Etiquetas
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {latestPost.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-pink-50 text-[#ff8ba7] rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <h2 className="text-xl font-medium mb-3 text-[#ff8ba7]">
                      Estado
                    </h2>
                    <StatusBadge status={latestPost.status} />
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/posts"
                  className="px-6 py-3 bg-[#ff8ba7] hover:bg-[#ff7b9c] text-white rounded-md transition-colors text-lg"
                >
                  Ver toda mi colección de K-dramas
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">
                Aún no hay K-dramas en la colección.
              </p>
              <Link
                href="/admin/login"
                className="px-4 py-2 bg-[#ff8ba7] hover:bg-[#ff7b9c] text-white rounded-md transition-colors"
              >
                Iniciar sesión como administrador
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white py-4 border-t border-pink-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-[#ff8ba7] text-sm">
            Hecho con 💖 para mi fan favorita de doramas: KR 🦎
          </p>
        </div>
      </footer>
    </div>
  );
}
