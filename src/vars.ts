export const searchUrl = (query: string): string =>
  `https://tpb.party/search/${encodeURIComponent(query)}/0/99/0`;

export const PAGE_SIZE = 30;
