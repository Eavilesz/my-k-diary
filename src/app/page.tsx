import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { getLatestPost } from "@/lib/posts";
import StatusBadge from "@/components/StatusBadge";

export default async function Home() {
  const latestPost = await getLatestPost();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#ff8ba7]">My K-Diary</h1>
          <Link href="/posts" className="text-[#ff8ba7] hover:underline">
            Ver todos los K-dramas
          </Link>
        </div>
      </header>

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
                {/* Left card - Image and Rating */}
                <div className="lg:w-1/3 mx-auto lg:mx-0 max-w-xs lg:max-w-none bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg flex flex-col items-center">
                  <Link
                    href={`/posts/${latestPost.id}`}
                    className="block relative w-full h-[400px]"
                  >
                    <Image
                      src={latestPost.coverImage}
                      alt={latestPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="rounded-lg shadow-md hover:opacity-90 transition-opacity"
                      priority
                    />
                  </Link>

                  <div className="mt-6 text-center">
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(latestPost.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="font-medium text-gray-700">
                      {latestPost.rating} / 5
                    </p>
                  </div>

                  <div className="mt-3">
                    <StatusBadge status={latestPost.status} />
                  </div>
                </div>

                {/* Right card - Content */}
                <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-medium mb-3 text-[#ff8ba7]">
                      Mi reseña
                    </h2>
                    <div className="prose prose-pink max-w-none">
                      {/* Show truncated review */}
                      <p className="line-clamp-6">{latestPost.review}</p>
                    </div>
                    <Link
                      href={`/posts/${latestPost.id}`}
                      className="inline-block mt-4 px-4 py-2 bg-[#ff8ba7] hover:bg-[#ff7b9c] text-white rounded-md transition-colors"
                    >
                      Leer más
                    </Link>
                  </div>

                  {/* Tags */}
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
            Hecho con 💖 para mi fan favorita de doramas
          </p>
        </div>
      </footer>
    </div>
  );
}
