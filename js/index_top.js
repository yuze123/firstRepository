/**
 * Created by dell on 2017/3/12.
 */
//window.onload=function  () {
    //�����������ұ����������ƫ��������
    $('.line-width').last().mouseenter(function  () {
      $(this).css('padding-right','24px')
    }).mouseleave(function  () {
      $(this).css('padding-right','25px')
    })

    //��������������� ���غ�����ʾ �� С���ǵ�ת ��������С�������ء�
    $('.line-width').mouseover(function  () {
        $(this).addClass('selected');
        $(this).children().eq(1).show()
        $(this).find('.zz-iconfont').css('transform','rotate(180deg)')
        $(this).next('.line').hide()
        $(this).prev('.line').hide()
    //������������Ƴ� ���غ��ӻָ����� �� С���ǻָ� ��������С������ʾ��
    }).mouseout(function  () {
        $('.zz-iconfont').css('transform','rotate(0deg)')
        $(this).removeClass('selected')
        $(this).children().eq(1).hide()
        $(this).next('.line').show()
        $(this).prev('.line').show()
    })

    //������������ӣ���ʾ������
    $('.very-more').mouseenter(function  () {
        $('.very-more-box').show()
    }).mouseleave(function  () {
        $('.very-more-box').hide()
    })
    //���������ʾ�������������С���ӣ���Ӱ���Ӻ��������ϻ����ƶ�
    $('.very-more-box').find('a').mouseenter(function  () {
        $(this).find('.shadow').stop().animate({
            top:'10px'
        },300)
        $(this).find('p').stop().animate({
            bottom:'30px'
        },300)
   //���������ʾ������Ƴ�����С���ӣ���Ӱ���Ӻ��������ϻָ�
    }).mouseleave(function  () {
        $(this).find('.shadow').stop().animate({
            top:'45px'
        },300)
        $(this).find('p').stop().animate({
            bottom:'10px'
        },300)
    })


    //�м��ֲ�ͼ���֣���һ�Ų㼶��ߣ�����������
    $('.lbt').find('img').css({
        width:976,
        height:340,
        zIndex:1,
        opacity:0
    }).eq(0).css({
        zIndex:2,
        opacity:1
    })

    //�ֲ�ͼ��������ߣ������������λ����ת���ֲ�ͼ��ת
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

    //�ֲ�ͼ���ӣ��Ҽ���ת
    var key =0;
    var sq=0
    var off=true;
    $('.right').click(function  () {
        if(off){
            autoPlay();
            off=false;
        }
    })

     //�ֲ�ͼ���ӣ��Ҽ���ת
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

    //���ö�ʱ�����ֲ�ͼ�Զ���ת
    var timerzz=setInterval(autoPlay,2000)

    //������룬�������߼�ͷ�����������ʱ��
    $('.main-banner').mouseenter(function  () {

      $('.left').stop().animate({
          left:'0px'
      },500)
        $('.right').stop().animate({
            right:'0px'
        },500)
        clearInterval(timerzz);
    })
        //����Ƴ����������߼�ͷ���أ��ؿ���ʱ��
        .mouseleave(function  () {
        $('.left').stop().animate({
            'left':'-42px'
        },500)
        $('.right').stop().animate({
            right:'-42px'
        },500)
        timerzz=setInterval(autoPlay,2000)
    })

    //�ֲ�ͼ������ת�ĺ�����װ
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

