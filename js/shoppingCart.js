/**
 * Created by TOSHIBA on 2017/3/12.
 */
window.onload = function () {
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
                    console.log((leader/100).toFixed(2));
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
    //头部
    var topLink = document.getElementById("topLink");
    topLink.onmouseover = function () {
        topLink.style.cursor = "pointer";
        topLink.style.color = "#000";
        topLink.firstChild .style.backgroundPositionX="-377px";
    };
    topLink.onmouseout = function () {
        topLink.style.color = "#808080";
        topLink.firstChild .style.backgroundPositionX="-362px";
    };
    var topPeople = document.getElementById("topPeople");
    var topBox = document.getElementById("topBox");

    topPeople.onmouseover = function () {
        topPeople.style.cursor = "pointer";
        topBox.style.display ="block";
    };
    topPeople.onmouseout = function () {
        topPeople.style.cursor = "pointer";
        topBox.style.display ="none";
    };
    //topPeople.onmouseout = function () {
    //    topPeople.style.color = "#808080";
    //    topPeople.firstChild .style.backgroundPositionX="-362px";
    //};






















    //显示隐藏大图
    var price = document.getElementById("price");
    var sumPrice = document.getElementById("sumPrice");
    var smallImg = document.getElementsByClassName("smallImg");
    var bigImg = document.getElementsByClassName("bigImg");
    for (var i = 0; i < smallImg.length; i++) {
        smallImg[i].index = i;
        smallImg[i].onmouseover = function () {
            bigImg[this.index].style.display = "block";
            animate(bigImg[this.index],{left:102});
        };
        smallImg[i].onmouseout = function () {
            bigImg[this.index].style.display = "none";
            bigImg[this.index].style.left = "112px";

        };
    }


    //计时器
    var min = 5;
    var ms = 0;
    var flag = false;
    var min1 = document.getElementById("min1");
    var min2 = document.getElementById("min2");
    var ms1 = document.getElementById("ms1");
    var ms2 = document.getElementById("ms2");

    setInterval(function () {
        if(ms==-1) {
            ms=60;
            min--;
            ms--;
        }
        min1.innerHTML = '0'+ min;
        min2.innerHTML = '0'+ min;
        if (ms<10){
            ms1.innerHTML = "0"+ms;
            ms2.innerHTML = "0"+ms;
        }else {
            ms1.innerHTML =  ms;
            ms2.innerHTML = ms;
        }

        ms--;
    }, 1000);


    //改变数量 总价改变
    var number;
    var numbers = 0;
    var zongjia = 0;
    var left = document.getElementsByClassName("left");
    var right = document.getElementsByClassName("right");
    var middle = document.getElementsByClassName("middle");
    var money = document.getElementsByClassName("money");
    var shoppingNumber = document.getElementById("shoppingNumber");
    var Summoney = document.getElementsByClassName("Summoney");
    for (var j = 0; j < middle.length; j++) {
        zongjia += parseFloat(Summoney[j].innerHTML);
        numbers += parseInt(middle[j].innerHTML);
    }
    console.log(zongjia);
    //计算价格
    price.innerHTML = zongjia;
    shoppingNumber.innerHTML = numbers;
    sumPrice.innerHTML = price.innerHTML;
    for (var i = 0; i < middle.length; i++) {
        left[i].index = i;
        right[i].index = i;
        left[i].onmouseover = function () {
            //left[i].onclick = function () {
            if (middle[this.index].innerHTML === "1") {
                this.style.cursor = "default";
                this.style.opacity = "0.2";
                return;
            }
            this.style.opacity = "1";
            this.style.cursor = "pointer";
            this.style.backgroundImage = "url(../images/jianhao2.png)";
            this.onclick = function () {

                number = middle[this.index].innerHTML;
                number--;
                if (number <= 1) {
                    this.style.cursor = "default";
                    this.style.opacity = "0.2";
                    number = 1;
                }
                middle[this.index].innerHTML = number;
                Summoney[this.index].innerHTML = number * money[this.index].innerHTML;
                zongjia = 0;
                numbers = 0;
                for (var j = 0; j < middle.length; j++) {
                    zongjia += parseFloat(Summoney[j].innerHTML);
                    numbers += parseInt(middle[j].innerHTML);
                }
                console.log(zongjia);
                //计算价格
                price.innerHTML = zongjia;
                sumPrice.innerHTML = price.innerHTML;
                shoppingNumber.innerHTML = numbers;
            };
            this.onmouseout = function () {
                this.style.backgroundImage = "url(../images/jianhao.png)";
            };
        }

        //right[i].onclick = function () {
        right[i].onmouseover = function () {
            this.style.backgroundImage = "url(../images/jiahao2.png)";
            this.onclick = function () {

                number = middle[this.index].innerHTML;
                left[this.index].style.opacity = "1";
                number++;
                middle[this.index].innerHTML = number;
                Summoney[this.index].innerHTML = number * money[this.index].innerHTML;
                var zongjia = 0;
                var numbers = 0;
                for (var j = 0; j < middle.length; j++) {
                    zongjia += parseFloat(Summoney[j].innerHTML);
                    numbers += parseInt(middle[j].innerHTML);
                }
                console.log(zongjia);
                //计算价格
                price.innerHTML = zongjia;
                sumPrice.innerHTML = price.innerHTML;
                shoppingNumber.innerHTML = numbers;
                this.onmouseout = function () {
                    this.style.backgroundImage = "url(../images/jiahao.png)";
                };
            };
        };


    }


    //            点击删除按钮 删除整个div
    var del = document.getElementsByClassName("del");
    var fruit = document.getElementsByClassName("fruit");
    for (var i = 0; i < del.length; i++) {
        del[i].index = i;
        del[i].onclick = function () {
            this.parentNode.parentNode.parentNode.parentNode.removeChild(fruit[this.index]);
            zongjia = 0;
            numbers = 0;
            for (var j = 0; j < del.length; j++) {
                zongjia += parseFloat(Summoney[j].innerHTML);
                numbers += parseInt(middle[j].innerHTML);
                left[j].index = j;
                right[j].index = j;
                del[j].index = j;
                smallImg[j].index=j;
            }
            price.innerHTML = zongjia;
            sumPrice.innerHTML = price.innerHTML;
            shoppingNumber.innerHTML = numbers;
        }
    };



    ////底部说明按钮
    var state =document.getElementsByClassName("state");
    var detailed =document.getElementsByClassName("detailed")[0];
    var detailed1 =document.getElementsByClassName("detailed1")[0];
    state[1].onmouseover= function () {
        detailed.style.display="block";
        animate(detailed,{bottom:40});
    };
    state[1].onmouseout= function () {
        detailed.style.display="none";
        detailed.style.bottom="60px";

    };
    state[0].onmouseover= function () {
        detailed1.style.display="block";
        animate(detailed1,{bottom:40});
    };
    state[0].onmouseout= function () {
        detailed1.style.display="none";
        detailed1.style.bottom="60px";
    };
//
 // var sumPrice =document.getElementsByClassName("sumPrice")[0];
 //    sumPrice.onclick=function(){
 //        document.body.innerHTML ="未连接服务器,提交失败!";
 //    };


//            点击删除按钮 删除整个div
//    var del = document.getElementsByClassName("del");
//    var fruit = document.getElementsByClassName("fruit");
//    var delBox = document.getElementsByClassName("delBox");
//    var btn1 = document.getElementsByClassName("btn1");
//    var btn2 = document.getElementsByClassName("btn2");
//    for(var i = 0; i < del.length; i++) {
//        del[i].index = i;
//        fruit[i].index =i;
//        del[i].onclick= function () {
//            delBox[this.index].style.display="block";
//
//            btn1.onclick = function () {
//                for(var j = 0; j <del.length; j++) {
//                    left[j].index = j;
//                    right[j].index = j;
//                    del[j].index = j;
//            }
//                btn2.onclick = function () {
//                    delBox[delBox.index].style.display="none";
//                }
//            }
//        }
//    };

}