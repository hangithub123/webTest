//上传
function uploadFile(url){  
    //获得上传文件  
    $.ajax({  
        url: url,  
        type: 'POST',  
        cache: false,  
        data: new FormData($('#form')[0]),  
        processData: false,  
        contentType: false,  
        success:function(result){  
           // alert("文件上传"+result.flag);  
        }  
    });   
} 

//校验文件是否上传
function fjcount(){
	var file1 = $("#wjb").val();
	var file2 = $("#file").val();
	if ((file1 == null || file1 == '')&&(file2 == null || file2 == '')) {
		popAlert(form.file,"附件不能为空！");
		return true;
	}
	return false;
} 

//允许文件为空时的校验
function fjcount2(){
	var file1 = $("#wjb").val();
	var file2 = $("#file").val();
	if ((file1 == null || file1 == '')&&(file2 == null || file2 == '')) {
		return true;
	}
	return false;
} 