/**
 * @jest-environment jsdom
 */
import {
  getAttrs,
  getLink,
  getSeedLeech,
  getSize,
  getTitle,
  getUploaded,
  getUploader
} from '../src/helpers/scraper.helper';
import { resultsMock } from './mocks/results.html';

document.body.innerHTML = resultsMock;
const html = document.createElement('html');
html.innerHTML = resultsMock;
const items = html.querySelectorAll('#searchResult tbody tr:not(.header)');

const firstItem = items[0] as HTMLElement;
const lastItem = items[items.length - 1] as HTMLElement;

describe('Get Attrs', () => {
  test('First item', () => {
    const item = getAttrs(firstItem);
    expect(item).toEqual<string[]>([
      'Uploaded',
      '12-25 2009,',
      'Size',
      '1.07 GiB,',
      'ULed',
      'by',
      '',
      'kerouac_rj',
      ''
    ]);
  });
  test('First item', () => {
    const item = getAttrs(lastItem);
    expect(item).toEqual<string[]>([
      'Uploaded',
      '11-08 2018,',
      'Size',
      '8.75 GiB,',
      'ULed',
      'by',
      '',
      'Supernova',
      ''
    ]);
  });
});

const firstAttrs = getAttrs(firstItem);
const lastAttrs = getAttrs(lastItem);

describe('Get Titles', () => {
  test('First item', () => {
    const item = getTitle(firstItem);
    expect(item).toEqual<string>('Orson Welles - The Stranger (1946)');
  });
  test('Last item', () => {
    const item = getTitle(lastItem);
    expect(item).toEqual<string>('The.Stranger.1946.REMASTERED.1080p.BluRay.X264-AMIABLE');
  });
});

describe('Get Seeders', () => {
  test('First item', () => {
    const item = getSeedLeech(firstItem);
    expect(item[0]).toEqual<number>(4);
  });
  test('First item', () => {
    const item = getSeedLeech(lastItem);
    expect(item[0]).toEqual<number>(0);
  });
});

describe('Get Leechers', () => {
  test('First item', () => {
    const item = getSeedLeech(firstItem);
    expect(item[1]).toEqual<number>(0);
  });
  test('First item', () => {
    const item = getSeedLeech(lastItem);
    expect(item[1]).toEqual<number>(1);
  });
});

describe('Get Uploaded', () => {
  test('First item', () => {
    const item = getUploaded(firstAttrs);
    expect(item).toEqual<string>('12-25 2009');
  });
  test('First item', () => {
    const item = getUploaded(lastAttrs);
    expect(item).toEqual<string>('11-08 2018');
  });
});

describe('Get Uploader', () => {
  test('First item', () => {
    const item = getUploader(firstAttrs);
    expect(item).toEqual<string>('kerouac_rj');
  });
  test('First item', () => {
    const item = getUploader(lastAttrs);
    expect(item).toEqual<string>('Supernova');
  });
});

describe('Get Size', () => {
  test('First item', () => {
    const item = getSize(firstAttrs);
    expect(item).toEqual<string>('1.07 GiB');
  });
  test('First item', () => {
    const item = getSize(lastAttrs);
    expect(item).toEqual<string>('8.75 GiB');
  });
});

describe('Get Link', () => {
  test('First item', () => {
    const item = getLink(firstItem);
    expect(item).toEqual<string>(
      'magnet:?xt=urn:btih:87BC1DAF5DA5787A73FF2F7483E3082ECE02F669&dn=Orson+Welles+-+The+Stranger+%281946%29&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce'
    );
  });
  test('First item', () => {
    const item = getLink(lastItem);
    expect(item).toEqual<string>(
      'magnet:?xt=urn:btih:2FCC395A44AC47FE7C82E60081298B6B1C743DF2&dn=The.Stranger.1946.REMASTERED.1080p.BluRay.X264-AMIABLE&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce'
    );
  });
});
