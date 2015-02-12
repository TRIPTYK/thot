$(document).ready(function(){
    $('.content').each(function(){
        var $bgobj = $(this); // assigning the object
        $window = $(window);
        $window.scroll(function() {
            var yPos = -($window.scrollTop() /5);
            var coords = '50% '+ yPos + 'px';
            $bgobj.css({ backgroundPosition: coords });
            var pageSpeed = -($window.scrollTop()*2.3);
            $('.pages').css('transform', 'translateY(' + pageSpeed + 'px)');
        });
    });

    $('.modal').click(function() {
      event.preventDefault();
      $('.content').prepend("<div class='overlay'> </div>")
      $('.overlay-content').css("display", "block");
      $('.overlay-content').prepend("<a href='#' class='close-modal'>X</a>");
    });

    $('.overlay-content').on('click','.close-modal', function(event){
      event.preventDefault();
      $( '.overlay' ).remove();
      $('.overlay-content').css("display", "none");

    });

    $('.content').on('click','.overlay', function(event){
      event.preventDefault();
      $( '.overlay' ).remove();
      $('.overlay-content').css("display", "none");

    });


    $('.pages').click(function() {

      $(this).css("cursor","default");

      var speed=.5;
      TweenLite.to($(".p8"), speed, {top:1290});
      TweenLite.to($(".p7"), speed, {top:1060});
      TweenLite.to($(".p6"), speed, {top:852});
      TweenLite.to($(".p5"), speed, {top:640});
      TweenLite.to($(".p4"), speed, {top:440});
      TweenLite.to($(".p3"), speed, {top:230});
      $('.p3').css("z-index","510");
      $('.p4').css("z-index","520");
      $('.p5').css("z-index","530");
      $('.p6').css("z-index","540");
      $('.p7').css("z-index","550");


    });
});
