function isValueAd(ad) {
    let iphoneVersion = [{ version: 'iphone 5', maxPrice: 40 }, { version: 'iphone 6s', maxPrice: 150 }, { version: 'iphone 6', maxPrice: 120 }, { version: 'iphone 7', maxPrice: 150 }, { version: 'iphone 8', maxPrice: 250 }, { version: 'iphone x', maxPrice: 350 }];
    let spamWords = ['case', 'promo', 'vitre', 'liquidation', 'tui', 'mega', 'otterbox', "✅", "paration"]
    let isValueAd = false
    for (spamWord of spamWords) {
        if (ad.title.toLowerCase().search(spamWord) !== -1) {
            return isValueAd
        }
    }

    for (version of iphoneVersion) {
        try {
            let adPrice = ad.price || ad.attributes.price
            
            if (ad.title.toLowerCase().search(version.version) !== -1) {
                if (adPrice < version.maxPrice) {
                    isValueAd = true
                    break
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    return isValueAd
}

module.exports.isValueAd = isValueAd