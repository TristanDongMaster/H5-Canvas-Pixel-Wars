  window.onload = function() {
    var canvas = document.getElementById('canvas'); //获取canvas元素 
    var context = canvas.getContext('2d'); //获取画图环境，指明为2d 
    var rad = Math.PI * 2 / 100; //将360度分成100份，那么每一份就是rad度 

    function circle(pX, pY, c = 50) {

      context.save();
      context.strokeStyle = "#49f"; //设置描边样式 
      context.fillStyle = "white";
      context.lineWidth = 5; //设置线宽 
      context.beginPath(); //路径开始 
      context.arc(pX, pY, c, 0, 360); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
      context.stroke(); //绘制 
      //context.fill();
      context.closePath(); //路径结束 
      context.restore();
    }

    function deleteCircle(pX, pY, d) {
      var arrCopy = arr;
      var length = arrCopy.length;
      var result = arrCopy.filter(function(item, index) {
        if(right1 == true){
          if(item.x <= pX || item.x >= (pX + 50 ) || item.y <= (pY-40) || item.y >= (pY + 40 )){
            return item
          }
        }else if(right1 == false){
            if(item.x >= pX || item.x <= (pX - 50 ) || item.y <= (pY-40) || item.y >= (pY + 40 )){
              return item
            }
        }
      })
      return result
    }
    // 1.5 0.25 1.75
    function sector(pX, pY, degree, d) {
      context.save();
      context.strokeStyle = "#49f"; //设置描边样式 
      context.fillStyle = "green";
      context.lineWidth = 5; //设置线宽 
      context.beginPath(); //路径开始 
      context.moveTo(pX + 10, pY);
      var p = (2 - degree) / 2;
     if(d == 'left'){
       context.arc(pX, pY, 50, (p-1) * Math.PI, (1 - p) * Math.PI); 
     }else{
      context.arc(pX, pY, 50, (p ) * Math.PI, (2 - p) * Math.PI); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
     }
      context.lineTo(pX + 10, pY);
      context.closePath(); //路径结束
      context.stroke(); //绘制 
      context.fill();

      context.beginPath();
      context.moveTo(pX, pY - 25);
      context.strokeStyle = "#49f"; //设置描边样式 
      context.fillStyle = "black";
      context.lineWidth = 2;
      context.arc(pX, pY - 25, 5, 0, 2 * Math.PI);
      context.closePath(); //路径结束
      context.stroke(); //绘制 
      context.fill();

      context.restore();

    }


    function position(testX, testY, up, right) {
      var pX = testX;
      var pY = testY;
      if (right == true) {
        pX += 3.1
        if (pX >= 450) {
          right = false
        }

      } else {
        pX += -2.5
        if (pX <= 50) {
          right = true
        }

      }
      if (up == true) {
        pY += -5.1
        if (pY <= 50) {
          up = false
        }

      } else {
        pY += 2.7
        if (pY >= 450) {
          up = true
        }

      }
      return {
        pX: pX,
        pY: pY,
        up: up,
        right: right
      }
    }

    function openPosition(openS, degreeS) {
      if (openS) {
        degreeS -= 0.02
        if (degreeS <= 1.5) {
          openS = false
        }
      } else {
        degreeS += 0.02
        if (degreeS >= 2) {
          openS = true
        }
      }
      return {
        open: openS,
        degree: degreeS
      }
    }
    var pX = -450;
    var pY = 150;
    var up = true;
    var right = true;

    var pX1 = 50;
    var pY1 = 450;
    var up1 = false;
    var right1 = false;
    var degree1 = 2;
    var open = true;

    var arr = [];
    for(var i=0;i<10;i++){
      arr.push({x:i*50,y:i*50})
    }
    for(var i=0;i<10;i++){
      arr.push({x:i*50 + 50,y:i*50})
    }
     for(var i=0;i<10;i++){
      arr.push({x:i*50 + 100,y:i*50})
    }



    //动画循环 
    ;
    (function drawFrame() {
      window.requestAnimationFrame(drawFrame, canvas);
      context.clearRect(0, 0, canvas.width, canvas.height);
      var a = position(pX, pY, up, right)
      var a1 = position(pX1, pY1, up1, right1)

      var t1 = Math.abs(a.pX - a1.pX)
      var t2 = Math.abs(a.pY - a1.pY)

      if (t1 <= 100 && t2 <= 100) {
      /*  console.log(t1, t2)
        console.log(a.pX, a1.pX)
        console.log(a.pY, a1.pY)*/
       // a = position(pX, pY, !up, !right)
        //a1 = position(pX1, pY1, !up1, !right1)
      }

      pX = a.pX
      pY = a.pY
      up = a.up
      right = a.right

      pX1 = a1.pX
      pY1 = a1.pY
      up1 = a1.up
      right1 = a1.right;

      var length = arr.length;
      for (var i = 0; i < length; i++) {
        circle(arr[i].x, arr[i].y, 10);
      }
      //circle(pX, pY)
      //circle(pX1, pY1)
      sector(pX1, pY1, degree1, right1 ==true?'':'left')
      var openR = openPosition(open, degree1)
      open = openR.open;
      degree1 = openR.degree;

      arr = deleteCircle(pX1, pY1, right1 ==true?'':'left')

    }());

    function keyDown(event){
      if(event.keyCode==38){
        up1 = true
      }else if(event.keyCode==40){
        up1 = false
      }
      else if(event.keyCode==37){
        right1 = false
      }else if(event.keyCode==39){
        right1 = true
      }
      var a1 = position(pX1, pY1, up1, right1)
       pX1 = a1.pX
      pY1 = a1.pY
      up1 = a1.up
      right1 = a1.right;

    }

    document.onkeydown = keyDown; 
  }