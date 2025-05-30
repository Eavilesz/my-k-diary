import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface KDramaPost {
  id: string;
  title: string;
  coverImage: string;
  rating: number;
  review: string;
  status: string;
  tags: string[];
  favoriteQuote?: string;
  createdAt: string;
  updatedAt: string;
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
  content: string;
}

// Get all post IDs for static generation
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// Get all posts data
export async function getAllPostsData(): Promise<KDramaPost[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      return await getPostData(id);
    })
  );

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get specific post data
export async function getPostData(id: string): Promise<KDramaPost> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    content: contentHtml,
    review: matterResult.content, // Keep the raw markdown for review
    ...matterResult.data,
  } as KDramaPost;
}

// Get the latest post
export async function getLatestPost(): Promise<KDramaPost | null> {
  const allPosts = await getAllPostsData();
  return allPosts.length > 0 ? allPosts[0] : null;
}

// Check if a post exists
export function postExists(id: string): boolean {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  return fs.existsSync(fullPath);
}

// Create a new post
export async function createPost(
  postData: Omit<KDramaPost, "id" | "content">
): Promise<string> {
  // Generate a slug from the title
  const slug = postData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const id = `${slug}-${Date.now()}`;
  const fullPath = path.join(postsDirectory, `${id}.md`);

  // Create frontmatter
  const frontmatter = `---
title: "${postData.title}"
coverImage: "${postData.coverImage}"
rating: ${postData.rating}
status: "${postData.status}"
tags: [${postData.tags.map((tag) => `"${tag}"`).join(", ")}]
${postData.favoriteQuote ? `favoriteQuote: "${postData.favoriteQuote}"` : ""}
createdAt: "${postData.createdAt}"
updatedAt: "${postData.updatedAt}"
${
  postData.whereToWatch
    ? `whereToWatch:
${postData.whereToWatch
  .map(
    (platform) => `  - platform: "${platform.platform}"
    url: "${platform.url}"
    icon: "${platform.icon}"`
  )
  .join("\n")}`
    : ""
}
${
  postData.koreanCrush
    ? `koreanCrush:
  name: "${postData.koreanCrush.name}"
  ${postData.koreanCrush.image ? `image: "${postData.koreanCrush.image}"` : ""}`
    : ""
}
${
  postData.song
    ? `song:
  title: "${postData.song.title}"
  artist: "${postData.song.artist}"
  youtubeUrl: "${postData.song.youtubeUrl}"`
    : ""
}
---

${postData.review}
`;

  // Write the file
  fs.writeFileSync(fullPath, frontmatter);
  return id;
}

// Update an existing post
export async function updatePost(
  id: string,
  postData: Partial<KDramaPost>
): Promise<void> {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post ${id} not found`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // Merge the existing data with the new data
  const updatedData = {
    ...matterResult.data,
    ...postData,
    updatedAt: new Date().toISOString(),
  };

  // Remove content and review from frontmatter data since review goes in content
  const { content, ...frontmatterData } = updatedData;

  // Create frontmatter string
  const frontmatter = `---
title: "${frontmatterData.title}"
coverImage: "${frontmatterData.coverImage}"
rating: ${frontmatterData.rating}
status: "${frontmatterData.status}"
tags: [${frontmatterData.tags.map((tag: string) => `"${tag}"`).join(", ")}]
${
  frontmatterData.favoriteQuote
    ? `favoriteQuote: "${frontmatterData.favoriteQuote}"`
    : ""
}
createdAt: "${frontmatterData.createdAt}"
updatedAt: "${frontmatterData.updatedAt}"
${
  frontmatterData.whereToWatch
    ? `whereToWatch:
${frontmatterData.whereToWatch
  .map(
    (platform: any) => `  - platform: "${platform.platform}"
    url: "${platform.url}"
    icon: "${platform.icon}"`
  )
  .join("\n")}`
    : ""
}
${
  frontmatterData.koreanCrush
    ? `koreanCrush:
  name: "${frontmatterData.koreanCrush.name}"
  ${
    frontmatterData.koreanCrush.image
      ? `image: "${frontmatterData.koreanCrush.image}"`
      : ""
  }`
    : ""
}
${
  frontmatterData.song
    ? `song:
  title: "${frontmatterData.song.title}"
  artist: "${frontmatterData.song.artist}"
  youtubeUrl: "${frontmatterData.song.youtubeUrl}"`
    : ""
}
---

${postData.review || matterResult.content}
`;

  // Write the file
  fs.writeFileSync(fullPath, frontmatter);
}

// Delete a post
export function deletePost(id: string): void {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post ${id} not found`);
  }

  fs.unlinkSync(fullPath);
}
