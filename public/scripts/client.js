/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
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

  const renderTweets = function (tweets) {
    const $tweet_box = $(".tweet_box");
    $tweet_box.empty();
    for (const tweet of tweets) {
      const tweetDiv = createTweetElement(tweet);
      $(".tweet_box").append(tweetDiv);
    }
  };

  $(".main-form").submit(function (event) {
    event.preventDefault();
    console.log($(this).serialize());
    // const userData={name:"Nancy",
    // avatar:" "
    // handle:" "
    // }
    // const data = $(this).serialize()
    // data.user =userData
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    }).then(function (res) {
      console.log("Success: ", res);
      const tweets = loadTweets();
      console.log(tweets);
      renderTweets(tweets);
    });
  });
});
