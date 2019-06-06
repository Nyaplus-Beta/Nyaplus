var timer_subtitle = null;
var timer_subtitles = "Aaliyah's Blog";
var timer_subtitlei = 0;
$(document).ready(function(){
    loadnyarukoplayer();
    loadaboutme();
    args();
});
function showHide()
{
	var oDiv=document.getElementById('msg');
	
	if(oDiv.style.display=='block')
	{
		oDiv.style.display='none';
	}
	else
	{
		oDiv.style.display='block';
	}
}

(function(d, s) {
	   var j, e = d.getElementsByTagName(s)[0];

	   if (typeof LivereTower === 'function') { return; }

	   j = d.createElement(s);
	   j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
	   j.async = true;

	   e.parentNode.insertBefore(j, e);
   })(document, 'script');

function args() {
    var argsarr = window.location.href.split('#');
    var arg = argsarr[1];
    var unloadaboutmenow = false;
    if ($.cookie("noaboutme") == "1") {
    	unloadaboutmenow = true;
    }
    if(argsarr.length > 1) {
        // if (arg != "nonyarukoplayer" && arg != "nomedia") {
        // }
        if (arg == "index" || arg == "home") {
            unloadaboutmenow = true;
        }
    }
    if (unloadaboutmenow && arg != "aboutme" && arg != "me") {
    	unloadaboutme(false);
    }
}
function loadnyarukoplayer() {
    nyarukoplayer_init("homepage/nyarukoplayer/nyaruko.json",true);
    $("#showprivacy").click(function(){
        showprivacy();
    });
    // $("#disablemedia").click(function(){
    //     disablemedia();
    // });
    //nyarukoplayer callback:
    nyarukoplayerCallback_AnimateStart = function() {
        $("#titlebox").css("background","linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))");
    }
    nyarukoplayerCallback_AnimateEnd = function() {
        $("#titlebox").css("background","transparent");
    }
    nyarukoplayerCallback_AnimateReady = function(autoplay) {
        // if (autoplay == false) {
        //     nyarukoplayer_playnow();
        // }
    }
    timer_subtitle_start();
}
function openaboutme() {
    //$('#yashipage').css("display","inline");
    $('#yashipage').animate({
        "left":"0%"
    },1000,function () {
        $('#fp-nav').css("display","inline");
        $('#closeyashipage').css("display","inline");
        $('#yashipagetitle').css("display","inline");
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
        $.fn.fullpage.moveTo(1, 1);
    });
}
function loadaboutme() {
    $('#yashipage').fullpage({
        navigationTooltips: [
            '人生',
            '梦想',
            '欢乐',
            '追番',
            '绮丽',
            '邂逅',
            '拥有',
            '学习',
            '个性',
            '艾莉雅'
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
}
function unloadaboutme(animate = true) {
	if ($.cookie("noaboutme") != "1") {
		$.cookie('noaboutme', '1', { expires: 7 });
	}
    // $('#yashipage').unbind();
    // $('#fp-nav').remove();
    // $('#closeyashipage').remove();
    $('#fp-nav').css("display","none");
    $('#closeyashipage').css("display","none");
    $('#yashipagetitle').css("display","none");
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
    nyarukoplayer_playnow();
    if (animate) {
	    $('#yashipage').animate({
	        "left":"200%"
	    },1000,function () {
	        //$('#yashipage').css("display","none");
	    });
    } else {
    	$('#yashipage').css("left","200%");
    }
}
function showprivacy() {
    if ($(".yashiprivacy").length == 0) {
        $("body").append("<div class='yashiprivacy'></div>");
        $(".yashiprivacy").load('privacy.html .yashiprivacyw');
    }
}
function disablemedia() {
    if ($.cookie("disable") == "true") {
        nyarukoplayer_disable(false);
    } else {
        nyarukoplayer_disable(true);
    }
}
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        nyarukoplayer_titlelrc = true;
    } else  {
        nyarukoplayer_titlelrc = false;
        document.title = "艾莉雅的个人网站 - 艾莉雅的世界";
    }
}, false);
function timer_subtitle_start(){  
    $("#subtitle").text('');
    $("#titlebox").unbind("click");
    timer_subtitle = setInterval(function(){  
        $("#subtitle").append(timer_subtitles.charAt(timer_subtitlei));  
        if(timer_subtitlei ++ === timer_subtitles.length){  
            clearInterval(timer_subtitle);
            timer_subtitlei = 0;
            $("#titlebox").click(function(){
                timer_subtitle_start();
            });
            timer_subtitle = null;
        }
    },100);
}