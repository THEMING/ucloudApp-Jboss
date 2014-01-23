/**
 * 
 */
package com.unicom.ucloud.eom.upload;
import java.io.DataInputStream;
import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import com.ucloud.paas.proxy.file.FileInfo;
import com.ucloud.paas.proxy.file.UploadFileInfo;
import com.unicom.ucloud.util.Config;


/**
 * @author zouqone
 * @see 文件上传
 */
@SuppressWarnings("serial")
public class UploadAction extends HttpServlet {
	@SuppressWarnings("unchecked")
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
		
		Logger logger = Logger.getLogger(this.getClass());
		//BaseAction baseAction = new BaseAction();
		
		//Resource uploadprop = new ClassPathResource("file.properties");
        //Properties properties = new Properties();
        //properties.load(uploadprop.getInputStream());
		
		/*String folder=null;//存储区名
		folder=(String)request.getParameter("folder"); //获取存储取名
		String  ps=(String)request.getParameter("params");
		String [] params=ps.split(",");
		//folder=params[0];
		
		//遍历各个参数，第一个参数为存储区名，其他的参数为扩展参数
		for (String param : params) {
			logger.debug.print(param+" ");
		}*/
        
		//获取文件上传队列
        DiskFileItemFactory fac = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(fac);
        upload.setHeaderEncoding("utf-8");
        List<FileItem> fileList = null;
        try {
            fileList = upload.parseRequest(request);
        } catch (FileUploadException ex) {
            return;
        }
        
        Iterator<FileItem> it = fileList.iterator();
        
        //String storageName = properties.getProperty("upload.workspace");//存储区
        String []ps = request.getParameter("params").split(",");
        String storageName = Config.getProperty("upload.workspace");//存储区
        String operator = ps[3];
        //JSONObject accountObj = new JSONObject();
        //String operator=null;  //操作人
		/*try {
			logger.debug("session1:"+request.getSession().getId());
			accountObj = baseAction.getLogonAccount(request, response);
			operator = String.valueOf(accountObj.getInt("cloudUserId")); //操作人ID
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServletException(e.getMessage());
		}*/
        
       
        String descriptions="";   //文件描述
        String uuid="";   //文件对象UUID队列
        UploadFileInfo info=new UploadFileInfo();  //文件上传信息
        PaaSFileVo paaSFileVo=new PaaSFileVo();   //文件服务对象
        PaaSUploadService service=new PaaSUploadService();  //文件上传服务
        FileItem item = null;  //文件上传队列
        FileInfo fileInfo = null;
        List<FileInfo> fileInfolist= new ArrayList<FileInfo>();
        
        //调用文件服务进行文件上传操作
        while (it.hasNext()) {
            item = it.next();
            if (!item.isFormField()) {
            	descriptions=item.getName()+" Upload Date :"+(new Date(0));
                info.setFileName(item.getName());
                info.setDesc(descriptions);
                info.setFileSize(item.getSize());
                info.setKeywords(item.getName());
                info.setOperator(operator);
                
                //装载上传信息进入上传服务对象
                paaSFileVo.setStorageName(storageName);
                paaSFileVo.setInfo(info);
                paaSFileVo.setInput( new DataInputStream(item.getInputStream()));
                
                //开始上传
                service.setPaasFileVo(paaSFileVo);
                uuid=service.PaaSUpload();
                
                fileInfo=new FileInfo();
                fileInfo.setFileName(info.getFileName());
                fileInfo.setFileSize(info.getFileSize().toString());
                fileInfo.setDesc(info.getDesc());
                fileInfo.setCreateTime(new Date(0).toString());
                fileInfo.setKeywords(info.getKeywords());
                fileInfo.setModifyTime(new Date(0).toString());
                fileInfo.setFileUUID(uuid);
                fileInfolist.add(fileInfo);
                
                //参数
                String paramres="";
                String param1="paramsvalue1";
                String param2="paramsvalue2";
                logger.info("uuid-->"+uuid);
                //将参数拼接成JSON对象
                paramres="[{" +
                		"uuid:\""+uuid+
                		"\",param1:\""+param1+
                		"\",param2:\""+param2+
                		"\"}]";
                response.getWriter().print(paramres);
            }
        }
    }
}


