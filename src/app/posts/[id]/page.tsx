import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SiNetflix, SiPrimevideo, SiVk, SiYoutube } from "react-icons/si";
import { FaMusic, FaStar } from "react-icons/fa";
import StatusBadge from "@/components/StatusBadge";

// Revalidate every minute
export const revalidate = 60;

// Define a type for the post
interface KDramaPost {
  id: string;
  title: string;
  coverImage: string;
  rating: number;
  review: string;
  status: string;
  tags: string[];
  favoriteQuote?: string;
  createdAt: string;
  whereToWatch?: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  koreanCrush?: {
    name: string;
    image?: string;
  };
  song?: {
    title: string;
    artist: string;
    youtubeUrl: string;
  };
}

// Get the platform icon based on the string name
function getPlatformIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "netflix":
      return <SiNetflix className="text-[#E50914] text-xl" />;
    case "amazon":
    case "primevideo":
      return <SiPrimevideo className="text-[#00A8E1] text-xl" />;
    case "viki":
      return <SiVk className="text-[#1D75E5] text-xl" />;
    case "youtube":
      return <SiYoutube className="text-[#FF0000] text-xl" />;
    default:
      return null;
  }
}

// Fetch post data from Firestore
async function getPostData(id: string): Promise<KDramaPost | null> {
  const docRef = doc(db, "kdramas", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as KDramaPost;
  } else {
    return null;
  }
}

// Main component
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#ff8ba7]">
            My K-Diary
          </Link>
          <Link href="/posts" className="text-[#ff8ba7] hover:underline">
            Ver todos los K-dramas
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-3 flex flex-col justify-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-center bg-gradient-to-br from-[#ff8ba7] via-[#ffc6c7] to-[#faeee7] text-transparent bg-clip-text animate-gradient pb-3 md:pb-6">
            My K-Diary
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center text-[#ff8ba7] mb-3 md:mb-6 underline">
            {post.title}
          </h2>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-3 lg:mt-6">
            {/* Left Card: Image and Rating */}
            <div className="lg:w-1/3 mx-auto lg:mx-0 max-w-xs lg:max-w-none lg:sticky lg:top-4 self-start bg-white/90 backdrop-blur-sm rounded-xl shadow-[0_20px_50px_rgba(255,183,197,0.3)] p-6 hover:shadow-[0_20px_50px_rgba(255,183,197,0.5)] transition-all duration-300 flex flex-col items-center border border-pink-100/50">
              <Image
                src={post.coverImage}
                alt={`${post.title} Cover`}
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
                        star <= Math.round(post.rating)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium bg-gradient-to-r from-[#ff8ba7] to-[#ffc6c7] bg-clip-text text-transparent">
                  {post.rating} de 5
                </span>
              </div>
            </div>

            {/* Right Card: Review and Sections */}
            <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-[#ff8ba7] mb-4 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                Reseña sin spoilers:
              </h3>
              {post.review.split("\n").map((paragraph, i) => (
                <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="grid gap-4">
                {/* Where to Watch Section */}
                {post.whereToWatch && post.whereToWatch.length > 0 && (
                  <div className="border-t border-pink-100 pt-4">
                    <h4 className="text-xl font-semibold text-[#ff8ba7] mb-3 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                      Dónde Ver:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {post.whereToWatch.map((platform, index) => (
                        <a
                          key={index}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        >
                          {getPlatformIcon(platform.icon)}
                          <span className="text-gray-700">
                            {platform.platform}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Korean Crush section */}
                {post.koreanCrush && (
                  <div className="border-t border-pink-100 pt-4">
                    <div className="flex items-center gap-4">
                      {post.koreanCrush.image && (
                        <Image
                          src={post.koreanCrush.image}
                          alt={post.koreanCrush.name}
                          width={100}
                          height={100}
                          className="rounded-full object-cover shadow-md"
                        />
                      )}
                      <p className="text-xl font-medium text-[#ff8ba7] italic relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                        Crush Coreano:{" "}
                        <span className="font-normal">
                          {post.koreanCrush.name}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Song Section */}
                {post.song && (
                  <div className="border-t border-pink-100 pt-4">
                    <h4 className="text-xl font-semibold text-[#ff8ba7] mb-4 items-center gap-2 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                      <FaMusic className="text-2xl" />
                      Para cantar a todo pulmón:
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-800">
                          {post.song.title}
                        </h5>
                        <p className="text-gray-600 text-sm">
                          Por {post.song.artist}
                        </p>
                      </div>
                      <a
                        href={post.song.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                      >
                        <SiYoutube className="text-[#FF0000] text-xl" />
                        <span className="text-gray-700">Escuchar</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Drama Status Section */}
                <div className="border-t border-pink-100 pt-4">
                  <h4 className="text-xl font-semibold text-[#ff8ba7] mb-3 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                    Estado:
                  </h4>
                  <StatusBadge status={post.status} />
                </div>

                {/* Drama Mood Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm bg-pink-50 text-[#ff8ba7] border border-pink-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Favorite Quotes Section */}
                {post.favoriteQuote && (
                  <div className="border-t border-pink-100 pt-4">
                    <h4 className="text-xl font-semibold text-[#ff8ba7] mb-3 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                      Frase Favorita:
                    </h4>
                    <blockquote className="italic text-gray-700 border-l-4 border-[#ff8ba7] pl-4">
                      &quot;{post.favoriteQuote}&quot;
                    </blockquote>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white py-3 border-t border-pink-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-[#ff8ba7] text-sm">
            Hecho con 💖 para mi fan favorita de doramas
          </p>
        </div>
      </footer>
    </div>
  );
}
