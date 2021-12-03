$(document).ready(function () {
    function t(e) {
        // console.log(t);
        t.namespace;
        e.find(".active").removeClass("slider__item-active");
        if (window.innerWidth >= 992) {
            e.find(".active").eq(3).addClass("slider__item-active");
        } else if (window.innerWidth >= 768) {
            e.find(".active").eq(2).addClass("slider__item-active");
        } else if (window.innerWidth < 768) {
            e.find(".active").eq(1).addClass("slider__item-active");
        }
    }


    $(".brand-list__slider").owlCarousel({
        loop: true,
        dots: false,
        nav: false,
        autoWidth: true,
        responsive: {
            1920: {
                items: 12,
            }
        }
    }).on("translated.owl.carousel", function (e) {
        t($(this))
    });
    t($('.brand-list__slider'))
});