/**
 * Created by Administrator on 2017/3/15.
 */
var oPicWrap = document.getElementById("p-pic-wrap");
var oWrapUl = oPicWrap.getElementsByTagName("ul")[0];
var aWrapLi = oPicWrap.getElementsByTagName("li");
var oShelter = oPicWrap.getElementsByTagName("div")[0];
var shelterx = oShelter.offsetWidth;   //���ں���Ҫ�������ֺУ�����Ҫ��ǰ������ֺеĿ��
var sheltery = oShelter.offsetHeight;
var oPicSlide = document.getElementById("p-pic-slide");
var aSlideLi = oPicSlide.getElementsByTagName("li");
var imgWidth = aWrapLi[0].offsetWidth;//ͼƬ�Ŀ��
var oLittleWrap;
var oBigWrap;
var flag = true;

//����л�ͼƬ
for (var i = 0; i < aSlideLi.length; i++) {
    aSlideLi[i].index = i;
    aWrapLi[i].style.display = "none";//���Ƚ�����li����
    aSlideLi[i].onclick = function () {
        for (var j = 0; j < aWrapLi.length; j++) {
            aSlideLi[j].style.borderColor = '';
            aWrapLi[j].style.display = "none";
            //��ȡ��ǰ������ʾ״̬��li��ǩ
            if (aWrapLi[j].style.display == "block") {
                oLittleWrap = aWrapLi[j].getElementsByTagName("div")[0];
                oBigWrap = aWrapLi[j].getElementsByTagName("div")[1];
            }
        }
        this.style.borderColor = '#f10180';
        aWrapLi[this.index].style.display = "block";
    };
}
aWrapLi[0].style.display = "block";//Ȼ���ʼ�����õ�һ��liΪblock

//��������Ƴ��Դ�СͼƬ������ʾ����
oPicWrap.onmouseover = function () {
    //��ȡ��ǰ������ʾ״̬��li��ǩ
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


//����ƶ�ͼƬ���ַŴ�Ч��
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

        //bug����������ֺ�ֻ����small���ӷ�Χ���ƶ������ܳ�����Χ
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


/**��Ʒ�Ƽ�������Ч**/
var oList = document.getElementById("list");
var aListA = oList.getElementsByTagName("a");

var oTurnNum = document.getElementById("turn-numbers");
var aListUl = oList.getElementsByTagName("ul");//ͼƬul�ĺ��Ӹ���

var oTurnRight = document.getElementById("turn-right");
var oTurnLeft = document.getElementById("turn-left");
var oListDiv = oList.getElementsByTagName("div")[0];
var aTurnUl = oListDiv.getElementsByTagName("ul");
var oUlWidth = oListDiv.getElementsByTagName("ul")[0].offsetWidth;
var oTurnIndex = 0;

//�����л�ͼƬ
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
//��̬�����л�����li�ĸ���
for (var i = 1; i < aListUl.length; i++) {
    var oTurnLi = document.createElement("li");
    oTurnLi.innerHTML = i + 1 + "";
    oTurnNum.appendChild(oTurnLi);
}
//������Ұ�ť�ƶ��л�ͼƬ��
var aTurnLi = oTurnNum.getElementsByTagName("li");

//Ĭ�ϵ�ǰ��ҳ���ڵ�һҳʱ�����ܵ����ť�л�
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
//�����ҳ���ƶ�ul
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
//������Ұ�ť�ƶ��л�ͼƬ�鷽����װ
function run(index, tag) {
    animate(oListDiv, {left: tag}, function () {
        flag = true;//ֻ�е�ǰ����ִ����ϲ��ܽ�����һ�ζ���
    });
    for (var j = 0; j < aTurnLi.length; j++) {
        aTurnLi[j].className = "";
    }
    aTurnLi[index].className = "turn-current";
}

/**ʵ�ֵ���ʱЧ��**/
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




