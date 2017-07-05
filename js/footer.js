/**
 * Created by Administrator on 2017/3/13.
 */
var oSlogan = getClassNames("footer-top-slogan","div")[0];
var aSpan = oSlogan.getElementsByTagName("span");

//设置footer部分footer-top-slogan部分每个li下span标签的背景图片位置
for(var i = 0; i < aSpan.length; i++){
    aSpan[i].className = "footer-ic0" + i;
}
