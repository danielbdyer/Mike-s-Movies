firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const userid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref();

    const $resultsplacement = $("#resultscontainer"); // switch to ID
    const searchbar = $("#filter");

    const apikey = "6fe893b2";

    usermovies = ref.child("users/" + userid + "/movies");

    var interestArray = [];
    var moviedirectories = ["request", "bookmark", "fulfilled"];

    moviedirectories.map(function(directory) {
      interestArray[directory] = [];
      usermovies.child(directory).on("value", function(snapshots) {
        snapshots.forEach(function(snapshot) {
          interestArray[directory][snapshot.key] = [];
          snapshot.forEach(function(child) {
            var movieid = snapshot.key;
            var value = child.val();
            var key = child.key;
            interestArray[directory][movieid][key] = value;
          });
        });
      });
    });

    var requestArray = interestArray.request;
    var bookmarkArray = interestArray.bookmark;

    $("#slidercontent").hide();

    /** SEARCH BAR INIT **/

    /*  usermovies.on("value", function(snapshot) {
      for (movies in snapshot.val()) {
        let title = snapshot.val()[movies];
        title.movies = movies;
        // console.log(title.movies)
        let movieINFO =
          "https://www.omdbapi.com/?i=" + title.movies + "&apikey=d1da1b5c";
        // console.log(movieINFO)

        $.get(movieINFO, function(info) {
          $(info).each(function(index, information) {
            // console.log(information.Title)
            $("<li>")
              .addClass("list-item")
              .append(
                $("<div>")
                  .attr("id", "poster-title-container")
                  .append($("<img>").attr("src", information.Poster))
                  .append(
                    $("<img>")
                      .addClass("trash-can-image")
                      .attr("src", "images/trashcan.png")
                      .click(function() {
                        var answer = confirm(
                          "Are you sure you want to delete this request?"
                        );
                        if (answer) {
                          usermovies.child(title.movies).remove();
                          $(".list-item").remove();
                          $("#movie-choice-container").html("");
                        } else {
                          return false;
                        }
                      })
                  )
                  .append($("<h4>").html(information.Title))
              )

              .appendTo($("#movie-choice-container"));
          });
        });
      }
    });

    $("#movie-choice-container").sortable();

    // _____________TOGGLE SECTION TEST_____________
    $(function() {
      // run the currently selected effect
      function runEffect() {
        // get effect type from
        var selectedEffect = $("#effectTypes").val();

        // Most effect types need no options passed by default
        var options = {};
        // some effects have required parameters
        if (selectedEffect === "scale") {
          options = { percent: 50 };
        } else if (selectedEffect === "size") {
          options = { to: { width: 200, height: 60 } };
        }

        // Run the effect
        $("#effect").toggle(selectedEffect, options, 500);
      }
      $("#button").on("click", function() {
        runEffect();
      });
    });

    //____________Wish List__________//
    wishlist.on("value", function(snapshot) {
      for (movies in snapshot.val()) {
        let title = snapshot.val()[movies];
        title.movies = movies;
        console.log(title.movies);
        let movieINFO =
          "https://www.omdbapi.com/?i=" + title.movies + "&apikey=d1da1b5c";
        // console.log(movieINFO)

        $.get(movieINFO, function(info) {
          $(info).each(function(index, information) {
            // console.log(information.Title)

            $("<li>")
              .addClass("list-item")
              .append(
                $("<div>")
                  .attr("id", "poster-title-container")
                  .append($("<img>").attr("src", information.Poster))
                  .append(
                    $("<img>")
                      .addClass("trash-can-image")
                      .attr("src", "images/trashcan.png")
                      .click(function() {
                        var answer = confirm(
                          "Are you sure you want to move this to your request list?"
                        );
                        if (answer) {
                          wishlist.child(title.movies).remove();
                          usermovies.child(title.movies);
                          $(".list-item").remove();
                          $("#movie-choice-container").html("");
                        } else {
                          return false;
                        }
                      })
                  )
                  .append($("<h4>").html(information.Title))
              )

              .appendTo($("#wishlist-container"));
          });
        });
      }
    }); */

    $(document).ready(function() {
      var typingTimer;
      var doneTypingInterval = 400;
      var thisquery, previousquery;

      $("#filter").keypress(function(e) {
        var charTyped = String.fromCharCode(e.which);
        if (/[a-z\d]/i.test(charTyped)) {
          deltaTimer();
        }
      });

      $("#filter").keyup(function(e) {
        if (e.keyCode == 8) {
          deltaTimer();
        }
      });

      function deltaTimer() {
        clearTimeout(typingTimer);

        if ($("#filter").val()) {
          typingTimer = setTimeout(deltaSearch, doneTypingInterval);
        } else {
          $("#slidercontent")
            .hide()
            .empty();
          $(".movies").remove();
          if (typeof previousquery !== "undefined") {
            var previousquery = "";
          }
        }
      }

      $(".ui-input-clear").on("click", function() {
        $("#slidercontent")
          .hide()
          .empty();
        $(".movies").remove();
        var previousquery = "";
      });

      function deltaSearch() {
        thisquery = $("#filter").val();
        console.log(previousquery, thisquery);

        if (typeof previousquery == undefined || previousquery !== thisquery) {
          $(".movies").remove();
          $("#slidercontent")
            .hide()
            .empty();
          apiFormat(thisquery);
          queryAPI(apiquery);

          previousquery = thisquery;
        } else {
          return;
        }
      }
    });

    $(window).resize(function() {
      if ($(".detailedlook")[0]) {
        let tempid = $(".detailedlook");
        $("#slidercontent").hide(); // hide slider so it doesn't interfere with the flex layout during resize
        clearTimeout(window.resizedFinished);

        window.resizedFinished = setTimeout(function() {
          detailedSearch(tempid);
          $("html,body").animate(
            {
              scrollTop: $("#slidercontent").offset().top - $(this).height() / 5
            },
            500
          ); // show slider again now that resize has stabilised
        }, 250);
      }
    });

    function apiFormat(thisquery) {
      apiquery = thisquery
        .replace(/ $/, "")
        .split(" ")
        .join("+");
      return apiquery;
    }

    function queryAPI(apiquery) {
      const url = "https://www.omdbapi.com/?s=" + apiquery + "&apikey=" + apikey;
      $.get(url, function(data) {
        let results = data.Search;
        if (typeof results !== "undefined") {
          let seenIDs = {};
          let uniqueMovies = results.filter(function(movie) {
            if (
              movie.imdbID in seenIDs ||
              movie.Poster == "N/A" ||
              movie.Rated == "N/A"
            ) {
              return false;
            } else {
              seenIDs[movie.imdbID] = true;
              return true;
            }
            return uniqueMovies;
          });
          writeResults(uniqueMovies);
        } else {
          console.log("No results returned");
        }
      });
    }

    function toggleDetailsSelector(thismovie) {
      if ($(thismovie).hasClass("selected")) {
        $("#slidercontent").slideUp();
        $(thismovie).removeClass("selected");
      } else {
        // doesn't have class 'selected'
        $(".selected").removeClass("selected"); // remove all other 'selected' classes
        $(thismovie).addClass("selected");
        detailedSearch($(thismovie));
      }
    }

    function writeResults(uniqueMovies) {
      $(uniqueMovies).each(function(index, movie) {
        $("<div>")
          .attr("class", "movies")
          .attr("id", movie.imdbID)
          .click(function() {
            var thismovie = this;
            toggleDetailsSelector(thismovie);
          })
          .append(
            $("<div>")
              .attr("class", "poster")
              .append($("<img>").attr("src", movie.Poster))
          )
          .append(
            $("<div>")
              .attr("class", "title")
              .html(movie.Title + " (" + movie.Year + ")")
          )

          .appendTo($resultsplacement);
      });
    }

    function detailedPlacement() {
      if ($(".movies").length > 1) {
        let itemsPerRow = 0;
        let firstMovie = $(".movies").eq(0);
        let itemTop = firstMovie.position().top;

        $(".movies").each(function(i) {
          if ($(this).position().top != itemTop) {
            itemsPerRow = i;
            return false;
          }
        });

        if (itemsPerRow == 0) {
          detailPlacement = $(".movies").length - 1;
          return detailPlacement;
        } else {
          selectedIndex = $(".movies").index($(".selected")[0]);
          selectedRowNum = Math.floor(selectedIndex / itemsPerRow) + 1;

          if ($(".movies").eq(selectedRowNum * itemsPerRow).length) {
            detailPlacement = selectedRowNum * itemsPerRow - 1;
            return detailPlacement;
          } else {
            detailPlacement = (selectedRowNum - 1) * itemsPerRow - 1;
            return detailPlacement;
          }
        }
      } else {
        detailPlacement = 0;
        return detailPlacement;
      }
    }

    function addButtons(thismovie) {
      if (requestArray.hasOwnProperty(thismovie.imdbID)) {
        $("#request")
          .attr("class", "interested")
          .attr("value", "✓ Requested")
          .attr("id", "requested");
      } else {
        if (requestArray.length == 3) {
          $("#request")
            .attr("value", "Queue Full")
            .attr("id", "queuefull");
        } else {
          $("#request")
            .attr("value", "Request")
            .attr("id", "request");
        }
      }

      if (bookmarkArray.hasOwnProperty(thismovie.imdbID)) {
        $("#bookmark")
          .attr("class", "interested")
          .attr("value", "✓ Bookmarked")
          .attr("id", "bookmarked");
      } else {
        $("#bookmark")
          .attr("value", "Bookmark")
          .attr("id", "bookmark");
      }
    }

    function detailedSearch(movieelem) {
      let imdbID = $(movieelem).attr("id");

      const moredetails =
        "https://www.omdbapi.com/?i=" + imdbID + "&apikey=" + apikey;

      $.get(moredetails).done(function(thismovie) {
        $("<div>")
          .attr("class", "detailedlook")
          .attr("id", thismovie.imdbID)

          .append(
            $("<div>")
              .attr("id", "detailedinfo")

              .append(
                $("<div>")
                  .attr("class", "movietitle")
                  .html(thismovie.Title)
              )

              .append(
                $("<div>")
                  .attr("class", "moviesubinfo")
                  .append(
                    $("<div>")
                      .attr("class", "movieyear")
                      .html(thismovie.Year + " ")
                  )
                  .append(
                    $("<div>")
                      .attr("class", "movierated")
                      .html(thismovie.Rated)
                  )
                  .append(
                    $("<div>")
                      .html(" " + thismovie.Runtime)
                      .attr("class", "movieruntime")
                  )
                  .append(
                    $("<div>")
                      .attr("class", "moviegenre")
                      .html(thismovie.Genre)
                  )
              )

              .append(
                $("<div>")
                  .attr("class", "moviedescription")
                  .html(thismovie.Plot)
              )

              .append(
                $("<div>")
                  .attr("class", "movieawards")
                  .html(thismovie.Awards)
              )

              .append(
                $("<div>")
                  .attr("class", "movieratings")
                  .html(thismovie.Ratings)
              )
              .append(
                $("<div>")
                  .attr("id", "selectbuttons")
                  .append(
                    $("<input>")
                      .attr("type", "button")
                      .attr("class", "userinterest")
                      .attr("id", "request")
                  )
                  .append(
                    $("<input>")
                      .attr("type", "button")
                      .attr("class", "userinterest")
                      .attr("id", "bookmark")
                  )
              )
          )
          .append(
            $("<div>")
              .attr("id", "detailedposter")
              .append($("<img>").attr("src", thismovie.Poster))
          )
          .appendTo($("#slidercontent"));

        addButtons(thismovie);
      });

      $("#slidercontent")
        .hide()
        .empty();

      detailedPlacement.call(movieelem);

      $("#slidercontent")
        .insertAfter($(".movies").eq(detailPlacement))
        .slideDown();

      $("html,body").animate(
        {
          scrollTop: $("#slidercontent").offset().top - $(this).height() / 5
        },
        500
      );
    }
  }

  class MovieInterest {
    constructor(name, datetime) {
      this.id = $(".detailedlook").prop("id");
      this.name = $("#detailedinfo")
        .children(".movietitle")
        .text();
      this.datetime = Date.now();
    }
  }

  $(document).on("click", ".userinterest", function(event) {
    var interesttype = $(event.target)
      .closest("input")
      .attr("id");
    movieid = $(".detailedlook").prop("id");
    thismoviedirectory = usermovies.child(interesttype + "/" + movieid);
    requestedMovie = new MovieInterest();
    thismoviedirectory.set(requestedMovie);
    if (interesttype == "request") {
      $(this)
        .attr("value", "✓ Requested")
        .attr("id", "requested")
        .attr("class", "interested");
    } else if (interesttype == "bookmark") {
      $(this)
        .attr("value", "✓ Bookmarked")
        .attr("id", "bookmarked")
        .attr("class", "interested");
    }
  });

  $(document).on("mouseenter", "#queuefull", function() {
    $("#queuefull").attr("value", "Queue Full");
  });

  $(document).on("click", ".interested", function() {
    var directory;
    var interesttype = $(event.target)
      .closest("input")
      .attr("id");
    movieid = $(".detailedlook").prop("id");

    if (interesttype == "requested") {
      $(this)
        .attr("value", "Request")
        .attr("id", "request")
        .attr("class", "userinterest");

      requestArray = requestArray.filter(function(movieid) {
        return !toRemove.includes(movieid);
      });
      var directory = "request";
    } else if (interesttype == "bookmarked") {
      $(this)
        .attr("value", "Bookmark")
        .attr("id", "bookmark")
        .attr("class", "userinterest");

      bookmarkArray = bookmarkArray.filter(function(movieid) {
        return !toRemove.includes(movieid);
      });
      var directory = "bookmark";
    }

    thismoviedirectory = usermovies.child(directory);
    thismoviedirectory.child(movieid).remove();
  });
});
