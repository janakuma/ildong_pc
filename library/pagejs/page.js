

$(function() {
    var $header = $(".layout-header");
    var minScroll = 0;
    var SHRINK_CLASS = 'layout-header--shrink';
    var winHeight = window.innerHeight;
    var scrollTop = $(window).scrollTop();

    $(window).resize(function() {
        winHeight = window.innerHeight;
    });

    var sub_parallax = $('html,body').find('.__sub-con--box-parallax')
    if(sub_parallax.length) {
        sub_parallax.css({
            transform: 'translateY(100px)',
            opacity: '0'
        })
    }

    var $tnb = $('.tab-menu')
    if($tnb.length){
        var $next_element = $tnb.next()
        var tnb_top = $tnb.offset().top
    }

    parallax();
    if(sub_parallax.length){
        subParallax(sub_parallax)
    }

    $(window).on('scroll', function () {
        let scrPosY = $(this).scrollTop();
        const logoH = $('h1.logo').height();
        const footerNav = $('.footer-nav');

        //console.log(scrPosY, logoH)

        if (scrPosY > logoH) {
            footerNav.addClass('on');
        } else {
            footerNav.removeClass('on');
        }
    });

    function parallax() {
        function execute() {
            var winHeight = window.innerHeight;
            var scrollTop = $(window).scrollTop();
            var viewScroll = winHeight + scrollTop;

            $("[data-parallax-group]").each(function() {
                var $self = $(this);
                var $parallax = $self.find("[data-parallax]");
                var top = $self.offset().top;
                $parallax.each(function() {
                    $(this).data('min', top);
                });
            });

            $("[data-parallax]").each(function() {
                var $self = $(this);
                var speed = parseFloat($self.data('speed'));
                var isFadeIn = typeof $self.data('fadein') !== 'undefined';

                var delay = $self.data('delay');
                if(isFadeIn === true || delay === 'auto') {
                    delay = winHeight * 0.1;
                } else if (typeof delay === 'number') {
                    delay = parseInt(delay);
                } else {
                    delay = 0;
                }

                $self.addClass('__transition--parallax');

                var top;
                if(!$self.data('top')) {
                    top = $self.offset().top;
                    $self.data('top',top);
                } else {
                    top = parseInt($self.data('top'));
                }

                var min;
                if(!$self.data('min')) {
                    min = top;
                    $self.data('min',top);
                } else {
                    min = parseInt($self.data('min'));
                }

                var max = top + $self.outerHeight();

                if(viewScroll >= (top + delay) && scrollTop <= max) {
                    var move = (min - viewScroll) * speed;
                    $self.css('transform','translateY('+move+'px)');
                    if(isFadeIn) {
                        $self.css('opacity','1');
                    }
                } else {
                    $self.css('transform','translateY(0)');
                    $self.css('opacity','');
                }
            });
        }

        $(window).on('scroll', function () {
            execute();
        });
    }

    function subParallax(element){
        function execute() {
            $.each(element, function(key, value) {
                var $this = $(this)
                var scrollTop = $(window).scrollTop()
                var elementTop = $this.offset().top
                var time = $this.data('idx') ? $this.data('idx') : key ;
                // if(scrollTop >= elementTop-800 && scrollTop < elementTop){
                if(scrollTop >= elementTop-800){
                    setTimeout(function(){
                        $this.css({
                            transform: 'translateY(0px)',
                            transition: 'all 500ms',
                            opacity: '1',
                        })
                    }, 100 * time)
                }
            })
        }

        $(window).on('scroll', function () {
            execute();
        });
    }
});
