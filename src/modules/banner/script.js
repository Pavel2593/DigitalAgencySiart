$(document).ready(function () {
    $(".banner__slider").owlCarousel({
        loop: true,
        center: false,
        autoWidth: false,
        dots: true,
        nav: false,
        items: 1,
        animateOut: 'animate__slideOutUp',
        animateIn: 'animate__slideInUp'
    }).on('changed.owl.carousel', function(e) {
        var index = e.item.index;
        // $('.owl-item').removeClass('animated owl-animated-in animate__slideInUp');
        // $('.owl-item').eq(index).addClass('animated owl-animated-in animate__slideInUp');
    });
});