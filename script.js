// create app namespace to hold all methods
const imageApp = {};

imageApp.key = "zjqyoonlwHaTOJEZCl_pl8SAQNAWIlpHv0ISu-jfJxE";
imageApp.url = "https://api.unsplash.com/photos/random";


// emoji array
imageApp.emojiArray = [
  {
      img: 'assets/emoji-happy.png',
      alt: 'Happy emoji',
      id: 'happy'
  },
  {
      img: 'assets/emoji-sad.png',
      alt: 'Sad emoji',
      id: 'sad'
  },
  {
      img: 'assets/emoji-angry.png',
      alt: 'Angry emoji',
      id: 'angry'
  },
  {
      img: 'assets/emoji-laughing.png',
      alt: 'Laughing emoji',
      id: 'funny'
  },
  {
      img: 'assets/emoji-love.png',
      alt: 'Heart eye emoji',
      id: 'love'
  },
  {
      img: 'assets/emoji-shock.png',
      alt: 'Shock emoji',
      id: 'shock'
  },
  {
      img: 'assets/emoji-think.png',
      alt: 'Thinking emoji',
      id: 'think'
  },
  {
      img: 'assets/emoji-silly.png',
      alt: 'Silly emoji',
      id: 'silly'
  },
  {
      img: 'assets/emoji-festive.png',
      alt: 'Festive emoji',
      id: 'festive'
  },
  {
      img: 'assets/emoji-pet.png',
      alt: 'Dog emoji',
      id: 'pets'
  },
  {
      img: 'assets/emoji-animal.png',
      alt: 'Lion emoji',
      id: 'animals'
  },
  {
      img: 'assets/emoji-bugs.png',
      alt: 'Ladybug emoji',
      id: 'bugs'
  },
  {
      img: 'assets/emoji-space.png',
      alt: 'Alien emoji',
      id: 'space'
  },
  {
      img: 'assets/emoji-spooky.png',
      alt: 'Ghost emoji',
      id: 'spooky'
  },
  {
      img: 'assets/emoji-travel.png',
      alt: 'Airplane emoji',
      id: 'travel'
  },
  {
      img: 'assets/emoji-sports.png',
      alt: 'Football emoji',
      id: 'sports'
  },
  {
      img: 'assets/emoji-nature.png',
      alt: 'Maple leaf emoji',
      id: 'nature'
  },
  {
      img: 'assets/emoji-food.png',
      alt: 'Taco emoji',
      id: 'food'
  },
  {
      img: 'assets/emoji-music.png',
      alt: 'Music note emoji',
      id: 'music'
  },
  {
      img: 'assets/emoji-eggplant.png',
      alt: 'Eggplant emoji',
      id: 'eggplants'
  }
]

// passing the array emojiArray to emArray
imageApp.displayEmoji = function (emArray) {
  emArray.forEach(function (emoji) {
      const emojiImage = $("<img>")
          .addClass("emoji-image")
          .attr("src", emoji.img)
          .attr("alt", emoji.alt)
          .attr("value", emoji.id);

      $(".emoji-picker").append(emojiImage);
  });
};

imageApp.defaultEmoji = "happy";

// user selects an emoji, and function grabs images of the id of the emoji
imageApp.chooseEmoji = function () {
  $(".emoji-image").on("click", function () {
      
      // clear the gallery before getting images
      $(".gallery-grid").empty();

      // assign the value to the emoji
      imageApp.defaultEmoji = $(this).attr('value');

      imageApp.getImage();
  });
};


imageApp.defaultOrientation = 'squarish';

// user selects an orientation for images, and function grabs images with the orientation
imageApp.chooseOrientation = function () {
  $(".orientation").on("click", function () {

      // clear the gallery before getting images
      $(".gallery-grid").empty();

      // assign the value to the button
      imageApp.defaultOrientation = $(this).val();

      imageApp.getImage();
  });
};

// function to get images from api
imageApp.getImage = function () {
  $.ajax({
    url: imageApp.url,
    method: "GET",
    dataType: "json",
    data: {
      client_id: imageApp.key,
      format: "json",
      count: "16",
      query: `${imageApp.defaultEmoji}`, // will request a search term
      orientation: `${imageApp.defaultOrientation}`
    },
    // response is returning the function above AFTER ajax has completed
  }).then(function (response) {
    imageApp.displayImage(response);
    // if api fails, show an error
  }).fail(function (error) {
    alert('You have reached your request limit for the hour! Try again later.');
    console.log(error);
  });
};

// passing in from the "response.photos" to imageArray
imageApp.displayImage = function (imageArray) {
  imageArray.forEach(function (image) {

    const photo = $("<img>")
        .addClass("gallery-img")
        .attr("src", image.urls.regular)
        .attr("alt", image.alt_description);
    const photography = $("<p>")
        .addClass("photographer")
        .text(image.user.name);
    const imagePiece = $("<div>")
        .addClass("piece")
        .append(photo, photography);

    $(".gallery-grid").append(imagePiece);
  });
};

// start app
imageApp.init = function () {
  imageApp.getImage();
  imageApp.displayEmoji(imageApp.emojiArray);
  imageApp.chooseEmoji();
  imageApp.chooseOrientation();
};


$(function () {
  imageApp.init();
});
