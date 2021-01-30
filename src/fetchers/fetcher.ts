import fetch from 'cross-fetch';
import { searchUrl } from '../vars';

export const fetchPage = async (query: string): Promise<string> => {
  const url = searchUrl(query);
  try {
    const response = await fetch(url);
    if (response.status >= 400 && response.status < 600) {
      throw new Error(`piratebay-scraper: Bad response ${response.status} for url: ${url}`);
    }
    return await response.text();
  } catch (e) {
    console.error(e);
    return 'Error';
  }
};
