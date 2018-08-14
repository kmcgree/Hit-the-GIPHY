//Create array of topics.  I chose dance moves
const topics = ["moonwalk", "the hokey-pokey", "the charleston", "the robot", "YMCA", "the twist", "raise the roof", "the running man", "the worm", "the sprinkler"]

// function to initialize buttons by looping through the array
function InitializeButtons() {
    $("#buttonDiv").empty();
    for (i = 0; i < topics.length; i++) {
        const button = $("<button>");
        button.text(topics[i]);
        button.addClass("dancemove-btn");
        button.attr("data-name", topics[i]);
        $("#buttonDiv").append(button);
    }
};
InitializeButtons()

//setup click function to append input to the topics array
$("#add-dance").on("click", function (event) {
    //prevent page from refreshing after submitting input
    event.preventDefault();

    //get input and push it to the topics array
    const dancemove = $("#dancemove").val().trim();
    topics.push(dancemove);
    $("#dancemove").val("");
    //refresh buttons
    InitializeButtons()

});

//create variables for apikey and url
const APIKEY = "USNRgRuRRXSDHV7IcBpgyeyvRtD0mnul"
const URL = "https://api.giphy.com/v1/gifs/search?q="

//create function to display gifs using ajax
function DisplayGIF() {
    const dance = $(this).attr("data-name");
    const queryURL = `${URL}${dance}+dance&api_key=${APIKEY}&limit=5&rating=g`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        const danceDiv = $("<div class='dance col'>");
        const data = response.data;
        data.forEach(function (index) {
            const rating = index.rating;

            //create gif variable to hold image, add dataset of image urls (still and animated)
            const gif = $(`<img src=${index.images.fixed_height_still.url}>`);
            gif.addClass("gif");
            gif.attr("data-state", "still");
            gif.attr("data-still", index.images.fixed_height_still.url)
            gif.attr("data-animate", index.images.fixed_height.url)

            const p = $(`<p>Rating: ${rating}</p>`);
            danceDiv.append(gif);
            danceDiv.append(p);
            $("#gifDiv").prepend(danceDiv);
        });

        //click function to animate gif
        $(".gif").on("click", function () {
            const state = $(this).attr("data-state")

            //if the image state when click is still, switch the src to the animate url
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate")
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })


        console.log(response)
        console.log(data)
    })
}
//call ajax function for when a button with dancemove-btn class is clicked
$(document).on("click", ".dancemove-btn", DisplayGIF)

