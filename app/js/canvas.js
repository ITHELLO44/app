var oc = document.querySelector('canvas');
if(oc.getContext){

  oc.width = document.documentElement.clientWidth;
  oc.height = document.documentElement.clientHeight;
  var ctx = oc.getContext('2d');
  var image = new Image();
  image.src = 'img/a.png';
  image.onload = function(){
    draw();
  };

  function draw(){
    //oc.width和oc.height设置了图片的大小
    ctx.drawImage(image,0,0,oc.width,oc.height);
    oc.addEventListener('touchstart',function(ev){
      ev = ev || event;
      var touchC = ev.changedTouches[0];
      var x = touchC.clientX;
      var y = touchC.clientY;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 40;
      ctx.globalCompositeOperation ='destination-out';
      ctx.lineTo(x,y);
      ctx.stroke()
    });
    oc.addEventListener('touchmove',function(ev){
      ev = ev || event;
      var touchC = ev.changedTouches[0];
      var x = touchC.clientX;
      var y = touchC.clientY;

      ctx.lineTo(x,y);
      ctx.stroke();
    });

    oc.addEventListener('touchend',function(ev){
      ev = ev || event;
      var imgData = ctx.getImageData(0, 0, oc.width, oc.height);
      var allPx = imgData.width * imgData.height;
      var flag = 0;
      for (var i=0; i<allPx; i++){
        if(imgData.data[i*4+3] === 0){
          flag++;
        };
      };

      if(flag <= allPx/2){  //已修改

        oc.style.opacity = 0;

      };
    });


    oc.addEventListener('transitionend',function(){
      this.remove();
      //开机涂册消失后，才能触发滑动事件
      beginPage();
    })
  }
}
