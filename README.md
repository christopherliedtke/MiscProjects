# MiscProjects

## ConnectFour

2 Player game -> Who gets four in a row (horizontal || vertical || diagonal) first, wins.

### Key Features

-   Detection of horizontal, vertical, diagonal wins
-   Detection of draw
-   Make move by clicking a checker on top through event handler

### Technologies

-   HTML
-   CSS
-   JavaScript
-   JQuery

![alt text](ConnectFour/connectFour.gif 'Connect Four Gameplay')

[Link to CodePen](https://codepen.io/ggwoods/pen/mdJmKzG)

## Spotify Search (infinite load with query: ?scroll=infinite)

Spotify search by artist || album through Spotify API.

### Key Features

-   Ajax request to spotify API for artists||albums on submit
-   Add "Load More" button at bottom of search results
-   Add `?scroll=infinite` to url -> infinite scroll as long as more search results exist
-   Add content to HTML through handlebars.js

### Technologies

-   HTML
-   CSS
-   JavaScript
-   JQuery
-   Jquery.ajax()
-   Handlebars.js

[Link to CodePen](https://codepen.io/ggwoods/pen/OJVmwyK)

## Infinite Ticker

The ticker starts on page load and runs infinite. Headlines disappearing from screen are appended to the end again.

### Key Features

-   Ticker with pure jquery and requestAnimationFrame
-   Append headlines at end of ticker after disappearing to the left on the screen
-   Stop ticker on mouse enter headline && continue ticker on mouse leave

### Technologies

-   HTML
-   CSS
-   JavaScript
-   JQuery

[Link to CodePen](https://codepen.io/ggwoods/pen/LYVyBmM)

## Pane

The pane let's you compare an image before vs. after. You can move the bar in the middle to reveal more of one or the other image.

### Key Features

-   Mouse down on middle bar let's you resize the top image
-   On mouse up the size of the top image stays at its last value

### Technologies

-   HTML
-   CSS
-   JavaScript
-   JQuery

[Link to CodePen](https://codepen.io/ggwoods/pen/QWbvBeM)

## Image carousel

The image carousel shows one image after the other with a slide in effect. The images repeat infinitely.

### Key Features

-   Transition animation for change of image through adding & removing classes
-   Each image shows 3 seconds before being replaced by the next image
-   User can click on indicator to slide in requested image from right immediately
-   User cannot request image through click on indicator while transition is happening || requested image is already on screen

### Technologies

-   HTML
-   CSS
-   JavaScript

![alt text](ImageCarousel/imageCarousel2.gif 'Working Example of Image Carousel')

[Link to CodePen](https://codepen.io/ggwoods/pen/gOpWdmg)

## Incremental search

The incremental search let's you search for a country through the input. Start typing and you will get max. four countries matching your input.

### Key Features

-   Ajax request for search results to external API
-   Auto-display max. 4 results matching the user input
-   Show "no results" if there are no matches
-   Choose result through mouse click or `arrow key + enter`
-   Show matching results only if input field is focussed
-   Keep search result highlighted on focus -> blur -> focus

### Technologies

-   HTML
-   CSS
-   JavaScript
-   JQuery
-   Jquery.ajax()

[Link to CodePen](https://codepen.io/ggwoods/pen/WNvjgyJ)
