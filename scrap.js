const { Options } = require('selenium-webdriver/chrome');
const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs').promises;


(async function main() {
    const chromeOptions = new Options();
    chromeOptions.addArguments("--headless");

    const url = "https://www.real.discount/udemy-coupon-code/";

    const driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

    try {
        // Navigate to the URL
        await driver.get(url);

        // Wait for the page to load completely
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);

        // Wait for an additional 5 seconds
        await driver.sleep(5000);

        // Get the content after JavaScript execution
        const dynamicContent = await driver.getPageSource();

        // Save dynamicContent to a text file
        await fs.writeFile('text.txt', dynamicContent, 'utf-8');

        // Close the browser
        await driver.quit();

        // Part 1: Extract links from html.txt and write to text.txt
        const htmlContent = await fs.readFile('text.txt', 'utf-8');
        const matches = htmlContent.match(/<a.*?href=[\'"](.*?\/offer\/.*?)["\']/g) || [];

       // Remove <a href="' from each link
       let cleanedLinks = matches.map(match => match.replace(/<a.*?href=[\'"]/, '').replace(/["'\s]+$/, '').replace(/\/offer\/\` \+ item\[/, ''));
        // Replace the specified string in the last line
        // Remove the last element from the array
        cleanedLinks.pop();

        // Write cleaned links to text.txt
        await fs.writeFile('text.txt', cleanedLinks.join('\n'), 'utf-8');

        // Read links from text.txt
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // const lines = (await fs.readFile('text.txt', 'utf-8')).split('\n');
        // const cleanedLinks = lines.map(line => line.replace('/offer/`+ item[', ''));

        // // Write cleanedLinks to text.txt
        // await fs.writeFile('text.txt', cleanedLinks.join('\n'), 'utf-8');

        // Read links from text.txt
        const lines = (await fs.readFile('text.txt', 'utf-8')).split('\n');
        cleanedLinks = lines.map(line => line.replace(/^.*https:\/\/www\.real\.discount(\/offer\/.*?)\s*$/, 'https://www.real.discount$1'));

        // Write cleanedLinks to text.txt
        await fs.writeFile('text.txt', cleanedLinks.join('\n'), 'utf-8');


        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Read links from text.txt
        const links = (await fs.readFile('text.txt', 'utf-8')).split('\n');

        let allContent = '';

        for (const link of links) {
            const fullUrl = "https://www.real.discount/" + link.trim();

            // Initialize a new WebDriver instance
            const driver2 = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

            try {
                // Navigate to the URL
                await driver2.get(fullUrl);

                // Wait for the page to load completely
                await driver2.wait(until.elementLocated(By.tagName('body')), 10000);

                // Wait for an additional 3 seconds
                await driver2.sleep(3000);

                // Get the content after JavaScript execution
                const dynamicContent2 = await driver2.getPageSource();
                allContent += dynamicContent2;
            } finally {
                // Close the browser
                await driver2.quit();
            }
        }

        // Write allContent to text.txt
        await fs.writeFile('text.txt', allContent + '\n', 'utf-8');

        // Part 2: Extract links from text.txt and write to link.txt
        const htmlContent2 = await fs.readFile('text.txt', 'utf-8');
        const matches2 = htmlContent2.match(/<a.*?href=[\'"](.*?udemy.com\/course.*?)["\']/g) || [];

        // Append cleaned matches to link.txt
        const cleanedMatches = matches2.map(match => match.replace(/^.*https:\/\/www.udemy.com\/course/, 'https://www.udemy.com/course'));
        await fs.appendFile('link.txt', cleanedMatches.join('\n') + '\n', 'utf-8');

    } catch (error) {
        console.error(error);
    }
})();
