export interface KDramaPost {
  id: string;
  title: string;
  coverImage: string;
  rating: number;
  review: string;
  whereToWatch: Array<{
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
  status: "Viendo" | "Finalizado" | "Abandonado";
  tags: string[];
  favoriteQuote?: string;
}
