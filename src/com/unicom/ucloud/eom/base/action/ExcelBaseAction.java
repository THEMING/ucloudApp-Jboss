package com.unicom.ucloud.eom.base.action;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;

import com.unicom.ucloud.eom.base.common.CalendarHelper;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.eom.base.service.IExportElsService;
import com.unicom.ucloud.eom.base.service.IReadElsService;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.ExcelUtil;

/**
 * 上传文件
 * 
 * @version 1.0
 * @date 2013-1-16
 * @author feng.yang
 */
@Controller
@RequestMapping("/excel")
public class ExcelBaseAction extends BaseAction {

    @Autowired
    private WebApplicationContext context;

    /**
     * 查询列表
     * 
     * @param request
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/readExcel.json", method = RequestMethod.POST)
    public String readExcel(@RequestParam("fileData") MultipartFile file,
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 从request获取参数(前台统一传json字符串jsonStr)
        logger.debug("上传文件：" + file.getOriginalFilename());

        JSONObject param = getParam(request);
        logger.debug("param：" + param);
        
        boolean isDirect = false;
        if (!CommonUtils.isEmpty(JsonUtil.getBoolean(param, "isDirect"))) {
            isDirect = param.getBoolean("isDirect");
        }

        String serviceClass = JsonUtil.getString(param, "serviceClass");
        if (CommonUtils.isEmpty(serviceClass)) {
            return null;
        }
        IReadElsService service = (IReadElsService) context.getBean(Class.forName(serviceClass));

        List<Map<String, Object>> data = null;
        InputStream in = null;
        try {
            in = file.getInputStream();
            // 得到Excel工作簿对象
            Workbook wwb = WorkbookFactory.create(in);

            data = service.readExcel(param, wwb);

        } finally {
            // 关闭Excel工作薄对象
            if (in != null) {
                in.close();
            }
        }

        JSONObject json = new JSONObject();
        int total = 0;
        if (!CommonUtils.isEmpty(data)) {
            total = data.size();
        }
        
        if (CommonUtils.isEmpty(data)) {
            json.put("rows", data);
            json.put("total", total);
            json.put("msg", "success");
            json.put("success", true);
        } else {

            // 如果是直接入库
            if (isDirect) {
                // 数据检查
                String msg = service.validate(param, data);

                // 没有返回表示检查通过
                if (CommonUtils.isEmpty(msg)) {
                    msg = service.saveImportData(param, data);
                    //json.put("rows", data);
                    json.put("total", total);
                    json.put("msg", msg);
                    json.put("success", true);
                } else {
                    json.put("msg", msg);
                    json.put("success", false);
                }

            } else {
                // 如果是先读取到页面

                json.put("rows", data);
                json.put("total", total);
                json.put("msg", "success");
                json.put("success", true);
            }
        }

        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().print(json.toString());

        return null;
    }

    /**
     * 下载excel文件
     * 
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/exportExcel.do", method = RequestMethod.POST)
    public String export(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String jsonStr = request.getParameter("jsonStr");
        JSONObject param = new JSONObject(jsonStr);
        logger.debug("param：" + param);

        String serviceClass = JsonUtil.getString(param, "serviceClass");
        if (CommonUtils.isEmpty(serviceClass)) {
            return null;
        }
        IExportElsService service = (IExportElsService) context
                .getBean(Class.forName(serviceClass));

        String fileName = JsonUtil.getString(param, "fileName");
        // 为空时使用默认的文件名
        if (CommonUtils.isEmpty(fileName)) {
            fileName = getDefaultFileName();
        } else {
            // 如果带后缀则去掉
            if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
                fileName = fileName.substring(0, fileName.lastIndexOf("."));
            }
        }
        fileName = fileName + ExcelUtil.EXCEL_FILE_SUFFIX;

        OutputStream os = null;
        try {
            os = response.getOutputStream();
            Workbook wwb = new HSSFWorkbook();
            response.reset();
            response.setHeader("Content-Disposition",
                    "attachment; filename=" + new String(fileName.getBytes("gbk"), "iso-8859-1"));
            response.setContentType("application/octet-stream; charset=utf-8");
            service.exportExcel(param, wwb);
            wwb.write(os);
            os.flush();
        } finally {
            if (os != null)
                os.close();
        }

        return null;

    }

    /**
     * 使用当前日期初始化一个默认的excel文件
     * 
     * @return
     * @author feng.yang
     * @see
     * @since
     */
    private String getDefaultFileName() {
        Calendar today = Calendar.getInstance();
        return CalendarHelper.formatDate(today.getTime(), "yyyyMMddHHmmss");
    }

}