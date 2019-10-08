const puppeteer = require('puppeteer');

async function scrapeFacebook(city, query, maxPrice) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://www.facebook.com/marketplace/${city}/search/?query=${query}&maxPrice=${maxPrice}`
  );
  await autoScroll(page);

  let titles = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('[data-testid="marketplace_pdp_title"]')
    ).map(title => title.innerText.replace(/’|'/g, ''))
  );

  let prices = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        '[data-testid="marketplace_feed_item"] div div:first-child div div'
      )
    ).map(price => price.innerText.replace(/\$/g, ''))
  );

  let urls = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('[data-testid="marketplace_feed_item"]')
    ).map(item => item.href)
  );

  // @TODO: get picture URLs and add onto 'items'
  // @TODO: set up polling
  // @TODO: generate email

  const items = await prepareItems(titles, prices, urls);
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

async function prepareItems(titles, prices, urls) {
  let items = [];

  for (let i = 0; i < titles.length; i++) {
    let item = {
      title: titles[i],
      price: prices[i],
      url: urls[i]
    };

    items.push(item);
  }
  
  return items;
}

module.exports.scrapeFacebook = scrapeFacebook