import Link from "next/link";

interface HeaderProps {
  showAllPostsLink?: boolean;
  showBackToHomeLink?: boolean;
}

export default function Header({
  showAllPostsLink = true,
  showBackToHomeLink = false,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-pink-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#ff8ba7]">
          My K-Diary
        </Link>
        <div className="flex items-center gap-4">
          {showBackToHomeLink && (
            <Link href="/" className="text-[#ff8ba7] hover:underline">
              Inicio
            </Link>
          )}
          {showAllPostsLink && (
            <Link href="/posts" className="text-[#ff8ba7] hover:underline">
              Ver todos los K-dramas
            </Link>
          )}
          <Link
            href="/admin"
            className="px-3 py-1 bg-[#ff8ba7] hover:bg-[#ff7b9c] text-white rounded-md transition-colors text-sm"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
