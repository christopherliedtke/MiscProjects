(function() {
    var countries = [];
    var clear;

    var searchField = $("input[name='search']");
    var resultsDiv = $(".results");

    // Look for results on input
    searchField.on("input", function() {
        // Get value of input field
        var userInput = searchField.val().toLowerCase();
        var results = [];

        // Clear timeout if previous setTimeout is still running
        clearTimeout(clear);

        // Throttle requests
        clear = setTimeout(function() {
            // Return (abort) if user input is different to requested search term
            if (searchField.val().toLowerCase() !== userInput) {
                return;
            }

            // Conduct ajax request
            $.ajax({
                type: "GET",
                url: "https://flame-egg.glitch.me/",
                data: {
                    q: userInput
                },
                success: function(response) {
                    countries = response;

                    // Add up to 4 results to the results array
                    for (var i = 0; i < countries.length; i++) {
                        results.push(countries[i]);
                        // if (countries[i].toLowerCase().indexOf(userInput) === 0) {
                        // }

                        // if (results.length === 4) {
                        //     break;
                        // }
                    }

                    // Set up html with search results
                    var htmlForCountries = "";

                    for (var j = 0; j < results.length; j++) {
                        htmlForCountries += '<p class="country">' + results[j] + "</p>";
                    }

                    // Set resultsDiv depending on user input
                    if (userInput === "") {
                        resultsDiv.html("");
                    } else if (userInput !== "" && results.length === 0) {
                        resultsDiv.html("no results");
                    } else {
                        resultsDiv.html(htmlForCountries);
                    }

                    // Add event mouseover event listener to highlight OR remove highlight
                    resultsDiv.on("mouseover", ".country", function() {
                        $(this).addClass("country-highlight");
                        $(this)
                            .prev()
                            .removeClass("country-highlight")
                            .prev()
                            .removeClass("country-highlight");
                        $(this)
                            .next()
                            .removeClass("country-highlight")
                            .next()
                            .removeClass("country-highlight");
                    });

                    // Populate input field with country that has been moused down on
                    resultsDiv.on("mousedown", ".country", function(e) {
                        searchField.val(e.currentTarget.innerText);
                        resultsDiv.html("");
                    });
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }, 200);
    });

    // Show/Hide resultsDiv on focus/blur
    searchField.focus(function() {
        resultsDiv.show();
    });

    searchField.blur(function() {
        resultsDiv.hide();
    });

    // Highlight country on key down event
    searchField.on("keydown", function(e) {
        var resultsCountries = $(".country");

        // Transfer country to input field on enter
        if (e.keyCode === 13) {
            for (var p = 0; p <= resultsCountries.length - 1; p++) {
                if (resultsCountries.eq(p).hasClass("country-highlight")) {
                    var text = resultsCountries.eq(p)[0].innerText;
                    searchField.val(text);
                    resultsDiv.html("");
                }
            }
        }

        // Move down highlight down on arrow down key
        if (e.keyCode === 40) {
            var checkClassCounter = 0;

            if (resultsCountries.eq(resultsCountries.length - 1).hasClass("country-highlight")) {
                return;
            } else {
                for (var r = 0; r <= resultsCountries.length - 2; r++) {
                    // console.log(r);

                    if (resultsCountries.eq(r).hasClass("country-highlight")) {
                        checkClassCounter++;
                        resultsCountries.eq(r).removeClass("country-highlight");
                        resultsCountries
                            .eq(r)
                            .next()
                            .addClass("country-highlight");
                        break;
                    }
                }

                if (checkClassCounter === 0) {
                    resultsCountries.eq(0).toggleClass("country-highlight");
                }
            }
        }

        // Move up highlight on arrow up key
        if (e.keyCode === 38) {
            var checkClassCounter2 = 0;

            if (resultsCountries.eq(0).hasClass("country-highlight")) {
                return;
            } else {
                for (var q = 1; q <= resultsCountries.length - 1; q++) {
                    // console.log(q);

                    if (resultsCountries.eq(q).hasClass("country-highlight")) {
                        checkClassCounter2++;
                        resultsCountries.eq(q).removeClass("country-highlight");
                        resultsCountries
                            .eq(q)
                            .prev()
                            .addClass("country-highlight");
                        break;
                    }
                }

                if (checkClassCounter2 === 0) {
                    resultsCountries.eq(resultsCountries.length - 1).toggleClass("country-highlight");
                }
            }
        }
    });
})();
