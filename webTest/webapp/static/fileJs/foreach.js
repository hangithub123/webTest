/**
 * 元素可 新增、删除，更新。 
 */

/**
 * ================================对tr，td/th的操作==========================================================================================开始
 * @param uiname
 * @returns
 */
function initForeach(){
	console.log("initForeach...");
	event.stopPropagation();
	//给showui加编号
	addNumbersToUi();
	//添加可编辑按钮
	initUiOperation();
}
//给showui加编号
function addNumbersToUi(){
	console.log("addNumbersToUi...");
	var i=1;
	$("[uiselected=true][uiname=Foreach]").find("tr").each(function(){
		var trbh="tr"+i;
		$(this).attr("trbh",trbh);
		i++;
		var j=1;
		$(this).find("th,td").each(function(){
			$(this).attr("tdbh",trbh+"_"+j);
			j++;
		});
	});
	//给显示代码第一行th加宽度
	var tharr = $("[uiselected=true][uiname=Foreach]").find("tr").eq(0).children("th");
	if(tharr!=null && tharr.length>0){
		var width=Math.floor(100/(tharr.length))+"%";
		for(var i=0;i<tharr.length;i++){
			$(tharr[i]).attr("width",width);
		}
	}
	//真实代码第一行加宽度
	var tharr2 = $("[uiselected=true][uiname=Foreach]").next().find("tr").eq(0).children("td");
	if(tharr2!=null && tharr2.length>0){
		var width=Math.floor(100/(tharr2.length))+"%";
		for(var i=0;i<tharr2.length;i++){
			$(tharr2[i]).attr("width",width);
		}
	}
}
//给ui设置可编辑操作
function initUiOperation(){
	console.log("initUiOperation...");
	event.stopPropagation();
	//操作有增加按钮、链接、输入框、日期、显示文本、固定长度的文本、复选框、单选框、
	//增加列、设置列名
		//清除修改按钮
		$("[trbs=1]").remove();
		$("[trbs=2]").remove();
		//添加修改按钮
		$("[uiselected=true][uiname=Foreach]").find("th").each(function(){
			$(this).append($("<a href='###' name='Foreach_button' onclick='foreachButtonClick1(this)' trbs=1><img src='/UIEditor/static/images/icon16_edit.gif'/></a>"));
		});
		$("[uiselected=true][uiname=Foreach]").find("td").each(function(){
			$(this).append($("<a href='###' name='Foreach_button' onclick='foreachButtonClick2(this)' trbs=2><img src='/UIEditor/static/images/icon16_edit.gif'/></a>"));
		});
		//右侧编辑栏增加一‘添加列’按钮
		if($("#addRow").length==0)
		$("#editui").append($("<div id='addRow' onclick='addRow()' class='btn btn-success btn-sm' href='###'>添加列</div>"));
		//编辑栏增加‘删除列’按钮
		if($("#deleteRow").length==0)
		$("#editui").append($("<div id='deleteRow' onclick='deleteRow()' class='btn btn-success btn-sm' href='###'>删除列</div>"));
}
//Foreach 的第一个tr修改按钮操作
function foreachButtonClick1(obj){
	console.log("foreachButtonClick1...");
	event.stopPropagation();
	var oldtext = $(obj).parent().contents().filter(function(){ 
	       return this.nodeType == 3; 
	}).text();
	$(obj).parent().contents().filter(function(){ 
			this.nodeValue='';
	});
	$(obj).parent().prepend($("<input name='inputname1' style='width:80px;' value='"+oldtext+"'/>"));
}

//Foreach 的第2个tr修改按钮操作
function foreachButtonClick2(obj){
	console.log("foreachButtonClick2...");
	event.stopPropagation();
	//清除当前tr下所有td的背景
	$(obj).parents("tr").children("td").removeClass("tdselectedbg");
	//设置当前td选中
	$(obj).parent("td").addClass("tdselectedbg");
	//移除右侧编辑框内容
	$("#editui").children(":not(#addRow,#deleteRow)").remove();
	//获取当前td下的所有元素（有id和name），复制一份到右侧编辑框
	var editui = $("#editui");
	//设置foreach的可选元素
	var element2=addUiAndCode();
	editui.append(element2);
}

//showui添加列
function addRow(){
	console.log("addRow...");
	event.stopPropagation();
	//showuii添加列
	var a1 = $("<a href='###' name='Foreach_button' onclick='foreachButtonClick1(this)' trbs=1><img src='/UIEditor/static/images/icon16_edit.gif'/></a>")
	var th = $("<th style='text-align:center;'>列名</th>");
	$(th).append(a1);
	$("[uiselected=true][uiname=Foreach]").find("tr").eq(0).append($(th));
	var a2 = $("<a href='###' name='Foreach_button' onclick='foreachButtonClick2(this)' trbs=1><img src='/UIEditor/static/images/icon16_edit.gif'/></a>")
	var td = $("<td></td>");
	$(td).append(a2);
	$("[uiselected=true][uiname=Foreach]").find("tr").eq(1).append($(td));
	//真实代码添加列
	$("[uiselected=true][uiname=Foreach]").next().find("tr").eq(0).append($("<td>列名</td>"));
	$("[uiselected=true][uiname=Foreach]").next().find("tr").eq(0).append("\n");
	$("[uiselected=true][uiname=Foreach]").next().find("tr").eq(1).append($("<td></td>"));
	$("[uiselected=true][uiname=Foreach]").next().find("tr").eq(1).append("\n");
	//分页合并列数增加
	setSplitPageColspan();
	//重新增加编号
	addNumbersToUi();
};
//删除列
function deleteRow(){
	layer.prompt({formType: 0,title: '请输入列顺序号，多个列用英文逗号分割。',value:'1,2'},function(val, index){
	  var rowarr = val.split(",");
	  for(var i=0;i<rowarr.length;i++){
		  var row=parseInt(rowarr[i]);
		  row-=i;
		  //删除showui列
		  $("[uiselected=true][uiname=Foreach]").find("tr").eq(0).children("th").eq(row-1).remove();
		  $("[uiselected=true][uiname=Foreach]").find("tr").eq(1).children("td").eq(row-1).remove();
		  //删除真实代码lie
		  $("[uiselected=true][uiname=Foreach]").next().find("tr").eq(0).children("td").eq(row-1).remove();
		  $("[uiselected=true][uiname=Foreach]").next().find("tr").eq(1).children("td").eq(row-1).remove();
	  }
	  layer.msg('删除了第'+val+"列");
	  layer.close(index);
	  //分页合并列数重置
	  setSplitPageColspan();
	  //重新增加编号
	  addNumbersToUi();
	});
}
//分页合并列数设置
function setSplitPageColspan(){
	var len = $("[uiselected=true][uiname=Foreach]").next().find("tr").eq(0).children().length;
	//分页合并列数增加
	var splitpageinfo = $("[uiselected=true][uiname=Foreach]").next().find("tr:last").children("td");
	$(splitpageinfo).attr("colspan",len);
}
/**
 * ==============================对tr，td/th的操作======================================================================================结束
 * @param uiname
 * @returns
 */

/**
 * ==============================对td内的元素的操作=====================================================================================开始
 * @param uiname
 * @returns
 */
//获取可选的showui,这里的ui有 初始化、新增状态
function addUiAndCode(){
	console.log("addUiAndCode...");
	event.stopPropagation();
	var foreach=$("<div></div>");
	var arr =["DirectLink","Calendar","TextField","Insert","CacheCode","RadioGroup","CheckboxGroup"];
	var classbtn="";
	for(var i=0;i<arr.length;i++){
		if(arr[i]=="Insert"){
			classbtn="btn btn-default btn-sm";
		}
		getUiAndCode(foreach,arr[i],classbtn);
		classbtn="";
	}
	//单选按钮、复选按钮
	
	return foreach;
}
function getUiAndCode(foreach,codename,classbtn){
	var obj=$("#uiChangeArea").find("[name=uiChangeArea_"+codename+"]");
	var showui = $(obj).children("[name=showuicode]").children().clone(true);
		$(showui).attr("showuiname",codename);
		$(showui).addClass(classbtn);
	var code = $(obj).children("[name=code]").clone(true);
	$(showui).bind("dblclick",function(){
		addUiToShowArea(this);
	});
	$(foreach).append($(showui));
	$(foreach).append($(code));
	$(foreach).append("<br/>");
}
//编辑框内showui双击,添加到左侧ui片段内
function addUiToShowArea(obj){
	console.log("addUiToShowArea...");
	event.stopPropagation();
	//设标签颜色以及状态为选中
	$(obj).css("color","red");
	var cloneobj = $(obj).clone(true)
	$(cloneobj).unbind("dblclick");
	$(cloneobj).bind("click",function(){
		editElement(this);
	});
	$(cloneobj).bind("dblclick",function(){
		deleteElement(this);
	});
	//给选中ui赋id
	var elenum = $(".tdselectedbg").children().length;
	var tdbh = $(".tdselectedbg").attr("tdbh")+"_"+elenum;
	$(cloneobj).attr("id",tdbh);
	//插入
	$(".tdselectedbg").children("[name=Foreach_button]").before($(cloneobj));
	//给插入的元素设置宽度限制
	if(elenum>0){
		var width =100/(elenum)+"%";
		$(".tdselectedbg").children().not("[name=Foreach_button]").each(function(){
			$(this).css("width",width);
		})
	}
	//获取真实的代码
	var realcode = $(obj).nextAll("[name=code]").eq(0).children().clone(true);
	var codename=$(realcode).attr("jwcid").split("@")[1];
	//如果是单选或复选按钮，则取其中的代码更新到真实代码中，外部代码则包围真实的foreach列表
	if(codename.indexOf("RadioGroup")>0||codename.indexOf("CheckboxGroup")>0){
		var wbdm = $(realcode).clone(true);
		realcode=$(realcode).children();
		//外部包围
		$(wbdm).empty();
		var realcode_tbody=$("[uiselected=true][uiname=Foreach]").next().find("tbody");
		var realcode_tr0=$("[uiselected=true][uiname=Foreach]").next().find("tbody").children().eq(0);
		$(wbdm).append("\n");
		$(wbdm).append($(realcode_tr0));
		$(wbdm).append("\n");
		$(realcode_tbody).prepend($(wbdm));
		$(realcode_tbody).prepend("\n");
	}
	//设置id
	$(realcode).attr("jwcid",codename+tdbh+"@"+codename);
	//更新到真实代码中
	editForeachCode2(tdbh,realcode,"addOrUpdate");
}
//td内的元素绑定点击事件
var TimeFn = null;
function editElement(obj){
	event.stopPropagation();
	clearTimeout(TimeFn);
	TimeFn = setTimeout(function(){
		//do function在此处写单击事件要执行的代码
	console.log("editElement...");
	//移除右侧编辑框td可选元素
	$("#editui").children(":not(#addRow,#deleteRow)").remove();
	//添加当前元素可编辑操作
	var showuiname = $(obj).attr("showuiname");
	$("#editui").append($("<br/><br/>"));
	var flag=false;
	//链接
	if(showuiname=="DirectLink"){
		flag=true;
		//链接，更改文本、添加图标、指定value值、指定参数值、指定后台监听方法、添加弹出框、删除操作
		var listener=$(obj).attr("listener");
		var parametes=$(obj).attr("parameters");
		var text=$(obj).text();
		if(text==undefined)text="";
		if(listener==undefined)listener="";
		if(parametes==undefined)parametes="";
		$("#editui").append($("<span>text:</span><input name='modify' 	ismodifyRealCode=true style='width:30%;margin:2px;' placeholder='text' value='"+text+"' />"));
		$("#editui").append("<br/>");
		$("#editui").append($("<span>listener:</span><input name='modify' ismodifyRealCode=true style='width:30%;margin:2px;' placeholder='listener' value='"+listener+"' />"));
		$("#editui").append("<br/>");
		$("#editui").append($("<span>parametes:</span><input name='modify' ismodifyRealCode=true style='width:30%;margin:2px;' placeholder='parameters' value='"+parametes+"' />"));
		$("#editui").append("<br/>");
	}
	//文本
	if(showuiname=="Insert"){
		flag=true;
		var value=$(obj).val();
		var text=$(obj).text();
		$("#editui").append($("<span>描述:</span><input name='modify' ismodifyRealCode=false style='width:30%;margin:2px;' placeholder='text' value='"+text+"' />"));
		$("#editui").append($("<span>value:</span><input name='modify' ismodifyRealCode=true style='width:30%;margin:2px;' placeholder='value' value='"+value+"' />"));
	}
	// 
	if(flag)
	$("#editui").append($("<a  class='btn btn-success btn-sm'  showuiname="+showuiname+" href='###' id="+$(obj).attr("id")+"  onclick='modifyProperty(this)'>保存</a>"));
    },450);
}
//修改属性
function modifyProperty(obj){
	var tdbh=$(obj).attr("id");//显示代码的id
	var showobj=$("#"+$(obj).attr("id"));
	var readid=$(obj).attr("showuiname")+$(obj).attr("id");//真实代码的id
	var realobj=$("[jwcid^="+readid+"]");//真实代码对象
	$(obj).prevAll("[name=modify]").each(function(){
		if($(this).attr("placeholder")=="text"){
			//更新显示的代码
			$(showobj).text($(this).val())
			if($(this).attr("ismodifyRealCode")=="true"){
				//更新真实的代码
				$(realobj).text($(this).val());
			}
		}else{
			//更新显示的代码
			$(showobj).attr($(this).attr("placeholder"),$(this).val())
			if($(this).attr("ismodifyRealCode")=="true"){
				//更新真实的代码
				$(realobj).attr($(this).attr("placeholder"),$(this).val());
			}
		}
	});
	layer.tips('已修改', '#'+tdbh, {
		  tips: 1
	});
}
//删除元素
function deleteElement(obj){
	event.stopPropagation();
	console.log("deleteElement...");
	clearTimeout(TimeFn);
	if(!confirm("确定要删除该元素吗？"))return false;
	//删除真实代码
	var id = $(obj).attr("id");
	var name = $(obj).attr("showuiname");
	$("[jwcid^="+name+id+"]").remove();
	//删除showui
	$(obj).remove();
	
}
/**
 * ===============================对td内的元素的操作==========================================================================================结束
 * @param uiname
 * @returns
 */

/**
 * ===============================把showui上的更改同步到真正的代码中===========================================================================开始
 */
function editForeachCode(){
	//移除foreach的可编辑的框
	$("[name='inputname1']").each(function(){
		var text = $(this).val();
		$(this).parent().contents().filter(function(){ 
			this.nodeValue=text;
		});
		$(this).remove();
	});
	//移除foreach的修改按钮
	$("[name=Foreach_button]").remove();
	//把第一行的th名字赋给真实代码
	var n=0;
	$("[uiselected=true][uiname=Foreach]").find("th").each(function(){
		$("[uiselected=true][uiname=Foreach]").next().find("tr.DataHead").children("td").eq(n).text($(this).text());
		n++;
	});
	//移除右侧编辑框内容
	$("#editui").children().remove();
}
/**
 * 		把新的ui片段更新到真实的代码中。
 * 		真实代码在显示代码的下方
 * @param tdbh 编号:tr_1_1
 * @param obj 为组装好的真实代码
 * @param action
 * @returns
 */
function editForeachCode2(tdbh,obj,action){//obj为组装好的真实代码
	var arr = tdbh.split("_");
	var tdsite = arr[1];//td位置
	var tdElementSite = arr[2];//td内元素的位置
	//找到tr2和要插入的td
	var tr2 = $("[uiselected=true][uiname=Foreach]").find("tr[trbh=tr2]");
	var inserttd = $(tr2).children("td").eq(tdsite-1);
	var jwcid = $(obj).attr("jwcid").split("@")[0];
	if(jwcid.indexOf(":")>0){
		jwcid=jwcid.split(":")[1];
	}
	//根据uicode名+位置，组成的id，元素存在则替换，不存在则新增
	if(action=="addOrUpdate"){
		var len=$(inserttd).children("[jwcid$="+jwcid+"]").length;
		if(len>0){//替换
			var oldelement = $("[jwcid="+jwcid+"]");
			$(oldelement).after($(obj));
			$(oldelement).remove();
		}else{//新增
			var realtd = $("[uiselected=true][uiname=Foreach]").next().find("tr").eq(1).children("td").eq(tdsite-1);
			if($(realtd).children().length==0){
				$(realtd).append("\n");
			}
			$(realtd).append($(obj));
			$(realtd).append("\n");
		}
	}else if(action=="delete"){
		$("[jwcid="+jwcid+"]").remove();
	}
}
/**
 * =================================把showui上的更改同步到真正的代码中====================================================================结束
 */