const puppeteer = require('puppeteer');

function getSiteNameFromDomain(domain) {
	return domain.split('.')[0];
}

(async () => {
	// URLs to take screenshots of
	const urls = ['resknow.co.uk', 'google.com', 'pennyhills.com'];

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
		await page.goto(`https://${url}`, { waitUntill: 'networkidle2' });
		await page.screenshot({ path: `screenshots/${siteName}.jpg` });
		console.log(`Successfully took screenshot of ${siteName}`);
	}

	// Done, close the browser
	await browser.close();
})();
