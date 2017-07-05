/**
 * Created by Administrator on 2017/3/15.
 */
var oPicWrap = document.getElementById("p-pic-wrap");
var oWrapUl = oPicWrap.getElementsByTagName("ul")[0];
var aWrapLi = oPicWrap.getElementsByTagName("li");
var oShelter = oPicWrap.getElementsByTagName("div")[0];
var shelterx = oShelter.offsetWidth;   //由于后面要隐藏遮罩盒，所以要提前获得遮罩盒的宽高
var sheltery = oShelter.offsetHeight;
var oPicSlide = document.getElementById("p-pic-slide");
var aSlideLi = oPicSlide.getElementsByTagName("li");
var imgWidth = aWrapLi[0].offsetWidth;//图片的宽度
var oLittleWrap;
var oBigWrap;
var flag = true;

//点击切换图片
for (var i = 0; i < aSlideLi.length; i++) {
    aSlideLi[i].index = i;
    aWrapLi[i].style.display = "none";//首先将所有li隐藏
    aSlideLi[i].onclick = function () {
        for (var j = 0; j < aWrapLi.length; j++) {
            aSlideLi[j].style.borderColor = '';
            aWrapLi[j].style.display = "none";
            //获取当前处于显示状态的li标签
            if (aWrapLi[j].style.display == "block") {
                oLittleWrap = aWrapLi[j].getElementsByTagName("div")[0];
                oBigWrap = aWrapLi[j].getElementsByTagName("div")[1];
            }
        }
        this.style.borderColor = '#f10180';
        aWrapLi[this.index].style.display = "block";
    };
}
aWrapLi[0].style.display = "block";//然后初始化设置第一个li为block

//鼠标移入移出对大小图片进行显示隐藏
oPicWrap.onmouseover = function () {
    //获取当前处于显示状态的li标签
    for (var n = 0; n < aWrapLi.length; n++) {
        if (aWrapLi[n].style.display == "block") {
            oLittleWrap = aWrapLi[n].getElementsByTagName("div")[0];
            oBigWrap = aWrapLi[n].getElementsByTagName("div")[1];
            break;
        }
    }
    oLittleWrap.style.display = "none";
    oBigWrap.style.display = "block";
};
oPicWrap.onmouseout = function () {
    oLittleWrap.style.display = "block";
    oBigWrap.style.display = "none";
};


//鼠标移动图片出现放大镜效果
for (var i = 0; i < aWrapLi.length; i++) {
    aWrapLi[i].onmousemove = function (event) {
        event = event || window.event;
        var pagex = event.pageX || scroll().left + event.clientX;
        var pagey = event.pageY || scroll().top + event.clientY;
        var oBigImg = oBigWrap.getElementsByTagName("img")[0];
        var wrapx = oPicWrap.offsetLeft;
        var wrapy = oPicWrap.offsetTop;
        var x = pagex - wrapx - shelterx / 2;
        var y = pagey - wrapy - sheltery / 2;
        var scale = oBigImg.offsetWidth / oPicWrap.offsetWidth;

        //bug解决：让遮罩盒只能在small盒子范围内移动，不能超出范围
        if (x < 0) {
            x = 0;
        }
        if (x > oPicWrap.offsetWidth - shelterx) {
            x = oPicWrap.offsetWidth - shelterx;
        }
        if (y < 0) {
            y = 0;
        }
        if (y > oPicWrap.offsetHeight - sheltery) {
            console.log(oPicWrap.offsetHeight, sheltery);
            y = oPicWrap.offsetHeight - sheltery;
        }

        oShelter.style.left = x + 'px';
        oShelter.style.top = y + 'px';
        oBigImg.style.marginLeft = -scale * x + 'px';
        oBigImg.style.marginTop = -scale * y + 'px';
    };
}


/**商品推荐部分特效**/
var oList = document.getElementById("list");
var aListA = oList.getElementsByTagName("a");

var oTurnNum = document.getElementById("turn-numbers");
var aListUl = oList.getElementsByTagName("ul");//图片ul的盒子个数

var oTurnRight = document.getElementById("turn-right");
var oTurnLeft = document.getElementById("turn-left");
var oListDiv = oList.getElementsByTagName("div")[0];
var aTurnUl = oListDiv.getElementsByTagName("ul");
var oUlWidth = oListDiv.getElementsByTagName("ul")[0].offsetWidth;
var oTurnIndex = 0;

//移入切换图片
for (var i = 0; i < aListA.length; i++) {
    aListA[i].onmouseover = function () {
        var aListImg = this.getElementsByTagName("img");
        aListImg[0].style.display = "none";
        aListImg[1].className = "";
    };
    aListA[i].onmouseout = function () {
        var aListImg = this.getElementsByTagName("img");
        aListImg[0].style.display = "block";
        aListImg[1].className = "hide";
    };
}
//动态创建切换栏中li的个数
for (var i = 1; i < aListUl.length; i++) {
    var oTurnLi = document.createElement("li");
    oTurnLi.innerHTML = i + 1 + "";
    oTurnNum.appendChild(oTurnLi);
}
//点击左右按钮移动切换图片组
var aTurnLi = oTurnNum.getElementsByTagName("li");

//默认当前分页码在第一页时，不能点击左按钮切换
if (aTurnLi[0].className == "turn-current") {
    oTurnLeft.style.cursor = "not-allowed";
}
oTurnRight.onclick = function () {
    if(flag){
        flag = false;
        var target = -oUlWidth + oListDiv.offsetLeft;
        if (oTurnIndex == aTurnLi.length - 1) {
            return;
        }
        oTurnIndex++;
        run(oTurnIndex, target);
        oTurnLeft.style.cursor = "pointer";
        if (oTurnIndex == aTurnLi.length - 1) {
            oTurnRight.style.cursor = "not-allowed";
        }
    }
}
oTurnLeft.onclick = function () {
    if(flag){
        flag = false;
        var target = oListDiv.offsetLeft + oUlWidth;
        if (oTurnIndex == 0) {
            return;
        }
        oTurnIndex--;
        run(oTurnIndex, target);
        oTurnRight.style.cursor = "pointer";
        if (oTurnIndex == 0) {
            oTurnLeft.style.cursor = "not-allowed";
        }
    }
}
//点击分页码移动ul
for (var i = 0; i < aTurnLi.length; i++) {
    aTurnLi[i].index = i;
    aTurnLi[i].onclick = function () {
        if(flag){
            flag = false;
            var target = -this.index * oUlWidth;
            run(this.index, target);
            oTurnIndex = this.index;
            if (oTurnIndex == aTurnLi.length - 1) {
                oTurnRight.style.cursor = "not-allowed";
            } else if (oTurnIndex == 0) {
                oTurnLeft.style.cursor = "not-allowed";
            }
            else {
                oTurnRight.style.cursor = "pointer";
                oTurnLeft.style.cursor = "pointer";
            }
        }
    };
}
//点击左右按钮移动切换图片组方法封装
function run(index, tag) {
    animate(oListDiv, {left: tag}, function () {
        flag = true;//只有当前动画执行完毕才能进行下一次动画
    });
    for (var j = 0; j < aTurnLi.length; j++) {
        aTurnLi[j].className = "";
    }
    aTurnLi[index].className = "turn-current";
}

/**实现倒计时效果**/
var day = document.getElementById("day");
var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var timeId = null;

var timeId = setInterval(function () {
    var strReg = getTime();
    var aTime = strReg.split('-');
    //console.log(aTime);

    txt.setText(day,aTime[0]);
    txt.setText(hours,aTime[1]);
    txt.setText(minutes,aTime[2]);
    txt.setText(seconds,aTime[3]);
    console.log(aTime);
},1000);

//console.log(strReg);

function getTime() {
    var startTime = new Date();
    var endTime = new Date("2017/3/20 00:00:00");
    var countTime = (endTime.getTime() - startTime.getTime())/1000;

    var oDate = parseInt(countTime/(60*60*24)).toString();
    var ohours = toDouble(parseInt(countTime/(60*60)%24));
    var oMinutes = toDouble(parseInt((countTime/60)%60));
    var oSeconds = toDouble(parseInt(countTime%60));
    return oDate + '-' + ohours + '-' + oMinutes + '-' + oSeconds;
}




