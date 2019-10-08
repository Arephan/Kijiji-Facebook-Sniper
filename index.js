const scraper = require('./scraper.js')
const db = require('./db.js')

// config
const query = 'iphone';
const city = 'montreal';
const maxPrice = '350';

scraper.scrapeFacebook(city, query, maxPrice).then(fbAds => {
  db.db.get('fbAds')
    .push(fbAds)
    .write()
})
