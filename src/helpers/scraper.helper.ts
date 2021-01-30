export const getTitle = (el: HTMLElement): string => {
  return el.querySelector('a.detLink').textContent;
};

export const getLink = (el: HTMLElement): string => {
  const link = el.querySelector(
    'a[title="Download this torrent using magnet"]'
  ) as HTMLAnchorElement;
  return link?.href;
};

export const getSeedLeech = (el: HTMLElement): number[] => {
  const [seed, leech] = [].slice.call(el.querySelectorAll('td[align="right"]'));
  return [+seed.textContent, +leech.textContent];
};

export const getAttrs = (el: HTMLElement): string[] => {
  return el.querySelectorAll('font.detDesc')[0].textContent.split(' ');
};

export const getSize = (attrs: string[]): string => {
  return attrs[3].replace(',', '');
};

export const getUploaded = (attrs: string[]): string => {
  return attrs[1].split(' ').join('-').replace(',', '');
};

export const getUploader = (attrs: string[]): string => {
  return attrs[7];
};
