const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ ads: [], lastUpdatedFacebook: 0, fbDuplicate: 0, kijijiDuplicate: 0, lastUpdatedKijiji: 0, valueAds: []})
  .write()

module.exports.db = db