/*
#######   ########   #######  ##    ##  #######  ######## 
##    ##  ##        ##        ##    ##  ##    ## ##
##    ##  ##        ##        ##    ##  ##    ## ##
##    ##  ########  ##        ##    ##  #######  ########
##    ##  ##        ##        ##    ##  ##    ## ##
##    ##  ##        ##        ##    ##  ##    ## ##
#######   ########   #######   ######   #######  ########
*/
var decube = decube || {};

decube.nsFunc = function(namespace) {
    var sections = namespace.split('.'),
        temp = sections[0];

    window[temp] = window[temp] || {};

    var parent = window[temp];

    for (var i = 1; i < sections.length; i++) {
        if (typeof parent[sections[i]] === 'undefined') {
            parent[sections[i]] = {};
        }
        parent = parent[sections[i]];
    }

    return parent;
};

decube.nsFunc('decube.common');

//---------------------------------------------------
// 브라우저 관련(모바일, App 포함)
//---------------------------------------------------
decube.common.browser = {
    ios: function () {
        return navigator.userAgent.toLowerCase().indexOf("iphone") > 0
    },
    ios8081: function () {
        return this.ios() && (navigator.userAgent.toLowerCase().indexOf("os 8_0") > 0 || navigator.userAgent.toLowerCase().indexOf("os 8_1") > 0 && -1 == navigator.userAgent.toLowerCase().indexOf("os 8_1_1"))
    },
    android: function () {
        return navigator.userAgent.toLowerCase().indexOf("android") > 0
    },
    fba: function () {
        return navigator.userAgent.toLowerCase().indexOf("fba") > 0
    },
    twitter: function () {
        return document.referrer.toLowerCase().indexOf("http://t.co/") > -1
    },
    naver: function () {
        return navigator.userAgent.toLowerCase().indexOf("naver") > 0
    },
    daum: function () {
        return navigator.userAgent.toLowerCase().indexOf("daum") > 0
    },
    kakao: function () {
        return navigator.userAgent.toLowerCase().indexOf("kakao") > 0
    },
    kakaotalk: function () {
        return navigator.userAgent.indexOf("kakaotalk") > 0
    },
    kakaostory: function () {
        return navigator.userAgent.toLowerCase().indexOf("kakaostory") > 0
    },
    kidsnote: function () {
        return navigator.userAgent.toLowerCase().indexOf("appkidsnote") > 0
    },
    ie: function () {
        var ua = window.navigator.userAgent,
            msie = ua.indexOf('MSIE '),
            trident = ua.indexOf('Trident/'),
            edge = ua.indexOf('Edge/');

        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    },
    mobile: function () {
        var phoneArray = new Array('samsung-', 'sch-', 'shw-', 'sph-', 'sgh-', 'lg-', 'canu', 'im-', 'ev-', 'iphone', 'nokia', 'blackberry', 'lgtelecom', 'natebrowser', 'sonyericsson', 'mobile', 'android', 'ipad');
        for (i = 0; i < phoneArray.length; i++) {
            if (navigator.userAgent.toLowerCase().indexOf(phoneArray[i]) > -1) {
                return true;
            }
        }
        return false;
    },
    tablet: function () {
        if (!this.mobile()) {
            return false;
        }
        // 태블릿검사
        if (navigator.userAgent.toLowerCase().indexOf('ipad') > -1 ||
        (navigator.userAgent.toLowerCase().indexOf('android') > -1 && navigator.userAgent.toLowerCase().indexOf('mobile') == -1)) {
            return true;
        }
        // 갤럭시 탭만을 위한 리다이렉트. Mobile 이라는 단어가 안들어오게 되면 지우셔도 됨
        var galaxyTabModel = new Array('shw-');
        for (i = 0; i < galaxyTabModel.length; i++) {
            if (navigator.userAgent.toLowerCase().indexOf(galaxyTabModel[i]) > -1) {
                return true;
            }
        }
        return false;
    }
};

//---------------------------------------------------
// 유효성 관련
//---------------------------------------------------
decube.common.validate = {
    //---------------------------------------------------
    // 한글 체크
    //---------------------------------------------------
    korean: function (value) {
        var elevalue = value,
            pattern = /^([가-힣]+)$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 한글 또는 영문 체크
    //---------------------------------------------------
    koreanAlpha: function (value) {
        var elevalue = value,
            pattern = /^([가-힣a-zA-Z]+)$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 한글 또는 영문 체크(공백포함)
    //---------------------------------------------------
    koreanAlphaBlank: function (value) {
        var elevalue = value,
            pattern = /^([가-힣a-zA-Z\s]+)$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 한글 또는 영문 또는 숫자 (공백포함)
    //---------------------------------------------------
    koreanAlphaDigitBlank: function (value) {
        var elevalue = value,
            pattern = /^([가-힣a-zA-Z0-9\s]+)$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 영문 형식 체크
    //---------------------------------------------------
    alpha: function (value) {
        var elevalue = value,
            pattern = /^([a-zA-Z]+)$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 영문 형식 체크(공백포함)
    //---------------------------------------------------
    alphaBlank: function (value) {
        var elevalue = value,
            pattern = /^([a-zA-Z-\s]+)$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 영문 또는 숫자 체크
    //---------------------------------------------------
    alphaNumeric: function (value) {
        var elevalue = value,
            pattern = /^([a-zA-Z0-9]+)$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 숫자 체크
    //---------------------------------------------------
    numeric: function (value) {
        var elevalue = value,
            pattern = /^([0-9]+)$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 전화번호 체크
    //---------------------------------------------------
    telephone: function (value) {
        var elevalue = value,
            pattern = /^\d{2,3}-\d{3,4}-\d{4}$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 휴대폰번호 체크
    //---------------------------------------------------
    mobilePhone: function (value) {
        var elevalue = value,
            pattern = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;

        return (pattern.test(elevalue)) ? true : false;
    },
    //---------------------------------------------------
    // 이메일
    //---------------------------------------------------
    email: function (emailAccount, emailDomain) {
        var email = emailAccount + "@" + emailDomain;

        if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            return true;
        }
        else {
            return false;
        }
    },
    email2: function (emailAddress) {
        if (emailAddress.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            return true;
        }
        else {
            return false;
        }
    }
};

//---------------------------------------------------
// 문자열 관련
//---------------------------------------------------
decube.common.strings = {
    //---------------------------------------------------
    // Byte 체크
    //---------------------------------------------------
    toByte: function (value) {
        var tmpStr,
            temp = 0,
            onechar,
            tcount = 0;

        tmpStr = new String(value);
        temp = tmpStr.length;

        for (k = 0; k < temp; k++) {
            onechar = tmpStr.charAt(k);

            if (escape(onechar).length > 4) {
                tcount += 2;
            }
            else if (onechar != '\r') {
                tcount++;
            }
        }
        return tcount;
    },
    //---------------------------------------------------
    // 문자열 max 초과시 특정문구 대체
    //---------------------------------------------------
    replace: function (value, maxlength) {
        var _contents;

        if (value.length > maxlength) {
            _contents = value.substring(0, maxlength) + "..";
        }
        else {
            _contents = value;
        }

        return _contents;
    },
    //---------------------------------------------------
    // 개행문자 <br>로 치환
    //---------------------------------------------------
    nl2br: function (value) {
        var brTag = "<br />";
        return (value + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + brTag + "$2");
    },
    newLineReplace: function (value) {
        return value.replace(/[\n\r]/g, ' ');
    },
    replaceAll: function (value, org, req) {
        return value.split(org).join(req);
    },
    //---------------------------------------------------
    // 공백(Blank), 엔터(Carrige Return) 값만 존재하는지 체크(input, textarea)
    //---------------------------------------------------
    isEmptyAll: function (value) {
        var temp = value.replace(/\s+/g, '');

        if (temp.length < 1) {
            return true;
        }
        else {
            return false;
        }
    },
    //---------------------------------------------------
    // 공백 제거
    //---------------------------------------------------
    trim: function (value) {
        value.replace(/(^\s*)|(\s*$)/gi, "");
    },
    //---------------------------------------------------
    // 문자열에서 콤마 제거
    //---------------------------------------------------
    deleteComma: function (value) {
        return value.replace(/,/g, "");
    },
    //---------------------------------------------------
    // 숫자 3자리수마다 콤마(,) 찍기 
    //---------------------------------------------------
    formatComma: function (value, pos) {
        if (!pos) pos = 0;  //소숫점 이하 자리수
        var re = /(-?\d+)(\d{3}[,.])/,
            strNum = this.deleteComma(value.toString()),
            arrNum = strNum.split(".");

        arrNum[0] += ".";

        while (re.test(arrNum[0])) {
            arrNum[0] = arrNum[0].replace(re, "$1,$2");
        }

        if (arrNum.length > 1) {
            if (arrNum[1].length > pos) {
                arrNum[1] = arrNum[1].substr(0, pos);
            }
            return arrNum.join("");
        }
        else {
            return arrNum[0].split(".")[0];
        }
    },
    //---------------------------------------------------
    // 입력상자(Input, TextArea) 클릭 초기화
    //---------------------------------------------------
    initMessage: function (id, message) {
        $(id).bind("click focus", function () {
            if ($(id).val() == message) {
                $(id).val("");
            }
        }).focusout(function () {
            if ($(id).val() == "") {
                $(id).val(message);
            }
        });
    },
    clone: function (obj) {
        if (obj === null || typeof (obj) !== 'object')
            return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = this.clone(obj[attr]);
            }
        }
        return copy;
    }
};


//---------------------------------------------------
// 문자열 관련
//---------------------------------------------------
decube.common.cookie = {
    //---------------------------------------------------
    // 쿠키 설정(jquery.cookie 플러그인 사용)
    //---------------------------------------------------
    setCookie: function (cookName, cookValue, cookDomain) {
        $.cookie(cookName, cookValue, { domain: cookDomain, path: '/', secure: 0 });
    }
};

//---------------------------------------------------
// SNS 관련
//---------------------------------------------------
decube.common.sns = {
    facebookShare: function (title, description, caption, link, picture) {
        FB.ui(
        {
            method: 'feed',
            name: title,
            description: description,
            caption: caption,
            link: link,
            picture: picture
        },
        function (response) {
        });
    },
    kakaoStoryShare: function (link) {
        Kakao.Story.share({
            url: link
        });
    },
    KakaoTalkShare: function (title, description, link, picture, buttonText) {
        Kakao.Link.sendTalkLink({
            webLink: { text: title, url: link },
            image: { src: picture, width: "632", height: "316" },
            label: description,
            webButton: { text: buttonText, url: link }
        });
    },
    twitterShare: function (value) {
        var newtab = window.open('', '_blank');

        var twetterHtml = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(value);
        newtab.location = twetterHtml
    },
    prompt: function () {
        window.prompt("URL을 복사해 까페(블로그)에 공유해주세요.", document.location.origin);
    }
};

//---------------------------------------------------
// SNS 관련
//---------------------------------------------------
decube.common.security = {
    //---------------------------------------------------
    // 입력제한 문자 체크
    //---------------------------------------------------
    checkBlockText: function (value) {
        var _contents = value.toLowerCase();

        if (_contents.match("<applet") || _contents.match("<body") || _contents.match("<embed") || _contents.match("<frame") || _contents.match("<script") || _contents.match("<frameset")
        || _contents.match("<html") || _contents.match("<iframe") || _contents.match("<img") || _contents.match("<style") || _contents.match("<layer") || _contents.match("<link")
        || _contents.match("<ilayer") || _contents.match("<meta") || _contents.match("<object") || _contents.match("..\\\\")) {
            return true;
        }
        else {
            return false;
        }
    },
    //---------------------------------------------------
    // CSRF 토큰 값 조회
    //---------------------------------------------------
    addAntiCSRFToken: function (value) {
        var token = $('#formAntiCSRFToken input[name=__RequestVerificationToken]').val();
        value.__RequestVerificationToken = token;

        return value;
    }
};

//---------------------------------------------------
// 트래킹 관련
//---------------------------------------------------
decube.common.tracking = {
    //---------------------------------------------------
    // 버튼 클릭 로그 등록
    //---------------------------------------------------
    buttonClickInsert: function (value) {
        var url = "/Event/ButtonClick";
        var security = decube.common.security;
        $.post(url, security.addAntiCSRFToken({ btnCode: value })).done(function (data) {
            //alert(data);
        });
    }
};

/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.11.0.min
 ================================================================================*/
(function (c) { c.fn.bPopup = function (A, E) { function L() { a.contentContainer = c(a.contentContainer || b); switch (a.content) { case "iframe": var d = c('<iframe class="b-iframe" ' + a.iframeAttr + "></iframe>"); d.appendTo(a.contentContainer); t = b.outerHeight(!0); u = b.outerWidth(!0); B(); d.attr("src", a.loadUrl); l(a.loadCallback); break; case "image": B(); c("<img />").load(function () { l(a.loadCallback); F(c(this)) }).attr("src", a.loadUrl).hide().appendTo(a.contentContainer); break; default: B(), c('<div class="b-ajax-wrapper"></div>').load(a.loadUrl, a.loadData, function (d, b, e) { l(a.loadCallback, b); F(c(this)) }).hide().appendTo(a.contentContainer) } } function B() { a.modal && c('<div class="b-modal ' + e + '"></div>').css({ backgroundColor: a.modalColor, position: "fixed", top: 0, right: 0, bottom: 0, left: 0, opacity: 0, zIndex: a.zIndex + v }).appendTo(a.appendTo).fadeTo(a.speed, a.opacity); C(); b.data("bPopup", a).data("id", e).css({ left: "slideIn" == a.transition || "slideBack" == a.transition ? "slideBack" == a.transition ? f.scrollLeft() + w : -1 * (x + u) : m(!(!a.follow[0] && n || g)), position: a.positionStyle || "absolute", top: "slideDown" == a.transition || "slideUp" == a.transition ? "slideUp" == a.transition ? f.scrollTop() + y : z + -1 * t : p(!(!a.follow[1] && q || g)), "z-index": a.zIndex + v + 1 }).each(function () { a.appending && c(this).appendTo(a.appendTo) }); G(!0) } function r() { a.modal && c(".b-modal." + b.data("id")).fadeTo(a.speed, 0, function () { c(this).remove() }); a.scrollBar || c("html").css("overflow", "auto"); c(".b-modal." + e).unbind("click"); f.unbind("keydown." + e); k.unbind("." + e).data("bPopup", 0 < k.data("bPopup") - 1 ? k.data("bPopup") - 1 : null); b.undelegate(".bClose, ." + a.closeClass, "click." + e, r).data("bPopup", null); clearTimeout(H); G(); return !1 } function I(d) { y = k.height(); w = k.width(); h = D(); if (h.x || h.y) clearTimeout(J), J = setTimeout(function () { C(); d = d || a.followSpeed; var e = {}; h.x && (e.left = a.follow[0] ? m(!0) : "auto"); h.y && (e.top = a.follow[1] ? p(!0) : "auto"); b.dequeue().each(function () { g ? c(this).css({ left: x, top: z }) : c(this).animate(e, d, a.followEasing) }) }, 50) } function F(d) { var c = d.width(), e = d.height(), f = {}; a.contentContainer.css({ height: e, width: c }); e >= b.height() && (f.height = b.height()); c >= b.width() && (f.width = b.width()); t = b.outerHeight(!0); u = b.outerWidth(!0); C(); a.contentContainer.css({ height: "auto", width: "auto" }); f.left = m(!(!a.follow[0] && n || g)); f.top = p(!(!a.follow[1] && q || g)); b.animate(f, 250, function () { d.show(); h = D() }) } function M() { k.data("bPopup", v); b.delegate(".bClose, ." + a.closeClass, "click." + e, r); a.modalClose && c(".b-modal." + e).css("cursor", "pointer").bind("click", r); N || !a.follow[0] && !a.follow[1] || k.bind("scroll." + e, function () { if (h.x || h.y) { var d = {}; h.x && (d.left = a.follow[0] ? m(!g) : "auto"); h.y && (d.top = a.follow[1] ? p(!g) : "auto"); b.dequeue().animate(d, a.followSpeed, a.followEasing) } }).bind("resize." + e, function () { I() }); a.escClose && f.bind("keydown." + e, function (a) { 27 == a.which && r() }) } function G(d) { function c(e) { b.css({ display: "block", opacity: 1 }).animate(e, a.speed, a.easing, function () { K(d) }) } switch (d ? a.transition : a.transitionClose || a.transition) { case "slideIn": c({ left: d ? m(!(!a.follow[0] && n || g)) : f.scrollLeft() - (u || b.outerWidth(!0)) - 200 }); break; case "slideBack": c({ left: d ? m(!(!a.follow[0] && n || g)) : f.scrollLeft() + w + 200 }); break; case "slideDown": c({ top: d ? p(!(!a.follow[1] && q || g)) : f.scrollTop() - (t || b.outerHeight(!0)) - 200 }); break; case "slideUp": c({ top: d ? p(!(!a.follow[1] && q || g)) : f.scrollTop() + y + 200 }); break; default: b.stop().fadeTo(a.speed, d ? 1 : 0, function () { K(d) }) } } function K(d) { d ? (M(), l(E), a.autoClose && (H = setTimeout(r, a.autoClose))) : (b.hide(), l(a.onClose), a.loadUrl && (a.contentContainer.empty(), b.css({ height: "auto", width: "auto" }))) } function m(a) { return a ? x + f.scrollLeft() : x } function p(a) { return a ? z + f.scrollTop() : z } function l(a, e) { c.isFunction(a) && a.call(b, e) } function C() { z = q ? a.position[1] : Math.max(0, (y - b.outerHeight(!0)) / 2 - a.amsl); x = n ? a.position[0] : (w - b.outerWidth(!0)) / 2; h = D() } function D() { return { x: w > b.outerWidth(!0), y: y > b.outerHeight(!0) } } c.isFunction(A) && (E = A, A = null); var a = c.extend({}, c.fn.bPopup.defaults, A); a.scrollBar || c("html").css("overflow", "hidden"); var b = this, f = c(document), k = c(window), y = k.height(), w = k.width(), N = /OS 6(_\d)+/i.test(navigator.userAgent), v = 0, e, h, q, n, g, z, x, t, u, J, H; b.close = function () { r() }; b.reposition = function (a) { I(a) }; return b.each(function () { c(this).data("bPopup") || (l(a.onOpen), v = (k.data("bPopup") || 0) + 1, e = "__b-popup" + v + "__", q = "auto" !== a.position[1], n = "auto" !== a.position[0], g = "fixed" === a.positionStyle, t = b.outerHeight(!0), u = b.outerWidth(!0), a.loadUrl ? L() : B()) }) }; c.fn.bPopup.defaults = { amsl: 50, appending: !0, appendTo: "body", autoClose: !1, closeClass: "b-close", content: "ajax", contentContainer: !1, easing: "swing", escClose: !0, follow: [!0, !0], followEasing: "swing", followSpeed: 500, iframeAttr: 'scrolling="no" frameborder="0"', loadCallback: !1, loadData: !1, loadUrl: !1, modal: !0, modalClose: !0, modalColor: "#000", onClose: !1, onOpen: !1, opacity: .7, position: ["auto", "auto"], positionStyle: "absolute", scrollBar: !0, speed: 250, transition: "fadeIn", transitionClose: !1, zIndex: 9997 } })(jQuery);

/*
######## ##    ## ########
##       ###   ## ##     ##
##       ####  ## ##     ##
######   ## ## ## ##     ##
##       ##  #### ##     ##
##       ##   ### ##     ##
######## ##    ## ########
*/