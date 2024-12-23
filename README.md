[![npm version](https://badge.fury.io/js/piratebay-scraper.svg)](https://badge.fury.io/js/piratebay-scraper)
![](https://github.com/bartholomej/piratebay-scraper/workflows/Build%20&%20Publish/badge.svg)
[![codecov](https://codecov.io/gh/bartholomej/piratebay-scraper/branch/master/graph/badge.svg?token=GPNWF9USIB)](https://codecov.io/gh/bartholomej/piratebay-scraper)

# The PirateBay API (Scraper)

> Tiny Node.js library for scraping The PirateBay
>
> - JavaScript/TypeScript
> - Can also be used on server _(λ function, firebase function, service workers, browser extensions, ...)_

## Install

via `npm` or `yarn`

```bash
npm install piratebay-scraper
# yarn add piratebay-scraper
```

## Usage

Let's find some public domain movie from [this list](https://en.wikipedia.org/wiki/List_of_films_in_the_public_domain_in_the_United_States): **Orson Welles – The Stranger (1946)**

```javascript
import { piratebay } from 'piratebay-scraper';

piratebay.search('The Stranger 1946').then((res) => console.log(res));
```

## Results

```javascript
[
  {
    title: 'Orson Welles - The Stranger (1946)',
    seeders: 7,
    leechers: 0,
    uploaded: '12-25 2009',
    uploader: 'anonym',
    size: '1.07 GiB',
    link: 'magnet:?xt=urn:btih:87BC1DAF5DA5787A73FF2F7483E3082ECE02F669&dn=Orson....'
  }
];
```

## Development

### Developing and debugging library

```bash
yarn start
```

### Run demo locally

You can find and modify it in `./demo.ts` file

```bash
yarn demo
```

## Contribution

I welcome you to customize this according to your needs ;)

Pull requests for any improvements would be great!

## Donation

If this project have helped you save time please consider [making a donation](https://github.com/sponsors/bartholomej) for some 🍺 or 🍵 ;)

## Privacy Policy

I DO NOT STORE ANY DATA. PERIOD.

I physically can't. I have nowhere to store it. I don't even have a server database to store it. So even if Justin Bieber asked nicely to see your data, I wouldn't have anything to show him.

That's why, with Piratebay Scraper, what happens on your device stays on your device till disappear.

## Development (notes for me)

### Publish Stable

```shell
yarn release:patch
# yarn release:minor
# yarn release:major
```

### Publish beta channel

1. Bump version `-beta.0` in `package.json`
2. `yarn publish:beta`

## License

Copyright &copy; 2025 [Lukas Bartak](http://bartweb.cz)

Proudly powered by nature 🗻, wind 💨, tea 🍵 and beer 🍺 ;)

All contents are licensed under the [MIT license].

[mit license]: LICENSE
