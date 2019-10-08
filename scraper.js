const puppeteer = require('puppeteer');

async function scrapeFacebook(city, query, maxPrice) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://mobile.facebook.com/marketplace/${city}/search/?query=${query}&maxPrice=${maxPrice}`
  );
  await autoScroll(page);

  let titles = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('[class="_59k _2rgt _1j-f _2rgt _3zi4 _2rgt _1j-f _2rgt"]')
    ).map(title => title.innerText.replace(/’|'/g, ''))
  );

  let prices = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        '[class="_59k _2rgt _1j-f _2rgt"]'
      )
    ).map(price => price.innerText.replace(/\$/g, ''))
  );

  let urls = await page.evaluate(() => 
    Array.from(
      document.querySelectorAll('[class="_9_7 _643_"]')
    ).map(item => item.href)
  )

  prices = prices.slice(3,35)
  urls = urls.slice(2,34)

  // @TODO: get picture URLs and add onto 'items'
  // @TODO: set up polling
  // @TODO: generate email

  const items = await prepareItems(titles, prices, urls, "facebook", new Date().toUTCString());
  await browser.close();
  return items
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

async function prepareItems(titles, prices, urls, source, timestamp) {
  let items = [];

  for (let i = 0; i < titles.length; i++) {
    let item = {
      title: titles[i],
      price: prices[i],
      url: urls[i],
      source: source,
      timestamp: timestamp
    };

    items.push(item);
  }

  return items;
}

module.exports.scrapeFacebook = scrapeFacebook