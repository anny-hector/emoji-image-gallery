// Create app namespace to hold all methods
const imageApp = {};

imageApp.key = '563492ad6f9170000100000118fca25d2bb94e91be6be40c94ac26ec';
imageApp.url = 'https://api.pexels.com/v1/search';

imageApp.getImage = function () {

    $.ajax({
        url: imageApp.url,
        method: 'GET',
        dataType: 'json',
        data: {
            key: imageApp.key,
            format: 'json',
            query: 'happy' // Will request a search term
        },
        headers: {
            'Authorization': imageApp.key
        }
        // Response is returning the function above AFTER ajax has completed
    }).then(function (response) {
        imageApp.displayImage(response.photos);
        // console.log(response.photos);
    });

};

// passing in from the "response.photos" to imageArray
imageApp.displayImage = function(imageArray) {
    imageArray.forEach(function(image) {
        console.log(image);
        
        const photo = $('<img>').addClass('gallery-img').attr('src', image.src.portrait).attr('alt', `${image.photographer}'s photo`);
        const photography = $('<p>').addClass('photographer').text(image.photographer);
        const imagePiece = $('<div>').addClass('piece').append(photo, photography);

        $('.gallery-grid').append(imagePiece);
    });
};

// Start app
imageApp.init = function() {
    imageApp.getImage();
};

$(function () {

    imageApp.init();

});
