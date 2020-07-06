$('.slider').each(function() {
  var 
    $group = $(this).find('.slideGroup'),
    $slides = $(this).find('.slide'),
    bulletArray = [],
    currentIndex = 0,
    timeout,
    animateLeft,
    slideLeft;
  
  function move(newIndex) {
    advance();
    
    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');
    
    if (newIndex > currentIndex) {
      slideToRight();
    } else {
      slideToLeft();
    }
    
    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft
    });
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      });
      $slides.eq(newIndex).css({
        left: 0
      });
      $group.css({
        left: 0
      });
      currentIndex = newIndex;
    });
  }
  
  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 4000);
  }

  function slideToRight() {
    slideLeft = '100%';
    animateLeft = '-100%';  
  }

  function slideToLeft() {
    slideLeft = '-100%';
    animateLeft = '100%'; 
  }
  
  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');
    
    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function() {
      move(index);
    }).appendTo('.slide_buttons');
    bulletArray.push($button);
  });
  
  advance();
});