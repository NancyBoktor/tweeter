$(document).ready(() => {
  console.log("ready");
  $("#tweet-text").keydown(function (e) {
    let noOfCaracter = this.value.length;
    $("#counter").val(140 - noOfCaracter);
  });
});
