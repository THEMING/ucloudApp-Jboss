package com.unicom.ucloud.eom.commondata.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.util.JsonUtil;
 
/**
 * 4A服务读取组织用户信息
 * 
 * @version 1.0
 * @date 2013-3-10
 * @author feng.yang
 */
@Controller
@RequestMapping("/commonData/proxy4AArea")
public class Proxy4AAreaAction extends BaseAction {

    /**
     * 根据ID查询下级省份
     * 
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @author feng.yang
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/findProvinceByParentId", method = RequestMethod.POST)
    @ResponseBody
    public String findProvinceByParentId(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        JSONObject account = getLogonAccount(request, response);

        logger.debug(account);

        // 从request获取参数(前台统一传json字符串jsonStr)
        JSONObject jsonObj = getParam(request);
        String provinceId = null;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "node"))) {
            provinceId = JsonUtil.getString(jsonObj, "node");
        }

        boolean singleSelect = false;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "singleSelect"))) {
            singleSelect = JsonUtil.getBoolean(jsonObj, "singleSelect");
        }

        List<Map<String, Object>> proviceList = new ArrayList<Map<String, Object>>();

        if (provinceId.equals("0000")) {
            Map<String, Object> row = new HashMap<String, Object>();

            row.put("id", "100");

            row.put("parentId", "0000");

            row.put("text", "联通集团");

            row.put("leaf", 0);

            proviceList.add(row);
        } else {
            String ids = "101,102,103,104,105";
            String names = "北京,上海,广东,江苏,浙江";

            String[] provinceIds = ids.split(",");
            String[] provinceNames = names.split(",");
            for (int i = 0; i < provinceIds.length; i++) {
                Map<String, Object> row = new HashMap<String, Object>();

                row.put("id", provinceIds[i]);

                row.put("parentId", "100");

                row.put("text", provinceNames[i]);

                row.put("leaf", 1);

                proviceList.add(row);
            }
        }

        List<JSONObject> orgList = new ArrayList<JSONObject>();

        if (!CommonUtils.isEmpty(proviceList)) {
            for (Map<String, Object> p : proviceList) {
                JSONObject node = JsonUtil.convert(p);

                if (!singleSelect) {
                    node.put("checked", false);
                }
                orgList.add(node);
            }
        }

        JSONArray result = new JSONArray(orgList);

        return result.toString();

    }

    /**
     * 根据ID查询下级省份
     * 
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @author feng.yang
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/findCityByParentId", method = RequestMethod.POST)
    @ResponseBody
    public String findCityByParentId(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        // 从request获取参数(前台统一传json字符串jsonStr)
        JSONObject jsonObj = getParam(request);
        String provinceId = null;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "node"))) {
            provinceId = JsonUtil.getString(jsonObj, "node");
        }

        boolean singleSelect = false;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "singleSelect"))) {
            singleSelect = JsonUtil.getBoolean(jsonObj, "singleSelect");
        }

        List<Map<String, Object>> proviceList = new ArrayList<Map<String, Object>>();

        if (provinceId.equals("0000")) {
            Map<String, Object> row = new HashMap<String, Object>();

            row.put("id", "100");

            row.put("parentId", "0000");

            row.put("text", "联通集团");

            row.put("leaf", 0);

            proviceList.add(row);
        } else if (provinceId.equals("103")) {
            String ids = "1031,1032,1033,1034,1035,1036";
            String names = "广州,深圳,珠海,汕头,佛山,湛江";

            String[] provinceIds = ids.split(",");
            String[] provinceNames = names.split(",");
            for (int i = 0; i < provinceIds.length; i++) {
                Map<String, Object> row = new HashMap<String, Object>();

                row.put("id", provinceIds[i]);

                row.put("parentId", "103");

                row.put("text", provinceNames[i]);

                row.put("leaf", 1);

                proviceList.add(row);
            }
        } else {

            Map<String, Object> srow = new HashMap<String, Object>();

            srow.put("id", "103");

            srow.put("parentId", "100");

            srow.put("text", "广东");

            srow.put("leaf", 0);

            proviceList.add(srow);

            String ids = "101,102,104,105";
            String names = "北京,上海,江苏,浙江";

            String[] provinceIds = ids.split(",");
            String[] provinceNames = names.split(",");
            for (int i = 0; i < provinceIds.length; i++) {
                Map<String, Object> row = new HashMap<String, Object>();

                row.put("id", provinceIds[i]);

                row.put("parentId", "100");

                row.put("text", provinceNames[i]);

                row.put("leaf", 1);

                proviceList.add(row);
            }
        }

        List<JSONObject> orgList = new ArrayList<JSONObject>();

        if (!CommonUtils.isEmpty(proviceList)) {
            for (Map<String, Object> p : proviceList) {
                JSONObject node = JsonUtil.convert(p);

                if (!singleSelect) {
                    node.put("checked", false);
                }
                orgList.add(node);
            }
        }

        JSONArray result = new JSONArray(orgList);

        return result.toString();

    }
    

    /**
       * 根据ID查询下级省份、地市、区县

       * 
       * @param request
       * @param response
       * @param modelMap
       * @return
       * @author feng.yang xu.hongsheng
       * @throws Exception
       * @see
       * @since
       */
      @RequestMapping(value = "/findCountryByParentId", method = RequestMethod.POST)
      @ResponseBody
      public String findCountryByParentId(HttpServletRequest request, HttpServletResponse response)
              throws Exception {

          // 从request获取参数(前台统一传json字符串jsonStr)
          JSONObject jsonObj = getParam(request);
          String provinceId = null;
          if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "node"))) {
              provinceId = JsonUtil.getString(jsonObj, "node");
          }

          boolean singleSelect = false;
          if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "singleSelect"))) {
              singleSelect = JsonUtil.getBoolean(jsonObj, "singleSelect");
          }

          List<Map<String, Object>> proviceList = new ArrayList<Map<String, Object>>();

          if (provinceId.equals("0000")) {
              Map<String, Object> row = new HashMap<String, Object>();

              row.put("id", "100");

              row.put("parentId", "0000");

              row.put("text", "联通集团");

              row.put("leaf", 0);

              proviceList.add(row);
          } else if (provinceId.equals("103")) {
             
              Map<String, Object> srow = new HashMap<String, Object>();
              srow.put("id", 1031);
              srow.put("parentId", "103");
              srow.put("text", "广州");
              srow.put("leaf", 0);
              proviceList.add(srow);
              
              String ids = "1032,1033,1034,1035,1036";
              String names = "深圳,珠海,汕头,佛山,湛江";
              String[] provinceIds = ids.split(",");
              String[] provinceNames = names.split(",");
              for (int i = 0; i < provinceIds.length; i++) {
                  Map<String, Object> row = new HashMap<String, Object>();

                  row.put("id", provinceIds[i]);

                  row.put("parentId", "103");

                  row.put("text", provinceNames[i]);

                  row.put("leaf", 1);

                  proviceList.add(row);
              }
          } else if (provinceId.equals("1031")) {
              String ids = "10311,10312,10313,10314,10315,10316";
              String names = "天河区,萝岗区,南沙去,海珠区,番禺区,白云区";

              String[] provinceIds = ids.split(",");
              String[] provinceNames = names.split(",");
              for (int i = 0; i < provinceIds.length; i++) {
                  Map<String, Object> row = new HashMap<String, Object>();

                  row.put("id", provinceIds[i]);

                  row.put("parentId", "1031");

                  row.put("text", provinceNames[i]);

                  row.put("leaf", 1);

                  proviceList.add(row);
              }
          } else {

              Map<String, Object> srow = new HashMap<String, Object>();

              srow.put("id", "103");

              srow.put("parentId", "100");

              srow.put("text", "广东");

              srow.put("leaf", 0);

              proviceList.add(srow);

              String ids = "101,102,104,105";
              String names = "北京,上海,江苏,浙江";

              String[] provinceIds = ids.split(",");
              String[] provinceNames = names.split(",");
              for (int i = 0; i < provinceIds.length; i++) {
                  Map<String, Object> row = new HashMap<String, Object>();

                  row.put("id", provinceIds[i]);

                  row.put("parentId", "100");

                  row.put("text", provinceNames[i]);

                  row.put("leaf", 1);

                  proviceList.add(row);
              }
          }

          List<JSONObject> orgList = new ArrayList<JSONObject>();

          if (!CommonUtils.isEmpty(proviceList)) {
              for (Map<String, Object> p : proviceList) {
                  JSONObject node = JsonUtil.convert(p);

                  if (!singleSelect) {
                      node.put("checked", false);
                  }
                  orgList.add(node);
              }
          }

          JSONArray result = new JSONArray(orgList);

          return result.toString();

      }


}
