// Create app namespace to hold all methods
const imageApp = {};
imageApp.key = "zjqyoonlwHaTOJEZCl_pl8SAQNAWIlpHv0ISu-jfJxE";
imageApp.url = "https://api.unsplash.com/photos/random";
imageApp.getImage = function () {
  $.ajax({
    url: imageApp.url,
    method: "GET",
    dataType: "json",
    data: {
      client_id: imageApp.key,
      format: "json",
      count: "6",
      query: "travel", // Will request a search term
    },
    // Response is returning the function above AFTER ajax has completed
  }).then(function (response) {
    imageApp.displayImage(response);
    console.log(response);
  });
};
// passing in from the "response.photos" to imageArray
imageApp.displayImage = function (imageArray) {
  imageArray.forEach(function (image) {
    console.log(image);
    const photo = $("<img>")
      .addClass("gallery-img")
      .attr("src", image.urls.regular)
      .attr("alt", image.alt_description);
    const photography = $("<p>").addClass("photographer").text(image.user.name);
    const imagePiece = $("<div>").addClass("piece").append(photo, photography);
    $(".gallery-grid").append(imagePiece);
  });
};
// Start app
imageApp.init = function () {
  imageApp.getImage();
};
$(function () {
  imageApp.init();
});
