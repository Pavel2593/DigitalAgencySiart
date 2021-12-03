$(document).ready(function () {
    $(".article-slider__slider").owlCarousel({
        loop: true,
        center: true,
        autoWidth: false,
        dots: false,
        nav: true,
        navContainer: '.article-slider__nav',
        responsive: {
            320: {
                items: 1,
                margin: 30,
                autoWidth: false,
            },

            480: {
                items: 3,
                margin: 46,
                autoWidth: true,
            },
            992: {
                items: 3,
                margin: 46,
                autoWidth: false,
            },

            1265: {
                items: 3,
                margin: 56,
                autoWidth: false,
            }
        }
    })
});