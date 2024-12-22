import { searchUrl } from '../src/vars';

describe('Get Url', () => {
  test('The Stranger 1946', () => {
    const item = searchUrl('The Stranger 1946');
    expect(item).toEqual<string>('https://thepiratebay.zone/search/The%20Stranger%201946/0/99/0');
  });
  test('Something & %20 strange--!', () => {
    const item = searchUrl('Something & %20 strange--!');
    expect(item).toEqual<string>(
      'https://thepiratebay.zone/search/Something%20%26%20%2520%20strange--!/0/99/0'
    );
  });
});
