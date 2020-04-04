/**
 * 简介ui片段js开发流程规范
 * 1.插入ui片段后，点击为选中ui片段，双击初始化ui片段的基本操作（例如：添加操作按钮、设置元素编号）。
 * 2.ui片段内的事件方法要加禁止冒泡。
 * 3.每个ui片段都要有一个单独写方法的文件，防止混乱。
 * 4.当前文件为主js文件，只可调用而非写具体ui片段的操作方法。
 * 5.当前文件主要任务，选中ui片段 - 初始化ui片段 - 调用编辑ui片段方法 - 恢复ui片段。
 * 6.编辑原则：ui片段更新则真实代码同时更新。
 * 7.生成文件时，只读取name=code区域下的真实代码。
 * author：韩伟其2019-03-17
 */

/**=============================== ui片段选择区操作==================================开始**/
//插入ui片段到展示区域
function insertui(obj){
	console.log("insertui...");
	event.stopPropagation();
	var uiShowArea = $("#uiShowArea");	
	var uis = $("div[name^=uiChangeArea][isSelect=1]");
	if(uis.length==0){alert("请选择ui片段！");return false;}
	$(uis).each(function(){
		var code=$(this).children("pre[name=code]");
		var showuicode=$(this).children("pre[name=showuicode]").children("*");
		//插入显示代码及要生成的代码
		$(showuicode).each(function(){
			$(this).attr("name","showui");
			$(this).attr("uiname",$(code).attr("codename"));
		})
		$(showuicode).bind("click",function(){
			uiclick_f(this);
		});
		$(showuicode).bind("dblclick",function(){
			uiclick_dbf(this);
		});
		$(uiShowArea).append(showuicode.clone(true));
		$(uiShowArea).append(code.clone(true));
		//取消所有选中
		$("div[isSelect=1]").each(function(){
			uiSelect($(this));
		});
	});
}
//选中或取消选中 ui片段
function uiSelect(obj){
	console.log("uiSelect...");
	event.stopPropagation();
   	var selected = $(obj).attr("isSelect");
   	if(selected==0){//未选中，改为选中
   		$(obj)[0].style.color = "red";
   		$(obj).attr("isSelect",1);
   	}else{//选中改为未选中
   		$(obj)[0].style.color = "black";
   		$(obj).attr("isSelect",0);
   	}
}
//生成文件
function produceFile(obj){
	console.log("produceFile...");
	event.stopPropagation();
	var uicodearr=new Array();
	var uicodes = $("#uiShowArea").find("[name=code]");
	$(uicodes).each(function(){
		var code=new Object();
		code.uicode = $(this).html();
		code.id = $(this).attr("uiid");
		uicodearr.push(code);
	});
	if(uicodearr.length>0){
		var htmlpath=$("#htmlpath").val(); 
		var javapath=$("#javapath").val();
		var data=new Object();
		data.htmlpath=htmlpath;
		data.javapath=javapath;
		data.uicodearr=uicodearr;
		var url="/UIEditor/index/produceFile";
		var result = getDataByUrlParam(url,data);
		if(result.flag=="ok"){
			layer.alert("文件生成成功！",{icon: 1});
		}
	}
}
/**=============================== ui片段选择区操作==================================结束**/

/**=============================== ui片段编辑区操作==================================开始**/
//点击选中ui片段
function uiclick_f(obj){
	console.log("uiclick_f...");
	event.stopPropagation();
	//layer.alert($(obj).attr("uiname"),{icon: 1});
	//恢复所有showui边框
	restoreSelected();
	//给当前ui设置选中边框,并设置选中标识
	$(obj).addClass("uiselectedborder");
	$(obj).attr("uiselected","true");
}
//双击初始化ui片段
function uiclick_dbf(obj){
	console.log("uiclick_dbf...");
	event.stopPropagation();
	if($(obj).attr("uiname")=="Foreach"){
		//给初始化foreach片段
		initForeach();
	}
}
$(function(){
	$("#uiShowpanel").click(function(){
		console.log("uiShowpanel被点击了");
		beforeRestoreSelected();
		restoreSelected();		
	});
});
//恢复所有ui片段的边框
function restoreSelected(){
	console.log("restoreSelected...");
	event.stopPropagation();
	//恢复所有showui边框
	$("#uiShowArea").children("[name=showui]").each(function(){
		$(this).removeClass("uiselectedborder");
		$(this).removeAttr("uiselected");
	});
	//移除选中背景
	$(".tdselectedbg").removeClass("tdselectedbg");
}
//把更改的操作更新到真实code上
function beforeRestoreSelected(){
	console.log("beforeRestoreSelected...");
	event.stopPropagation();
	var selectedui = $("[uiselected=true]").attr("uiname");
	if(selectedui!=undefined && selectedui!=null){
		//如果当前是选中的foreach
		if(selectedui=="Foreach"){
			editForeachCode();
		}
	}
}
/**=============================== ui片段编辑区操作==================================结束**/