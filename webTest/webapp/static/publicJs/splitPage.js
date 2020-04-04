$(function(){
	var page=$("#splitTurntoPage").attr("page");//当前页
	var pageSize=$("#splitTurntoPage").attr("pageSize");//每页数量
	var total=$("#splitTurntoPage").attr("total");
layui.use([ 'laypage','layer',], function() {
				var	layer = layui.layer,
					laypage = layui.laypage;
				//调用分页
				  laypage.render({
					    elem: 'splitpage' //注意，这里的 test1 是 ID，不用加 # 号
					    ,count: total //这个是后台返回的数据的总条数
					    ,limits: fycnt(total)
					    ,limit: pageSize   //每页显示的数据的条数,layui会根据count，limit进行分页的计算
					    ,curr: page //当前页
					    ,skip: true
					    ,hash:true
					    ,first: '首页'
					    ,last: '尾页'
					    ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
					    ,jump: function(obj, first){
					    	page = obj.curr;
					    	pageSize=obj.limit;
					        if(!first){
					        	//layer.msg("当前页="+currentPage+",开始页="+startPoint+",每页数量="+limitPoint+"\n"+window.location.href);
					        	var url
					        	if(window.location.href.indexOf("page")!=-1){
					        		var  urlarr=window.location.href.split("page");
					        		url=urlarr[0];
					        	}else{
					        		url=window.location.href;
					        		if(url.indexOf("?")!=-1){
					        			url+="&";
					        		}else{
					        			url+="?";
					        		}
					        	}
					        	 url+="page="+page+"&pageSize="+pageSize
					        	$("#splitTurntoPage").attr("href",url);
					        	$("#splitTurntoPageSpan").click();
					        }
					      }
					  });
				
			});
})
function fycnt(total){
	var arr=new Array();
	var temp=1;
	for(var i=1;i<=5;i++){
		temp=Math.round((i/5)*total);
		arr.push(temp);
	}
	if(total>60){
		var m = arr.slice();
	    m.unshift(10);
		arr=m;
	}
	return arr;
}