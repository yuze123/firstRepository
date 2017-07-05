/**
 * Created by lian on 2017/3/16.
 */
var li1 = document.getElementById("li1");
var hide1 = document.getElementById("hide1");
var li3 = document.getElementById("li3");
var li4 = document.getElementById("li4");
var li5 = document.getElementById("li5");
var li6 = document.getElementById("li6");
var li7 = document.getElementById("li7");
var li8 = document.getElementById("li8");
var hide2 = getClassNames("hide2", "div");
var timerls = null;
var leaderls = 0;

//每个li的移入移出事件
li1.onmouseover = function () {
    this.style.backgroundColor = "#E4157F"
    animate(hide1, {"right": 33}, function () {
    })
}
li1.onmouseout = function () {
    //var mythis = this;
    this.style.backgroundColor = "#262626"
    animate(hide1, {"right": -274});
}

li3.onmouseover = function () {
    this.style.backgroundColor = "#E4157F"
    animate(hide2[0], {"right": 33});
}
li3.onmouseout = function () {
    //var mythis = this;
    this.style.backgroundColor = "#262626";
    animate(hide2[0], {"right": -117});
}

li4.onmouseover = function () {
    this.style.backgroundColor = "#E4157F"
    animate(hide2[1], {"right": 33});
}
li4.onmouseout = function () {
    //var mythis = this;
    this.style.backgroundColor = "#262626";
    animate(hide2[1], {"right": -117});
}
li5.onmouseover = function () {
    this.style.backgroundColor = "#E4157F"
    animate(hide2[2], {"right": 33});
}
li5.onmouseout = function () {
    //var mythis = this;
    this.style.backgroundColor = "#262626";
    animate(hide2[2], {"right": -117});
}
li6.onmouseover = function () {
    this.style.backgroundColor = "#E4157F";
    animate(hide2[3], {"right": 33});
}
li6.onmouseout = function () {
    //var mythis = this;
    this.style.backgroundColor = "#262626";
    animate(hide2[3], {"right": -117});
}
li7.onmouseover = function () {
    this.style.backgroundColor = "#E4157F"
    animate(hide2[4], {"right": 33});
}
li7.onmouseout = function () {
    //var mythis = this;
    this.style.backgroundColor = "#262626";
    animate(hide2[4], {"right": -117});
}
li8.onmouseenter = function () {
    console.log("888888");
    this.style.backgroundColor = "#E4157F";
    animate(hide2[5], {"right": 33});
}
li8.onmouseleave = function () {
    //var mythis = this;
    this.style.backgroundColor = "#262626";
    animate(hide2[5], {"right": -117});
}

//返回顶部功能
li8.onclick = function () {
    clearInterval(timerls);
    timerls = setInterval(function () {
        var step = (0 - leaderls) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leaderls += step;
        window.scrollTo(0, leaderls);
        if (leaderls === 0) {
            clearInterval(timerls);
        }
    }, 30);
}