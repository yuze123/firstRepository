/**
 * Created by Administrator on 2017/3/13.
 */
var oSlogan = getClassNames("footer-top-slogan","div")[0];
var aSpan = oSlogan.getElementsByTagName("span");

//����footer����footer-top-slogan����ÿ��li��span��ǩ�ı���ͼƬλ��
for(var i = 0; i < aSpan.length; i++){
    aSpan[i].className = "footer-ic0" + i;
}
