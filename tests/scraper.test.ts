import { TPBResult } from '../src/interfaces';
import { ThePirateBayScraper } from '../src/scrapers/scraper';

const SEARCH = 'The Stranger 1946';

describe('Simple call', () => {
  const piratebay = new ThePirateBayScraper();
  const res: Promise<TPBResult[]> = piratebay.search(SEARCH);

  test('Should have at least one item with name Stranger', async () => {
    const results = await res;
    const item = results.filter((item) => item.title.includes('Stranger'));
    expect(item.length).toBeGreaterThan(1);
  });

  test('Should have at least one item', async () => {
    const results = await res;
    expect(results.length).toBeGreaterThan(1);
  });

  test('Should have at least one seeder', async () => {
    const results = await res;
    const item = results.filter((item) => item.seeders > 0);
    expect(item.length).toBeGreaterThan(1);
  });
});

describe('Simple call. Provider 2', () => {
  const piratebay = new ThePirateBayScraper();
  const res: Promise<TPBResult[]> = piratebay.search(SEARCH, 'https://thepiratebay.zone/');

  test('Should have at least one item with name Stranger', async () => {
    const results = await res;
    const item = results.filter((item) => item.title.includes('Stranger'));
    expect(item.length).toBeGreaterThan(1);
  });

  test('Should have at least one item', async () => {
    const results = await res;
    expect(results.length).toBeGreaterThan(1);
  });

  test('Should have at least one seeder', async () => {
    const results = await res;
    const item = results.filter((item) => item.seeders > 0);
    expect(item.length).toBeGreaterThan(1);
  });
});

// describe('Simple call. Provider 3', () => {
//   const piratebay = new ThePirateBayScraper();
//   const res: Promise<TPBResult[]> = piratebay.search(SEARCH, 'https://pirateproxy.live/');

//   test('Should have at least one item with name Stranger', async () => {
//     const results = await res;
//     const item = results.filter((item) => item.title.includes('Stranger'));
//     expect(item.length).toBeGreaterThan(1);
//   });

//   test('Should have at least one item', async () => {
//     const results = await res;
//     expect(results.length).toBeGreaterThan(1);
//   });

//   test('Should have at least one seeder', async () => {
//     const results = await res;
//     const item = results.filter((item) => item.seeders > 0);
//     expect(item.length).toBeGreaterThan(1);
//   });
// });
