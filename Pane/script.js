(function() {
    var bar = $("#bar");
    var top = $("#top");
    var container = $(".container").eq(0);
    var leftOffsetContainer = container.offset().left;

    bar.on("mousedown", function(e) {
        container.on("mousemove", function(e) {
            top.width(e.clientX - leftOffsetContainer);
            bar.css({
                left: e.clientX - leftOffsetContainer
            });

            return;
        });

        $(document).on("mouseup", function(e) {
            container.off();
            $(document).off();
        });

        return;
    });

    return;
})();
