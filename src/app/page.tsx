import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold text-center bg-gradient-to-br from-[#ff8ba7] via-[#ffc6c7] to-[#faeee7] text-transparent bg-clip-text animate-gradient pb-9">
          My K-Diary
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center text-[#ff8ba7] mb-8 underline">
          A Virtuous Business
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Image and Rating Card */}
          <div className="lg:w-1/3 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/5/50/A_Virtuous_Business_poster.png"
              alt="A Virtuous Business Cover"
              width={300}
              height={450}
              priority
              className="rounded-lg shadow-md mb-6"
            />

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-8 h-8 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-medium text-[#ff8ba7]">
                4.5 out of 5
              </span>
            </div>
          </div>

          {/* Review Text Card */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-[#ff8ba7] mb-6">
              Spoiler free review:
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              A Virtuous Business tells the compelling story of Cheon Da-hee, a
              talented young woman who navigates the complex world of corporate
              Korea while maintaining her integrity and values. The drama
              masterfully balances workplace dynamics with personal growth,
              making it a refreshing take on the business genre.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              What sets this drama apart is its realistic portrayal of office
              politics and the challenges faced by young professionals. The lead
              actress delivers a stellar performance, bringing authenticity to
              her character&apos;s journey from an entry-level employee to a
              respected team leader.
            </p>

            <div className="mt-8 border-t border-pink-100 pt-6">
              <div className="flex items-center gap-4">
                <Image
                  src="https://images.mubicdn.net/images/cast_member/412650/cache-631190-1610355756/image-w856.jpg?size=300x"
                  alt="Yeon Woo-jin"
                  width={100}
                  height={100}
                  className="rounded-full object-cover shadow-md"
                />
                <p className="text-xl font-medium text-[#ff8ba7] italic">
                  Korean Crush:{" "}
                  <span className="font-normal">Yeon Woo-jin</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
