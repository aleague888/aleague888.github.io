/**
 * Global variables
 *
 * @author Jonathan Path
 */

// Remove NavBar from iOS
if( !window.location.hash && window.addEventListener ){
    window.addEventListener( "load",function() {
        setTimeout(function(){
            window.scrollTo(0, 0);
        }, 0);
    });
    window.addEventListener( "orientationchange",function() {
        setTimeout(function(){
            window.scrollTo(0, 0);
        }, 0);
    });
}

$(document).ready(function(){

});

// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}
$(document).ready(function(){

    /**
     * Postcard Flip
     */
    (function ( $ ) {
        $( '.js-postcard-flip' ).click(function() {
            $('#Postcard').toggleClass('is-postcard-flipped');
            $('#navbar').delay(1000).toggleClass('navbar--dark');

            $('html, body').animate({
                scrollTop: $("#Postcard").offset().top - 5
            }, 500);
        });
    }( jQuery ));

    /**
     * Navbar Menu
     */
    (function ( $ ) {
        $( '#menuToggle' ).click(function() {
            $('#navbar').toggleClass('is-menu-toggled');
        });
    }( jQuery ));

    /**
     * Postcard Input
     */
    (function ( $ ) {
        $( '.postcard__input' ).keypress(function() {
            var label = $("label[for='" + $(this).attr('id') + "']");
            if( $(this).val() ) {
                label.addClass('is-visible');
            } else {
                label.removeClass('is-visible');
            }
        });
    }( jQuery ));

    /**
     * Tabs
     */
    (function( $ ) {
        $( '.tab__title' ).click(function() {
            $(this).siblings().removeClass('is-tab-active');
            $(this).addClass('is-tab-active');
        });
    }( jQuery ));

});