$(document).ready(function(){
    $('.content').each(function(){
        var $bgobj = $(this); // assigning the object
        $window = $(window);
        $window.scroll(function() {
            var yPos = -($window.scrollTop() /5);
            var coords = '50% '+ yPos + 'px';
            $bgobj.css({ backgroundPosition: coords });
        });
    });
});
