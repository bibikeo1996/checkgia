const puppeteer = require('puppeteer');
 (async () => {
 	const browser = await puppeteer.launch({ headless: false })
 	const page = await browser.newPage()
 	await page.goto("https://tiki.vn/search?q=EJF357BLK&sort=price%2Casc&page=1", {waitUntil: 'load', timeout: 100000});
		let checkweb = await page.waitForSelector("div[data-view-id=product_list_container]");
		checkweb !== null ? console.log("Done!") : "Erros";
    await browser.close();
 })();
