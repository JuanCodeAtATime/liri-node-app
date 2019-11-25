## LIRI-NODE-APP

- ```Developer: Juan Rivera```
- ```Date: November 24, 2019```

*****

## ABOUT LIRI

**LIRI** is like iPhone's SIRI. However, SIRI is a *Speech Interpretation and Recognition Interface*.  LIRI is a *Language Interpretation and Recognition Interface*. 
Unlike SIRI, LIRI is a command line node app that takes in parameters and gives you back data.  In this case, it renders concert, artist, and movie data based on your search input.

***Want to see it in action?***  [Check out the video]
(https://drive.google.com/file/d/10_zVPQxlWY1rWB7k8KS2vDnu_wB705N-/view)


By opening your terminal, you can type in certain commands on the node commnand line and LIRI will fetch the results.  It uses API's to fetch and render concert, movie, and artist data:

###### API's Used

- ```Bands In Town API```
- ```OMDB API```
- ```Spotify (Client ID and Secret ID)```

*****

###### Here are the commands to make LIRI do awesome stuff:
- ```"Concert-this"```  Uses **Bands in Town** API to fetch and render concert data on your terminal.

- ```Spotify-this-song```  As the name suggests, this taps into Spotify's library to display song data based on your search.

- ```Movie-this```  Uses **OMDB** API to fetch and display movie data based on movie name.

- ```Do-what-it-says``` This uses the ```fs``` node package, and takes the text inside of random.txt.  In this case, it runs the ```Spotify-this-song``` command for *"I Want it That Way,"* as that is the text in ```random.txt``` file.

*****




