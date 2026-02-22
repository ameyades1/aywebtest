/**
 * Get the full path for an asset, accounting for basePath in production
 * In dev: /assets/foo.jpg
 * In production on GitHub Pages: /aywebtest/assets/foo.jpg
 */
export function assetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}`;
}
