jQuery.noConflict()(function($) {
  $(window).on("load",function(){
      "use strict";
      /*=========================================================================
          Preloader
      =========================================================================*/
      $("#preloader").delay(350).fadeOut('slow');
  
      /*=========================================================================
          Custom Scrollbar
      =========================================================================*/
      $(".header-inner").mCustomScrollbar();
  
      /*=========================================================================
       Isotope
       =========================================================================*/
      $('.portfolio-filter').on( 'click', 'li', function() {
          var filterValue = $(this).attr('data-filter');
          $container.isotope({ filter: filterValue });
      });
  
      // change is-checked class on buttons
      $('.portfolio-filter').each( function( i, buttonGroup ) {
          var $buttonGroup = $( buttonGroup );
          $buttonGroup.on( 'click', 'li', function() {
              $buttonGroup.find('.current').removeClass('current');
              $( this ).addClass('current');
          });
      });
  
      var $container = $('.portfolio-wrapper');
      $container.imagesLoaded( function() {
        $('.portfolio-wrapper').isotope({
            // options
            itemSelector: '[class*="col-"]',
            percentPosition: true,
            masonry: {
                // use element for option
                columnWidth: '[class*="col-"]'
            }
        });
      });
  
      /*=========================================================================
       Infinite Scroll
       =========================================================================*/
      var curPage = 1;
      var pagesNum = $(".portfolio-pagination").find("li a:last").text();   // Number of pages
  
      $container.infinitescroll({
          itemSelector: '.grid-item',
          nextSelector: '.portfolio-pagination li a',
          navSelector: '.portfolio-pagination',
          extraScrollPx: 0,
          bufferPx: 0,
          maxPage: 6,
          loading: {
              finishedMsg: "No more works",
              msgText: '',
              speed: 'slow',
              selector: '.load-more',
          },
      },
      // trigger Masonry as a callback
      function( newElements ) {
  
        var $newElems = $( newElements );
        $newElems.imagesLoaded(function(){  
          $newElems.animate({ opacity: 1 });
          $container.isotope( 'appended', $newElems );
        });
  
        // Check last page
        curPage++;
        if(curPage == pagesNum) {
          $( '.load-more' ).remove();
        }
  
      });
  
      $container.infinitescroll( 'unbind' );
  
      $( '.load-more .btn' ).on('click', function() {
        $container.infinitescroll( 'retrieve' );
        // display loading icon
        $( '.load-more .btn i' ).css('display', 'inline-block');
        $( '.load-more .btn i' ).addClass('fa-spin');
  
        $(document).ajaxStop(function () {
          setTimeout(function(){
                 // hide loading icon
            $( '.load-more .btn i' ).hide();
          }, 1000);
        });
        return false;
      });
  
      /* ======= Mobile Filter ======= */
  
      // bind filter on select change
      $('.portfolio-filter-mobile').on( 'change', function() {
        // get filter value from option value
        var filterValue = this.value;
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $container.isotope({ filter: filterValue });
      });
  
      var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
          var number = $(this).find('.number').text();
          return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function() {
          var name = $(this).find('.name').text();
          return name.match( /ium$/ );
        }
      };
  });
  
  /*=========================================================================
              Home Slider
  =========================================================================*/
  $(document).ready(function() {
      "use strict";
  
      $('.testimonials-wrapper').slick({
        dots: true,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: true,
              arrows: false,
            }
          },
          {
            breakpoint: 425,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
            }
          }
        ]
      });
  
      $('.clients-wrapper').slick({
        dots: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: false,
              arrows: false,
            }
          },
          {
            breakpoint: 425,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
            }
          }
        ]
      });
  
  });
  
  $(function(){
      "use strict";
  
      $('.menu-icon').on( 'click', function() {
          $('header.left').toggleClass('open');
          $('.mobile-header, main.content').toggleClass('push');
      });
  
      $('main.content, header.left button.close').on( 'click', function() {
          $('header.left').removeClass('open');
          $('.mobile-header, main.content').removeClass('push');
      });
  
      /*=========================================================================
       Progress bar animation with Waypoint JS
       =========================================================================*/
      if ($('.skill-item').length > 0) { 
        var waypoint = new Waypoint({
          element: document.getElementsByClassName('skill-item'),
          handler: function(direction) {
            
            $('.progress-bar').each(function() {
              var bar_value = $(this).attr('aria-valuenow') + '%';                
              $(this).animate({ width: bar_value }, { easing: 'linear' });
            });
  
            this.destroy()
          },
          offset: '50%'
        });
      }
  
      /*=========================================================================
       One Page Scroll with jQuery
       =========================================================================*/
      $('.vertical-menu li a[href^="#"]:not([href="#"])').on('click', function(event) {
          var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
          }, 800, 'linear');
          event.preventDefault();
        });
        
        var sections = $('section')
        , nav = $('.onepage-menu')
       
      $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();
       
        sections.each(function() {
          
          var top = $(this).offset().top,
              bottom = top + $(this).outerHeight();
       
          if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('li').removeClass('active');
            nav.find('a').removeClass('active');
            sections.removeClass('active');
       
            $(this).addClass('active');
            nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
          }
        });
      });
      
      $( ".reply-title" ).prependTo( ".comment-respond" );
      
      /*=========================================================================
              Main Menu
      =========================================================================*/
      $( ".submenu" ).before( '<i class="fas fa-angle-down switch"></i>' );
  
      $(".vertical-menu li i.switch").on( 'click', function() {
          var $submenu = $(this).next(".submenu");
          $submenu.slideToggle(300);
          $submenu.parent().toggleClass("openmenu");
      });
    
      /*=========================================================================
       Add (nav-link) class to main menu.
       =========================================================================*/
      $('.vertical-menu li a').addClass('nav-link');
      
      /*=========================================================================
       Search form toggle
       =========================================================================*/
      $('.search-button').on( 'click', function() {
          $('.search-popup').addClass('open');
      });
  
      $('.search-popup .close').on( 'click', function() {
          $('.search-popup').removeClass('open');
      });
  
      /*=========================================================================
       Bootstrap Scrollspy
       =========================================================================*/
      $("body").scrollspy({ target: ".scrollspy"});
  
      /*=========================================================================
       Background Image with Data Attribute
       =========================================================================*/
      var bg_img = document.getElementsByClassName('background');
  
      for (var i = 0; i < bg_img.length; i++) {
        var src = bg_img[i].getAttribute('data-image-src');
        bg_img[i].style.backgroundImage="url('" + src + "')";
      }
  
      /*=========================================================================
       Spacer with Data Attribute
       =========================================================================*/
      var list = document.getElementsByClassName('spacer');
  
      for (var i = 0; i < list.length; i++) {
        var size = list[i].getAttribute('data-height');
        list[i].style.height = "" + size + "px";
      }
  
      /*=========================================================================
              Scroll to Top
      =========================================================================*/
      $(window).scroll(function() {
          if ($(this).scrollTop() >= 250) {        // If page is scrolled more than 50px
              $('#return-to-top').fadeIn(200);    // Fade in the arrow
          } else {
              $('#return-to-top').fadeOut(200);   // Else fade out the arrow
          }
      });
      $('#return-to-top').click(function() {      // When arrow is clicked
          $('body,html').animate({
              scrollTop : 0                       // Scroll to top of body
          }, 400);
      });
      
      /*=========================================================================
            Responsive Videos
    =========================================================================*/
    $(function() {
      // Find all YouTube and Vimeo videos
      var $allVideos = $("iframe[src*='www.youtube.com'], iframe[src*='player.vimeo.com']");

      // Figure out and save aspect ratio for each video
      $allVideos.each(function() {
        $(this)
          .data('aspectRatio', this.height / this.width)
          // and remove the hard coded width/height
          .removeAttr('height')
          .removeAttr('width');
      });

      // When the window is resized
      $(window).resize(function() {
        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {
          var $el = $(this);
          // Get parent width of this video
          var newWidth = $el.parent().width();
          $el
            .width(newWidth)
            .height(newWidth * $el.data('aspectRatio'));
        });

      // Kick off one resize to fix all videos on page load
      }).resize();
    });
  
  });
});