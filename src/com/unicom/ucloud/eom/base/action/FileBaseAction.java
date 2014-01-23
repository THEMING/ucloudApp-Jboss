package com.unicom.ucloud.eom.base.action;

import java.io.DataInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.ucloud.paas.proxy.file.DownloadFileInfo;
import com.ucloud.paas.proxy.file.FileService;
import com.ucloud.paas.proxy.file.UploadFileInfo;
import com.unicom.ucloud.util.Config;
import com.unicom.ucloud.util.JsonUtil;

/**
 * 文件上传下载处理类
 * 
 * @version 1.0
 * @date 2013-1-16
 * @author feng.yang
 */
@Controller
@RequestMapping("/file")
public class FileBaseAction extends BaseAction {

    /**
     * 下载文件
     * 
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/download.json", method = RequestMethod.POST)
    public String downloadFile(final HttpServletRequest request, final HttpServletResponse response)
            throws Exception {

        String jsonStr = request.getParameter("jsonStr");
        JSONObject param = new JSONObject(jsonStr);

        logger.debug(param);

        FileService fs = new FileService();
        DownloadFileInfo dfi = null;

        OutputStream os = response.getOutputStream();
        InputStream in = null;
        try {
            // 文件ID
            String uuid = JsonUtil.getString(param, "fileId");
            dfi = fs.download(uuid);

            response.reset();
            response.setHeader("Content-Disposition", "attachment; filename="
                    + new String(dfi.getFileName().getBytes("gbk"), "iso-8859-1"));
            response.setContentType("application/octet-stream; charset=utf-8");
            // 读取文件
            in = dfi.getInput();
            int bytes = 0;
            byte[] bufferOut = new byte[1024]; // 可以根据实际情况调整，建议使用1024，即每次读1KB
            while ((bytes = in.read(bufferOut)) != -1) {
                os.write(bufferOut, 0, bytes);
            }
            os.flush();
            in.close();
            os.close();
        } finally {
            if (os != null) {
                os.close();
            }
            if (in != null) {
                in.close();
            }
        }

        return null;

    }

    /**
     * 多文件上传
     * 
     * @param request
     * @param name
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/multipartFileUpload.json", method = RequestMethod.POST)
    @ResponseBody
    public String uploadMltFiles(MultipartHttpServletRequest request,
            final HttpServletResponse response) throws Exception {
        // 页面上的控件值
        JSONObject param = this.getParam(request);

        logger.debug("param:" + param);

        /*Resource uploadprop = new ClassPathResource("file.properties");
        Properties properties = new Properties();
        properties.load(uploadprop.getInputStream());*/

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        List<MultipartFile> files = request.getFiles("fileData");// Filedata

        FileService fs = new FileService();

        //String workSpace = properties.getProperty("upload.workspace");
        String workSpace = Config.getProperty("upload.workspace");
        for (int i = 0; i < files.size(); i++) {
            if (!files.get(i).isEmpty()) {

                //String oper = this.getLogonAccount(request, response).getString("userId");
							  String oper = String.valueOf(this.getLogonAccount(request, response).getInt("cloudUserId"));


                String fileName = files.get(i).getOriginalFilename();
                logger.info("上传文件：" + fileName);

                String filename = fileName;
                String keywords = fileName;
                String desc = fileName;

                UploadFileInfo ufi = new UploadFileInfo();
                ufi.setFileName(filename);
                ufi.setKeywords(keywords);
                ufi.setDesc(desc);
                ufi.setOperator(oper);

                DataInputStream in = new DataInputStream(files.get(i).getInputStream());
                String uuid = fs.upload(workSpace, ufi, in);

                in.close();

                Map<String, Object> fileData = new HashMap<String, Object>();
                fileData.put("fileId", uuid);
                fileData.put("fileName", files.get(i).getOriginalFilename());

                list.add(fileData);
            }
        }
        JSONObject json = new JSONObject();
        json.put("success", true);//
        json.put("rows", list);
        json.put("total", list.size());
        return json.toString();
    }

}
