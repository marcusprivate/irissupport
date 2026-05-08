(function ($) {
   // Functions
   var lastScrollTop = 0;
   var mobileStickyScrollTolerance = 12;
   var windowloaded = false;
   var getScrollTop = function () {
      return Math.max($(window).scrollTop(), 0);
   };
   var initLastScrollTop = function () {
      var st = getScrollTop();
      lastScrollTop = st;
   };
   var isStickyHeaderVisible = function (stickyHeader) {
      return stickyHeader.hasClass('d-flex') && !stickyHeader.hasClass('d-none');
   };
   var setStickyHeaderVisible = function (stickyHeader, shouldShow) {
      if (shouldShow === isStickyHeaderVisible(stickyHeader)) {
         return;
      }

      if (shouldShow) {
         stickyHeader.removeClass('d-none');
         stickyHeader.addClass('d-flex');
      } else {
         stickyHeader.removeClass('d-flex');
         stickyHeader.addClass('d-none');
      }
   };
   var initMobileMenu = function () {
      if (!$('.astroid-mobile-menu').length) {
         return;
      }
      $('.astroid-mobile-menu').astroidMobileMenu();
      $('.astroid-mobile-menu').removeClass('d-none');
   };
   var initOffcanvasMenu = function () {
      if (!$('#astroid-offcanvas').length) {
         return;
      }
      $('#astroid-offcanvas').find('ul.menu').astroidMobileMenu();
   };
   var initSidebarMenu = function () {
      if (!$('.astroid-sidebar-menu').length) {
         return;
      }
      $('.astroid-sidebar-menu .nav-item-caret').click(function () {
         $(this).parent('li').siblings('li').children('ul').slideUp();
         $(this).parent('li').siblings('li').children('.nav-item-caret').removeClass('open');
         $(this).toggleClass('open');
         $(this).siblings('ul').slideToggle();
      });
      $('.astroid-sidebar-collapsable').click(function () {
         $('#astroid-header').toggleClass('expanded');
      });
   };
   var initDisplay = function () {
      setTimeout(function () {
         $('.d-init').removeClass('d-none');
      }, 100);
   };
   var initBackToTop = function () {
      $(window).scroll(function () {
         if ($(this).scrollTop() >= 200) { // If page is scrolled more than 200px
            $('#astroid-backtotop').fadeIn(200); // Fade in the arrow
         } else {
            $('#astroid-backtotop').fadeOut(200); // Else fade out the arrow
         }
      });
      $('#astroid-backtotop').click(function () { // When arrow is clicked
         $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
         }, 500);
      });
   };

   var initHeader = function (scrollState) {
      var stickyHeader = $('#astroid-sticky-header');

      var _header = $('header');
      if (!_header.length) {
         return false;
      }

      var _headerTop = _header.offset().top;
      var _headerHeight = _header.height();
      var _headerBottom = _headerTop + _headerHeight;

      if (!stickyHeader.length) {
         return;
      }

      var _winScroll = scrollState && typeof scrollState.current === 'number' ? scrollState.current : getScrollTop();
      var _scrollDelta = scrollState && typeof scrollState.delta === 'number' ? scrollState.delta : (_winScroll - lastScrollTop);
      var _scrollingDown = _scrollDelta > 0;
      var _stickyVisible = isStickyHeaderVisible(stickyHeader);
      var _shouldShow = false;

      var _breakpoint = deviceBreakpoint(true);

      if (_breakpoint == 'xl' || _breakpoint == 'lg') {
         if (stickyHeader.hasClass('header-sticky-desktop') && (_winScroll > _headerBottom)) {
            _shouldShow = true;
         } else if (stickyHeader.hasClass('header-stickyonscroll-desktop') && (_winScroll > _headerBottom) && !_scrollingDown) {
            _shouldShow = true;
         }
      } else if (_breakpoint == 'sm' || _breakpoint == 'md') {
         if (stickyHeader.hasClass('header-static-tablet')) {
            return;
         }
         if (stickyHeader.hasClass('header-sticky-tablet') && (_winScroll > _headerBottom)) {
            _shouldShow = true;
         } else if (stickyHeader.hasClass('header-stickyonscroll-tablet') && (_winScroll > _headerBottom) && !_scrollingDown) {
            _shouldShow = true;
         }
      } else {
         if (stickyHeader.hasClass('header-static-mobile')) {
            return;
         }
         if (stickyHeader.hasClass('header-sticky-mobile') && (_winScroll > _headerBottom)) {
            _shouldShow = true;
         } else if (stickyHeader.hasClass('header-stickyonscroll-mobile') && (_winScroll > _headerBottom)) {
            // Small touch reversals should not immediately flip the sticky header.
            if (_scrollDelta <= -mobileStickyScrollTolerance) {
               _shouldShow = true;
            } else if (_scrollDelta >= mobileStickyScrollTolerance) {
               _shouldShow = false;
            } else {
               _shouldShow = _stickyVisible;
            }
         }
      }

      setStickyHeaderVisible(stickyHeader, _shouldShow);
   };

   var initEmptyHeaderContent = function () {
      $('.header-left-section:empty').each(function () {
         if (!$.trim($(this).html())) {
            $(this).prop('hidden', true);
         }
      });

      $('.header-center-section:empty').each(function () {
         if (!$.trim($(this).html())) {
            $(this).prop('hidden', true);
         }
      });

      $('.header-right-section:empty').each(function () {
         if (!$.trim($(this).html())) {
            $(this).prop('hidden', true);
         }
      });
   };

   var initTooltip = function () {
      if ($('[data-toggle="tooltip"]').length) {
         $('[data-toggle="tooltip"]').tooltip();
      }
   };

   var initSocialProfileLinks = function () {
      var facebookProfileHref = 'https://www.facebook.com/irisabella.bakker';
      var retiredFacebookProfileHref = 'https://www.facebook.com/irisbusinesssupport';
      var instagramProfileHref = 'https://www.instagram.com/irisabella1/';
      var linkedinProfileHref = 'https://www.linkedin.com/in/irisabella-bakker-21731ba7/';
      var retiredLinkedInProfileHref = 'https://nl.linkedin.com/pub/irisabella-bakker/a7/31b/217';

      $('a[href="' + retiredFacebookProfileHref + '"]').attr('href', facebookProfileHref);
      $('a[href="' + retiredLinkedInProfileHref + '"]').attr('href', linkedinProfileHref);

      $('a[href="' + instagramProfileHref + '"]').find('.nfa-linkedin, .nfa-linkedin-square')
         .removeClass('nfa-linkedin nfa-linkedin-square')
         .addClass('nfa-instagram');

      $('a[href="' + linkedinProfileHref + '"]').find('.nfa-instagram, .nfa-linkedin-square')
         .removeClass('nfa-instagram nfa-linkedin-square')
         .addClass('nfa-linkedin');

      $('#footer a[href="' + facebookProfileHref + '"] img').each(function () {
         var image = $(this);
         var source = image.attr('src') || '';

         if (source.indexOf('icon-soclial1.png') === -1) {
            if (source.indexOf('instagram.svg') !== -1) {
               image.attr('src', source.replace('instagram.svg', 'icon-soclial1.png'));
            } else if (source.indexOf('icon-soclial2.png') !== -1) {
               image.attr('src', source.replace('icon-soclial2.png', 'icon-soclial1.png'));
            }
         }

         image.attr('alt', 'facebook');
         image.closest('.social-box-color').removeClass('color3').addClass('color2');
      });

      $('#footer a[href="' + instagramProfileHref + '"] img').each(function () {
         var image = $(this);
         var source = image.attr('src') || '';

         if (source.indexOf('icon-soclial2.png') !== -1) {
            image.attr('src', source.replace('icon-soclial2.png', 'instagram.svg'));
         }

         image.attr('alt', 'instagram');
         image.closest('.social-box-color').removeClass('color2').addClass('color3');
      });

      $('#footer a[href="' + linkedinProfileHref + '"] img').each(function () {
         var image = $(this);
         var source = image.attr('src') || '';

         if (source.indexOf('icon-soclial2.png') === -1) {
            if (source.indexOf('instagram.svg') !== -1) {
               image.attr('src', source.replace('instagram.svg', 'icon-soclial2.png'));
            } else if (source.indexOf('icon-soclial1.png') !== -1) {
               image.attr('src', source.replace('icon-soclial1.png', 'icon-soclial2.png'));
            }
         }

         image.attr('alt', 'linkedin');
      });

      $('a[href="' + instagramProfileHref + '"]').has('.nfa-instagram').each(function () {
         var instagramAnchor = $(this);
         var instagramLayer = instagramAnchor.closest('.n2-ss-layer[data-sstype="layer"]');
         var socialColumn = instagramLayer.parent();

         if (!instagramLayer.length || !socialColumn.length) {
            return;
         }

         if (socialColumn.find('a[href="' + facebookProfileHref + '"] .nfa-facebook').length) {
            return;
         }

         var facebookLayer = instagramLayer.clone();
         facebookLayer.find('a').attr('href', facebookProfileHref);
         facebookLayer.find('.nfa-instagram').removeClass('nfa-instagram').addClass('nfa-facebook');
         instagramLayer.before(facebookLayer);

         if (socialColumn.find('a[href="' + linkedinProfileHref + '"] .nfa-linkedin').length) {
            return;
         }

         var linkedinLayer = instagramLayer.clone();
         linkedinLayer.find('a').attr('href', linkedinProfileHref);
         linkedinLayer.find('.nfa-instagram').removeClass('nfa-instagram').addClass('nfa-linkedin');
         instagramLayer.after(linkedinLayer);
      });

      $('#footer a[href="' + instagramProfileHref + '"] img[alt="instagram"]').each(function () {
         var instagramBlock = $(this).closest('.social-box-color');
         var blockGroup = instagramBlock.parent();

         if (!instagramBlock.length || !blockGroup.length) {
            return;
         }

         if (blockGroup.find('a[href="' + facebookProfileHref + '"] img[alt="facebook"]').length) {
            return;
         }

         var facebookBlock = instagramBlock.clone();
         var facebookAnchor = facebookBlock.find('a');
         var facebookImage = facebookAnchor.find('img');

         facebookAnchor.attr('href', facebookProfileHref);
         facebookImage.attr('src', (facebookImage.attr('src') || '').replace('instagram.svg', 'icon-soclial1.png'));
         facebookImage.attr('alt', 'facebook');
         facebookBlock.removeClass('color3').addClass('color2');
         instagramBlock.before(facebookBlock);

         if (blockGroup.find('a[href="' + linkedinProfileHref + '"] img[alt="linkedin"]').length) {
            return;
         }

         var linkedinBlock = instagramBlock.clone();
         var linkedinAnchor = linkedinBlock.find('a');
         var linkedinImage = linkedinAnchor.find('img');

         linkedinAnchor.attr('href', linkedinProfileHref);
         linkedinImage.attr('src', (linkedinImage.attr('src') || '').replace('instagram.svg', 'icon-soclial2.png'));
         linkedinImage.attr('alt', 'linkedin');
         instagramBlock.after(linkedinBlock);
      });
   };

   var initAnimations = function () {
      var bindAnimation = function () {
         $('[data-animation]').each(function () {
            var _animation = $(this).data('animation');
            var _delay = $(this).data('animation-delay');
            var _duration = $(this).data('animation-duration');
            if (_animation != '' && elementInViewport($(this)) && !$(this).hasClass('animation-done')) {
               if (_delay != '' && _delay != 0 && _delay != '0' && _delay != undefined) {
                  _delay = parseInt(_delay);
               } else {
                  _delay = 0;
               }

               if (_duration != '' && _duration != 0 && _duration != '0' && _duration != undefined) {
                  _duration = parseInt(_duration) + 10;
               } else {
                  _duration = 1010;
               }

               var _this = this;
               $(_this).css('animation-duration', _duration + 'ms');
               setTimeout(function () {
                  $(_this).css('visibility', 'visible');
                  $(_this).addClass('animate');
                  $(_this).addClass(_animation);
                  $(_this).addClass('animation-done');
                  setTimeout(function () {
                     $(_this).removeClass('animate');
                     $(_this).addClass('animated');
                     $(_this).removeClass(_animation);
                  }, (_duration + _delay));
               }, _delay);
            }
         });
      };

      $(window).on("scroll", function () {
         bindAnimation();
      });
      bindAnimation();
   };

   var initProgressBar = function () {
      $('.progress-bar-viewport-animation').each(function () {
         var _this = $(this);
         if (!_this.hasClass('viewport-animation-done') && elementInViewport(_this)) {
            var _width = _this.data('value');
            _width = parseInt(_width);
            _this.css('width', _width + '%');
         }
      });
   }

   var elementInViewport = function (element) {
      var _this = element;
      var _this_top = _this.offset().top;
      return (_this_top <= window.pageYOffset + parseInt(window.innerHeight)) && (_this_top >= window.pageYOffset);
   };

   var deviceBreakpoint = function (_return) {
      if ($('.astroid-breakpoints').length == 0) {
         var _breakpoints = '<div class="astroid-breakpoints d-none"><div class="d-block d-sm-none device-xs"></div><div class="d-none d-sm-block d-md-none device-sm"></div><div class="d-none d-md-block d-lg-none device-md"></div><div class="d-none d-lg-block d-xl-none device-lg"></div><div class="d-none d-xl-block device-xl"></div></div>';
         $('body').append(_breakpoints);
      }
      var _sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
      var _device = 'undefined';
      _sizes.forEach(function (_size) {
         var _visiblity = $('.astroid-breakpoints .device-' + _size).css('display');
         if (_visiblity == 'block') {
            _device = _size;
            return false;
         }
      });
      if (_return) {
         return _device;
      } else {
         $('body').removeClass('astroid-device-xs').removeClass('astroid-device-sm').removeClass('astroid-device-md').removeClass('astroid-device-lg').removeClass('astroid-device-xl');
         $('body').addClass('astroid-device-' + _device);
      }
   };

   var initPreloader = function () {
      $("#astroid-preloader").removeClass('d-flex').addClass('d-none');
   };

   // Events
   var docReady = function () {
      initDisplay();
      initMobileMenu();
      initOffcanvasMenu();
      initSidebarMenu();
      //initMegamenu();
      //initSubmenu();
      initBackToTop();
      initHeader();
      initLastScrollTop();
      initEmptyHeaderContent();
      initTooltip();
      initSocialProfileLinks();
      deviceBreakpoint(false);
   };

   var winLoad = function () {
      initAnimations();
      initSocialProfileLinks();
      deviceBreakpoint(false);
      initPreloader();
      initProgressBar();
      windowloaded = true;
   };

   var winResize = function () {
      deviceBreakpoint(false);
      initHeader();
   };

   var winScroll = function () {
      var currentScrollTop = getScrollTop();
      initHeader({
         current: currentScrollTop,
         delta: currentScrollTop - lastScrollTop
      });
      lastScrollTop = currentScrollTop;
      if (windowloaded) {
         initProgressBar();
      }
      deviceBreakpoint(false);
   };

   $(docReady);
   $(window).on('load', winLoad);
   $(window).on('resize', winResize);
   $(window).on('scroll', winScroll);
   window.addEventListener("orientationchange", winResize);
})($ast);

/* 
 * Add missing Mootools when Bootstrap is loaded
 * This fix creates dummy implementations for the missing Mootools functions.
 * It requires that you have jQuery loaded and if you are dealing with Mootools + jQuery is a good idea to add the call just before this javascript code.
 * This issue shouldn't affect Bootstrap 3 templates but the fix explained here should be compatible with both.
 */
(function ($) {
   $(document).ready(function () {
      var bootstrapLoaded = (typeof $().tooltip == 'function');
      var mootoolsLoaded = (typeof MooTools != 'undefined');
      if (bootstrapLoaded && mootoolsLoaded) {
         Element.implement({
            hide: function () {
               return this;
            },
            show: function (v) {
               return this;
            },
            slide: function (v) {
               return this;
            }
         });
      }
   });
})($ast);