const puppeteer = require('puppeteer');
// const downloader = require('./insta-img-downloader')
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

    const username = "calmnessmotiv@gmail.com";
    const password = "instagramimagedownloader";

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.instagram.com/accounts/login/");

    await page.waitForSelector('[name="username"]');
    await page.waitForSelector('[name="password"]');
    await page.waitForSelector('[type="submit"]');
    
    // await page.waitForSelector('.cmbtv button');
    // await page.waitForSelector('.aOOlW');

    await page.type('[name="username"]', username, { delay: 100 });
    await page.type('[name="password"]', password, { delay: 100 });
    await page.click('[type="submit"]');
    await page.waitForNavigation();
    // await page.click('.cmbtv button');
    // await page.click('.aOOlW');

    // const page1 = await browser.newPage();
    // await page.goto("https://www.instagram.com/p/CYCBuQlPwxB/");
    await page.goto(originalURL);

    const imagePage = await page.evaluate(() => {
        let img = document.querySelector(".KL4Bh img");
        let imgSrc = img.src;

        return imgSrc;
    })
    // downloader.InstaImageDownloader(imagePage);
    InstaImageDownloader(imagePage);
    console.log(imagePage);

    await browser.close();
}

// ImageScrapper("https://www.instagram.com/p/CYCBuQlPwxB/");
module.exports = ImageScrapper;