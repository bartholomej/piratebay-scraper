import jsdom from 'jsdom';
import fetch from 'node-fetch';
import {
  getAttrs,
  getLink,
  getSeedLeech,
  getSize,
  getTitle,
  getUploaded,
  getUploader
} from './helpers/scraper.helper';
import { TPBResult } from './interfaces';
import { PAGE_SIZE, searchUrl } from './vars';

export class ThePirateBayScraper {
  async fetchAsync(query: string): Promise<string> {
    const url = searchUrl(query);
    const response = await fetch(url);
    return await response.text();
  }

  async search(query: string): Promise<TPBResult[]> {
    const torrents: TPBResult[] = [];
    const response = await this.fetchAsync(query);

    const { JSDOM } = jsdom;
    // Create virtual node for DOM traversing
    const virtualNode = new JSDOM(response).window.document;

    // Get all rows (without header)
    const items: HTMLTableRowElement[] = [].slice.call(
      virtualNode.querySelectorAll('#searchResult tbody tr:not(.header)')
    );

    // Remove last row which is usually pagination
    if (items.length > PAGE_SIZE) {
      items.pop();
    }

    for (const item of items) {
      const [seeders, leechers] = getSeedLeech(item);
      const attrs = getAttrs(item);

      torrents.push({
        title: getTitle(item),
        seeders,
        leechers,
        uploaded: getUploaded(attrs),
        uploader: getUploader(attrs),
        size: getSize(attrs),
        link: getLink(item)
      });
    }
    console.log(torrents);
    return torrents;
  }
}
