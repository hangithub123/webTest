//弾出指定祝圏解析器返回的更面。
function doShowDialog(url,id,title,width,height,end){
		if(width==null||width==""){width='250px';}
		if(height==null||height==""){height='250px';}
		  top.layer.open({
			 offset:  ['0px', '0px'],
			 id: "PopDialog"+id,
			 type:2,
			  title: title,
			  content: url,
			  maxmin: true, 
			  offset: 'auto',
			  area: [width, height],
			  end:end
			});
	}
//qq父分享全屏
function doShowDialogqp(url,id,title){
		  top.layer.open({
			 id: "PopDialog"+id,
			 type:2,
			  title: title,
			  content: url,
			  maxmin: true,
			  area: ['300px', '624px'],
			  success: function(layero,index){
                //在回调方法中的第2个参数“index”表示的是当前弹窗的索引。
                //通过layer.full方法将窗口放大。
                layer.full(index);
               }
			});
	}
//关闭弹出层
function doCloseDialog(id){
	var index = parent.layer.getFrameIndex(id);
	parent.layer.close(index);
}
 

