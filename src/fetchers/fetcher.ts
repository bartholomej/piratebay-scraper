// import fetch from 'node-fetch';
import { TPBProvider } from '../interfaces/index.js';
import { searchUrl } from '../vars.js';

export const fetchPage = async (query: string, provider?: TPBProvider): Promise<string> => {
  const url = searchUrl(query, provider);

  try {
    const response = await fetch(url);
    if (response.status >= 400 && response.status < 600) {
      throw new Error(`piratebay-scraper: Bad response ${response.status} for url: ${url}`);
    }
    return await response.text();
  } catch {
    throw new Error(`piratebay-scraper: Page ${url} not found!`);
  }
};
