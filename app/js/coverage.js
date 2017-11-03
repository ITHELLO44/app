
document.addEventListener('touchstart',function(ev){
  ev = ev||event;
  ev.preventDefault();
});
  //rem适配
(function(){
  var styleNode = document.createElement('style');
  var width = document.documentElement.clientWidth;
  styleNode.innerHTML = 'html{font-size:'+width/16+'px!important}';
  document.body.appendChild(styleNode);
})();

function beginPage() {
  var Lists = $('#wrap .page');
  //页面滑动位置标识
  var flag = 0;
  //上一次页面滑动位置标识
  var oldflag = 0;
  //鼠标开始的位置
  var startY = 0;
  //鼠标结束的位置
  var endY = 0;
  //鼠标滑动的距离
  var distance = 0;
  var isMoved = true;
  var height = document.documentElement.clientHeight;

  Lists.eq(0).addClass("preCurrent");
  $(document).on('touchstart',function (event) {
    event = event || window.event;
    startY = event.originalEvent.changedTouches[0].clientY;
    distance = 0;
  });
  $(document).on('touchmove',function (event) {
    event = event || window.event;
    endY = event.originalEvent.changedTouches[0].clientY;
    distance = endY - startY;
    if(distance>0){
      Lists.eq(oldflag).css({
        transform: "translateY("+distance*0.00001+"px)"+" scale("+(1-(distance/height)*0.2)+")",
      });

      if(isMoved){
        flag--;
        Lists.eq(oldflag).addClass("toBottomOrigin");
        isMoved = false;
      };

      (flag < 0)&&(flag = 4); //滑动的临界点flag = 4

      Lists.eq(flag).removeClass("hide");
      Lists.eq(flag).css({
        transform: "translateY("+(-height+distance)+"px)",
      });

      Lists.eq(flag).addClass("current");
    }else if(distance < 0){
      Lists.eq(oldflag).css({
        transform: "translateY("+distance*0.00001+"px)"+" scale("+(1+(distance/height)*0.2)+")",
      });

      if(isMoved){
        flag++;

        Lists.eq(oldflag).addClass("toTopOrigin");
        isMoved = false;
      };

      //滑动临界点判断 大于4 && = 0
      (flag >4)&&(flag=0);

      Lists.eq(flag).removeClass("hide");
      Lists.eq(flag).css({
        transform: "translateY("+(height+distance)+"px)",
      });

      Lists.eq(flag).addClass("current");
    }
  });
  $(document).on('touchend',function () {
    if(distance>0){

      Lists.eq(oldflag).addClass("moveToBottom");
      Lists.eq(flag).addClass("moveFromTop ");
      setTimeout(function () {
        Lists.eq(oldflag).css({
          transform: "translateY(0)"+" scale(1)",
        });
        Lists.eq(oldflag).removeClass("moveToBottom");

        Lists.eq(oldflag).removeClass("toBottomOrigin");
        Lists.eq(flag).css({
          transform: "translateY(0)",
        });

        Lists.eq(flag).removeClass("moveFromTop ");

        Lists.eq(flag).removeClass("current");
        Lists.eq(flag).addClass("preCurrent");
        Lists.eq(oldflag).removeClass("preCurrent");

        Lists.eq(oldflag).addClass("hide");

        oldflag = flag;

        isMoved = true;
      },600);

    }else if(distance<0){
      Lists.eq(oldflag).addClass("moveToTop");
      Lists.eq(flag).addClass("moveFromTop ");
      setTimeout(function () {
        Lists.eq(oldflag).css({
          transform: "translateY(0)"+" scale(1)",
      });
        Lists.eq(oldflag).removeClass("moveToTop");

        Lists.eq(oldflag).removeClass("toTopOrigin");
        Lists.eq(flag).css({
          transform: "translateY(0)",
        });

        Lists.eq(flag).removeClass("moveFromTop ");

        Lists.eq(flag).removeClass("current");
        Lists.eq(flag).addClass("preCurrent");
        Lists.eq(oldflag).removeClass("preCurrent");

        Lists.eq(oldflag).addClass("hide");

        oldflag = flag;

        isMoved = true;
      },600);
    }


  });

}



