const express = require('express');
const app = express();
const scrapper = require('./insta-img-scrapper')

const PORT = process.env.PORT || 3000;

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    console.log("home");
    res.render('index.ejs');
})

app.post('/', async(req, res) => {
    const {profile} = req.body;
    await scrapper(profile);
    res.json( {success: "Download Success✅"} );
    console.log(profile);
})

app.listen(PORT, ()=>{
    console.log(`Server listening at PORT: ${PORT}`);
})