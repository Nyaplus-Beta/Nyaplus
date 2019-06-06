window.onload = function () {
  scrollPage();
  parallax();
};

function scrollPage() {
  var scrollPage = document.querySelector('#scrollPage');
  var imgItem = scrollPage.querySelectorAll('li');
  var btnItem = scrollPage.querySelectorAll('span');

  var btnPrev = null;
  var zIndexArr = [];
  var curBtn = 0;
  var b_stop = true;
  var num = 0;

  for (var i = imgItem.length; i >= 1; i --) {
    zIndexArr.push(i);
  }
  for (var j = 0; j < zIndexArr.length; j++) {
    imgItem[j].style.zIndex = zIndexArr[j];
  }

  for (var i = 0; i < btnItem.length; i++) {
    btnItem[i].index = i;

    btnItem[i].onclick = function () {
      if (b_stop) {
        b_stop = false;

        tab(this);
        moving(this.index);

        curBtn = this.index;
        num = this.index;
      }
    };
  }

  mouseWheel(scrollPage, function () {
    if (b_stop) {
      b_stop = false;
    
      if (num === 0) {
        num = imgItem.length - 1;

        for (var i = 0; i < imgItem.length - 1; i++) {
          startMove(imgItem[i], 0, -100, function () {
            b_stop = true;
          });
        }
      } else {
        num --;

        startMove(imgItem[num], -100, 0, function () {
          b_stop = true;
        });
      }

      curBtn = num;
      tab(btnItem[num]);
    }
  }, function () {
    if (b_stop) {
      b_stop = false;
    
      if (num === imgItem.length - 1) {
        num = 0;

        for (var i = 0; i < imgItem.length - 1; i++) {
          startMove(imgItem[i], -100, 0, function () {
            b_stop = true;
          });
        }
      } else {
        num ++;

        startMove(imgItem[num - 1], 0, -100, function () {
          b_stop = true;
        });
      }

      curBtn = num;
      tab(btnItem[num]);
    }
  });

  function moving(index) {
    if (index > curBtn) {
      var prevSibling = getSibiling(index, 'prev');

      for (var j = 0; j < prevSibling.length; j++) {
        if (j < index - curBtn) {
          startMove(prevSibling[j], 0, -100, function () {
            b_stop = true;
          });
        }
      }
    } else if (index < curBtn) {
      var nextSibling = getSibiling(index, 'next');

      for (var j = 0; j < nextSibling.length; j++) {
        if (j < curBtn - index) {
          startMove(nextSibling[j], -100, 0, function () {
            b_stop = true;
          });
        }
      }
    }
  };

  function getSibiling(index, dir) {
    var nodeArr = [];
    var node = imgItem[index];

    if (dir === 'prev') {
      while (node.previousElementSibling) {
        node = node.previousElementSibling;

        nodeArr.push(node);
      }
    } else {
      nodeArr.push(imgItem[index]);

      while (node.nextElementSibling) {
        node = node.nextElementSibling;

        nodeArr.push(node);
      }
    }

    return nodeArr;
  };

  function tab(obj) {
    if (!btnPrev) {
      for (var j = 0; j < btnItem.length; j ++) {
        btnItem[j].className = '';
      }
    } else {
      btnPrev.className = '';
    }

    obj.className = 'cur';
    btnPrev = obj;
  };

  function mouseWheel(obj, upFn, downFn) {
    obj.onmousewheel = fn;

    if (obj.addEventListener) {
      obj.addEventListener("DOMMouseScroll", fn, false);
    }

    function fn(ev) {
      var oEvent = ev || window.event;

      if (oEvent.wheelDelta) {
        oEvent.wheelDelta > 0 ? upFn() : downFn();
      } else {
        oEvent.detail < 0 ? upFn() : downFn();
      }

      if (oEvent.preventDefault) {
        oEvent.preventDefault();
      } else {
        oEvent.returnValue = false;
      }
    };
  };
};

function parallax() {
  var oUl = document.querySelector('#overMove');
  var aLi = oUl.querySelectorAll('div');

  var halfW = oUl.offsetWidth / 2;
  var halfH = oUl.offsetHeight / 2;

  oUl.onmousemove = function (ev) {
    var ev = ev || window.event;
    var disX = ev.clientX;
    var disY = ev.clientY;

    for (var i = 0; i < aLi.length; i++) {
      var scale = aLi[i].getAttribute('data-scale');
      var iX = ((halfW - disX) * scale) / 8;
      var iY = ((halfH - disY) * scale) / 8;

      /*var maxX = halfW - disX;
      var maxY = halfH - disY;
      var initalScaleX = maxX / halfW;
      var initalScaleY = maxY / halfH;
      var speedX = iX - initalScaleX;
      var speedY = iY - initalScaleY;

      initalScaleX += speedX;
      initalScaleY += speedY;*/

      aLi[i].style.left = iX + 'px';
      aLi[i].style.top = iY + 'px';
    }
  };
};