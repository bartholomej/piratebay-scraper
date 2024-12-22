import { TPBProvider } from './interfaces';

const DEFAULT_PROVIDER: TPBProvider = 'https://thepiratebay.zone/';

export const searchUrl = (query: string, provider: TPBProvider = DEFAULT_PROVIDER): string =>
  `${provider.endsWith('/') ? provider : `${provider}/`}search/${encodeURIComponent(query)}/0/99/0`;

export const PAGE_SIZE = 30;
