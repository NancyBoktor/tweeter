$(document).ready(() => {
  console.log("ready");
});

$("#tweet-text").keyup(function () {
  console.log(this.val().length);
});
