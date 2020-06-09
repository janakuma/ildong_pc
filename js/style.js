// 팝업 열기
function fnPopShow(id) {
    $(id).bPopup({
        follow: [false, false],
        opacity: 0.8
    });
}

AOS.init({
    easing: 'linear',
    duration: 600,
    once: true,
    offset: 400,
    delay: 50,
});

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });
    return params;
}

function posTop() {
    $('html, body').animate({ scrollTop: 0 });
}

function toggle_class(parent, class_val) {
    $('.' + parent).toggleClass(class_val);
}


function faq_toggle() {
    let faq_i = 0;
    let faq_url = 'taking.html?tab=1';

    const $faq_li = $('.faq-list > ul > li');
    $faq_li.find('.block-q').on('click', function () {

        if (!$(this).parent().is('.selected')) {
            $faq_li.removeClass('selected');
            $(this).parent().addClass('selected');

        } else {
            $(this).parent().removeClass('selected');

        }
    });
}

if ($('#home').length) {
    const progress_bar_w = $('.progress-bar').width();
    const swiper_intro = new Swiper('.home-slider .swiper-container', {
        loop: true,
        autoplay: {
            delay: 3000
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                const thumb_w = progress_bar_w / total;
                $('.thumb').css({
                    width: thumb_w + 'px',
                    left: (current - 1) * thumb_w + 'px'
                });
            }
        },
        navigation: {
            nextEl: '.home-slider .swiper-button-next',
            prevEl: '.home-slider .swiper-button-prev',
        },
    });
}

if ($('#curious').length) {
    faq_toggle();
}

if ($('#competition').length) {
    const swiper_intro = new Swiper('.competition-header .swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.competition-header .swiper-button-next',
            prevEl: '.competition-header .swiper-button-prev',
        },
        autoplay: {
            delay: 1500
        },
        centeredSlides: true,
        spaceBetween: -125,
        slidesPerView: 'auto',

    });

    const swiper_slider = new Swiper('.my-slider .swiper-container', {
        loop: true,
        autoplay: {
            delay: 1500
        },
        navigation: {
            nextEl: '.my-slider .swiper-button-next',
            prevEl: '.my-slider .swiper-button-prev',
        },
        spaceBetween: 25,
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        observeSlideChildren: true
    });
}

$(function () {
    /* GNB */
    $('.gnb')
        .on('mouseenter', function () {
            const gnb_h = $('.dep-group').height();
            $(this).height(gnb_h);
        })
        .on('mouseleave', function () {
            const dep1_h = $('.dep1').height();
            $(this).height(dep1_h);
        })

    $('.gnb > .dep-group')
        .on('mouseenter', function () {
            $(this).find('.dep1').addClass('selected')
        })
        .on('mouseleave', function () {
            $('.gnb > .dep-group .dep1').removeClass('selected')
        })


    /* TAB */
    $('.tab-box > a').on('click', function () {
        let idx = $(this).index();

        $('.tab-box > a').removeClass('selected');
        $('.tab-cnt').removeClass('selected');

        $('.tab-box > a').eq(idx).addClass('selected');
        $('.tab-cnt').eq(idx).addClass('selected');

        $('.tab-cnt').eq(idx).children().removeClass('aos-animate');
        AOS.refresh();
        return false;
    });

    /* Parameter trigger */
    const oParams = getUrlParams();
    $('.tab-box > a').eq(oParams.tab).trigger('click');

    //Footer ID Check
    let getId = $('.wrapper').attr('id');
    $('.footer-nav > a[class=' + getId + ']').addClass('selected');
})