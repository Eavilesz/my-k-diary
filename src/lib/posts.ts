import { supabase } from "./supabase";

// Define the allowed status values
export type Status = "Viendo" | "Finalizado" | "Abandonado";

export interface KDramaPost {
  id: string;
  title: string;
  coverImage: string;
  rating: number;
  review: string;
  status: Status;
  tags: string[];
  favoriteQuote?: string;
  createdAt: string;
  updatedAt: string;
  whereToWatch?: Array<{
    platform: string;
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
  content: string;
}

// Define the database schema type
interface DbKDramaPost {
  id: string;
  title: string;
  cover_image: string;
  rating: number;
  review: string;
  status: Status;
  tags: string[];
  favorite_quote?: string;
  created_at: string;
  updated_at: string;
  where_to_watch?: Array<{
    platform: string;
    icon: string;
  }>;
  korean_crush?: {
    name: string;
    image?: string;
  };
  song?: {
    title: string;
    artist: string;
    youtubeUrl: string;
  };
}

// Helper function to convert DB format to our format
function dbToPost(dbPost: DbKDramaPost): KDramaPost {
  return {
    id: dbPost.id,
    title: dbPost.title,
    coverImage: dbPost.cover_image,
    rating: dbPost.rating,
    review: dbPost.review,
    status: dbPost.status,
    tags: dbPost.tags || [],
    favoriteQuote: dbPost.favorite_quote,
    createdAt: dbPost.created_at,
    updatedAt: dbPost.updated_at,
    whereToWatch: dbPost.where_to_watch || [],
    koreanCrush: dbPost.korean_crush,
    song: dbPost.song,
    content: dbPost.review, // Using review as content
  };
}

// Helper function to convert our format to DB format
function postToDb(post: Partial<KDramaPost>) {
  return {
    title: post.title,
    cover_image: post.coverImage,
    rating: post.rating,
    review: post.review,
    status: post.status,
    tags: post.tags,
    favorite_quote: post.favoriteQuote,
    where_to_watch: post.whereToWatch,
    korean_crush: post.koreanCrush,
    song: post.song,
  };
}

// Get all posts data
export async function getAllPostsData(): Promise<KDramaPost[]> {
  const { data, error } = await supabase
    .from("kdrama_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return (data as DbKDramaPost[]).map(dbToPost);
}

// Get specific post data
export async function getPostData(id: string): Promise<KDramaPost | null> {
  const { data, error } = await supabase
    .from("kdrama_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return dbToPost(data as DbKDramaPost);
}

// Get the latest post
export async function getLatestPost(): Promise<KDramaPost | null> {
  const { data, error } = await supabase
    .from("kdrama_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching latest post:", error);
    return null;
  }

  return data ? dbToPost(data as DbKDramaPost) : null;
}

// Check if a post exists
export async function postExists(id: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("kdrama_posts")
    .select("id")
    .eq("id", id)
    .single();

  return !error && !!data;
}

// Create a new post
export async function createPost(
  postData: Omit<KDramaPost, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const dbData = postToDb(postData);

  const { data, error } = await supabase
    .from("kdrama_posts")
    .insert([dbData])
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }

  return (data as DbKDramaPost).id;
}

// Update an existing post
export async function updatePost(
  id: string,
  postData: Partial<KDramaPost>
): Promise<void> {
  const dbData = postToDb(postData);

  const { error } = await supabase
    .from("kdrama_posts")
    .update({
      ...dbData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating post:", error);
    throw new Error(`Failed to update post ${id}`);
  }
}

// Delete a post
export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("kdrama_posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting post:", error);
    throw new Error(`Failed to delete post ${id}`);
  }
}

// Get all post IDs (for static generation)
export async function getAllPostIds() {
  const { data, error } = await supabase.from("kdrama_posts").select("id");

  if (error) {
    console.error("Error fetching post IDs:", error);
    return [];
  }

  return data.map((post) => ({
    params: {
      id: post.id,
    },
  }));
}
