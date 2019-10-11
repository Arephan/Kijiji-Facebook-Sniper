const fbScraper = require('./facebookScraper.js')
const kijiji = require('kijiji-scraper')
const kijijiScraper = require('./kijijiScraper.js')
const db = require('./db.js')

// config
const query = 'iphone';
const city = 'montreal';
const maxPrice = '350';

fbScraper.scrapeFacebook(city, query, maxPrice).then(fbAds => {
  let duplicate = 0
  fbAds.map(ad => {
    if (db.db.get('ads').find({ url: ad.url }).value()) {
      duplicate++
    } else {
      db.db.get('ads').push(ad).write()
    }
  })

  db.db.set('lastUpdatedFacebook', new Date().toUTCString()).write()
  db.db.set('fbDuplicate', duplicate).write()
})

kijijiScraper.scrapeKijiji(kijiji.locations.QUEBEC.GREATER_MONTREAL, query, maxPrice).then(kijijiAds => {
  let duplicate = 0
  kijijiAds.map(ad => {
    if (db.db.get('ads').find({ url: ad.url }).value()) {
      duplicate++
    } else {
      db.db.get('ads').push(ad).write()
    }
  })

  db.db.set('lastUpdatedKijiji', new Date().toUTCString()).write()
  db.db.set('kijijiDuplicate', duplicate).write() 
})