/*    思路：
    全局变量： 
    currentPosition：当前页数；
    windowW:屏幕宽度；
    1.touchstart 开始时获取  触摸的X,Y坐标；
    2.touchmove 时获取 当前XY  moveXY  因为从0开始计算  所以加上startXY坐标；
    这时UL移动的距离就是  moveXY；把moveX 赋给 endX  就得到了结束时候endX
    3.结束时 判断endX是否 大于屏幕的3分支1  如果超过就移动到下一个页面  全局变量当前  当前页数：currentPosition  ++或者--
    4.判断是否
*/
    //左右滑动
    /* 两个参数，滑动的dom(ul),滑动完成后执行回调函数*/
    function touchSlide(dom,callback){
        var startX=0;               //起始X坐标
        var startY=0;               //起始y坐标
        var endX=0;                 //结束X坐标
        var historyW=windowW*currentPosition;   //左边的宽度
        var dir="left";                         //方向
        var mark=true;                         //如果方向是上下  打断左右滑动
        var len=dom.children.length-1;
        var startT=null;
        //start
        dom.addEventListener("touchstart",function(e){
            this.style.webkitTransition = "";
            var touch = e.touches[0];
            startX = touch.pageX;
            startY = touch.pageY;
            endX=startX;
            startT=new Date().getTime();
        },false)
         //move
        dom.addEventListener("touchmove",function(e){
            var touch = e.touches[0];
            var moveX = touch.pageX - startX;
            var moveY = touch.pageY - startY;
            //判断是上下  还是左右
            if(Math.abs(moveY)>=Math.abs(moveX)){
               mark = false;
            }
            //如果是上下  给左右加锁
            if(mark==false){
                return
            }
            endX=moveX;
            historyW=windowW*currentPosition;
            movex=moveX-historyW;
            dir=moveX>0?"left":"right";
            if(currentPosition<=0&&dir=="left"){
                move.call(this,0);
                return;
            }
            if(currentPosition>=len&&dir=="right"){
                move.call(this,-windowW*len);
                return;
            }
            move.call(this,movex);
         
            
        },false)
        //end
        dom.addEventListener("touchend",function(e){
            this.style.webkitTransition = "0.3s ease -webkit-transform";
            if(mark==true){
                if(startX==endX){  //判断  有没有移动 是否是点击事件 点击事件就不执行下面的函数
                    return;
                }
                var deltaT = new Date().getTime() - startT;
                console.log(deltaT)
                //滑动超过屏幕的3分之一就到下一页
                if(deltaT<300){//快速滑动
                    judge.call(this,0);
                    return;
                }

                judge.call(this,windowW/3);
            }else{
                //解锁左右
                mark=true;
            }
            
        },false)
         //判断  左右然后执行函数
        function  judge(distance){
            if(endX>distance){
                currentPosition--;
                if(currentPosition<=0){
                    currentPosition=0
                }
                historyW=windowW*currentPosition;
            }else if(endX<-distance){
                currentPosition++;
                if(currentPosition>=len){
                    currentPosition=len;
                }
                historyW=windowW*currentPosition;
            }
            //执行滑动效果
            move.call(this,-historyW,callback);
        }
         //滑动效果
        function move(left,callback){
            this.style.webkitTransform = "translate3d("+left+"px,0,0)";
            //如果有回调函数回调
            if(callback){
                callback();
            }
        }
    }  