/**
 * Created by lian on 2017/3/13.
 */
//��ҳ����ȥ�ĸ߶ȳ��������������������̶��������Ƴ���
var flagzz = true;
var screenHeight = screen.height;
var jx1 = getClassNames("jx1", "div");
var mask = getClassNames("mask", "div");
var cont = getClassNames("cont", "div");
var cont_t = getClassNames("cont-t", "div");
var ul = document.getElementById("sidefloor");
var sidefloor = getClassNames("sidefloor", "div")[0];
var slection = getClassNames("slection", "a");
var nz_b1 = getClassNames("nz-b1", "div");
var ulLiArr = ul.children;
var leader = 0, target = 0, timer = null;

$(window).scroll(function () {
    if ($(window).scrollTop() >= 168 && flagzz) {
        flagzz = false;
        $('.main-nav').addClass('fixed')
        //$('.main-nav').css('display','none')
        $('.banner-big').css(
            'margin-top', '40px'
        )
        $('.main-nav').css("top", '-40px').stop().animate({
            top: '0px'
        }, 700, function () {
            $('.main-nav').css("top", '0px');

        })
    }
    else if ($(window).scrollTop() <= 168 && !flagzz) {
        $('.main-nav').removeClass('fixed')
        $('.banner-big').css(
            'margin-top', '0px'
        )
        flagzz = true;
    } else {
        leader = scroll().top;
        if (leader >= 3557) {
            for (var i = 0; i < ulLiArr.length; i++) {
                ulLiArr[i].className = "";
            }
            ulLiArr[3].className = "current";
        } else if (leader >= 2597) {
            for (var i = 0; i < ulLiArr.length; i++) {
                ulLiArr[i].className = "";
            }
            ulLiArr[2].className = "current";
        } else if (leader >= 1637) {
            for (var i = 0; i < ulLiArr.length; i++) {
                ulLiArr[i].className = "";
            }
            ulLiArr[1].className = "current";
        } else if (leader >= 775) {
            sidefloor.style.position = "fixed";
            sidefloor.style.left = 65 + "px";
            sidefloor.style.top = (screenHeight / 2 - 172) + "px";
        } else if (leader >= 756) {
            for (var i = 0; i < ulLiArr.length; i++) {
                ulLiArr[i].className = "";
            }
            ulLiArr[0].className = "current";
        } else {
            if (leader < 775) {
                sidefloor.style.position = "absolute";
                sidefloor.style.left = 65 + "px";
                sidefloor.style.top = 775 + "px";
                for (var i = 0; i < ulLiArr.length; i++) {
                    ulLiArr[i].className = "";
                }
                ulLiArr[0].className = "current";
            }
        }
    }

})
//����

for (var i = 0; i < ulLiArr.length; i++) {
    //�Զ������ԡ�
    ulLiArr[i].index = i;
    ulLiArr[i].onclick = function () {
        //Ҫ�ö�ʱ�����������ʱ����
        clearInterval(timer);
        //�����ť��ȷ��Ŀ��λ�ã�Ȼ���嶨ʱ����������Ŀ��λ�á�
        //����ֵ: ���ol�е�li����ȡ����ֵ����Ӧ��ul�е�li���붥���ľ��롣
        target = this.index * 960 + 740;//
        timer = setInterval(function () {
            //1.��ȡ����
            var step = (target - leader) / 10;
            //2.���δ�����
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //3.��ֵ��
            leader += step;
            window.scrollTo(0, leader);
            //�����ʱ����
            if (Math.abs(target - leader) <= Math.abs(step)) {
                window.scrollTo(0, target);
                clearInterval(timer);
            }
        }, 30);
    }
}


for (var j = 0; j < cont_t.length; j++) {
    var imgs = cont_t[j].getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onmouseover = function () {
            var mythis = this;
            animate(mythis, {opacity: 0.3}, function () {
                animate(mythis, {opacity: 1});
            })
        }
    }
}
for (var i = 0; i < jx1.length; i++) {
    jx1[i].index = i;
    jx1[i].onmouseover = function () {
        animate(mask[this.index], {opacity: .5});
        cont[this.index].style.display = "block";
        animate(cont[this.index], {opacity: 1});
    }
}
for (var i = 0; i < jx1.length; i++) {
    jx1[i].index = i;
    jx1[i].onmouseout = function () {
        animate(mask[this.index], {opacity: 1});
        animate(cont[this.index], {opacity: 0.1});
        cont[this.index].style.display = "none";
    }
}
for (var i = 0; i < nz_b1.length; i++) {
    nz_b1[i].index = i;
    nz_b1[i].onmouseover = function () {
        slection[this.index].style.display = "block";
        animate(slection[this.index], {opacity: 1});
    }
}
for (var i = 0; i < nz_b1.length; i++) {
    nz_b1[i].index = i;
    nz_b1[i].onmouseout = function () {
        animate(slection[this.index], {opacity: 0});
        slection[this.index].style.display = "none";
    }
}

//�ײ�������ʼ
setTimeout(function(){
    run();
},2000)
$('.pht1').click(function () {
    run();
})
$('span').click(function () {
    $('.pht2').animate({left: "-100%"}, function () {
        $('.pht1').animate({left: 0})
    })
})

//��װ
function run(){
    $('.pht1').animate({left: -127}, function () {
        $('.pht2').animate({left: 0})
    })
}

