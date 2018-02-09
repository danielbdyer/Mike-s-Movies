# MIke's Movies

## Intro

#### For those who run a Plex media server for not only themselves, but their families and friends, sometimes it can be hard to keep track of movie requests and follow up on them. For Michael, one of our team members who deals with this often, we’ve created Mike’s Movies, an app that allows users to request up to three movies simultaneously, and bookmark the rest for later.

### What We Used to Create Our App

| Built with:
| ------------- |
| HTML5/CSS3 |
| SASS |
| Javascript |
| jQuery |
| The OMDB movie-database API |
| Firebase NoSQL |
| OAuth |

## Using the App

End-users are invited to sign up with their Google account (we are using Firebase Admin to implement this) or a username and password, or alternately, to log in if they already have an account. From there, they are presented with a main screen where they are encouraged to search for movies that they’d like to request for the Media server.

The search function queries the OMDB movie database, returning results based upon matches to the search terms. It will not return movies that do not have a poster, which thus far has proven to be a sensible way to filter out unavailable or otherwise inapplicable search results. From there, a user can select the movie of their choice, and it will re-query a different API endpoint for details about that particular movie. This works via dynamically-appended id tags to each of the divs, making it possible to relay that particular IMDB ID to the following search function.

The specific-movie search function allows us to return further details about the movie, including but not limited to its aggregate critical ratings, film genre, actors and other key players involved, MPAA ratings, year, and so forth. We parse all of this and return via template-literal JQuery a completed result, which slides down in a Netflix style fashion.

From here, a user can both request and bookmark a movie, which appends itself to an array in their particular Firebase node. If the movie is either requested or bookmarked already, the app will know as it will query the user’s child nodes to see if the same IMDB ID already exists, and dynamically implement the correct button text and action based upon this existing information.

## Our Design Process

We began, in a series of meetings, reviewing all of the things we wanted to do with the app, including stretch goals, points of strength between the four of us, potential roadblocks, and organization for the app. We discerned that two of us would work on the body of the app, and two of us would work on the authentication process, which is something we had never developed before this.

We envisioned that we would need to have a way to handle incoming requests, and that a user should be limited to the number that they could submit. We also desired that a user might be able to be informed about what movies have recently been fulfilled that they requested. We also saw that there was potential for displaying information on return visits. We decided that the main page with the search bar up top should passively display all the movies the user had requested, bookmarked, or had gotten fulfilled, rather than just a blank screen before a search submission.

Part of the process in fulfilling a movie, however, was developing an admin portal. We envisioned that Michael would be able to come in and view all requested movies on some sort of a table, sorted by their timestamps, and be able to mark movies as fulfilled, as he placed them into his Plex server.

## Our Challenges

One of the challenges we came across was that the Firebase snapshot objects we commonly interacted with were, in fact, not an array, and needed to be converted to an array to be held in local memory on the page. This proved as one of our blocking points as we were coming close to the class presentation time, and it is something we intend to resolve as soon as possible. Until then, the request and bookmark functionality will work, but not as completely as intended.

## Future Goals

* Register as a user and login (complete)
* Register as a user with (complete)
* Password/login recovery method (complete)
* Firebase storage of user information and user movie request data (complete)
* Mobile/Responsive UI (complete)
* Captcha for login screen
* Toggle request button when movie has been requested by that user (complete)
* Search functionality to retrieve results from OMDB API (complete)
* Get more details on a particular search result (complete)
* Message/Ticketing-style requests, for special request/movie not found
* See what others have requested
* When already requested, sign up to see when it’s available
* Develop splash page on the index that shows a user’s requested, bookmarked, and fulfilled movies
* Amazon/Hulu/Netflix queries to see if it’s available on there (stretch)
* Integration with actual Plex (stretch)

