require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');

const ImageScrapper = async (originalURL) => {

    const InstaImageDownloader = async (url) => {
        
        const filename = url.split('=')[8];
        console.log(filename);
    
        https.get(url, (res) => {
            const fileStream = fs.createWriteStream(`${filename}.png`);
            res.pipe(fileStream);
    
            fileStream.on("finish", () => {
                fileStream.close();
                console.log("Download✅");
            })
        }).on("error", (err) => {
            console.log("Error in downloading Image🚫");
            console.log(err);
        })
    
    }

    const username = process.env.YOUR_USERNAME;
    const password = process.env.YOUR_PASSWORD;

    const browser = await puppeteer.launch({ headless: false });
    // const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();

    await page.goto("https://www.instagram.com/accounts/login/");

    await page.waitForSelector('[name="username"]');
    await page.waitForSelector('[name="password"]');
    await page.waitForSelector('[type="submit"]');

    await page.type('[name="username"]', username, {delay:200});
    await page.type('[name="password"]', password, {delay: 200});
    await page.click('[type="submit"]');
    await page.waitForNavigation();

    await page.goto(originalURL);

    const imagePage = await page.evaluate(() => {

        let img = document.querySelector(".KL4Bh img");
        let imgSrc = img.src;

        return imgSrc;
    })
    
    InstaImageDownloader(imagePage);

    await browser.close();
}

module.exports = ImageScrapper;