// Dotenv package to read and set any environment variables
require("dotenv").config();

// Created keys variable to import the required keys.js package
let keys = require("./keys.js");

//Created variables to store other required packages 

//Axios package used to send requests to Bands in Town, Spotify and OMDB APIs.
let axios = require("axios");
//Using fs package to take text inside of random.txt and then use it to call a LIRI command
let fs = require("fs");
let moment = require("moment");

//Initializing Spotify 
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


//Storing User inputs into variables
//Process.argv[2] represents the beginning of the User input (after node and filename)
let userSearch = process.argv[2];
let userQuery = process.argv.slice(3).join("");


//LIRI Logic

function liriDoThis(userSearch, userQuery) {
    switch (userSearch) {
        case "concert-this":
            concertThis(userQuery);
            break;

        case "spotify-this":
            spotifyThis(userQuery);
            break;

        case "movie-this":
            movieThis(userQuery);
            break;

        case "do-what-it-says":
            doWhatiSay();
            break;

        default:
            console.log("Ummm, I'm having trouble undertanding you.");
            break;
    }
}

function concertThis(artist) {
    let artist = userQuery;
    let bandQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandQueryUrl).then(
        function (response) {
            console.log("Brace yourself for these dope search results!!!");
            //Formatted concert data that will print to console 
            console.log(`\nConcert Venue Name: ${response.data[0].venue.name} 
            \nLocation: ${response.data[0].venue.city} 
            \nDate of Concert: ${moment(response.data[0].datetime).format("MM-DD-YYYY")}\n`);

            let logConcertInfo = "-------CONCERT LOG ENTRY--------" + "\nMusician Name: " +
                artist + "\nConcert Venue Name: " + response.data[0].venue.name + "\nDate of Concert: " +
                moment(response.data[0].datetime).format("MM-DD-YYYY");

            //Appending concert info to log.txt file
            fs.appendFile("log.txt"), logConcertInfo, function (err) {
                if (err) throw err;
            }
        });

    // logResults(response);
};


function spotifyThis(userQuery) {
    //Created another spotify variable.  This one holds secret key
    // let spotify = new Spotify(keys.spotify);
    console.log(Spotify + spotify)

    //If no song is provided, program defaults to "The Sign" by Ace of Base.
    if (!userQuery) {
        userQuery = "The Sign";
    }
    //Spotify search format
    spotify.search({ type: "track", query: userQuery }, function (err, data) {
        if (err) {
            return console.log("This error occured" + err)
        }
        //Created variable to store spotify data in array format which will print to console 
        let spotArray = data.tracks.items;

        for (i = 0; i < spotArray.length; i++) {
            console.log(`\nBoom!  Check this out!\n\nArtist: ${data.tracks.items[i].album.artists[0].name}
                \nSong: ${ data.tracks.items[i].name} \nSpotify Link: ${data.tracks.items[i].external_urls.spotify}
                \nAlbum: ${ data.tracks.items[i].album.name}\n`)
        };
    });
    // logResults(data);
}

function movieThis(movie) {
    let movie = userQuery;
    if (!movie) {
        movie = "Mr. Nobody";
    }
    let movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(movieQueryUrl).then(
        function (response) {
            console.log("Brace yourself for these dope search results!!!");

            //Formatted movie data that will print to console
            console.log(`\nTitle: ${response.data.Title} \nYear Released: ${response.data.Year}
                        \nIMDB Rating: ${response.data.imdbRating} \nRotten Tomatoes Rating: ${response.data.Ratings[1].value}            
                        \nCountry Where Produced: ${response.data.Country} \nLanguage: ${response.data.Language}
                        \nPlot: ${response.data.Plot} \nActors: ${response.data.Actors}`);

            let logMoviesInfo = "-------MOVIES LOG ENTRY--------" + "\nTitle: " +
                movie + "\nYear Released: " + response.data.Year + "\nActors: " + response.data.Actors;

            //Appending movies info to log.txt file
            fs.appendFile("log.txt"), logMoviesInfo, function (err) {
                if (err) throw err;
            }
        });

    // logResults(response);
};


function doWhatiSay() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error)
            return console.log(error);

        else {
            console.log(data);
            let randomStuff = data.split(",");
            liriDoThis(randomStuff[0], randomStuff[1]);
        }
    });

    // logResults(data);
};

// function logResults(data) {
//     fs.appendFile("log.txt", data, function (err) {
//         if (err) throw err;
//     }
//     )
// };
//Calling the LIRI app function to initialize operation
liriDoThis(userSearch, userQuery);



