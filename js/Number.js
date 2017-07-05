
//手机号区域 开始

var inputArr =document.getElementsByTagName("input");
//先申明一个外部变量用于保存第一次输入的密码与第二次输入的密码做校验
var password=-1;

//定义一个记录正确次数的值 当加到相应的值时才能让用户 点击立即注册
var countWrong=0;
//记录小钩的点击次数做判断
var xiaoGoucount1 = 0;

var regPhone1 =/(^13\d{9}$)|(^14\d{9}$)|(^18\d{9}$)/;
var regPassword=/^[0-9a-zA-Z_$@]{6,20}$/;
var duanXingYanZn=/^\d{6}$/;//待验证

var rightR1 =document.getElementById("rightR1");
var rightR2 =document.getElementById("rightR2");
var rightR3 =document.getElementById("rightR3");
var phoneNumber =document.getElementById("phoneNumber");
var phoneNumber2 =document.getElementById("phoneNumber2");
var phoneNumber3 =document.getElementById("phoneNumber3");
var duanXinYanZ =document.getElementById("duanXinYanZ");
var passStrong1 =document.getElementById("passStrong1");

var xiaoGou =document.getElementById("xiaoGou");
var duanXin02 =document.getElementById("duanXin02");
var timer1 =null;
var count =26;
var liJiZhu =document.getElementById("liJiZhu");
var wangyechongding =document.getElementById("wangyechongding");

//定义一个flag
var flag =true;




//轮播图区域开始

//需求1: 赋值第一张图片添加到到ul的最末尾和自动生成ol中的li。
var all01 =document.getElementById("all01");
var screen01 =document.getElementById("screen01");
var ul =document.getElementById("ul");
var ulLiArr =ul.children;
var index =0;
//获取图片宽度
var imgWidth = all01.children[0].offsetWidth;

var newLi =ulLiArr[0].cloneNode(true);
ul.appendChild(newLi);
var timer2 =null;


clearInterval(timer2);
timer2 = setInterval(function(){
    index ++;
    if(index == 5){
        index = 1;
        ul.style.left =0;
    }
    animate(ul,-index*imgWidth);
    console.log(ul);
},1500)


//匀速动画封装
function animate(ele,target) {
    //bug1:要用定时器，先清定时器。
    clearInterval(ele.timer);//一个盒子，一个定时器。想回不会产生影响
    //bug2:把定时器绑定到盒子上。(一个盒子，一个定时器。)
    ele.timer  = setInterval(function () {
        //bug3:步长的处理：步长不能永远都是10；
        var step = target > ele.offsetLeft? 10 : -10;
        ele.style.left = ele.offsetLeft + step + "px";
        //bug4:停下来：目标位置和当前位置只差不足一个步长的时候
        //bug5:抖动问题；   <后面加=
        if(Math.abs(target-ele.offsetLeft) <= Math.abs(step)){
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    },12);
}




//轮播图区域结束



















//校验手机号码区域 有冗余 有待优化
inputArr[0].onfocus =function(){
    if(this.value != ""){
        this.style.color ="#000";
    }
    if(this.value == "请输入手机号"){
        this.value = "";
    }
}
inputArr[0].onblur =function(){
    if(this.value == ""){
        this.style.color ="#c0c0c0";
        this.value = "请输入手机号";
    }
    if(regPhone1.test(this.value)){
        //rightR1.style.display ="block";
        //phoneNumber.style.backgroundColor="";
        //this.style.backgroundColor="";
        hiddenColor(rightR1,phoneNumber,this);
    }else{
        //rightR1.style.display ="none";
        //phoneNumber.style.backgroundColor="pink";
        //this.style.backgroundColor="pink";
        showColor(rightR1,phoneNumber,this);
    }
}





inputArr[1].onfocus =function(){
    if(this.value != ""){
        this.style.color ="#000";
    }
    if(this.value == "密码由6-20位字母，数字和符号组合"){
        this.value = "";
    }
}
inputArr[1].onblur =function(){
    if(this.value == ""){
        this.style.color ="#c0c0c0";
        this.value = "密码由6-20位字母，数字和符号组合";
    }
    if(regPassword.test(this.value)){
        hiddenColor(rightR2,phoneNumber2,this);
        password =this.value;
        if(/\w\d{12,20}$/.test(this.value)){
            passStrong1.src="../images/pa2.png";
            passStrong1.style.display="block";
        }else if(/\w{8,14}$/.test(this.value)){
            passStrong1.src="../images/pa1.png";
            passStrong1.style.display="block";
        }else{
            passStrong1.src="../images/pa0.png";
            passStrong1.style.display="block";
        }
    }else{
        showColor(rightR2,phoneNumber2,this);
        passStrong1.style.display="none";
    }
}





inputArr[2].onfocus =function(){
    if(this.value != ""){
        this.style.color ="#000";
    }
    if(this.value == "请再次输入上面的密码"){
        this.value = "";
    }
}
inputArr[2].onblur =function(){
    if(this.value == ""){
        this.style.color ="#c0c0c0";
        this.value = "请再次输入上面的密码";
    }
    if(password == this.value){
        hiddenColor(rightR3,phoneNumber3,this);
    }else{
        showColor(rightR3,phoneNumber3,this);
    }
}

//验证码输入框
duanXinYanZ.onfocus =function(){
    if(this.value != ""){
        this.style.color ="#000";
    }
    if(this.value == "短信验证码"){
        this.value = "";
    }
}
duanXinYanZ.onblur =function(){
    if(this.value == ""){
        this.style.color ="#c0c0c0";
        this.value = "短信验证码";
    }
    if(duanXingYanZn.test(this.value)){
        this.style.backgroundColor="";
        flag =true;
    }else{
        this.style.backgroundColor="pink";
        flag =false;
    }
}


//小勾
xiaoGou.onclick =function(){
    xiaoGoucount1 +=1;
    if(xiaoGoucount1 %2 == 1){
        this.style.background = 'url("../images/sprite01.png") no-repeat -24px -21px';
        flag =false;
    }else{
        this.style.background = 'url("../images/sprite01.png") no-repeat -24px 0px';
        flag =true;
    }
}

//获取验证码
duanXin02.onclick =function(){
    clearInterval(timer1);
    this.disabled =true;

    timer1 = setInterval(function(){
        count --;
        txt.setText(duanXin02,count + "秒后获取验证码");
        //duanXin02.innerText =count + "秒后获取验证码";
        //console.log(count);
        if(count == 0){
            clearInterval(timer1);
            duanXin02.disabled =false;
            duanXin02.value ="获取验证码";
            txt.setText(duanXin02,"获取验证码");
            count =26;
        }
    },1000)
}



//网页重定
// wangyechongding

//立即注册
liJiZhu.onclick =function(){
    if(!flag || inputArr[0].value=="请输入手机号" || inputArr[1].value=="密码由6-20位字母，数字和符号组合" || inputArr[2].value=="请再次输入上面的密码" ||duanXinYanZ.value =="短信验证码" ){
        alert("请认真填写好相关信息");
        wangyechongding.href="javascript:;"
    }else{
        // wangyechongding.href="wangyechongding.html";
    }

}






//手机号区域 结束





















//封装一个正确的颜色显示函数
function hiddenColor(id,ele,thiss){
    id.style.display ="block";
    ele.style.backgroundColor="";
    thiss.style.backgroundColor="";
    flag =true;
}
//封装一个错误的颜色显示函数
function showColor(id,ele,thiss){
    id.style.display ="none";
    ele.style.backgroundColor="pink";
    thiss.style.backgroundColor="pink";
    flag =false;
}