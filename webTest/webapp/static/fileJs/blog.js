$(function(){
    $("#nav").find("a").click(function(){
        //清除样式
        $("#nav").find("a").removeClass("current_page");
        //设置选中
        $(this).addClass("current_page");
        var url=$(this).attr("url");
        $("#mainIframe").attr("src",url);
        setbg($(this).text());
        return false;
    })
});
function setbg(mc){
    if(mc=='记事'){
        $("#bgtop").attr("src","/webproject/com.hwq/file/getstreamByName/banner-bg2.jpg");
    }else if(mc=='相册'){
        $("#bgtop").attr("src","/webproject/com.hwq/file/getstreamByName/banner-bg3.jpg");
    }else if(mc=='笔记'){
        $("#bgtop").attr("src","/webproject/com.hwq/file/getstreamByName/banner-bg4.jpg");
    }else{
        $("#bgtop").attr("src","/webproject/com.hwq/file/getstreamByName/banner-bg.png");
    }
}
function myadd(obj,id,title,callback){
    var url=$(obj).attr("url");
    var nowwidth=$(document.body).outerWidth(true);
    var width="500px";
    var height="400px";
    if(nowwidth<760){
         width="300px";
         height="400px";
    }
    obj.target=doShowDialog(url,id,title,width,height,callback);
    return false;
}

function refresh(){}
//qq分享
function shareqq(obj,title,nr,image){
        if(!image){image='c667d0d7e01449858d810a1b84e3cf60';}
        var p = {
        url:'https://xn--3oq66eo0mj33c.com:8443/webproject/com.hwq/blog', /*获取URL，可加上来自分享到QQ标识，方便统计*/
        desc:'',
        title:title, /*分享标题(可选)*/
        summary:nr, /*分享摘要(可选)*/
        pics:'https://xn--3oq66eo0mj33c.com:8443/webproject/com.hwq/file/getstreamById/'+image+'/2', /*分享图片(可选)*/
        flash: '', /*视频地址(可选)*/
        site:'https://xn--3oq66eo0mj33c.com:8443/webproject/com.hwq/blog', /*分享来源(可选) 如：QQ分享*/
        style:'203',
        width:16,
        height:16
        };
        var s = [];
        for(var i in p){
            s.push(i + '=' + encodeURIComponent(p[i]||''));
        }
        var qhref = "http://connect.qq.com/widget/shareqq/index.html?"+s.join('&');
        //obj.target=doShowDialogqp(qhref,'qqshare','分享');
        obj.href=qhref;
        obj.target='_blank';
}

