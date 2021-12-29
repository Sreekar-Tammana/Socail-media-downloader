// INSTAGRAM IMAGE DOWNLOADER
const fs = require('fs');
const https = require('https');

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

module.exports = InstaImageDownloader;