/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    createdAt: 1461116232227,
  };

  const createTweetElement = function (tweetData) {
    let $tweet = $(`<article class="tweets_container">
          <header class="tweetbox_header">
             <div class="user"> 
                <h5 id="name">${tweetData.user.name}</h5>
                <img class="userImage" src=${tweetData.user.avatars} alt="">
            </div>
            <div class="atUserName"><h5>${tweetData.user.handle}</h5></div>
          </header>
          <div class="myPost"><h5>${tweetData.content.text}</h5></div> 
          <footer class="tweetbox_footer">
             <div class="forDays">${timeago.format(tweetData.createdAt)} </div>
             <div class="hover_state">
               <i class="fas fa-flag"></i>
               <i class="fas fa-retweet"></i>
               <i class="fas fa-heart"></i>
             </div>
          </footer>
        </article>`);
    return $tweet;
  };
  const $tweet = createTweetElement(tweetData);
  $(".tweet_box").append($tweet);
});
