package com.unicom.ucloud.eom.commondata.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ucloud.paas.proxy.aaaa.AAAAService;
import com.ucloud.paas.proxy.aaaa.entity.AccountEntity;
import com.ucloud.paas.proxy.aaaa.entity.AssignTreeEntity;
import com.ucloud.paas.proxy.aaaa.entity.FavoriteGroupAndMember;
import com.ucloud.paas.proxy.aaaa.entity.FavoriteGroupMember;
import com.ucloud.paas.proxy.aaaa.entity.OrgEntity;
import com.ucloud.paas.proxy.aaaa.entity.OrgStructure;
import com.ucloud.paas.proxy.aaaa.entity.RoleEntity;
import com.ucloud.paas.proxy.aaaa.entity.UserEntity;
import com.ucloud.paas.proxy.aaaa.util.PaasAAAAException;
import com.ucloud.paas.proxy.sysconfig.DataRouteService;
import com.ucloud.paas.proxy.sysconfig.vo.ShardInfoVO;
import com.unicom.ucloud.eom.base.action.BaseAction;
import com.unicom.ucloud.eom.base.common.AssignTreeHepler;
import com.unicom.ucloud.eom.base.common.CommonUtils;
import com.unicom.ucloud.eom.base.common.SearchTreeHepler;
import com.unicom.ucloud.eom.base.common.TreeSearchEntity;
import com.unicom.ucloud.util.JsonUtil;
/**
 * 4A服务读取组织用户信息
 * 
 * @version 1.0
 * @date 2013-3-10
 * @author feng.yang
 */
@Controller
@RequestMapping("/commonData/proxy4AUserAndOrg")
public class Proxy4AUserAndOrgAction extends BaseAction {

    /**
     * 根据ID查询组织
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
    @RequestMapping(value = "/findOrgbyOrgId.json", method = RequestMethod.POST)
    @ResponseBody
    public String findOrgbyOrgId(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject params = getParam(request);
        int orgId = JsonUtil.getInt(params, "orgId");

        AAAAService aaaa = new AAAAService();
        OrgEntity orgBean = aaaa.findOrgByOrgID(orgId);
        return JsonUtil.convert(orgBean).toString();

    }

    /**
     * 根据ID查下级组织
     * 
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findOrgListByParentid.json", method = RequestMethod.POST)
    @ResponseBody
    public String findOrgListByParentid(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject jsonObj = getParam(request);
        int orgid = 0;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "node"))) {
            orgid = JsonUtil.getInt(jsonObj, "node");
        }

        boolean singleSelect = false;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "singleSelect"))) {
            singleSelect = JsonUtil.getBoolean(jsonObj, "singleSelect");
        }
        AAAAService aaaa = new AAAAService();
        
        List<OrgEntity> ls = aaaa.findOrgListByParentID(orgid);
      
        List<JSONObject> orgList = new ArrayList<JSONObject>();

        if (!CommonUtils.isEmpty(ls)) {
            for (OrgEntity org : ls) {
                JSONObject node = new JSONObject();
                node.put("id", org.getCloudOrgId());

                node.put("text", org.getOrgName());

                node.put("parentId", org.getParentCloudOrgId());

                node.put("leaf", 0);

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
     * 根据组织ID查询下级组织及组织成员
     * 
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findOrgAndUser.json", method = RequestMethod.POST)
    @ResponseBody
    public String findOrgAndUser(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject jsonObj = getParam(request);
        int orgid = 0;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "node"))) {
            orgid = JsonUtil.getInt(jsonObj, "node");
        }
        boolean singleSelect = false;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "singleSelect"))) {
            singleSelect = JsonUtil.getBoolean(jsonObj, "singleSelect");
        }

        AAAAService aaaa = new AAAAService();
        List<OrgEntity> orgList = aaaa.findOrgListByParentID(orgid);
  
        List<UserEntity> userList = aaaa.findUserListByOrgID(orgid);
        
        List<JSONObject> dataList = new ArrayList<JSONObject>();

        if (!CommonUtils.isEmpty(orgList)) {
            for (OrgEntity org : orgList) {
                JSONObject node = new JSONObject();
                node.put("id", org.getCloudOrgId());

                node.put("text", org.getOrgName());

                node.put("parentId", org.getParentCloudOrgId());
                // 联系方式
                node.put("contractNumber", org.getTelephoneNumber());

                node.put("leaf", 0);

                // 0表示组织，1表示人员
                node.put("dataType", 0);

                if (!singleSelect) {
                    node.put("checked", false);
                }

                dataList.add(node);
            }
        }
        if (!CommonUtils.isEmpty(userList)) {
            for (UserEntity user : userList) {
                JSONObject node = new JSONObject();
                //用户ID，是用户在云平台上唯一的标识,作为入库使用
                node.put("id", user.getCloudUserId());
                //账户ID，是账户在云平台上的唯一标识
                //node.put("cloudAccountId",user.getAccount().getCloudAccountId());
                //账户ID，在录入流程引擎中使用
                node.put("accountId", user.getAccount().getAccountId());
                //账户名
                node.put("accountName", user.getAccount().getDisplay());
                //员工姓名
                node.put("text",user.getEmpName() );
                //组织ID
                node.put("parentId", user.getCloudOrgId());
                // 联系方式
                node.put("contractNumber", user.getMobTel());
                //是否叶子节点
                node.put("leaf", 1);
                // 0表示组织，1表示人员
                node.put("dataType", 1);

                if (!singleSelect) {
                    node.put("checked", false);
                }

                dataList.add(node);
            }
        }

        JSONArray result = new JSONArray(dataList);

        return result.toString();

    }

    /**
     * 根据组织查询组织成员
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
    @RequestMapping(value = "/findUserListByOrgid", method = RequestMethod.POST)
    @ResponseBody
    public String findUserListByOrgid(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject jsonObj = getParam(request);
        int orgid = 0;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "node"))) {
            orgid = JsonUtil.getInt(jsonObj, "node");
        }
        AAAAService aaaa = new AAAAService();
        List<UserEntity> userList = aaaa.findUserListByOrgID(orgid);
        JSONArray result = new JSONArray(userList);

        return result.toString();

    }
    
    /**
     * 根据云门户账号accountId查询成员信息
     * 
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @author Stephen Zhou
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/findUserByAccountid", method = RequestMethod.POST)
    @ResponseBody
    public String findUserByAccountid(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject jsonObj = getParam(request);
        AAAAService aaaa = new AAAAService();
        UserEntity userEntity = aaaa.findUserByPortalAccountId(JsonUtil.getString(jsonObj, "accountId"));
        AccountEntity accountEntity = userEntity.getAccount();
        JSONObject _reObject = new JSONObject();
        _reObject.put("accountId", accountEntity.getAccountId());//账户ID，字符型
        _reObject.put("accountType", accountEntity.getAccountType());//账户类型
       // _reObject.put("cloudAccountId", accountEntity.getCloudAccountId());//账户唯一标识，int型
        _reObject.put("cloudUserId", accountEntity.getCloudUserId());//云平台用户唯一标识
        _reObject.put("cloudUserName", userEntity.getEmpName());//云门户用户名
        _reObject.put("display", accountEntity.getDisplay());//账户显示名
        _reObject.put("displayName", accountEntity.getDisplayName());//
        _reObject.put("orgId", userEntity.getCloudOrgId());//组织ID
        OrgEntity orgEntity = aaaa.findOrgByOrgID(_reObject.getInt("orgId"));
        _reObject.put("orgName", orgEntity.getOrgName());//组织名称
        _reObject.put("parentOrgId", orgEntity.getParentCloudOrgId());//父组织ID
        _reObject.put("parentOrgName", orgEntity.getParentOrgName());//
        _reObject.put("parentOrgCode", orgEntity.getParentOrgCode());
        _reObject.put("contractNumber", userEntity.getMobTel());//联系方式
        return _reObject.toString();

    }
    
    /**
     * 根据云平台用户Id查询成员信息
     * 
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @author wen.ziming
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/findUserByCloudUserId", method = RequestMethod.POST)
    @ResponseBody
    public String findUserByCloudUserId(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject jsonObj = getParam(request);
        AAAAService aaaa = new AAAAService();
        UserEntity userEntity = aaaa.findUserbyUserID(JsonUtil.getInt(jsonObj, "cloudUserId"));
        AccountEntity accountEntity = userEntity.getAccount();
        JSONObject _reObject = new JSONObject();
        _reObject.put("accountId", accountEntity.getAccountId());//账户ID，字符型
        _reObject.put("accountType", accountEntity.getAccountType());//账户类型
        //_reObject.put("cloudAccountId", accountEntity.getCloudAccountId());//账户唯一标识，int型
        _reObject.put("cloudUserId", accountEntity.getCloudUserId());//云平台用户唯一标识
        _reObject.put("cloudUserName", userEntity.getEmpName());//云门户用户名
        _reObject.put("display", accountEntity.getDisplay());//账户显示名
        _reObject.put("displayName", accountEntity.getDisplayName());//
        _reObject.put("orgId", userEntity.getCloudOrgId());//组织ID
        OrgEntity orgEntity = aaaa.findOrgByOrgID(_reObject.getInt("orgId"));
        _reObject.put("orgName", orgEntity.getOrgName());//组织名称
        _reObject.put("parentOrgId", orgEntity.getParentCloudOrgId());//父组织ID
        _reObject.put("parentOrgName", orgEntity.getParentOrgName());//
        _reObject.put("parentOrgCode", orgEntity.getParentOrgCode());
        _reObject.put("contractNumber",userEntity.getMobTel());//联系方式
        return _reObject.toString();

    }

    /**
     * 查询组织成员是否存在
     * 
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws PaasAAAAException
     * @throws JSONException
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/checkUserIDAndOrgID", method = RequestMethod.POST)
    @ResponseBody
    public String checkUserIDAndOrgID(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject params = getParam(request);
        int orgId = JsonUtil.getInt(params, "orgId");
        int userId = JsonUtil.getInt(params, "userId");

        logger.debug("userId : " + userId);
        logger.debug("orgId : " + orgId);
        AAAAService aaaa = new AAAAService();
        Boolean flag = aaaa.checkUserIDAndOrgID(userId, orgId);
        JSONObject result = new JSONObject();
        result.put("flag", flag);
        return result.toString();
    }
    
    

    /**
     * 根据组织ID查询下级组织及组织成员,配合UIUE规范树
     * 
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author Stephen Zhou
     * @see
     * @since
     */
    @RequestMapping(value = "/findOrgAndUserForUIUE.json", method = RequestMethod.POST)
    @ResponseBody
    public String findOrgAndUserForUIUE(JSONObject jsonObj) throws Exception {
        logger.debug("============Method findOrgAndUserForUIUE begin!============");
        int orgid = 1;
        Boolean isOnlyChild = false;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "porgId"))) {
            orgid = JsonUtil.getInt(jsonObj, "porgId");
        }
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "isOnlyChild"))) {
            isOnlyChild = JsonUtil.getBoolean(jsonObj, "isOnlyChild");
        }
        logger.debug("The ORG query is ==="+orgid);
        
        List<JSONObject> dataList = new ArrayList<JSONObject>();
        
        AAAAService aaaa = new AAAAService();
        try{
          //如果查找组织与人员
            if(CommonUtils.isEmpty(JsonUtil.get(jsonObj,"qryType"))){
                // 先查询下级组织
                List<OrgEntity> orgList = aaaa.findOrgListByParentID(orgid);
                //再查询组织下的人
                List<UserEntity> userList = aaaa.findUserListByOrgID(orgid);
               
                if (!CommonUtils.isEmpty(orgList)) {
                    for (OrgEntity org : orgList) {
                       addOrgToList(dataList, org,null,null,isOnlyChild);
                    }
                }
                if (!CommonUtils.isEmpty(userList)) {
                    for (UserEntity user : userList) {
                        addUserToList(dataList, user,null,null);
                    }
                }
            }else if(jsonObj.get("qryType").equals("ORG")){
                List<OrgEntity> orgList = aaaa.findOrgListByParentID(orgid);
                if (!CommonUtils.isEmpty(orgList)) {
                    for (OrgEntity org : orgList) {
                        addOrgToList(dataList, org,"ORG",null,isOnlyChild);
                    }
                }
            }else if(jsonObj.get("qryType").equals("PERSON")){
                List<UserEntity> userList = aaaa.findUserListByOrgID(orgid);
                if (!CommonUtils.isEmpty(userList)) {
                    for (UserEntity user : userList) {
                        addUserToList(dataList, user,"PERSON",null);
                    }
                }
            }else if(jsonObj.get("qryType").equals("COMPANY")){
                List<OrgEntity> orgList = aaaa.findCompanysByParentOrgId(orgid);
                if (!CommonUtils.isEmpty(orgList)) {
                    for (OrgEntity org : orgList) {
                        addOrgToList(dataList, org,"COMPANY",null,isOnlyChild);
                    }
                }
            }
        }catch(Exception e){
            logger.debug("派发树全量树查询出错，报错信息======");
            e.printStackTrace();
        }
        OrgEntity orgEntity = aaaa.findOrgByOrgID(orgid);
        JSONArray result = new JSONArray(dataList);
        String jsonString = "";
        if(result.length()!=0){
        	jsonString = result.toString();
	        if(JsonUtil.getBoolean(jsonObj,"isChild")!=null&&JsonUtil.getBoolean(jsonObj,"isChild")){
	        	jsonString="{\"TreeNode\":"+
	        	        jsonString+"}";
	        }else{
	        	jsonString="{\"TreeNode\":"+
	        	        "{\"id\":\""+orgEntity.getCloudOrgId()+
	        	        "\",\"text\":\""+orgEntity.getOrgName()+
	        	        "\",\"leaf\":\"0\",\"hasChild\":\"1\",\"xmlSource\":\"\",\"defaultOpen\":\"1\","+
	        	        "\"logoImagePath\":\"\",\"statusFlag\":\"\",\"qryType\":\""+
	        	        JsonUtil.get(jsonObj,"qryType")+"\",\"title\":"+
	        	        "\""+orgEntity.getOrgName()+"\",\"hrefPath\":\"\",\"target\":\"\",\"dbClick\":\"\",\"orderStr"+
	        	        "\":\"U901002\",\"returnValue\":\"\",\"isSelected\":\"\",\"indeterminate\":\""+
	        	        "\",\"thisType\":\"Company\",\"detailedType\":\"Company\",\"isSubmit\":"+
	        	        "\"\",\"parentId\":\"\",\"childIds\":\"\",\"imageUrl\":\"\","+
	        	        "\"busContent\":\"UCloud\",\"test1\":\"tan1\",\"test2\":\"tan2\","+
	        	        "\"TreeNode\":"+
	        	        jsonString+"}}";
	        }
        }else{
            jsonString="{\"TreeNode\":null}";
            logger.debug("============cannot find any data!============");
        }
        logger.debug("============Method findOrgAndUserForUIUE end!============");
        return jsonString;
    }

	/**
	 * add org to datalist 
	 * create by Stephen Zhou
	 * @param dataList
	 * @param org
	 * @param qryType
	 * @throws Exception
	 * @see
	 * @since
	 */
	private void addOrgToList(List<JSONObject> dataList,OrgEntity org,String qryType,Integer cloudOrgId,Boolean isOnlyChild) throws Exception{
	    String isSelected = "";
	    if(cloudOrgId != null){
            if(cloudOrgId.intValue() == org.getCloudOrgId().intValue()){
                isSelected = "1";
            }
        }
		JSONObject node = new JSONObject();
        node.put("id", org.getCloudOrgId());
        node.put("text", org.getOrgName());
        node.put("hasChild", 1);
        node.put("defaultOpen", 0);
        node.put("logoImagePath","");
        node.put("statusFlag", "");
        node.put("title", org.getOrgName());
        node.put("hrefPath", "");
        node.put("target", "");
        node.put("dbClick", "");
        node.put("orderStr", "");
        node.put("returnValue", "");
        node.put("isSelected", isSelected);
        node.put("indeterminate", "");
        node.put("thisType", "Company");
        node.put("detailedType", "Company");
        node.put("isSubmit", "");
        node.put("parentId", org.getParentCloudOrgId());
        node.put("childIds", "");
        node.put("imageUrl", "");
        node.put("busContent", "UCloud");
        node.put("leaf", 0);
        node.put("contractNumber", org.getTelephoneNumber());
        if(!CommonUtils.isEmpty(qryType)){
        	node.put("qryType", qryType);
        	node.put("xmlSource", "asyn_add.jsp?qryType="+qryType);
        }else{
            node.put("qryType", "");
            node.put("xmlSource", "asyn_add.jsp");
        }
        if(isOnlyChild){//如果是只显示子节点的话，把这2个属性覆盖
            node.put("xmlSource", "");
            node.put("hasChild", 0);
        }
        dataList.add(node);
	}
	/**
	 * add user to datalist 
	 * create by Stephen Zhou
	 * @param dataList
	 * @param user
	 * @param qryType
	 * @throws Exception
	 * @see
	 * @since
	 */
	private void addUserToList(List<JSONObject> dataList,UserEntity user,String qryType,Integer cloudUserId) throws Exception{
	    String isSelected = "";
        if(cloudUserId != null){
            if(cloudUserId.intValue() == user.getCloudUserId().intValue()){
                isSelected = "1";
            }
        }
		JSONObject node = new JSONObject();
		
		if(user.getAccount() == null){
		    return;
		}
        node.put("id", user.getCloudUserId());
        node.put("text",user.getEmpName() );
        node.put("sex", user.getUserSex());
        node.put("hasChild", 0);
        node.put("xmlSource", "");
        node.put("defaultOpen", 0);
        node.put("logoImagePath","");
        node.put("statusFlag", "");
        node.put("title",user.getEmpName() );
        node.put("hrefPath", "");
        node.put("target", "");
        node.put("dbClick", "");
        node.put("orderStr", "");
        node.put("returnValue", "");
        node.put("isSelected", isSelected);
        node.put("indeterminate", "");
        node.put("thisType", "Person");
        node.put("detailedType", "Person");
        node.put("isSubmit", "");
        node.put("parentId",  user.getCloudOrgId());
        node.put("childIds", "");
        node.put("imageUrl", "");
        node.put("busContent", "UCloud");
        node.put("accountId", user.getAccount().getAccountId());
        node.put("accountName", user.getAccount().getDisplay());
        node.put("leaf", 1);
        node.put("email", user.getMainMailAddress());
        if("".equals(user.getMobTel()) || user.getMobTel() == null){
            node.put("contractNumber", user.getOfficeTel());//电话号码
        }else{
            node.put("contractNumber", user.getMobTel());//电话号码
        }
        if(!CommonUtils.isEmpty(qryType)){
        	node.put("qryType", qryType);
        }
        dataList.add(node);
	}
	
	/**
     * 根据ID查询下属分公司
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findCompanysByOrgId.json", method = RequestMethod.POST)
    @ResponseBody
    public String findCompanysByOrgId(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject jsonObj = getParam(request);
        int orgid = 0;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "node"))) {
            orgid = JsonUtil.getInt(jsonObj, "node");
        }

        boolean singleSelect = false;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "singleSelect"))) {
            singleSelect = JsonUtil.getBoolean(jsonObj, "singleSelect");
        }
       
        AAAAService aaaa = new AAAAService();
        List<OrgEntity> ls =  aaaa.findCompanysByParentOrgId(orgid);
       
       List<JSONObject> orgList = new ArrayList<JSONObject>();

       if (!CommonUtils.isEmpty(ls)) {
           for (OrgEntity org : ls) {
               JSONObject node = new JSONObject();
               node.put("id", org.getCloudOrgId());

               node.put("text", org.getOrgName());

               node.put("parentId", org.getParentCloudOrgId());

               node.put("leaf", 0);

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
     * 查询分片ID
     * @param request
     * @param response
     * @return
     * @throws Exception
     * @see
     * @since
     */
    @RequestMapping(value = "/findShardInfoByCondition.json", method = RequestMethod.POST)
    @ResponseBody
    public String findShardInfoByCondition(HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        JSONObject jsonObj = getParam(request);
        int orgId = 0;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "orgId"))) {
            orgId = JsonUtil.getInt(jsonObj, "orgId");
        }
        JSONObject userAccount = new JSONObject();
        AAAAService aaaaService = new AAAAService();
        OrgStructure orgStructure = aaaaService.findCompanysByOrgId(orgId);
        
        if(!CommonUtils.isEmpty(orgStructure.getGroupCompany())){
            userAccount.put("groupCompanyId", orgStructure.getGroupCompany().getCloudOrgId());
            userAccount.put("groupCompanyName", orgStructure.getGroupCompany().getOrgName());
        }

        if(!CommonUtils.isEmpty(orgStructure.getProvinceCompany())){
            userAccount.put("provinceCompanyId", orgStructure.getProvinceCompany().getCloudOrgId());
            userAccount.put("provinceCompanyName", orgStructure.getProvinceCompany().getOrgName());
        }

        if(!CommonUtils.isEmpty(orgStructure.getCityCompany())){
            userAccount.put("cityCompanyId", orgStructure.getCityCompany().getCloudOrgId());
            userAccount.put("cityCompanyName", orgStructure.getCityCompany().getOrgName());
        }
        
        if(!CommonUtils.isEmpty(orgStructure.getCountyCompany())){
            userAccount.put("countyCompanyName", orgStructure.getCountyCompany().getOrgName());
            userAccount.put("countyCompanyId", orgStructure.getCountyCompany().getCloudOrgId());
        }
       
        if(JsonUtil.getInt(userAccount,"provinceCompanyId") == null){
            orgId = JsonUtil.getInt(userAccount,"groupCompanyId");
            logger.debug("Current account is groupCompany, the groupCompanyId ===="+orgId);
        }else{
            orgId = JsonUtil.getInt(userAccount,"provinceCompanyId");
            logger.debug("Current account is provinceCompany, the provinceCompanyId ===="+orgId);
        }
        
        DataRouteService dataRouteService = new DataRouteService();
        ShardInfoVO shardInfoVO=dataRouteService.findShardInfoByOrgId(orgId);
        //ShardInfoVO shardInfoVO=dataRouteService.findShardInfoByParentOrgId(orgId);
        
        if(shardInfoVO == null){
            logger.debug("=============shardInfoVO IS NULL shardingId is undefined===========");
        }else{
            userAccount.put("shardingId", shardInfoVO.getShardingId());
        }
       
        return userAccount.toString();
    }
    
    /**
     * 根据抽象角色查询角色列表
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findRoleListByAbstractRoleId.json", method = RequestMethod.POST)
    @ResponseBody
    public String findRoleListByAbstractRoleId(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObj = getParam(request);
        JSONObject roleAccount = new JSONObject();
        AAAAService aaaaService = new AAAAService();
        
        List<RoleEntity> list = aaaaService.findRoleListByAbstractRoleId(JsonUtil.getInt(jsonObj, "abstractRoleId"));
        JSONArray jsonArray = new JSONArray();
        if(list != null && list.size() > 0){
            for(int i=0;i<list.size();i++){
                roleAccount = new JSONObject();
                RoleEntity re = list.get(i);
                roleAccount.put("roleName", re.getRoleName());
                roleAccount.put("roleType", re.getRoleType());
                roleAccount.put("roleCloudRoleId", re.getCloudRoleId());
                roleAccount.put("roleApp", re.getRoleApp());
                
                jsonArray.put(roleAccount);
            }
        }
        return jsonArray.toString();
    }
    
    /**
     * 根据组织ID查询角色列表
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findRoleListByCloudOrgId.json", method = RequestMethod.POST)
    @ResponseBody
    public String findRoleListByCloudOrgId(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObj = getParam(request);
        JSONObject roleAccount = new JSONObject();
        AAAAService aaaaService = new AAAAService();
        List<RoleEntity> list = aaaaService.findRoleListByCloudOrgId(JsonUtil.getInt(jsonObj, "orgId"));
        JSONArray jsonArray = new JSONArray();
        if(list != null && list.size() > 0){
            for(int i=0;i<list.size();i++){
                roleAccount = new JSONObject();
                RoleEntity re = list.get(i);
                roleAccount.put("roleName", re.getRoleName());
                roleAccount.put("roleCloudRoleId", re.getCloudRoleId());
                roleAccount.put("roleApp", re.getRoleApp());
                roleAccount.put("roleType", re.getRoleType());
                jsonArray.put(roleAccount);
            }
        }
        return jsonArray.toString();
    }
    
    /**
     * 根据角色ID查找直接关联该角色的帐号信息
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findAccountListByRoleID.json", method = RequestMethod.POST)
    @ResponseBody
    public String findAccountListByRoleID(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObj = getParam(request);
        JSONObject json = new JSONObject();
        AAAAService aaaaService = new AAAAService();
        List<AccountEntity> accountList = aaaaService.findAccountListByRoleID(JsonUtil.getInt(jsonObj, "roleId"));
        JSONArray jsonArray = new JSONArray();
        if(accountList != null && accountList.size() > 0){
            for(int i=0;i<accountList.size();i++){
                json = new JSONObject();
                AccountEntity tmp = accountList.get(i);
                json.put("accountId", tmp.getAccountId());
                json.put("accountType", tmp.getAccountType());
                json.put("cloudAccountId", tmp.getCloudAccountId());
                json.put("cloudUserId", tmp.getCloudUserId());
                jsonArray.put(json);
            }
        }
        return jsonArray.toString();
    }
    
   /**
    * 根据角色列表查询下级组织及组织成员,配合新派发树
    * @param jsonObj
    * @return
    * @throws Exception
    * @see
    * @since
    */
    @RequestMapping(value = "/findOrgAndUserForAssignTree.json", method = RequestMethod.POST)
    @ResponseBody
    public String findOrgAndUserForAssignTree(JSONObject jsonObj)
            throws Exception {
        
        AAAAService aaaa = new AAAAService();
        int cloudUserId = -1;
        int treeType = 2;
        Integer[] roleIDArray = null;
        String roleArray = null;
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "cloudUserId"))) {
            cloudUserId = JsonUtil.getInt(jsonObj, "cloudUserId");
        }
        
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "roleArray"))) {
            roleArray = JsonUtil.getString(jsonObj, "roleArray");
        }
        
        if(roleArray != null){
            String[] roleIds = roleArray.split(",");
            roleIDArray = new Integer[roleIds.length];
            for(int i=0;i<roleIds.length;i++){
                roleIDArray[i] = Integer.valueOf(roleIds[i]);
            }
        }
        
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "treeType"))) {
            treeType = JsonUtil.getInt(jsonObj, "treeType");
        }
        
        List<AssignTreeEntity> atList = null;
        try{
            atList = aaaa.getAssignTree(cloudUserId,roleIDArray, treeType);
        }catch(Exception e){
            logger.debug("===========调用4A接口getAssignTree()报错 =========");
            e.printStackTrace();
        }
       
        String xml = AssignTreeHepler.buildXMLString(atList);
        
        return xml;
    }
    
    /**
     * 根据产品、专业、组织、区域等授权维度查询角色列表
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findRoleListByDimensions.json", method = RequestMethod.POST)
    @ResponseBody
    public String findRoleListByDimensions(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObj = getParam(request);
        JSONObject roleAccount = new JSONObject();
        AAAAService aaaaService = new AAAAService();
        
        Set<String> roleclassSet = new HashSet<String>();
        if (!CommonUtils.isEmpty(JsonUtil.get(jsonObj, "roleclass"))) {
            roleclassSet.add(JsonUtil.getString(jsonObj, "roleclass"));
        }
        
        Set<String> productcodeSet = new HashSet<String>();
        String productcodes = JsonUtil.getString(jsonObj, "productcode");
        if(!CommonUtils.isEmpty(productcodes)){
            String[] productcodeArray = productcodes.split(",");
            for(int i=0;i<productcodeArray.length;i++){
                productcodeSet.add(productcodeArray[i]);
            }
        }
        
        Set<String> areacodeSet = new HashSet<String>();
        String areacodes = JsonUtil.getString(jsonObj, "areacode");
        if(!CommonUtils.isEmpty(areacodes)){
            String[] areacodeArray = areacodes.split(",");
            for(int i=0;i<areacodeArray.length;i++){
                areacodeSet.add(areacodeArray[i]);
            }
        }
        
        Set<String> majorcodeSet = new HashSet<String>();
        String majorcodes = JsonUtil.getString(jsonObj, "majorcode");
        if(!CommonUtils.isEmpty(majorcodes)){
            String[] majorcodeArray = majorcodes.split(",");
            for(int i=0;i<majorcodeArray.length;i++){
                majorcodeSet.add(majorcodeArray[i]);
            }
        }
        
        Set<String> orgSet = new HashSet<String>();
       
        Map<String, Set<String>> map = new HashMap<String, Set<String>>();
        if(productcodeSet !=null && productcodeSet.size() >0 ){
            map.put("PRODUCT_ID", productcodeSet);
        }
        if(areacodeSet !=null && areacodeSet.size() >0 ){
            map.put("AREA_ID", areacodeSet);
        }
        if(majorcodeSet !=null && majorcodeSet.size() >0 ){
            map.put("MAJOR_ID", majorcodeSet);
        }
        if(orgSet !=null && orgSet.size() >0 ){
            map.put("ORG_ID", orgSet);
        }
        if(roleclassSet !=null && roleclassSet.size() >0 ){
            map.put("ABSTRACT_ROLE_ID", roleclassSet);
        }
        
        List<RoleEntity> list = aaaaService.findRoleListByDimensions(map);
        JSONArray jsonArray = new JSONArray();
        if(list != null && list.size() > 0){
            for(int i=0;i<list.size();i++){
                roleAccount = new JSONObject();
                RoleEntity re = list.get(i);
                roleAccount.put("roleName", re.getRoleName());
                roleAccount.put("roleType", re.getRoleType());
                roleAccount.put("roleCloudRoleId", re.getCloudRoleId());
                roleAccount.put("roleApp", re.getRoleApp());
                
                jsonArray.put(roleAccount);
            }
        }
        return jsonArray.toString();
    }
    
    /**
     * 根据组织ID和人员用户名模糊查询用户列表信息
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findUserListByUserName.json", method = RequestMethod.POST)
    @ResponseBody
    public String findUserListByUserName(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObj = getParam(request);
        JSONObject roleAccount = new JSONObject();
        AAAAService aaaaService = new AAAAService();
        if(JsonUtil.get(jsonObj, "orgId") == null){
            throw new Exception("Query orgId is null!");
        }
        if(JsonUtil.get(jsonObj, "userName") == null){
            throw new Exception("Query userName is null!");
        }
        List<UserEntity> list = aaaaService.findUserListByUserName(JsonUtil.getInt(jsonObj, "orgId"),JsonUtil.getString(jsonObj, "userName"));
        JSONArray jsonArray = new JSONArray();
        if(list != null && list.size() > 0){
            for(int i=0;i<list.size();i++){
                roleAccount = new JSONObject();
                UserEntity re = list.get(i);
                roleAccount.put("cloudUserId", re.getCloudUserId());
                roleAccount.put("cloudOrgId", re.getCloudOrgId());
                
                jsonArray.put(roleAccount);
            }
        }
        return jsonArray.toString();
    }
    
    /**
     * 组织查找区域列表接口中增加类型（营销、维护）
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findAreaListByOrgId.json", method = RequestMethod.POST)
    @ResponseBody
    public String findAreaListByOrgId(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObj = getParam(request);
        JSONObject roleAccount = new JSONObject();
        AAAAService aaaaService = new AAAAService();
        if(JsonUtil.get(jsonObj, "orgId") == null){
            throw new Exception("Query orgId is null!");
        }
        if(JsonUtil.get(jsonObj, "areaType") == null){
            throw new Exception("Query areaType is null!");
        }
        List<String> list = aaaaService.findAreaListByOrgId(JsonUtil.getInt(jsonObj, "orgId"),JsonUtil.getString(jsonObj, "areaType"));
        
        JSONArray jsonArray = new JSONArray();
        if(list != null && list.size() > 0){
            for(int i=0;i<list.size();i++){
                roleAccount = new JSONObject();
                
                roleAccount.put("areaId", list.get(i));
                jsonArray.put(roleAccount);
            }
        }
        return jsonArray.toString();
    }
    
    /**
     * 根据组织 ID 和名称（名称支持模糊查询）查询组织
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findOrgsByOrgIdAndName.json", method = RequestMethod.POST)
    @ResponseBody
    public String findOrgsByOrgIdAndName(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObj = getParam(request);
        JSONObject orgJson = new JSONObject();
        AAAAService aaaaService = new AAAAService();
        if(JsonUtil.get(jsonObj, "searchScope") == null){//查询范围
            throw new Exception("查询范围为空!");
        }
        if(JsonUtil.get(jsonObj, "searchText") == null){
            throw new Exception("查询对象为空!");
        }
        List<OrgEntity> list = aaaaService.findOrgsByOrgIdAndName(JsonUtil.getInt(jsonObj, "searchScope"),JsonUtil.getString(jsonObj, "searchText"));
        
        JSONArray jsonArray = new JSONArray();
        if(list != null && list.size() > 0){
            for(int i=0;i<list.size();i++){
                orgJson = new JSONObject();
                
                OrgEntity orgEntity = list.get(i);
                orgJson.put("cloudOrgId", orgEntity.getCloudOrgId());
                orgJson.put("orgName", orgEntity.getOrgName());
                jsonArray.put(orgJson);
            }
        }
        return jsonArray.toString();
    }
    
    /**
     * 根据组织ID和名称查询人员（名称支持模糊查询）
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findUserEntityByCloudOrgIdAndEmpName.json", method = RequestMethod.POST)
    @ResponseBody
    public String findUserEntityByCloudOrgIdAndEmpName(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObj = getParam(request);
        JSONObject userJson = new JSONObject();
        AAAAService aaaaService = new AAAAService();
        if(JsonUtil.get(jsonObj, "searchScope") == null){//查询范围
            throw new Exception("查询范围为空!");
        }
        if(JsonUtil.get(jsonObj, "searchText") == null){
            throw new Exception("查询对象为空!");
        }
        List<Object[]> list = aaaaService.findUserEntityByCloudOrgIdAndEmpName(JsonUtil.getInt(jsonObj, "searchScope"),JsonUtil.getString(jsonObj, "searchText"));
        
        JSONArray jsonArray = new JSONArray();
        if(list != null && list.size() > 0){
            for(int i=0;i<list.size();i++){
                userJson = new JSONObject();
                
                Object[] empObject = list.get(i);
                UserEntity userEntity = (UserEntity)empObject[0];
                
                userJson.put("cloudOrgId", userEntity.getCloudOrgId());
                userJson.put("cloudUserId", userEntity.getCloudUserId());
                userJson.put("empName", userEntity.getEmpName());
                userJson.put("orgName", empObject[1]);
                jsonArray.put(userJson);
            }
        }
        return jsonArray.toString();
    }
    
    /**
     * 根据组织ID和名称查询人员（名称支持模糊查询）
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findOrgAndUserEntityInSearch.json", method = RequestMethod.POST)
    @ResponseBody
    public String findOrgEntityInSearch(HttpServletRequest request, HttpServletResponse response) throws Exception {
        JSONObject jsonObj = getParam(request);
        AAAAService aaaaService = new AAAAService();
        
        String queryType = JsonUtil.getString(jsonObj, "fuzzySearchDataType");
        Integer searchScope = JsonUtil.getInt(jsonObj, "searchScope");
        Integer cloudOrgId = JsonUtil.getInt(jsonObj, "cloudOrgId");
        Integer cloudUserId = JsonUtil.getInt(jsonObj, "cloudUserId");
        
        if(searchScope == null){//查询范围
            throw new Exception("查询范围为空!");
        }
        if(cloudOrgId == null){
            throw new Exception("查询对象为空!");
        }
        if(queryType == null){
            throw new Exception("查询类型为空!");
        }
        
        //查出该组织的全路径
        List<OrgEntity> list = aaaaService.getAsboluteOrgHierarchy(JsonUtil.getInt(jsonObj, "cloudOrgId"));
        
        int searchIndex = 0;//查询索引。如果组织ID 和查询范围的组织ID一样，则从该索引开始
        if(list != null && list.size() > 0){
            for(int i=0;i<list.size();i++){
                OrgEntity orgEnt = list.get(i);
                if(orgEnt.getCloudOrgId().intValue() == searchScope.intValue()){
                    searchIndex = i;
                }
            }
        }
        
        List<TreeSearchEntity> dataList = new ArrayList<TreeSearchEntity>();
        if(list != null && list.size() > 0){
            for(int i=0;i<list.size();i++){
                if(searchIndex <= i){
                    OrgEntity orgEnt = list.get(i);
                    int orgId = orgEnt.getCloudOrgId().intValue();
                    
                    int nextId = i+1;//下一路径组织的index
                    Integer nextOrgId = null;//下一路径组织的组织ID
                    if(nextId < list.size()){
                        OrgEntity nextOrgEnt = list.get(nextId);
                        nextOrgId = nextOrgEnt.getCloudOrgId();
                    }
                    if("1".equals(queryType)){//只查组织
                        List<OrgEntity> orgList = aaaaService.findOrgListByParentID(orgId);
                        if (!CommonUtils.isEmpty(orgList)) {
                            for (OrgEntity org : orgList) {
                                addOrgToListForSearch(dataList, org,nextOrgId,cloudOrgId,"ORG");
                            }
                        }
                    }else  if("2".equals(queryType)){//只查人员
                        // 先查询下级组织
                        List<OrgEntity> orgList = aaaaService.findOrgListByParentID(orgId);
                        //再查询组织下的人
                        List<UserEntity> userList = aaaaService.findUserListByOrgID(orgId);
                       
                        if (!CommonUtils.isEmpty(orgList)) {
                            for (OrgEntity org : orgList) {
                               addOrgToListForSearch(dataList, org,nextOrgId,null,"PERSON");
                            }
                        }
                        if (!CommonUtils.isEmpty(userList)) {
                            for (UserEntity user : userList) {
                                addUserToListForSearch(dataList, user,cloudUserId);
                            }
                        }
                    }
                }
            }
        }
        String xml = SearchTreeHepler.buildXMLString(dataList);
        return xml;
    }
    
    /**
     * 增加组织到list中，用于组织模糊查询
     * @param dataList
     * @param org
     * @param orgId
     * @param cloudOrgId
     * @param qryType
     * @throws Exception
     * @see
     * @since
     */
    private void addOrgToListForSearch(List<TreeSearchEntity> dataList,OrgEntity org,Integer orgId,Integer cloudOrgId,String qryType) throws Exception{
        TreeSearchEntity node = new TreeSearchEntity();
        node.setAccountId(null);//当节点类型对用户时，组织时为空值。
        node.setHrId(org.getHrOrgCode());//HR CODE
        node.setName(org.getOrgName());//用户或组织名称 \节点名称
        node.setNodeId(org.getCloudOrgId());//用户或组织id \节点 id
        node.setNoteType(1);//节点类型1组织 2人员
        node.setParentNodeId(org.getParentCloudOrgId());//父级节点 id
        node.setPortalId(org.getPostalCode());//云门户节点id
        if(!CommonUtils.isEmpty(cloudOrgId) && org.getCloudOrgId().intValue() == cloudOrgId.intValue()){
            node.setIsSelect(1);
        }else{
            node.setIsSelect(0);
        }
        if(!CommonUtils.isEmpty(orgId) && org.getCloudOrgId().intValue() == orgId.intValue()){
            node.setDefaultOpen(1);
        }else{
            node.setDefaultOpen(0);
        }
        node.setQryType(qryType);
        dataList.add(node);
    }
    
    /**
     * 增加组织到list中，用于组织模糊查询
     * @param dataList
     * @param user
     * @param cloudUserId
     * @throws Exception
     * @see
     * @since
     */
    private void addUserToListForSearch(List<TreeSearchEntity> dataList,UserEntity user,Integer cloudUserId) throws Exception{
        TreeSearchEntity node = new TreeSearchEntity();
        AccountEntity accEntity = user.getAccount();
        if(accEntity != null){
            node.setAccountId(accEntity.getAccountId());
        }else{
            node.setAccountId(null);
        }
        node.setAccountName(user.getEmpName());
        node.setHrId(user.getHrEmpCode());
        node.setName(user.getEmpName());
        node.setNodeId(user.getCloudUserId());
        node.setNoteType(2);
        node.setParentNodeId(user.getCloudOrgId());
        node.setPortalId(user.getPortalUserCode());
        if(!CommonUtils.isEmpty(cloudUserId) && user.getCloudUserId() == cloudUserId.intValue()){
            node.setIsSelect(1);
        }else{
            node.setIsSelect(0);
        }
        node.setEmail(user.getMainMailAddress());
        if("".equals(user.getMobTel()) || user.getMobTel() == null){
            node.setContanctNumber(user.getOfficeTel());//电话号码
        }else{
            node.setContanctNumber(user.getMobTel());//电话号码
        }
        node.setSex(user.getUserSex());
        dataList.add(node);
    }
    
    /**
     * 根据用户ID查询常用群组
     * @param request
     * @param response
     * @param modelMap
     * @return
     * @throws Exception
     * @author feng.yang
     * @see
     * @since
     */
    @RequestMapping(value = "/findFavoriteGroupAndMember.json", method = RequestMethod.POST)
    @ResponseBody
    public String findFavoriteGroupAndMember(JSONObject jsonObj) throws Exception {
        logger.debug("============Method findFavoriteGroupAndMember begin!============");
        AAAAService aaaaService = new AAAAService();
        
        Integer cloudUserId = JsonUtil.getInt(jsonObj, "cloudUserId");
        if(cloudUserId == null){
            cloudUserId = -1;
        }
        List<TreeSearchEntity> dataList = new ArrayList<TreeSearchEntity>();
        try{
            List<FavoriteGroupAndMember> list = aaaaService.findFavoriteGroupAndMember(cloudUserId);
            for(FavoriteGroupAndMember tmpList : list){
                List<FavoriteGroupMember> favoriteGroupMemberList = tmpList.getFgm();
                addDataToFgmList(dataList,null,tmpList.getId(),tmpList.getName(),null);
                for(FavoriteGroupMember fgmList : favoriteGroupMemberList){
                    UserEntity userEntity = aaaaService.findUserbyUserID(fgmList.getUserId());
                    addDataToFgmList(dataList,userEntity,fgmList.getUserId(),fgmList.getUserName(),Integer.valueOf(fgmList.getFavoriteGroupId()));
                }
            }
        }catch(Exception e){
            logger.debug("派发树常用班组查询出错，报错信息begin======");
            e.printStackTrace();
            logger.debug("派发树常用班组查询出错，报错信息end=======");
        }
        
        String xml = SearchTreeHepler.buildXMLString(dataList);
        logger.debug("============Method findFavoriteGroupAndMember end!============");
        return xml;
    }
    
    /**
     * 常用群组list
     * @param dataList
     * @param user 群组成员
     * @param id ID
     * @param text 名称
     * @param parentId 父ID
     * @throws Exception
     * @see
     * @since
     */
    private void addDataToFgmList(List<TreeSearchEntity> dataList,UserEntity user,int id,String text,Integer parentId) throws Exception{
        TreeSearchEntity node = new TreeSearchEntity();
        
        if (!CommonUtils.isEmpty(user)) {//群组成员
            AccountEntity accEntity = user.getAccount();
            if(accEntity != null){
                node.setAccountId(accEntity.getAccountId());
            }else{
                node.setAccountId(null);
            }
            node.setAccountName(user.getEmpName());
            node.setHrId(user.getHrEmpCode());
            node.setName(user.getEmpName());
            node.setNodeId(user.getCloudUserId());
            node.setNoteType(2);
            node.setParentNodeId(parentId);
            node.setPortalId(user.getPortalUserCode());
            node.setIsSelect(0);
            node.setEmail(user.getMainMailAddress());
            if("".equals(user.getMobTel()) || user.getMobTel() == null){
                node.setContanctNumber(user.getOfficeTel());//电话号码
            }else{
                node.setContanctNumber(user.getMobTel());//电话号码
            }
            node.setSex(user.getUserSex());
        }else{//群组
            node.setAccountId(null);//当节点类型对用户时，组织时为空值。
            node.setName(text);//用户或组织名称 \节点名称
            node.setNodeId(id);//用户或组织id \节点 id
            node.setNoteType(1);//节点类型1组织 2人员
            node.setParentNodeId(-1);//父级节点 id
            node.setDefaultOpen(1);
        }
        
        dataList.add(node);
    }
}
