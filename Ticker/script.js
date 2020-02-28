(function() {
    var ticker = $('#ticker');
    var headlines = $('a');
    var index = 0;
    var firstChild = headlines.eq(index);

    var anim;

    for (var i = 0; i < headlines.length; i++) {
        headlines.eq(i).on('mouseenter', function(e) {
            cancelAnimationFrame(anim);
        });
        headlines.eq(i).on('mouseleave', function(e) {
            moveLeft();
        });
    }

    function moveLeft() {
        var left = ticker.offset().left;
        var firstChildWidth = firstChild.outerWidth();

        if (left <= 0 - firstChildWidth) {
            ticker.append(headlines.eq(index));

            if (index < headlines.length - 1) {
                index++;
            } else {
                index = 0;
            }

            left = 1.5;
        }

        left -= 1;
        ticker.css({
            left: left + 'px'
        });

        anim = requestAnimationFrame(moveLeft);

        return;
    }

    moveLeft();

    return;
})();
