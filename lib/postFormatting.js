// Client-safe post formatting helpers. Kept separate from lib/posts.js, which
// pulls in fs/remark-prism (jsdom) and must only ever run server-side.

// Parses a 'YYYY-MM-DD' frontmatter date as a local calendar date (avoids the
// UTC-midnight-shifts-back-a-day bug you get from `new Date('YYYY-MM-DD')`).
export function formatPostDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
