

//获取文件信息返回文件信息(json对象) 
//如：{name:'hot.jsp',size:1232,type:'jsp',uuid:'4464778a-00a2-4700-bb25-02febc4e73c2'};
function getFileInfo() {
 	return uploadfileInfo;
}
//返回文件数目
function getFileCount() {
 	return fileUploadCount;
}

//初始化文件队列信息，可以不执行
function setFileInfo(fileInfo){
	uploadfinishfile=fileInfo;
}

//清除上传历史记录
function clearFileList(){
	uploadfinishfile=new Array();
	uploadfileInfo=new Array();
	fileUploadCount=0;
}