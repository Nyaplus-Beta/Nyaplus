$(document).ready(function(){
    var rightbottommenubox = $("#rightbottommenubox");
    var rightbottommenubtns = $("#rightbottommenuboxf li");
    $("#rightbottommenuswitch").click(function(){
        if (rightbottommenubox.attr("value") == "0") {
            rightbottommenubox.attr("value","1");
            $(this).stop();
            var animation = "rightbottommenuopen 0.4s forwards";
            $(this).css({"animation":animation,"-webkit-animation":animation,"-moz-animation":animation,"-o-animation":animation,"-ms-animation":animation});
            $.each(rightbottommenubtns, function(i, item) {
                var speed = 200 * (rightbottommenubtns.length - i);
                $(this).stop();
                $(this).fadeIn(speed,null);
            });
        } else {
            rightbottommenubox.attr("value","0");
            $(this).stop();
            var animation = "rightbottommenuclose 0.3s forwards";
            $(this).css({"animation":animation,"-webkit-animation":animation,"-moz-animation":animation,"-o-animation":animation,"-ms-animation":animation});
            $.each(rightbottommenubtns, function(i, item) {
                var speed = 150 * i;
                $(this).stop();
                $(this).fadeOut(speed,null);
            });
        }
    });
});