# Flaub — an EPUB parser and reader in the browser

> Built using React, Vite, and the lovely DOMParser.

I couldn't get a single EPUB reader to work on my Ubuntu, and you know what's the smartest thing to do when that happens? Yes—creating your own reader.

The parser is inspired by [epub-parser](https://github.com/gaoxiaoliangz/epub-parser), except that it doesn't offer as many options and it relies on the browser's DOMParser. The latter turned out to be really sweet to work with since all you need to know is how to use `querySelector`. 

It's named Flaue 'cause Flaubert. here's a moustache. I couldn't find one that looks like Flaub's.

![Moustache](./src/icons/Custom/logo.svg)

## Features

- Dark mode (thanks to Radix UI Colors)
- Caching (uses IndexedDB to avoid parsing files again)
- Saving scroll position
