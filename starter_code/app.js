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

    // When form from homepage submitted, its info will be passed here
    // console.log("req ======= ", req.query);

    // Search artists whose name contains any search term
    spotifyApi
        //    theArtistName is from name attribute in our search form
        .searchArtists(req.query.theArtistName)
        .then(data => {
            // console.log('Search artists by: ====', data.body.artists.items);
            // allTheArtists is an array which we give the list of all found artists in spotify api
            res.render('artists', { allTheArtists: data.body.artists.items });
        })
        .catch(err => console.log("Error while getting the artists: ", err));

})

// artistId is a router parameter , its value is provided when the user makes request to /albums/(whateverartistidhere)
app.get('/albums/:artistId', (req, res, next) => {

    // req.params is object with key - value pair of router parameter name, and whatever value is requested by user
    // console.log("Id is: ", req.params);
    spotifyApi
        .getArtistAlbums(req.params.artistId, { limit: 5 })         // spotify api uses artistId to retrieve albums from the artist
        .then(data => {
            
             //console.log(" = = == = == = = = =",data.body);
             // passes array (.items) of albums from artist
            res.render('albums', { allTheAlbums: data.body.items });
        })
        .catch(err => console.log("Error while getting the albums: ", err));

})


app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
