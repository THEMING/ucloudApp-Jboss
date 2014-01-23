package com.unicom.ucloud.eom.demo.fun1.action;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ucloud.paas.proxy.aaaa.AAAAService;
import com.ucloud.paas.proxy.aaaa.entity.OrgEntity;
import com.ucloud.paas.proxy.aaaa.entity.OrgShortNameEntity;
import com.ucloud.paas.proxy.aaaa.entity.OrgShortNameStructure;
import com.ucloud.paas.proxy.aaaa.entity.OrgStructure;
import com.ucloud.paas.proxy.aaaa.entity.UserEntity;
import com.ucloud.paas.proxy.sysconfig.DataRouteService;
import com.ucloud.paas.proxy.sysconfig.vo.ShardInfoVO;
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
@RequestMapping("/fun1/menu")
public class MenuAction extends BaseAction {
    
    public static final String SESSION_KEY_LOGON_ACCOUNT = "LOGON_ACCOUNT";

    public static final String SESSION_KEY_LOGON_ACCOUNT_JSP = "LOGON_ACCOUNT_JSP";

    public static final String SESSION_KEY_LOGON_USER = "LOGON_USER";

    public static final String SESSION_KEY_LOGON_USER_JSP = "LOGON_USER_JSP";

    public static final String SESSION_KEY_LOGON_ORG = "LOGON_ORG";

    public static final String SESSION_KEY_LOGON_ORG_JSP = "LOGON_ORG_JSP";

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
    @RequestMapping(value = "/queryMenuByParentId", method = RequestMethod.POST)
    @ResponseBody
    public String queryMenuByParentId(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject jsonObj = getParam(request);
        Integer parentId = null;
        if (CommonUtils.isNumeric(JsonUtil.get(jsonObj, "node"))) {
            parentId = JsonUtil.getInt(jsonObj, "node");
        } else {
            parentId = null;
        }
        JSONArray result = new JSONArray(read(parentId));

        return result.toString();

    }

    public List<JSONObject> read(Integer parentId) throws DocumentException, JSONException,
            IOException {
        SAXReader reader = new SAXReader();

        Resource uploadprop = new ClassPathResource("menu.xml");

        File file = uploadprop.getFile();

        List<JSONObject> menuList = new ArrayList<JSONObject>();
        if (file.exists()) {
            Document document = reader.read(file);// 读取XML文件

            // 根节点
            if (parentId == null) {
                Element root = document.getRootElement();// 得到根节点
                JSONObject menu = new JSONObject();
                menu.put("id", root.attributeValue("id"));
                menu.put("text", root.attributeValue("name"));
                menu.put("parentId", root.attributeValue("parentId"));
                int leaf = 1;
                if (root.elements() != null && root.elements().size() >= 1) {
                    leaf = 0;
                }
                menu.put("leaf", leaf);
                menu.put("src", root.attributeValue("src"));

                menuList.add(menu);

                return menuList;
            }
            //
            String path = "//menu[@id='" + parentId.intValue() + "']";
            Element parentElement = (Element) document.selectSingleNode(path);

            List<?> chilren = parentElement.elements();
            if (chilren != null) {
                for (int i = 0; i < chilren.size(); i++) {
                    JSONObject menu = new JSONObject();
                    Element elemet = (Element) chilren.get(i);
                    menu.put("id", elemet.attributeValue("id"));
                    menu.put("text", elemet.attributeValue("name"));
                    menu.put("parentId", elemet.attributeValue("parentId"));
                    int leaf = 1;
                    if (elemet.elements() != null && elemet.elements().size() >= 1) {
                        leaf = 0;
                    }
                    menu.put("leaf", leaf);
                    menu.put("src", elemet.getText());

                    menuList.add(menu);
                }
            }
        }

        return menuList;
    }
    
    @RequestMapping(value = "/menu.json", params = "method=chgUser")
    @ResponseBody
    public String chgUser(HttpServletRequest request) throws Exception {
        JSONObject jsonObj = getParam(request);        
        HttpSession session = request.getSession();
        
        AAAAService aaaaService = new AAAAService();
        if(JsonUtil.getInt(jsonObj, "cloudUserId")!=null){
            int cloudUserId = JsonUtil.getInt(jsonObj, "cloudUserId");
            
            JSONObject userAccount = new JSONObject();
            JSONObject curUser = new JSONObject();
            JSONObject org = new JSONObject();
    
            UserEntity userEntity = aaaaService.findUserbyUserID(cloudUserId);
            if(!CommonUtils.isEmpty(userEntity)){
                if(userEntity.getMobTel() == null || userEntity.getMobTel().length() == 0){
                    logger.debug("移动电话号码为空，使用公司或部门办公电话");
                    userAccount.put("phoneNumber", userEntity.getOfficeTel());
                }else{
                    userAccount.put("phoneNumber", userEntity.getMobTel());
                }
                
                /**
                 *  组织类别
                 *  GroupCompany("1"),   //集团公司
                 *   GroupDept("2"),      //集团公司部门
                 *   ProvinceCompany("3"),   //省分公司
                 *   ProvinceDept("4"),   //省公司部门
                 *   CityCompany("5"),    //地市分公司
                 *   CityDept("6"),   //地市分公司部门
                 *   CountyCompany("7"), //区/县分公司
                 *   CountyDept("8"),     //区/县分公司部门
                 *   AgencyCompany("9"), //代维公司
                 *   AgencyDept("10");    //代维公司部门
                  */
                 OrgEntity orgEntity = aaaaService.findOrgByOrgID(userEntity.getCloudOrgId());
                 if(!CommonUtils.isEmpty(orgEntity)){
                     userAccount.put("orgCategory", orgEntity.getOrgCategory());
                     userAccount.put("orgName", orgEntity.getOrgName());
                     userAccount.put("orgNameDisplay", orgEntity.getOrgNameDisplay());
                     userAccount.put("userDeptName", orgEntity.getOrgName());
                     
                     /**
                      * 组织类别
                      * GroupCompany 集团组织
                      * ProvinceCompany 省份组织
                      * CityCompany 地市组织
                      * CountyCompany 区县组织
                      * AgencyCompany 代维公司
                      */
                     String orgType = "";//组织类别
                     String orgCategory = orgEntity.getOrgCategory();
                     if("1".equals(orgCategory) || "2".equals(orgCategory) || "11".equals(orgCategory) ){
                         orgType = "GroupCompany";
                     }else if("3".equals(orgCategory) || "4".equals(orgCategory) || "12".equals(orgCategory) ){
                         orgType = "ProvinceCompany";
                     }else if("5".equals(orgCategory) || "6".equals(orgCategory)){
                         orgType = "CityCompany";
                     }else if("7".equals(orgCategory) || "8".equals(orgCategory)){
                         orgType = "CountyCompany";
                     }else if("9".equals(orgCategory) || "10".equals(orgCategory)){
                         orgType = "AgencyCompany";
                     }
                     
                     userAccount.put("orgType", orgType);
                 }else{
                     logger.debug("=============该用户所在组织的信息为空!=============");
                 }
                 
                 OrgShortNameStructure orgShortNameStructure = aaaaService.findCompanysBrevityByOrgId(userEntity.getCloudOrgId());
                 if(!CommonUtils.isEmpty(orgShortNameStructure)){
                     OrgShortNameEntity groupShortName = orgShortNameStructure.getGroupCompany();
                     
                     if(!CommonUtils.isEmpty(groupShortName)){
                         userAccount.put("groupOrgShortName", groupShortName.getOrgShortName());
                         userAccount.put("groupOrgCName", groupShortName.getOrgCName());
                     }
                     logger.debug("=============集团简称============="+JsonUtil.get(userAccount, "groupOrgShortName"));
                     
                   //获取省分公司简称
                     OrgShortNameEntity provinceShortName = orgShortNameStructure.getProvinceCompany();
                     if(!CommonUtils.isEmpty(provinceShortName)){
                         userAccount.put("provinceOrgShortName", provinceShortName.getOrgShortName());
                         userAccount.put("provinceOrgCName", provinceShortName.getOrgCName());
                     }
                     logger.debug("=============省份分公司简称============="+JsonUtil.get(userAccount, "provinceOrgShortName"));
                     //获取地市公司简称
                     OrgShortNameEntity cityShortName = orgShortNameStructure.getCityCompany();
                     if(!CommonUtils.isEmpty(cityShortName)){
                         userAccount.put("cityOrgShortName", cityShortName.getOrgShortName());
                         userAccount.put("cityOrgCName", cityShortName.getOrgCName());
                     }
                     logger.debug("=============地市分公司简称============="+JsonUtil.get(userAccount, "cityOrgShortName"));
                 }
                
                 userAccount.put("cloudUserId", userEntity.getCloudUserId());
                 userAccount.put("cloudOrgId", userEntity.getCloudOrgId());
                 userAccount.put("orgCode", orgEntity.getOrgCode());
                 userAccount.put("hrEmpCode", userEntity.getHrEmpCode());
                 userAccount.put("mdmEmpCode", userEntity.getMdmEmpCode());
                 userAccount.put("marketingAreaId", userEntity.getCloudOrgId());//销售区域临时存放为orgId
                 userAccount.put("maintenanceAreaId",userEntity.getCloudOrgId());//维护区域
                 
                 userAccount.put("userId", userEntity.getCloudUserId());
                 userAccount.put("accountId", userEntity.getAccount().getAccountId());
                 userAccount.put("userEmpName", userEntity.getEmpName());
                 userAccount.put("userMail", userEntity.getMainMailAddress());
                 
                 curUser.put("cloudUserId", userEntity.getCloudUserId());
                 curUser.put("userEmpName", userEntity.getEmpName());
                 curUser.put("userMail",userEntity.getMainMailAddress());

                 org.put("cloudOrgId", userEntity.getCloudOrgId());
                 org.put("userDeptName", orgEntity.getOrgName());
            }
            
            OrgStructure orgStructure = aaaaService.findCompanysByOrgId(userEntity.getCloudOrgId());
            if(!CommonUtils.isEmpty(orgStructure)){
                //集团公司的id和name
                if(!CommonUtils.isEmpty(orgStructure.getGroupCompany())){
                    userAccount.put("groupCompanyId", orgStructure.getGroupCompany().getCloudOrgId());
                    userAccount.put("groupCompanyName", orgStructure.getGroupCompany().getOrgName());
                }
                //省公司的id和name--如果是省级以下的公司会有这个session值
                if(!CommonUtils.isEmpty(orgStructure.getProvinceCompany())){
                    userAccount.put("provinceCompanyId", orgStructure.getProvinceCompany().getCloudOrgId());
                    userAccount.put("provinceCompanyName", orgStructure.getProvinceCompany().getOrgName());
                }
                //地市公司的id和name--如果是地市以下的公司会有这个session值
                if(!CommonUtils.isEmpty(orgStructure.getCityCompany())){
                    userAccount.put("cityCompanyId", orgStructure.getCityCompany().getCloudOrgId());
                    userAccount.put("cityCompanyName", orgStructure.getCityCompany().getOrgName());
                }
                //区县公司的id和name--如果是区县以下的公司会有这个session值
                if(!CommonUtils.isEmpty(orgStructure.getCountyCompany())){
                    userAccount.put("countyCompanyName", orgStructure.getCountyCompany().getOrgName());
                    userAccount.put("countyCompanyId", orgStructure.getCountyCompany().getCloudOrgId());
                }
            }else{
                logger.debug("=============该用户所在组织的所属公司为空(包括集团、省份、地市公司)!=============");
            }
            
            int orgId = 0;
            if(CommonUtils.isEmpty(JsonUtil.getInt(userAccount,"provinceCompanyId"))){
                if(!CommonUtils.isEmpty(JsonUtil.getInt(userAccount,"groupCompanyId"))){
                    orgId = JsonUtil.getInt(userAccount,"groupCompanyId");
                }
                logger.debug("该用户是集团账户，分片用集团分片，集团分公司ID================="+orgId);
            }else{
                if(!CommonUtils.isEmpty(JsonUtil.getInt(userAccount,"provinceCompanyId"))){
                    orgId = JsonUtil.getInt(userAccount,"provinceCompanyId");
                }
                logger.debug("该用户不是集团账户，分片用省分分片，省分分公司ID ===="+orgId);
            }
            
            DataRouteService dataRouteService = new DataRouteService();
            ShardInfoVO shardInfoVO = dataRouteService.findShardInfoByOrgId(orgId);
            if(CommonUtils.isEmpty(shardInfoVO)){
                logger.debug("=============分片信息为空，分片ID无法获取!===========");
            }else{
                userAccount.put("shardingId", shardInfoVO.getShardingId());
                logger.debug("=============分片信息不为空，分片ID==============="+shardInfoVO.getShardingId());
            }
            
            JSONObject role = new JSONObject();
            role.put("roleId", 1);
            role.put("roleName", "系统管理员");

            userAccount.put("role", role);
            
            session.setAttribute(SESSION_KEY_LOGON_ACCOUNT, userAccount);
            session.setAttribute(SESSION_KEY_LOGON_ACCOUNT_JSP, userAccount.toString());
            
            session.setAttribute(SESSION_KEY_LOGON_USER,curUser );
            session.setAttribute(SESSION_KEY_LOGON_USER_JSP, curUser.toString());
            
            session.setAttribute(SESSION_KEY_LOGON_ORG, org);
            session.setAttribute(SESSION_KEY_LOGON_ORG_JSP, org.toString());
            jsonObj.put("msg", "success");
            
            jsonObj.put("logonAccount",userAccount.toString());
            jsonObj.put("userStr", curUser.toString());
            jsonObj.put("orgStr", org.toString());
            return jsonObj.toString();
        }else{
            jsonObj.put("msg", "failure");
            return jsonObj.toString();
        }
    }
}
