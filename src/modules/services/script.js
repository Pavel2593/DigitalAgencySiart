$(document).ready(function () {
    function startSlider() {
        var owl = $(".services__items");
        owl.addClass('owl-carousel');
        owl.addClass('owl-theme');
        owl.owlCarousel({
            item: 1,
            loop: true,
            margin: 4,
            center: false,
            autoWidth: true,
            dots: true,
        });
        $('.services__items .owl-dot').click(function () {
            owl.trigger('to.owl.carousel', [$(this).index(), 300]);
        });
    }

    function stopSlider() {
        var owl = $(".services__items");
        owl.owlCarousel('destroy');
        owl.removeClass('owl-carousel');
        owl.removeClass('owl-theme');
    }

    if (window.innerWidth <= 992) {
        startSlider();
    } else {
        stopSlider();
    }

    $(window).resize(function () {
        if (window.innerWidth <= 992) {
            startSlider();
        } else {
            stopSlider();
        }
    });



});