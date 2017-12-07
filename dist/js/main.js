/**
 * Global variables
 */
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
  initialDate = new Date(),

  $document = $(document),
  $window = $(window),
  $html = $("html"),

  isDesktop = $html.hasClass("desktop"),
  isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTouch = "ontouchstart" in window,

  plugins = {
    pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
    rdNavbar: $(".rd-navbar"),
    navbarToggle: $(".rd-navbar-toggle"),
    customWaypoints: $('[data-custom-scroll-to]')
  };

/**
 * Initialize All Scripts
 */
$document.ready(function () {




  /**
   * IE Polyfills
   * @description  Adds some loosing functionality to IE browsers
   */
  if (isIE) {
    if (isIE < 10) {
      $html.addClass("lt-ie-10");
    }

    if (isIE < 11) {
      if (plugins.pointerEvents) {
        $.getScript(plugins.pointerEvents)
          .done(function () {
            $html.addClass("ie-10");
            PointerEventsPolyfill.initialize({});
          });
      }
    }

    if (isIE === 11) {
      $("html").addClass("ie-11");
    }

    if (isIE === 12) {
      $("html").addClass("ie-edge");
    }
  }


  /**
   * UI To Top
   * @description Enables ToTop Button
   */
  if (isDesktop) {
    $().UItoTop({
      easingType: 'easeOutQuart',
      containerClass: 'ui-to-top fa fa-angle-up'
    });
  }

  /**
   * RD Navbar
   * @description Enables RD Navbar plugin
   */
  if (plugins.rdNavbar.length) {
    plugins.rdNavbar.RDNavbar({
      stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone")) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false
    });
    if (plugins.rdNavbar.attr("data-body-class")) {
      document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
    }
  }

  /**
   * tooltip bootstrap
   */

  $('[data-toggle="tooltip"]').tooltip();


  /**
   * main slider
   */
  $('.js-slider').slick({
    dots: false,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    autoplaySpeed: 5000,
    autoplay: false
  });

  /**
   * Custom Waypoints
   */
  if (plugins.customWaypoints.length) {
    var i;
    for (i = 0; i < plugins.customWaypoints.length; i++) {
      var $this = $(plugins.customWaypoints[i]);

      $this.on('click', function (e) {
        e.preventDefault();
        $("body, html").stop().animate({
          scrollTop: $("#" + $(this).attr('data-custom-scroll-to')).offset().top
        }, 1000, function () {
          $(window).trigger("resize");
        });
      });
    }
  }

  /**
   * owl - js-reviews main
   */
  $('.js-reviews').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items:1,
    //margin:30,
    //stagePadding:30,
    smartSpeed:450,
    //nav:true,
    //dots:false,
    loop:true,
    navElement: 'div class="owl-slider-arrow"',
    navText:[],
    responsive:{
      480:{
        nav:true,
        dots:false,
      }
    }

  });
  /**
   * owl - js-reviews main
   */
  $('.js-blog').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items:3,
    margin:70,
    stagePadding:40,
    smartSpeed:450,
    //nav:true,
    //dots:false,
    loop:true,
    navElement: 'div class="owl-slider-arrow-blog"',
    navText:[],
    responsive:{
      0:{
        items:1,
        nav:false,
        dots:true,
        margin:30,
        stagePadding:5,
      },
      700:{
        items:2,
        nav:false,
        dots:true,
      },
      992:{
        items:3,
        nav:true,
        dots:false,
      }
    }

  });

});

