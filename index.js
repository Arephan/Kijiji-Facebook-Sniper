const scraper = require('./scraper.js')

// config
const query = 'iphone';
const city = 'montreal';
const maxPrice = '350';

let items = scraper.scrapeFacebook(city, query, maxPrice)