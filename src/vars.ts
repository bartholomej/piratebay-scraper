import { TPBProvider } from './interfaces';

const PROVIDER = 'https://tpb.party';

export const searchUrl = (query: string, provider: TPBProvider = PROVIDER): string =>
  `${provider.endsWith('/') ? provider : `${provider}/`}search/${encodeURIComponent(query)}/0/99/0`;

export const PAGE_SIZE = 30;
