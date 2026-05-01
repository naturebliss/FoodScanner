export const getSSEUrl = (query: string) => {
  return `/api/scans/stream?q=${encodeURIComponent(query)}`;
};
