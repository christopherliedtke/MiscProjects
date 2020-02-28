(function() {
    // #handlebar boilerplate
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll('script[type="text/x-handlebars-template"]');

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    // #

    var nextUrl;
    var resultsMessage = $(".resultsMessage");
    var resultsContainer = $("#results-container");
    var loadMore = $(".load-more");
    var baseUrl = "https://elegant-croissant.glitch.me/spotify";
    var newHtml = "";
    var userInput = "";
    var dropdownInput = "";
    var userInputBefore = "";
    var timeoutID;

    // #Add click event to submit search button
    $(".submit-btn").on("click", function() {
        newHtml = "";
        userInput = $("input[name='user-input']").val();
        dropdownInput = $(".artist-or-album")
            .val()
            .toLowerCase();

        makeAjaxRequest(baseUrl, userInput, dropdownInput);
        return;
    });

    // #Define infiniteScroll()
    function infiniteScroll() {
        clearTimeout(timeoutID);
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();
        var scrollPosY = $(document).scrollTop();

        if (documentHeight - scrollPosY <= windowHeight * 1.4) {
            makeAjaxRequest(nextUrl, userInput, dropdownInput);
        } else {
            timeoutID = setTimeout(infiniteScroll, 500);
        }
        return;
    }

    // #Define makeAjaxRequest()
    function makeAjaxRequest(url, userInput, dropdownInput) {
        $.ajax({
            // type: "GET",
            url: url,
            data: {
                query: userInput,
                type: dropdownInput
            },
            success: function(response) {
                response = response.artists || response.albums;

                // If no search results -> return function and output message
                // If userInput has changed -> empty results and return
                if (response.items.length === 0 && userInputBefore != userInput) {
                    clearTimeout(timeoutID);
                    resultsMessage.html('There are no results for "' + userInput + '"');
                    loadMore.html("");
                    resultsContainer.html("");
                    return;

                    // If userInput has not changed (load more was clicked) -> Do NOT empty results and return
                } else if (response.items.length === 0 && userInputBefore === userInput) {
                    resultsMessage.html('There are no more results for "' + userInput + '"');
                    return;

                    // Else -> continue
                } else {
                    resultsMessage.html('Results for "' + userInput + '"');
                }

                // #Add results to newHtml && inject through handlebars
                newHtml += Handlebars.templates.results(response);
                $("#results-container").html(newHtml);

                // Set load more
                if (response.next) {
                    nextUrl = response.next.replace("https://api.spotify.com/v1/search", baseUrl);

                    if (location.search.indexOf("scroll=infinite") >= 0) {
                        infiniteScroll();
                    } else {
                        loadMore.html("<button class='load-more-button'> LOAD MORE</button>");

                        // Add load more event listener to loadMoreButton
                        var loadMoreButton = $(".load-more-button");
                        loadMoreButton.on("click", function() {
                            makeAjaxRequest(nextUrl, userInput, dropdownInput);
                        });
                    }
                } else {
                    nextUrl = "";
                    loadMore.html("");
                }

                userInputBefore = userInput;
            },
            error: function(error) {
                console.log(error);
            }
        });

        return;
    }
})();
