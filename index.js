const scraper = require('./scraper.js')
const db = require('./db.js')

// config
const query = 'iphone';
const city = 'montreal';
const maxPrice = '350';

scraper.scrapeFacebook(city, query, maxPrice).then(fbAds => {
  let duplicate = 0
  fbAds.map(ad => {
    if (db.db.get('fbAds').find({ url: ad.url }).value()) {
      duplicate++
    } else {
      db.db.get('fbAds').push(ad).write()
    }
  })

  console.log("duplicate: " + duplicate)
})
