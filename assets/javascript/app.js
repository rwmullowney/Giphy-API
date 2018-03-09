(function () {

    // Array of topics we'll use to create buttons
    var topics = ['Batman', 'Superman', 'Thor']

    // Assigns a variable to limit the number of gifs
    var limit = 10

    // Generates buttons based on the array
    function generateButtons() {
        // Clears out current buttons so it doesn't pile on
        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var gifButton = "<button class='btn btn-secondary gif-button'>" + topics[i] + "</button>"
            $("#buttons").append(gifButton)
        }
    }


    // Takes user input and creates a button
    $("#submit").on('click', function () {

        // Only runs function if there is content in the input field
        if ($("#userInput").val() != ''){


        // Assign the user's input to a variable
        var userInput = $("#userInput").val().trim();
        topics.push(userInput);

        generateButtons();

        // Resets text field
        $("#userInput").val('');
    }
    })
    

    // Runs submit when 'enter' key pressed
    $("#userInput").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#submit").click();
        }
    });


    // Establishes the function for when a button is clicked (and adds an event listener for the '.gifbutton' class to the entire document)
    $(document).on('click', ".gif-button", function () {



        // Assigns the gif topic to be searched in the Giphy API based on the name of the button clicked
        var search = $(this).text();

        // Build the Giphy API query from the name of the button clicked
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=YcMY50f8vA1dUzRPHD7e9oQ3eiOBNXv0&q=" + search + "&limit=" + limit + "&rating=pg";

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
                    var gifURL = response.data[i].images.original.url;
                    var stillURL = response.data[i].images.original_still.url;

                    // Builds the img tag to be added to the page
                    var heroImage = $("<img>");
                    heroImage.attr("src", stillURL);
                    heroImage.attr("alt", search + ' gif');
                    heroImage.attr("data-still", stillURL);
                    heroImage.attr("data-animate", gifURL);
                    heroImage.attr("data-state", "still");
                    heroImage.addClass("gif");

                    gifDiv.append(heroImage);
                    // Appends paragraph tag with gif rating to div
                    gifDiv.append($("<p>").text("Rating: " + response.data[i].rating))

                    $("#gifs").prepend(gifDiv)
                }
            })
    })


    // Click function to start or stop a gif
    $(document).on("click", ".gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

    // Generates buttons upon page launch
    generateButtons();






})();