$(document).ready(() => {
  console.log("ready");
  $("#tweet-text").keydown(function (e) {
    let noOfCaracter = $(this).val().length;
    $("#counter").text(140 - noOfCaracter);
    if (noOfCaracter > 140) {
      return $("#counter").css("color", "red");
    }
    
    return $("#counter").css("color", "#4056a1");
  });
});
