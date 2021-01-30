import { fetchPage } from '../src/fetchers/fetcher';
import { searchUrl } from '../src/vars';

const SEARCH = 'The Stranger 1946';

// Search
describe('Fetch movie page', () => {
  test('Fetch Orson Wells movie', async () => {
    const url = searchUrl(SEARCH);
    const html = await fetchPage(url);
    expect(html).toContain('Stranger');
  });
});
