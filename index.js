const scraper = require('./scraper.js')
const db = require('./db.js')

// config
const query = 'iphone';
const city = 'montreal';
const maxPrice = '350';

scraper.scrapeFacebook(city, query, maxPrice).then(fbAds => {
  let duplicate = 0
  fbAds.map(ad => {
    if (db.db.get('ads').find({ url: ad.url }).value()) {
      duplicate++
    } else {
      db.db.get('ads').push(ad).write()
    }
  })

  db.db.set('lastUpdated', new Date().toUTCString()).write()
  db.db.set('duplicate', duplicate).write()
})
