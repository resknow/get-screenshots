const puppeteer = require('puppeteer');
const urls = require('./urls');

function getSiteNameFromDomain(domain) {
	let name = domain.split('.')[0];
	return name.replace('https://', '').replace('http://', '');
}

(async () => {
	// Setup the browser
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.setViewport({
		width: 1280,
		height: 720,
		deviceScaleFactor: 1,
	});

	await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

	// Take the screenshots!
	for (const url of urls) {
		let siteName = getSiteNameFromDomain(url);
		console.log(`Getting screenshot of: ${siteName}...`);
		await page.goto(url, { waitUntill: 'networkidle2' });
		await page.screenshot({ path: `screenshots/${siteName}.jpg` });
		console.log(`Successfully took screenshot of ${siteName}`);
	}

	// Done, close the browser
	await browser.close();
})();
