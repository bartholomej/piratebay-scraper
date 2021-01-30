import jsdom from 'jsdom';
import { fetchPage } from '../fetchers/fetcher';
import {
  getAttrs,
  getLink,
  getSeedLeech,
  getSize,
  getTitle,
  getUploaded,
  getUploader
} from '../helpers/scraper.helper';
import { TPBResult } from '../interfaces';
import { PAGE_SIZE } from '../vars';

export class ThePirateBayScraper {
  public async search(query: string): Promise<TPBResult[]> {
    const response = await fetchPage(query);

    const { JSDOM } = jsdom;
    // Create virtual node for DOM traversing
    const virtualNode = new JSDOM(response).window.document;

    // Get all rows (without header)
    const items: HTMLTableRowElement[] = [].slice.call(
      virtualNode.querySelectorAll('#searchResult tbody tr:not(.header)')
    );

    return this.buildItems(items);
  }

  private buildItems(items: HTMLTableRowElement[]): TPBResult[] {
    const torrents: TPBResult[] = [];

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
    return torrents;
  }
}
