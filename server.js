const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/weather', async (req, res) => {
    try {
        const zipcode = req.body.zip;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${process.env.OPENWEATHER_API_KEY}`);
        const weatherData = await response.json();
        res.redirect('/weather/show', { weatherData });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});