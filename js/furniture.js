function box() {
    var leftBox = document.getElementById("leftBox");
    var liArr = leftBox.getElementsByTagName("li");
    var rightBox = document.getElementById("rightBox")
    var ul = rightBox.firstElementChild;
    var imgHeight = ul.firstElementChild.offsetHeight;
    //var liinner=liArr[0].innerHTML;

//  2.???????????
    for (var i = 0; i < liArr.length; i++) {
        liArr[i].index = i;
        var dayu;
        //3.??????????
        liArr[i].onmouseover = function () {
            this.className = "liAfter";
            this.innerHTML = liArr[this.index].innerHTML + "<span>></span>"
            dayu = leftBox.getElementsByTagName("span")[0];
            dayu.style.display = "block";
            animate(dayu, {
                "left": 130
            });
        }
        // 4.?????????
        liArr[i].onmouseout = function () {
            this.className = "liBefore";
            this.removeChild(dayu);
        }

        //5.????????
        liArr[i].onclick = function () {
            animate(ul, {
                "top": -this.index * imgHeight
            })
            //console.log(this.index);
        }

    }
}

box();

//  box end
//   muma begin
function roll() {
    var atimer;
    var arrJson = [
        {   //  1
            width: 208,
            top: 20,
            left: 120,
            opacity: 0.2,
            "z-index": 2
        },
        {  // 2
            width: 262,
            top: 50,
            left: 145,
            opacity: 0.8,
            "z-index": 3
        },
        {   // 3
            width: 316,
            top: 60,
            left: 245,
            opacity: 1,
            "z-index": 4
        },
        {  // 4
            width: 262,
            top: 50,
            left: 420,
            opacity: 0.8,
            "z-index": 3
        },
        {   //5
            width: 208,
            top: 20,
            left: 495,
            opacity: 0.2,
            "z-index": 2
        }
    ];
    // 1.???????????
    var wrap = document.getElementById("wrap");
    var liArr = wrap.getElementsByTagName("li");
    var arrow = document.getElementById("arrow");
    var prev = arrow.children[0];
    var next = arrow.children[1];
    var flag = true;

    //??????濪????
    xunhuan();
    //???ú???

    atimer = setInterval(xunhuan, 2000)
    //autoPlay();
    // 2.??????
    wrap.onmouseover = function () {
        clearInterval(atimer)
        show();
    }
    wrap.onmouseout = function () {
        hide();
        atimer = setInterval(xunhuan, 2000)
    }
    //3 ???????????????????
    //autoPlay();
    //  ??????????
    prev.onclick = function () {
        if (flag == true) {
            flag = false;
            autoPlay(false);
        }
    }
    next.onclick = function () {
        if (flag == true) {
            flag = false;
            autoPlay(true);
        }
    }

    // .autoplay????
    function autoPlay(bool) {
        if (bool !== undefined) {
            if (bool) {
                var aaa = arrJson.shift();
                arrJson.push(aaa);
            } else {
                var bbb = arrJson.pop();
                arrJson.unshift(bbb);
            }
        }
        for (var j = 0; j < liArr.length; j++) {
            animate(liArr[j], arrJson[j], function () {
                flag = true;
            })
        }
    }

    //  show????
    function show() {
        arrow.style.display = "block";
        animate(arrow, {opacity: 1});
    }

    //  hide ????
    function hide() {
        arrow.style.display = "none";
        animate(arrow, {opacity: 0});
    }

    // ???????
    function xunhuan() {

        var aaa = arrJson.shift();
        arrJson.push(aaa);
        for (var j = 0; j < liArr.length; j++) {
            animate(liArr[j], arrJson[j], function () {
                flag = true;
            })
        }
    }
}

roll();

// ???????b
function zailai() {
    var boxs = document.getElementsByClassName("lis");
    for (var i = 0; i < boxs.length; i++) {
        boxs[i].onmouseover = function () {
            this.style.borderColor = "#EA6EAF"
        }
        boxs[i].onmouseout = function () {
            this.style.borderColor = "#E9E7EA"
        }
    }
}

zailai();

//?????
function windowTop() {
    var topFix = document.getElementById("topFix");
    var remen = document.getElementById("rm");
    var height = remen.offsetTop;


    addEventListener("scroll", scrollx);

    function scrollx() {
        //clearInterval(timer);
        if (scroll().top >= height) {
            //clearInterval(timer);
            animate(topFix, {
                top: 0
            })
            topFix.style.zIndex = 1000;
            //console.log(1);
            console.log(topFix.style.top)


        } else {
            //clearInterval(timer);
            animate(topFix, {
                top: -45
            })
        }
    }


}

windowTop();
function jump() {
    // 1.设置事件源
    var gx = document.getElementsByClassName("gexing")[0];
    var zlyb = document.getElementsByClassName("zlyb")[0];
    var top_nav = document.getElementById("top-nav");
    var topFix = document.getElementById("topFix");
    var btn1 = topFix.getElementsByTagName("a")[0];
    var btn2 = topFix.getElementsByTagName("a")[1];
    var btn3 = topFix.getElementsByTagName("a")[2];
    timer = null;
    var leader = 0;
    // 2.设置目标值 fun
    var height1 = 0;
    var height2 = gx.offsetTop;
    var height3 = zlyb.offsetTop;

    //3.找到当前值
    addEventListener("scroll", leadera);

    function leadera() {
        leader = scroll().top;
        leader=parseInt(leader);
    }

    //4.设置点击事件调用当前函数
    btn1.onclick = function () {
        dingshi(leader, height1);
    };
    btn2.onclick = function () {
        dingshi(leader, height2);
    }
    btn3.onclick = function () {
        dingshi(leader, height3);
    }
    //
    //5. 设置楼层跳远事件
    function dingshi(leader, target) {
        //5.1 清除定时器
        clearInterval(timer);
        timer = setInterval(function () {
            //5.2设置步长
            var step = (target - leader) / 20;
            // 5.2二次设置步长
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            // 5.3赋值
            leader += step;
            window.scrollTo(0, leader);
            // 5.4 完全赋值
            if (Math.abs(target - leader) <= Math.abs(step)) {
                window.scrollTo(0, target);
                console.log(leader);
                clearInterval(timer);
            }
            //clearInterval(timer);
        }, 15)
    }
}
jump();