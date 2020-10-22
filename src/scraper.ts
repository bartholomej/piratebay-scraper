import { TPBResult } from './interfaces';
import { searchUrl } from './vars';

export class ThePirateBayScraper {
  async fetchAsync(query: string): Promise<string> {
    const url = searchUrl(query);
    const response = await fetch(url);
    return await response.text();
  }

  async search(query: string): Promise<TPBResult[]> {
    const torrents: TPBResult[] = [];
    const response = await this.fetchAsync(query);

    // Create virtual node for DOM traversing
    const virtualNode = document.createElement('html');
    virtualNode.innerHTML = response;

    const node: HTMLTableRowElement[] = [].slice.call(
      virtualNode.querySelectorAll('#searchResult tbody tr:not(.header)')
    );

    for (const item of node) {
      const title = item.querySelector('a.detLink').textContent;
      const link = (item.querySelector(
        'a[title="Download this torrent using magnet"]'
      ) as HTMLAnchorElement).href;
      const seedLeech = [].slice.call(item.querySelectorAll('td[align="right"]'));
      const attrs = item.querySelectorAll('font.detDesc')[0].textContent.split(' ');

      const size = attrs[3].replace(',', '');
      const uploaded = attrs[1].split(' ').join('-').replace(',', '');
      const uploader = attrs[7];

      torrents.push({
        title,
        seeders: +seedLeech[0].textContent,
        leechers: +seedLeech[1].textContent,
        uploaded,
        uploader,
        size,
        link
      });
    }
    return torrents;
  }
}
