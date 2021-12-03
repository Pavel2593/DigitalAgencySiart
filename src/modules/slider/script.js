$(document).ready(function () {

    function t(e) {
        // console.log(t);
        t.namespace;
        e.find(".active").removeClass("lateralItem");
        if (window.innerWidth >= 1024) {
            e.find(".active").eq(0).addClass("lateralItem");
            e.find(".active").eq(3).addClass("lateralItem");
        } else if (window.innerWidth >= 480) {
            e.find(".active").eq(0).addClass("lateralItem");
            e.find(".active").eq(2).addClass("lateralItem");
        }
    }

    $(".content .slider").owlCarousel({
        loop: true,
        center: false,
        autoWidth: true,
        dots: false,
        nav: true,
        navContainer: '.slider__nav',
        responsive: {
            320: {
                items: 1,
            },

            1024: {
                items: 4
            }
        }
    }).on("translated.owl.carousel", function (e) {
        console.log(e);        
        t($(this))
    });

    t($('.slider'))
});