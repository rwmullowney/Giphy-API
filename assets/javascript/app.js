// Array of topics we'll use to create buttons
var topics = ['Dogs', 'Cats', 'Parakeets']

// Generates buttons based on the array
for (var i = 0; i < topics.length; i++) {
    var gifButton = "<button>" + topics[i] + "</button>"
    $("#buttons").append(gifButton)
}


// Takes user input and creates a button
$("#submit").on('click', function () {
    // Assign the user's input to a variable
    var userInput = $("#userInput").val();
    $("#userInput").empty(); // Doesn't work
    console.log(userInput);
    var gifButton = "<button>" + userInput + "</button>"
    $("#buttons").append(gifButton);
})




// Establishes the function for when a button is clicked
$("button").on('click', function () {

    // Assigns a variable to limit the number of gifs
    var limit = 10

    // Assigns the animal to be searched in the Giphy API based on the name of the button clicked
    var animal = $(this).text();

    // Build the Giphy API query from the name of the button clicked
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=YcMY50f8vA1dUzRPHD7e9oQ3eiOBNXv0&q=" + animal + "&limit=" + limit;

    // Clear the gifs currently there
    $("#gifs").empty();

    // Sends the request to Giphy
    $.get(queryURL)
        .then(function (response) {

            // Use a for loop to cycle through the images in the array from Giphy API
            for (var i = 0; i < limit; i++) {

                // Creates the div for us to store our rating & gif
                var gifDiv = $("<div>")

                // Assigns the gif's still URL to a variable
                var imageURL = response.data[i].images.original_still.url;

                // Builds the img tag to be added to the page
                var animalImage = $("<img>");
                animalImage.attr("src", imageURL);
                animalImage.attr("alt", animal + 'gif');

                gifDiv.append(animalImage);
                // Appends paragraph tag with gif rating to div
                gifDiv.append($("<p>").text("Rating: " + response.data[i].rating))

                $("#gifs").prepend(gifDiv)
            }
        })
})