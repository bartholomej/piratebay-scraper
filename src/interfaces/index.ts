export interface TPBResult {
  title: string;
  seeders: number;
  leechers: number;
  uploaded: string;
  uploader: string;
  size: string;
  link: string;
}

export type TPBProvider = 'https://thepiratebay.zone' | 'https://pirateproxy.live';
