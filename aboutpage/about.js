$(function(){
    $('#yashipage').fullpage({
        navigationTooltips: [
            '生活(博客)',
            '梦想(作品)',
            '感恩(开源)',
            '欢乐(游戏)',
            '二维(动漫)',
            '绮丽(换装)',
            '友情(友链)',
            '神楽(来源)',
            '个性(性格)',
            '神楽坂雅詩'
        ],
        navigation: true,
        navigationColor: "#FE99CC",
        scrollingSpeed: 700,
        slidesNavigation: false,
        controlArrowColor: "transparent",
        afterLoad: function(anchorLink,index) {
            //console.log("afterLoad=",index,", anchorLink=",anchorLink);
            var h1 = $("#section"+index+" h1");
            var h2 = $("#section"+index+" .sub");
            h1.fadeIn(500,function() {
                h2.fadeIn(500,null);
            });
        },
        onLeave: function(index,direction) {
            //console.log("onLeave=",index,", direction=",direction);
            var h1 = $("#section"+index+" h1");
            var h2 = $("#section"+index+" .sub");
            h1.css("display","none");
            h2.css("display","none");
        }
    });
});