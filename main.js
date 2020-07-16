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

    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }
    
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
  
  $('.previousBtn').on('click', function() {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move($slides.length - 1);
    }
  });

  $.each($slides, function(index) {
    var $btn = $('<a class="slideBtn">&bull;</a>');
    
    if (index === currentIndex) {
      $btn.addClass('active');
    }
    $btn.on('click', function() {
      move(index);
    }).appendTo('.containerBtn');
    bulletArray.push($btn);
  });
  
  advance();
});