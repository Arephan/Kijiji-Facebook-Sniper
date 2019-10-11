const kijiji = require("kijiji-scraper");



// Scrape using returned promise
async function scrapeKijiji(city, query, maxPrice) {
    let options = {
        minResults: 40
    };

    let params = {
        locationId: city,
        keywords: query,
        maxPrice: maxPrice,
        categoryId: 0,
        sortByName: "dateDesc"
    };

    return kijiji.search(params, options).then(function (ads) {
        return ads
    }).catch(console.error);
}



module.exports.scrapeKijiji = scrapeKijiji;