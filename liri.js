// Dotenv package to read and set any environment variables
require("dotenv").config();
// Created keys variable to import the required keys.js package
let keys = require("./keys.js");

//Initializing Spotify 
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

//Axios package used to send requests to Bands in Town, Spotify and OMDB APIs.
let axios = require("axios");
//Using fs package to take text inside of random.txt and then use it to call a LIRI command
let fs = require("fs");
let moment = require("moment");


//Storing User inputs into variables
//Process.argv[2] represents the beginning of the User input (after node and filename)
let userSearch = process.argv[2];
let userQuery = process.argv.slice(3).join("");

//After hours of troubleshooting, I created a movie variable to support the for loop 
//within the "movie-this function".  See function for details.
//It adds "+"signs in the movie query URL.  This prevents errors.
let movie = "";


//LIRI Logic

function liriDoThis(userSearch, userQuery) {
    switch (userSearch) {
        case "concert-this":
            concertThis(userQuery);
            break;

        case "spotify-this-song":
            spotifyThisSong(userQuery);
            break;

        case "movie-this":
            movieThis(movie);
            break;

        case "do-what-it-says":
            doWhatiSay();
            break;

        default:
            console.log("Ummm, I'm having trouble undertanding you.");
    }
}

function concertThis(artist) {

    let bandQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandQueryUrl).then(
        function (response) {
            console.log(bandQueryUrl);
            console.log("Brace yourself for these dope concert results!!!");
            console.log("=================================================");
            //Formatted concert data that will print to console 
            console.log("Artist Name: " + response.data[0].artist.name);
            console.log("Concert Venue Name: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city);
            console.log("Date of Concert: " + moment(response.data[0].datetime).format("MM-DD-YYYY"));

            // let logConcertInfo = "-------CONCERT LOG ENTRY--------" + "\nMusician Name: " +
            //     artist + "\nConcert Venue Name: " + response.data[0].venue.name + "\nDate of Concert: " +
            //     moment(response.data[0].datetime).format("MM-DD-YYYY");

            // //Appending concert info to log.txt file
            // fs.appendFile("log.txt"), logConcertInfo, function (err) {
            //     if (err) throw err;
            // }
        });

    // logResults(logConcertInfo);
};

function spotifyThisSong() {
    //If no song is provided, program defaults to "The Sign" by Ace of Base.
    if (!userQuery) {
        userQuery = "The Sign";
    }
    console.log("---------This is my user query input:  " + userQuery + spotify + "-------------------")

    //Spotify search format
    spotify.search({ type: "track", query: userQuery, limit: 1 }, function (error, data) {

        console.log("---This is my user query input after the search:  " + userQuery + spotify + "-------------------")
        if (error) {
            return console.log("This error occured" + error)
        }
        //Created variable to store spotify data in array format which will print to console 

        let spotArray = data.tracks.items;

        for (i = 0; i < spotArray.length; i++) {
            console.log("-----Album name based on the return data:  " + data.tracks.items[i].album.name + "-------------------")
            console.log("Boom! Check this out!\n\nArtist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Song: " + data.tracks.items[i].name);
            console.log("Spotify Link: " + data.tracks.items[i].external_urls.spotify);
            console.log("Album: " + data.tracks.items[i].album.name);
        }
    });
    // logResults(data);
}

function movieThis(movie) {
    if (!movie) {
        movie = "Mr. Nobody";
    }
    let pa = process.argv;
    movie = "";
    // Loop through all the words in the node argument
    // And a for-loop to handle the inclusion of "+"s
    // Iterator starts at 3 to account for the "movie-this" command, which is at [2]

    for (let i = 3; i < pa.length; i++) {

        if (i > 3 && i < pa.length) {
            movie = movie + "+" + pa[i];
        } else {
            movie += pa[i];
        }
    }

    let movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=f622e3bc";
    axios.get(movieQueryUrl).then(
        function (response) {

            // console.log("This is the response for movie query URL " + movieQueryUrl);
            console.log("  Brace yourself for these dope movie results!!!");
            console.log("=================================================");

            //Formatted movie data that will print to console

            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Year Released: " + response.data.Year);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].value);
            console.log("Country Where Produced: " + response.data.Country)
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

            // let logMoviesInfo = "-------MOVIES LOG ENTRY--------" + "\nTitle: " +
            //     movie + "\nYear Released: " + response.data.Year + "\nActors: " + response.data.Actors;

            // //Appending movies info to log.txt file
            // fs.appendFile("log.txt"), logMoviesInfo, function (err) {
            //     if (err) throw err;
            // }

        })

    // .catch(function (error) {
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         console.log("---------------Data---------------");
    //         console.log(error.response.data);
    //         console.log("---------------Status---------------");
    //         console.log(error.response.status);
    //         console.log("---------------Status---------------");
    //         console.log(error.response.headers);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an object that comes back with details pertaining to the error that occurred.
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log("Error", error.message);
    //     }
    //     console.log(error.config);
    // });
    // logResults();
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

// function logResults() {
//     fs.appendFile("log.txt", data, function (err) {
//         if (err) throw err;
//     }
//     )
// };
//Calling the LIRI app function to initialize operation

liriDoThis(userSearch, userQuery);



