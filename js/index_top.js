/**
 * Created by dell on 2017/3/12.
 */
//window.onload=function  () {
    //顶部导航最右边鼠标移入有偏移问题解决
    $('.line-width').last().mouseenter(function  () {
      $(this).css('padding-right','24px')
    }).mouseleave(function  () {
      $(this).css('padding-right','25px')
    })

    //顶部导航鼠标移入 隐藏盒子显示 和 小三角倒转 左右两边小竖线隐藏。
    $('.line-width').mouseover(function  () {
        $(this).addClass('selected');
        $(this).children().eq(1).show()
        $(this).find('.zz-iconfont').css('transform','rotate(180deg)')
        $(this).next('.line').hide()
        $(this).prev('.line').hide()
    //顶部导航鼠标移出 隐藏盒子恢复隐藏 和 小三角恢复 左右两边小竖线显示。
    }).mouseout(function  () {
        $('.zz-iconfont').css('transform','rotate(0deg)')
        $(this).removeClass('selected')
        $(this).children().eq(1).hide()
        $(this).next('.line').show()
        $(this).prev('.line').show()
    })

    //主导航更多盒子，显示和隐藏
    $('.very-more').mouseenter(function  () {
        $('.very-more-box').show()
    }).mouseleave(function  () {
        $('.very-more-box').hide()
    })
    //更多盒子显示后，鼠标移入里面小盒子，阴影盒子和文字向上缓步移动
    $('.very-more-box').find('a').mouseenter(function  () {
        $(this).find('.shadow').stop().animate({
            top:'10px'
        },300)
        $(this).find('p').stop().animate({
            bottom:'30px'
        },300)
   //更多盒子显示后，鼠标移出里面小盒子，阴影盒子和文字向上恢复
    }).mouseleave(function  () {
        $(this).find('.shadow').stop().animate({
            top:'45px'
        },300)
        $(this).find('p').stop().animate({
            bottom:'10px'
        },300)
    })


    //中间轮播图部分，第一张层级最高，其它被覆盖
    $('.lbt').find('img').css({
        width:976,
        height:340,
        zIndex:1,
        opacity:0
    }).eq(0).css({
        zIndex:2,
        opacity:1
    })

    //轮播图下面红竖线，跟随鼠标移入位置跳转，轮播图跳转
    $('.square').find('li').mouseenter(function  () {
        var index=$(this).index();
        $('.bottom-line').stop().animate({
            left:index*$('.square').find('li').width()
        },500)
        key=sq=index;
        $('.lbt').find('img').css({
            zIndex:1,
            opacity:.3
        })
        $('.lbt').find('img').eq(sq).css("z-index",2).stop().animate({
            opacity:1
        },1000);

    })

    //轮播图盒子，右键跳转
    var key =0;
    var sq=0
    var off=true;
    $('.right').click(function  () {
        if(off){
            autoPlay();
            off=false;
        }
    })

     //轮播图盒子，右键跳转
    $('.left').click(function  () {
       if(off){
           off=false;
           key--;
           sq--
           if(key<0)key=4;
           if(sq<0)sq=4;
           $('.lbt').find('img').css({
               zIndex:1,
               opacity:.3
           })
           $('.lbt').find('img').eq(key).css("z-index",2).stop().animate({
               opacity:1
           },1000);
           $('.bottom-line').stop().animate({
               left:sq*$('.square').find('li').width()
           },500,function  () {
             off=true;
           })
       }
    })

    //设置定时器，轮播图自动跳转
    var timerzz=setInterval(autoPlay,2000)

    //鼠标移入，左右两边箭头滑出。清除定时器
    $('.main-banner').mouseenter(function  () {

      $('.left').stop().animate({
          left:'0px'
      },500)
        $('.right').stop().animate({
            right:'0px'
        },500)
        clearInterval(timerzz);
    })
        //鼠标移出，左右两边箭头隐藏，重开定时器
        .mouseleave(function  () {
        $('.left').stop().animate({
            'left':'-42px'
        },500)
        $('.right').stop().animate({
            right:'-42px'
        },500)
        timerzz=setInterval(autoPlay,2000)
    })

    //轮播图往右跳转的函数封装
    function autoPlay() {
            key++;
            sq++;
            if(key>4)key=0;
            if(sq>4)sq=0;

            $('.lbt').find('img').css({
                //width:976,
                //height:340,
                zIndex:1,
                opacity:.3
            })
            $('.lbt').find('img').eq(key).css("z-index",2).stop().animate({
                opacity:1
            },1000);
            $('.bottom-line').stop().animate({
                left:sq*$('.square').find('li').width()
            },500,function  () {
              off=true;
            })
    }


//}

