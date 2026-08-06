import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import remarkPrism from 'remark-prism';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
const WORDS_PER_MINUTE = 200;
const EXCERPT_LENGTH = 160;

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getReadingTime(plainText) {
  const wordCount = plainText ? plainText.split(' ').filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

function getExcerpt(frontmatterExcerpt, plainText) {
  if (frontmatterExcerpt) return frontmatterExcerpt;
  if (!plainText) return '';
  if (plainText.length <= EXCERPT_LENGTH) return plainText;
  return plainText.slice(0, EXCERPT_LENGTH).replace(/\s+\S*$/, '') + '…';
}

function enrichPost(id, contentHtml, frontmatter) {
  const plainText = stripHtml(contentHtml);
  return {
    id,
    contentHtml,
    ...frontmatter,
    readingTime: getReadingTime(plainText),
    excerpt: getExcerpt(frontmatter.excerpt, plainText),
  };
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  // Filter out non-markdown files (like .DS_Store, etc.)
  const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'));
  const allPostsData = markdownFiles.map(fileName => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string, with syntax highlighting
    const processedContent = remark()
      .use(remarkPrism)
      .use(html, { sanitize: false })
      .processSync(matterResult.content)
      .toString();

    return enrichPost(fileName.replace(/\.md$/, ''), processedContent, matterResult.data);
  });

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

