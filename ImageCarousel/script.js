(function() {
    // Initialize image array and indicator array
    var img = document.querySelectorAll("#carouselWrapper img");
    var ind = document.querySelectorAll("#indicatorWrapper .ind");

    // Declare counter for current image on screen
    var counter = 0;

    // Start carousel & declare/set setTimeout ID
    var timeoutId = setTimeout(moveImages, 3000);

    // Declare variable to track if transition is happening
    var transitionInProgress = false;

    // Add click event listeners to each image
    for (var j = 0; j < ind.length; j++) {
        // IFFE to get index of images and hold its value in order to pass it to moveImages()
        (function(dotIndex) {
            ind[dotIndex].addEventListener("click", function() {
                // Skip click event if clicked on current image OR transition is in progress
                if (dotIndex == counter || transitionInProgress) {
                    return;
                }
                clearTimeout(timeoutId);
                moveImages(dotIndex);

                return;
            });
        })(j);
    }

    // Add transitionend event listeners to each image
    document.addEventListener("transitionend", function(e) {
        if (e.target.className == "offscreen-left") {
            for (var i = 0; i < img.length; i++) {
                img[i].classList.remove("offscreen-left");

                // Transition finished
                transitionInProgress = false;
            }
        }

        return;
    });

    // Define carousel function
    function moveImages(index) {
        // Transition starts
        transitionInProgress = true;

        // Move current image off screen AND remove active indicator
        img[counter].classList.remove("onscreen");
        img[counter].classList.add("offscreen-left");
        ind[counter].classList.remove("ind-active");

        // IF clicked: reset counter to clicked image ELSE: continue as usual
        if (typeof index === "number") {
            counter = index;
        } else {
            if (counter < img.length - 1) {
                counter++;
            } else {
                counter = 0;
            }
        }

        // Move next image on screen AND set active indicator
        img[counter].classList.add("onscreen");
        ind[counter].classList.add("ind-active");

        timeoutId = setTimeout(moveImages, 3000);

        return;
    }

    return;
})();
