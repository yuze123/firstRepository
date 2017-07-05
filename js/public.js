/**
 * Created by Administrator on 2017/3/12.
 */
/**

 /*--解决innerText的兼容问题--*/
/*----ABOUT: 封装了一个解决innerText的兼容问题的对象，对象的方法有getText(ele)，setText(ele,text)----*/
/*---RETURN: 调用getText()返回当前元素的文本内容---*/
/*--CALLWAY: txt.getText(ele);  / txt.setText(ele,text);--*/
/* 解决innerText的兼容问题 */
var txt = {
    getText: function(ele){ // 获取innerText
        if(typeof ele.innerText == "string"){ // 能力检测-看当前浏览器是否支持此对象的属性或方法
            return ele.innerText; //IE Chrome
        }else{
            return ele.textContent; // 低版本的Firefox
        }
    },
    setText: function(ele,text){ // 设置innerText
        if(typeof ele.innerText == "string"){
            ele.innerText = text;//IE Chrome
        }else{
            ele.textContent = text;// 低版本的Firefox
        }
    }
};

/*--nextSibling/nextElementSibling previousSibling/previousElementSibling firstChild/firstElementChild lastChild/lastElementChild--*/
/*----ABOUT: 封装了一个解决获取节点的兼容问题的方法,返回要获取的节点duix----*/
/*---RETURN: 返回一个节点对象---*/
/*--CALLWAY: tar.getNextElement(ele); ...--*/
var tag = {
    getNextElement: function(ele){ // 获取下一个兄弟节点
        if(ele){ //防止传入的ele是undefined或null
            if(ele.nextElementSibling){ // 高版本的浏览器支持的方式
                return ele.nextElementSibling;
            }else{  // IE8及低版本浏览器支持的方式
                ele = ele.nextSibling; // 获取下一节点
                // 这里用循环而不用if的原因是空白节点或是注释节点可能有多个，因此要循环寻找直至找到标签节点为止
                while(ele && ele.nodeType != 1){ // 下一节点存在且是标签节点(标签节点的节点类型为1)
                    ele = ele.nextSibling; // 如果不是标签节点，继续寻找下一节点
                }
                return ele; // 返回获取到的下一个标签对象
            }
        }
    },
    getPrevElement: function(ele){ // 获取上一个兄弟节点
        if(ele){
            if(ele.previousElementSibling){ // 高版本浏览器
                return ele.previousElementSibling;
            }else{  // IE8及低版本浏览器
                ele = ele.previousSibling;
                while(ele && ele.nodeType != 1){
                    ele = ele.previousSibling;
                }
                return ele; // 返回获取到的上一个标签节点
            }
        }
    },
    getFirstChild: function(ele){ // 获取第一个子节点
        if(ele){ // 首先判断传入的ele是否是undefined null等非法参数
            if(ele.firstElementChild){ // 高版本浏览器
                return ele.firstElementChild;
            }else{ // IE8及低版本浏览器
                ele = ele.firstChild;
                while(ele && ele.nodeType !=1){
                    ele = ele.nextSibling; //在当前节点的基础上继续往下寻找
                }
                return ele;
            }
        }
    },
    getLastChild: function(ele){ //获取最后一个子节点
        if(ele){ // 首先判断传入的ele是否是undefined null等非法参数
            if(ele.lastElementChild){ // 高版本浏览器
                return ele.lastElementChild;
            }else{ // IE8及低版本浏览器
                ele = ele.lastChild;
                while(ele && ele.nodeType !=1){
                    ele = ele.previousSibling; //在当前节点的基础上继续向上寻找
                }
                return ele;
            }
        }
    }
};

/*--getStyle(ele, attr)--*/
/*----ABOUT: 封装一个精确获取单个元素的最高权限属性值----*/
/*--CALLWAY: getStyle(ele, attr);--*/
function getStyle(ele, attr) {
    if (window.getComputedStyle !== undefined && typeof(window.getComputedStyle === "function")) {//火狐、谷歌、IE9+
        return window.getComputedStyle(ele, null)[attr];
    } else {//IE6~8
        return ele.currentStyle[attr];
    }
}

/*--scroll()--*/
/*----ABOUT: 封装了一个获取页面被卷去的头部和左侧部分的距离的方法----*/
/*---RETURN: 返回被卷去的top值或left值---*/
/*--CALLWAY: scroll().top / scroll().left--*/
function scroll(){
    return {
        "top": window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        "left": window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    };
}

/*--getPage()--*/
/*----ABOUT: 封装了一个获取鼠标在页面中的位置的方法----*/
/*---RETURN: 返回鼠标在页面中的位置pagex和pagey---*/
/*--CALLWAY: getPage(event).pagex / getPage(event).pagey--*/
function getPage(event){
    event = event || window.event;
    return {"pagex": event.pageX || scroll().left + event.clientX,
        "pagey": event.pageY || scroll().top + event.clientY};
}

/*--addEvent(obj,xEvent,fn)--*/
/*----ABOUT: 封装了一个事件监听的兼容方法----*/
/*---RETURN: 无---*/
/*--CALLWAY: addEvent(obj,xEvent,fn)--*/
function addEvent(obj,xEvent,fn) {
    if(obj.addEventListener){
        obj.addEventListener(xEvent,fn);    //FF Chrome IE9+
    }else if (obj.attachEvent){
        obj.attachEvent("on"+xEvent,fn);    //IE678
    }else{
        obj["on"+xEvent] = null;            //DOM0级下的浏览器
    }
}

/*--stopBubble(event)--*/
/*----ABOUT: 封装了一个阻止事件冒泡的兼容方法----*/
/*---RETURN: 无---*/
/*--CALLWAY: stopBubble(event)--*/
function stopBubble(event) {
    event = event || window.event;//判断event是否存在
    if (event.stopPropagation) {
        event.stopPropagation();//阻止传播是以方法形式存在的
    } else {
        event.cancelBubble = true;//IE678只支持冒泡，阻止冒泡是以属性方式存在的
    }
}

/*--stopDefault(event)--*/
/*----ABOUT: 封装了一个阻止事件默认行为的兼容方法----*/
/*---RETURN: 无---*/
/*--CALLWAY: stopDefault(event)--*/
function stopDefault(event) {
    event = event || window.event;
    if(event.preventDefault){       //W3C - FF Chrome IE9+
        event.preventDefault();
    }else{                          //IE678
        event.returnValue = false;
    }
    return false;
}

/*protogenesis JS realize hasClass(),addClass(),removeClass(),getClassNames() from jQuery*/
function hasClass(ele,cls){
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(obj,cls){
    if(!this.hasClass(obj,cls)){
        obj.className += " " + cls;
    }
}

function removeClass(ele,cls){
    if (hasClass(ele,cls)){
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}

/* 解决getElementsByClassName的兼容问题 */
function getClassNames(classStr,tagName) {
    if(document.getElementsByClassName){//判断浏览器是否兼容getElementsByClassName属性
        //浏览器兼容getElementsByClassName属性，则可直接使用document.getElementsByClassName
        return document.getElementsByClassName(classStr)
    }else{//浏览器不兼容getElementsByClassName的情况下
        var nodes = document.getElementsByTagName(tagName);
        var ret = [];

        for(i = 0; i < nodes.length; i++){
            if(hasClass(nodes[i],classStr)){
                ret.push(nodes[i]);
            }
        }
        return ret;
    }
}

/*--move(ele,target)--*/
/*----ABOUT: 封装了一个让元素匀速运动的方法(只能让有px单位的属性运动)----*/
/*--CALLWAY: move(ele,target)--*/
/*---RETURN: ---*/
function move(ele,target) {
    clearInterval(ele.timeId);//一个盒子一个定时器，相互不会产生影响
    ele.timeId = setInterval(function () {
        //动画原理：盒子本身的位置 + 步长（每次运动的距离）
        var step = target > ele.offsetLeft ? 10 : -10;
        ele.style.left = ele.offsetLeft + step + 'px';

        if (Math.abs(target - ele.offsetLeft) <= Math.abs(step)) {
            ele.style.left = target + 'px';
            clearInterval(ele.timeId);
        }
    }, 50);
}

/*--animate(ele,json,fn)--*/
/*----ABOUT: 封装了一个让元素缓动运动的方法----*/
/*--CALLWAY: animate(ele,json,fn)--*/
/*---RETURN: ---*/
function animate(ele,json,fn) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //动画原理：盒子本身位置 + （目标位置 - 当前位置）/ 10；
        var flag = true;//默认所有人都到了目标位置。(开闭原则)
        for(var key in json){
            if(key === "z-index"){//不需要缓动变化，直接变为目标值
                ele.style.zIndex = json[key];
            }
            if(key === "opacity"){
                if(parseFloat(getStyle(ele, key)) == 0){
                    var leader = 0;
                }else{
                    var leader = parseInt(getStyle(ele, key)*100) || 100;//为了避免小数运算过程中出现精度丢失，这里将小数转换为整数再运算
                }

                //1. 获取步长
                var step = (json[key]*100 - leader) / 5;
                //2. 步长二次处理 - 解决小数问题：步长不能为小数，要求盒子最小步长为1或是-1
                step = step > 0 ? Math.ceil(step) : Math.floor(step);//解决小数问题 - 步长大于0，向上取整，小于0则向下取整
                //3. 赋值
                leader += step;//这里将step累加到leader中是为了第4步中计算差值做准备
                ele.style.opacity = (leader/100).toFixed(2);
                ele.style.filter = "alpha(opacity="+leader+")";
                //console.log((leader/100).toFixed(2));
                //必须所有属性都到达指定位置，才能清除定时器。
                if(Math.abs(parseInt(json[key]*100) - leader) > Math.abs(step)){
                    flag = false;
                }
            }else{
                //这里用短路运算的目的是为了防止所传的参数key在css中未定义时，获取到的将是auto，因此要将属性值是auto的变为0
                var leader = parseFloat(getStyle(ele, key)) || 0;
                //1. 获取步长
                var step = (json[key] - leader) / 10;
                //2. 步长二次处理 - 解决小数问题：步长不能为小数，要求盒子最小步长为1或是-1
                step = step > 0 ? Math.ceil(step) : Math.floor(step);//解决小数问题 - 步长大于0，向上取整，小于0则向下取整
                //3. 赋值
                leader += step;//这里将step累加到leader中是为了第4步中计算差值做准备
                ele.style[key] = leader + 'px';
                //必须所有属性都到达指定位置，才能清除定时器。
                if(Math.abs(json[key] - leader) > Math.abs(step)){
                    flag = false;
                }
            }
        }
//                    console.log(ele.timer);//用于调试
        //4. 清除定时器 - 如果目标位置和当前位置之差不足一个步长时，则将当前位置设置为目标位置并清除定时器
        if (flag) {
            for(var k in json){
                if(k === "opacity"){
                    ele.style.opacity = json[k];
                    ele.style.filter = "alpha(opacity="+json[k]*100+")";
                }else if(k === "z-index"){
                    ele.style.zIndex = json[k];
                }else{
                    ele.style[k] = json[k] + "px";
                }
            }
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    }, 30);
}

/*--getDate()--*/
/*----ABOUT: 封装了一个获取日期格式的函数，返回xxxx-xx-xx xx:xx:xx格式的字符串----*/
/*--CALLWAY: getDate()--*/
/*---RETURN: 返回一个xxxx-xx-xx xx:xx:xx的日期格式的字符串---*/
function getDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = toDouble(date.getMonth() + 1);
    var day = toDouble(date.getDate());
    var hour = toDouble(date.getHours());
    var min = toDouble(date.getMinutes());
    var sec = toDouble(date.getSeconds());

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

/*--toDouble()--*/
/*----ABOUT: 封装了一个将小于10的数字转表为两位数模式的函数----*/
/*---RETURN: 返回一个两位的字符串---*/
/*--CALLWAY: toDouble(num)--*/
function toDouble(num){
    var str;
    if(Number(num) < 10){
        str = "0" + num;
    }else{
        str = "" + num;
    }
    return str;
}