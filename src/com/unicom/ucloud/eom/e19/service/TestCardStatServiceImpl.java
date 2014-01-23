package com.unicom.ucloud.eom.e19.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicom.ucloud.eom.base.service.ExportSimpleElsService;
import com.unicom.ucloud.eom.e19.common.ConstantUtil;
import com.unicom.ucloud.eom.e19.dao.ITestCardStatisDAO;
import com.unicom.ucloud.util.JsonUtil;
import com.unicom.ucloud.util.execl.SimpleExportParameter;

@Service
public class TestCardStatServiceImpl extends ExportSimpleElsService implements
        ITestCardStatisService {

    @Autowired
    private ITestCardStatisDAO testCardStatisDAO;

    @Override
    public List<Map<String, Object>> getTestCardStatisInfo(JSONObject jsonObj) throws Exception {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        Map<String, Object> map = new HashMap<String, Object>();
        long leftCardNum = 0;
        String testobjectType = JsonUtil.getString(jsonObj, "testTypeEnumId");
        if (testobjectType == null || testobjectType.length() == 0||"null".equals(testobjectType)) {
            list = new ArrayList<Map<String, Object>>();
            jsonObj.put("testTypeEnumId",Integer.valueOf(ConstantUtil.TEST_CARD_ENUM));
            map = testCardStatisDAO.statisTestCardMap(jsonObj);

            Long totalCardNum = MapUtils.getLong(map, "totalCardNum");
            if (totalCardNum.longValue() != 0) {
                leftCardNum = MapUtils.getLongValue(map, "totalCardNum")
                        - MapUtils.getLongValue(map, "lendCardNum");
                map.put("leftCardNum", leftCardNum);
                list.add(map);
            }

            jsonObj.put("testTypeEnumId",Integer.valueOf(ConstantUtil.TERMINAL_CARD_ENUM));
            map = testCardStatisDAO.statisTestCardMap(jsonObj);
            totalCardNum = MapUtils.getLong(map, "totalCardNum");
            if (totalCardNum.longValue() != 0) {
                leftCardNum = MapUtils.getLongValue(map, "totalCardNum")
                        - MapUtils.getLongValue(map, "lendCardNum");
                map.put("leftCardNum", leftCardNum);
                list.add(map);
            }

            jsonObj.put("testTypeEnumId",Integer.valueOf(ConstantUtil.TELE_CARD_ENUM));
            map = testCardStatisDAO.statisTestCardMap(jsonObj);
            totalCardNum = MapUtils.getLong(map, "totalCardNum");
            if (totalCardNum.longValue() != 0) {
                leftCardNum = MapUtils.getLongValue(map, "totalCardNum")
                        - MapUtils.getLongValue(map, "lendCardNum");
                map.put("leftCardNum", leftCardNum);
                list.add(map);
            }

            jsonObj.put("testTypeEnumId",Integer.valueOf(ConstantUtil.RECH_CARD_ENUM));
            map = testCardStatisDAO.statisTestCardMap(jsonObj);
            totalCardNum = MapUtils.getLong(map, "totalCardNum");
            if (totalCardNum.longValue() != 0) {
                leftCardNum = MapUtils.getLongValue(map, "totalCardNum")
                        - MapUtils.getLongValue(map, "lendCardNum");
                map.put("leftCardNum", leftCardNum);
                list.add(map);
            }
        } else {
            list = testCardStatisDAO.statisTestCardList(jsonObj);
            if (list != null && list.size() > 0) {
                for (int i = 0; i < list.size(); i++) {
                    map = list.get(i);
                    leftCardNum = MapUtils.getLongValue(map, "totalCardNum")
                            - MapUtils.getLongValue(map, "lendCardNum");
                    map.put("leftCardNum", leftCardNum);
                }
            }
        }
        return list;
    }

    @Override
    protected SimpleExportParameter getSimpleListOutputParameters(JSONObject param)
            throws Exception {
        String fields = "testobjectTypeEnumName," + "totalCardNum," + "normalCardNum,"+"faultCardNum,"
                + "unUsedCardNum," +"fixingCardNum,overDueNum,failRegisterNum,"+ "lendCardNum,leftCardNum";
        // 列名，excel中的显示名
        String columns = "测试卡类型," + "总卡数," + "正常卡数," +"故障卡数,"+ "报废卡数,"+"送修卡数,欠费停机卡,SIM卡注册失败卡," + "外借数,未借数";
        // 列宽，excel中的列宽，该值为空则使用默认的每列20
        String width = "20,20,20,20,20,20,20,30,20,20";

        List<Map<String, Object>> dataList = getTestCardStatisInfo(param);
        List<Map<String, Object>> dataList2 = new ArrayList();
        
        if(JsonUtil.getString(param,"exportType")!=null&&!"".equals(JsonUtil.getString(param,"exportType"))&&"SELECTED".equals(JsonUtil.getString(param,"exportType"))){
            
            
            for(int i=0;i<dataList.size();i++){
                
                Map<String, Object> m = dataList.get(i);
                String[] ll = JsonUtil.getString(param,"selectIds").toString().split(",");
                for(int j=0;j<ll.length;j++){
                    if(m.get("testobjectTypeEnumId").toString().equals(ll[j])){
                        dataList2.add(dataList.get(i));
                        break;
                    }
                }
            }
        }else{
            dataList2 = dataList;
        }

        // excel里面的标题
        String title = "测试卡统计";
        // excel里面sheet的名称
        String titleEn = "测试卡统计sheet";

        String[] fieldsId = fields.split(",");
        String[] fieldsName = columns.split(",");
        String[] widths = width.split(",");

        SimpleExportParameter parameters = new SimpleExportParameter();

        parameters.setTitle(title);

        parameters.setTitleEn(titleEn);
        parameters.setFieldsId(fieldsId);
        parameters.setFieldsName(fieldsName);
        parameters.setWidths(widths);
        parameters.setDataList(dataList2);

        return parameters;
    }

}
