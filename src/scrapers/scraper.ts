// import jsdom from 'jsdom'; // Uncomment whe you run in nodejs. Debugging.
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
import { TPBProvider, TPBResult } from '../interfaces';
import { PAGE_SIZE } from '../vars';

export class ThePirateBayScraper {
  public async search(query: string, provider?: TPBProvider): Promise<TPBResult[]> {
    const response = await fetchPage(query, provider);

    /**
     * Create virtual node for DOM traversing
     * Choose nodejs OR browser version
     */

    // Nodejs version
    // const virtualNode = this.nodeDOM(response); // Uncomment whe you run in nodejs. Debugging.
    // Browser version
    const virtualNode = this.browserDOM(response);

    // Get all rows (without header)
    const items: HTMLTableRowElement[] = [].slice.call(
      virtualNode.querySelectorAll('#searchResult tbody tr:not(.header)')
    );

    return this.buildItems(items);
  }

  private browserDOM(response: string): HTMLHtmlElement {
    const html = document.createElement('html');
    html.innerHTML = response;
    return html;
  }

  // private nodeDOM(response: string): Document {
  //   const { JSDOM } = jsdom;
  //   return new JSDOM(response).window.document;
  // }

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
