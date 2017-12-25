
import {Umbrella,Drop}from "./rain.js";

$("html").attr("overflow-y","hidden");
let canvas = document.getElementById("canvas");
let pCanvas = document.getElementById("picture");
let context  = canvas.getContext("2d");
let pContext = pCanvas.getContext('2d');
let rainImage = new Image();
let w = canvas.width =$("main:first").width(),
    h = canvas.height = window.innerHeight-$("nav.head:first").height();
let pw = pCanvas.width = Math.floor(w*2/10),
    ph = pCanvas.height = Math.floor(h*4/10);
pContext.fillStyle = 'rgba(255, 255, 255, 0)';
pContext.fillRect(0,0,pw,ph);
window.onresize = function () {
    w = canvas.width =$("main:first").width();
    h = canvas.height = window.innerHeight-$("nav.head:first").height();
    pw = pCanvas.width = Math.floor(w*2/10);
    ph = pCanvas.height = Math.floor(h*4/10);
};

/*创建雨滴数组*/
let drops = [];  /*雨滴数组*/
let num = 1000;
for (let i = 0; i< num; i++) {
    /*延迟添加*/
    setTimeout(function () {
        let drop = new Drop(context,w,h);  //创建雨滴对象
        // drop.init();            /*初始化雨滴*/
        drops.push(drop);
    },1000/60*i);
}
/*创建撑伞类，并绘制*/
let um = new Umbrella(pContext,pw,ph);
rainImage.onload = function () {
    um.draw(rainImage);
};
rainImage.src = "../imgs/rain1.png";

/*刷新绘制雨滴*/
setInterval(function () {
    //        清除之前的图形
    context.clearRect(0,0,w,h);
    for (let i = 0; i < drops.length; i++) {
        drops[i].draw();
    }
},1000/60);

