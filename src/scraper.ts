import { Results } from '@interfaces/app.interface';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import { searchUrl } from './vars';

export class ThePirateBayScraper {
  async fetchAsync(query: string): Promise<string> {
    const url = searchUrl(query);
    const response = await fetch(url);
    return await response.text();
  }

  async search(query: string): Promise<Results[]> {
    const torrents: Results[] = [];
    const response = await this.fetchAsync(query);

    const node = parse(response).querySelectorAll('#searchResult tr');
    // Skip heading
    node.shift();
    node.pop();

    for (const element of node) {
      const title = element.querySelector('a.detLink').text;

      const link = element.querySelectorAll('a')[3].attributes.href;
      const info = element.querySelectorAll('td');
      const attrs = element.querySelectorAll('font.detDesc')[0].text.split(' ');

      const size = attrs[3].replace(',', '');
      const uploaded = attrs[1].split(' ').join('-').replace(',', '');
      const uploader = attrs[7];

      torrents.push({
        title,
        seeders: +info[2].text,
        leechers: +info[3].text,
        uploaded,
        uploader,
        size,
        link
      });
    }
    return torrents;
  }
}
