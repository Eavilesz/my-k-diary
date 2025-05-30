import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { getAllPostsData } from "@/lib/posts";

export default async function PostsPage() {
  const posts = await getAllPostsData();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#ff8ba7]">
            My K-Diary
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-[#ff8ba7] mb-8 text-center">
          Mi Colección de K-Dramas
        </h1>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No hay K-dramas en la colección aún.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-[320px]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
                    priority={false}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center text-yellow-400">
                        <FaStar />
                        <span className="ml-1 text-white">{post.rating}</span>
                      </div>
                      <span className="ml-2 px-2 py-1 rounded-full text-xs bg-white/30 text-white">
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
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
