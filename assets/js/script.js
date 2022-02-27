// define global variables
var currentTime = luxon.DateTime.now()
var currentHour = luxon.DateTime.now().hour

// display current day
$("#currentDay").text(currentTime.toLocaleString(luxon.DateTime.DATE_HUGE));

// function to determine time block's textarea backgrounds
var colorCode = function() {
    $("textarea").each(function(){
        // parse a number value from the id of each textarea element
        var time = parseInt($(this).attr("id"));

        // set classes based on time block's id vs currentHour
        if (time < currentHour) {
            $(this).removeClass().addClass("col-10 past");
        } else if (time === currentHour) {
            $(this).removeClass().addClass("col-10 present");
        } else {
            $(this).removeClass().addClass("col-10 future")
        };
    });
};

// click event for each save button
$(".saveBtn").on('click', function(){
    var hourBlock = $(this).siblings('.hour').text();
    var description = $(this).siblings('textarea').val();

    // console.log(hourBlock);
    // console.log(description);

    // save description to localStorage with item name of the hour
    localStorage.setItem(hourBlock, description);
});

// function to pull down localStorage
var getStorage = function() {
    $(".hour").each(function() {
        // determine the hour we're on
        var hourBlock = $(this).text();
        // create a variable for that hour's description pulled from localStorage
        var description = localStorage.getItem(hourBlock);

        // set that hour's sibiling text area to the value of 'description' pulled from localStorage
        $(this).siblings("textarea").val(description);
    })
}
// run colorCode function every minute
var checkColors = setInterval(colorCode(), 60000);
// call the localStorage handler
getStorage();