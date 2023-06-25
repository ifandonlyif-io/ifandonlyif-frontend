export function parseUrl(url: string): string {
  const urlObject = new URL('/', url)
  const protocol = urlObject.protocol ?? 'https:'
  return `${protocol}//${urlObject.hostname}`
}
