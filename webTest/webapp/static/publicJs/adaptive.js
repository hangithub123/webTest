var qjwidth=0;
$(function(){
	//adaptive();
	adaptive_body();
});
window.onresize = function(){//监听屏幕变化
    var width=window.screen.width;//屏幕分辨率的宽
    if(qjwidth-width>100 || qjwidth-width<-100){
      history.go(0);
    }
};
//调节body宽高
function adaptive_body(){
    var height=$(document.body).outerHeight(true);
	var width=$(document.body).outerWidth(true);
	var windowH=document.body.offsetHeight;
	console.log("页面内容宽："+width+",高:"+height);
	console.log("窗口高:"+windowH);
	if(height<windowH){//如果内容高度没有窗口高度大，则取窗口高度
	    height=windowH;
	}
	console.log("使用高度："+height)
	if(width>760){width-=17;}
	$(document.body).css("width",width);
	$(document.body).css("height",height);
	qjwidth=width;
}
function adaptive_iframe(){
    var ifm=document.getElementById("mainIframe");
        var subWeb = document.frames ? document.frames["mainIframe"].document : ifm.contentDocument;
       if(ifm != null && subWeb != null) {
                ifm.style.height = 'auto';//关键这一句，先取消掉之前iframe设置的高度
                var height=subWeb.body.scrollHeight+20;
                ifm.style.height = height+'px';
       }
    console.log("mainIframe高度:"+ifm.style.height);
}
