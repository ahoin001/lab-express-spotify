const express = require('express');
const app = express();
const hbs = require('hbs');
var SpotifyWebApi = require('spotify-web-api-node');

// set view engine and tell where to look for views
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const clientId = 'b0741ec345814020b165aec49cc3d82d',
    clientSecret = 'a93f7da8810f48e6bd7e763369fe5e71';

var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
    .then(function (data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function (err) {
        console.log('Something went wrong when retrieving an access token', err);
    });

// the routes go here:
app.get('/', function (req, res) {
    // console.log(req);
    res.render("home");
})

app.get('/artists', function (req, res) {
    // console.log(req);
    res.render("artist");
})


app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
