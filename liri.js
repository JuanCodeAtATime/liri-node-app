// Dotenv package to read and set any environment variables
require("dotenv").config();
// Created keys variable to import the required keys.js package
let keys = require("./keys.js");

//Created variables to store other required packages 
let axios = require("axios");
let fs = require("fs");
let moment = require("moment");

//Initializing Spotify 
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

//APIs for OMDB and Bands in Town
let omdb = (keys.omdb);
let bInTown = (keys.bInTown);

//Storing User inputs into variables
//Process.argv[2] represents the beginning of the User input (after node and filename)
let userSearch = process.argv[2];
let userCommand = process.argv.slice(3).join("");


//LIRI Logic

function liriDoThis(userSearch, userCommand) {
    switch (userSearch) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            justDoIt();
            break;
        default

    }
}





// concert-this "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// spotify-this-song
// movie-this
// do-what-it-says