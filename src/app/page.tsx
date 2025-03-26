import Image from "next/image";
import { SiNetflix, SiPrimevideo, SiVk, SiYoutube } from "react-icons/si";
import { FaMusic, FaStar } from "react-icons/fa";
import StatusBadge from "@/components/StatusBadge";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-3 flex flex-col justify-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-center bg-gradient-to-br from-[#ff8ba7] via-[#ffc6c7] to-[#faeee7] text-transparent bg-clip-text animate-gradient pb-6">
            My K-Diary
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center text-[#ff8ba7] mb-6 underline">
            A Virtuous Business
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Left Card: Image and Rating */}
            <div className="lg:w-1/3 lg:sticky lg:top-4 self-start bg-white/90 backdrop-blur-sm rounded-xl shadow-[0_20px_50px_rgba(255,183,197,0.3)] p-6 hover:shadow-[0_20px_50px_rgba(255,183,197,0.5)] transition-all duration-300 flex flex-col items-center border border-pink-100/50">
              <Image
                src="https://cdn-images.dzcdn.net/images/cover/5a15842b74960a45a40ad8a0fe2e39fe/0x1900-000000-80-0-0.jpg"
                alt="A Virtuous Business Cover"
                width={280}
                height={420}
                priority
                className="rounded-lg shadow-md mb-4"
              />
              <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-lg border-2 border-[#ff8ba7]/20 shadow-[0_4px_12px_rgba(255,139,167,0.1)]">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="w-8 h-8 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-medium bg-gradient-to-r from-[#ff8ba7] to-[#ffc6c7] bg-clip-text text-transparent">
                  4.5 de 5
                </span>
              </div>
            </div>

            {/* Right Card: Review and Sections */}
            <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-[#ff8ba7] mb-4 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                Reseña sin spoilers:
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A Virtuous Business cuenta la fascinante historia de Cheon
                Da-hee, una joven talentosa que navega por el complejo mundo
                corporativo de Corea mientras mantiene su integridad y valores.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                El drama equilibra magistralmente la dinámica laboral, el
                romance y el crecimiento personal, ofreciendo una refrescante
                perspectiva del género empresarial. La química entre los
                protagonistas es excepcional, añadiendo profundidad a una trama
                ya cautivadora.
              </p>

              <div className="grid gap-4">
                {/* Where to Watch Section */}
                <div className="border-t border-pink-100 pt-4">
                  <h4 className="text-xl font-semibold text-[#ff8ba7] mb-3 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                    Dónde Ver:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.netflix.com/title/81725482"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <SiNetflix className="text-[#E50914] text-xl" />
                      <span className="text-gray-700">Netflix</span>
                    </a>

                    <a
                      href="https://www.primevideo.com/detail/A-Virtuous-Business/0KXQJ7FHCKB6T5MGJH8261DYZK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <SiPrimevideo className="text-[#00A8E1] text-xl" />
                      <span className="text-gray-700">Prime Video</span>
                    </a>

                    <a
                      href="https://www.viki.com/tv/45572c-a-business-proposal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <SiVk className="text-[#1D75E5] text-xl" />
                      <span className="text-gray-700">Viki</span>
                    </a>
                  </div>
                </div>

                {/* Korean Crush section */}
                <div className="border-t border-pink-100 pt-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="https://images.mubicdn.net/images/cast_member/412650/cache-631190-1610355756/image-w856.jpg?size=300x"
                      alt="Yeon Woo-jin"
                      width={100}
                      height={100}
                      className="rounded-full object-cover shadow-md"
                    />
                    <p className="text-xl font-medium text-[#ff8ba7] italic relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                      Crush Coreano:{" "}
                      <span className="font-normal">Yeon Woo-jin</span>
                    </p>
                  </div>
                </div>

                {/* Song Section */}
                <div className="border-t border-pink-100 pt-4">
                  <h4 className="text-xl font-semibold text-[#ff8ba7] mb-4 items-center gap-2 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                    <FaMusic className="text-2xl" />
                    Para cantar a todo pulmón:
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-800">Beautiful</h5>
                      <p className="text-gray-600 text-sm">Por Crush</p>
                    </div>
                    <a
                      href="https://www.youtube.com/watch?v=W0cs6ciCt_k"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <SiYoutube className="text-[#FF0000] text-xl" />
                      <span className="text-gray-700">Escuchar</span>
                    </a>
                  </div>
                </div>

                {/* Drama Status Section */}
                <div className="border-t border-pink-100 pt-4">
                  <h4 className="text-xl font-semibold text-[#ff8ba7] mb-3 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                    Estado:
                  </h4>
                  <StatusBadge status="Finalizado" />
                </div>

                {/* Drama Mood Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Romántico", "Corporativo", "Slice of Life", "Comedia"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm bg-pink-50 text-[#ff8ba7] border border-pink-100"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                {/* Favorite Quotes Section */}
                <div className="border-t border-pink-100 pt-4">
                  <h4 className="text-xl font-semibold text-[#ff8ba7] mb-3 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#ff8ba7] after:to-transparent">
                    Frase Favorita:
                  </h4>
                  <blockquote className="italic text-gray-700 border-l-4 border-[#ff8ba7] pl-4">
                    &quot;El éxito no se trata de dinero, sino de mantener tu
                    integridad.&quot;
                  </blockquote>
                </div>
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
