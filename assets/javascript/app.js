// Array of topics we'll use to create buttons
var topics = ['Dogs', 'Cats', 'Parakeets']

for (var i = 0; i < topics.length; i++){
    var gifButton = "<button>" + topics[i] + "</button>"
    $("#buttons").append(gifButton)
}



$("button").on('click', function(){
    var animal = $(this).text()
    console.log(animal)
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=YcMY50f8vA1dUzRPHD7e9oQ3eiOBNXv0&q=" + animal + "&limit=5";

    $.get(queryURL)
    .then(function(response){

        for (var i = 0; i < 5; i++){
        var imageURL = response.data[i].images.original.url;

        var animalImage = $("<img>");
        animalImage.attr("src", imageURL);
        animalImage.attr("alt", 'cat image');

        $("#gifs").prepend(animalImage)
    }
    })
})