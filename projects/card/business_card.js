$(document).ready( function() {
  var showing = 1;
  var prev;
  var next;
  var isShowing = false;
  var total = $('.a7').length;
  
  // Rotate: 12deg to -135deg.
  setNextPrev();
  $('#card-' + showing).show().css({zIndex: '2'});
  $('#card-' + prev).css({ zIndex: '1', transform: 'perspective(1000px) rotateX(-135deg)' }).show();
  
  $('#prev').click(function() {
    showing--;
    if (showing == 0)
      showing = total-1;
    setNextPrev();
    
    $('#card-' + prev).css({ zIndex: '1', transform: 'perspective(1000px) rotateX(-135deg)' }).show();
    $('#card-' + showing)
      .show()
      .css({ zIndex: 2 })
      .animate(
      { zIndex: 137 },
      { duration: 500,
        step: function(now, fx) { $(this).css({ transform: 'perspective(1000px) rotateX(' + (-135+now-2) + 'deg)' }); },
        complete: function() {
          $(this)
            .css({ zIndex: '0' });
          $('#card-' + next).css({zIndex: '0'}).hide();
        }
      });
  });
  
  $('#next').click(function() {
    setNextPrev();
    
    $('#card-' + next).css({zIndex: '1', transform: 'perspective(1000px) rotateX(12deg)'}).show();
    
    $('#card-' + showing)
      .css({ zIndex: 12 })
      .animate(
      { zIndex: 147 },
      { duration: 500,
        step: function(now, fx) { $(this).css({ transform: 'perspective(1000px) rotateX(-' + (now-12) + 'deg)' }); },
        complete: function() {
          $(this)
            .css({ zIndex: '1' });
          $('#card-' + next).css({zIndex: '2'});

          showing = next;
        }
      });
  });
  
  function setNextPrev() {
    prev = showing-1;
    next = showing+1;

    if (prev == 0)
      prev = total-1;
    if (next == total)
      next = 1;
  };
  
  $('#port-prev').click(function() {
    $('#portfolio-imgs').css({marginLeft: '0%'});
    
    $(this).hide(500);
    $('#port-next').show(500);
  });
  
  $('#port-next').click(function() {
    $('#portfolio-imgs').css({marginLeft: '-100%'});
    
    $(this).hide(500);
    $('#port-prev').show(500);
  });
  
  $('.a7').click(function(event) {
		event.stopPropagation();
  });
  
  var selected;
  $('.base').click(function() {
    selected = $('#card-' + showing);
    
    selected
      .addClass('zoom')
      .animate(
      { zIndex: '25' },
      { duration: 500,
        step: function(now, fx) {
          $(this).css({
            transform: 'scale(' + (now/10) + ',' + (now/10) + ')',
            top: (now*2) + '%'
          });
        },
        complete: function() {
          isShowing = true;
        }
      });
  });
  
  $('body').click(function() {
    if( isShowing ) {
      selected
        .animate(
          { zIndex: '2' },
          { duration: 500,
            step: function(now, fx) {
              $(this).css({
                transform: 'scale(' + ((now*2.5/24)+1) + ',' + ((now*2.5/24)+1) + ') perspective(1000px) rotateX(12deg)',
                top: (now/2.5) + '%'
              });
            },
            complete: function() {
              $(this)
                .css({
                transform: 'scale(1,1) perspective(1000px) rotateX(12deg)',
                top: 'auto'
              })
              .removeClass('zoom');
              isShowing = false;
            }
          });
    }
  });
});