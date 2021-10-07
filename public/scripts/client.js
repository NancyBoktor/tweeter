/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // get all tweets from db using AJAX
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function (tweets) {
        console.log("data:", tweets);
        renderTweets(tweets);
      },

      error: (err) => {
        console.log(`there is an error:${err}`);
      },
    });
  };

  loadTweets();

  // Adding new tweet
  $(".main-form").on("submit", function (event) {
    // Stoping refresh default of the browser
    event.preventDefault();

    // Extract the informations from post req
    const tweetlength = $("#tweet-text").val().length;
    const tweetValue = $("#tweet-text").val().trim();

    // conditions before submit the tweet
    if (tweetlength > 140) {
      $("#alert").css("display", "flex");

      return;
    } else if (tweetValue === "" || tweetValue === null) {
      $("#alert").css("display", "flex");
    } else {
      // if the conditions false then we will submit the tweet for the user using AJAX
      $.ajax({
        url: "/tweets",

        method: "POST",

        //convert data to response
        data: $(this).serialize(),
      }).then(function (res) {
        console.log("Success: ", res);

        const tweets = loadTweets();

        renderTweets(tweets);
      });
    }
  });
});

//Making the HTML tweet box dynamic for every single user
const createTweetElement = function (tweet) {
  return `<article class="tweets_container">

          <header class="tweetbox_header">

             <div class="user"> 
                <h5 id="name">${tweet.user.name}</h5>
                <img class="userImage" src=${tweet.user.avatars} alt="">
            </div>
            
            <div class="atUserName"><h5>${tweet.user.handle}</h5></div>

          </header>

          <div class="myPost"><h5>${tweet.content.text}</h5></div> 

          <footer class="tweetbox_footer">

             <div class="forDays">${timeago.format(tweet.createdAt)} </div>

             <div class="hover_state">
               <i class="fas fa-flag"></i>
               <i class="fas fa-retweet"></i>
               <i class="fas fa-heart"></i>
             </div>

          </footer>
          
        </article>`;
};

//showing up the tweet box for all users
const renderTweets = function (tweets) {
  const $tweet_box = $(".tweet_box");

  $tweet_box.empty();

  for (const tweet of tweets) {
    const tweetDiv = createTweetElement(tweet);

    $(".tweet_box").append(tweetDiv);
  }
};
