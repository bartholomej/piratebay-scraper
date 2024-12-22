import { fetchPage } from '../src/fetchers/fetcher';

const SEARCH = 'The Stranger 1946';

// Search
describe('Fetch movie page', () => {
  test('Fetch Orson Wells movie', async () => {
    const html = await fetchPage(SEARCH);
    expect(html).toContain('Stranger');
  });
});

// describe('Fetch movie page: Provider 2', () => {
//   test('Fetch Orson Wells movie', async () => {
//     const url = searchUrl(SEARCH, 'https://thepiratebay.zone');
//     const html = await fetchPage(url);
//     expect(html).toContain('Stranger');
//   });
// });
