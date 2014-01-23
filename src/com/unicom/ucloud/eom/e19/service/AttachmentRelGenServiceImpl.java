package com.unicom.ucloud.eom.e19.service;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.unicom.ucloud.eom.base.bean.Page;

import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.e19.dao.IAttachmentRelGenDAO; 

/** 
 * 业务层实现类 
 * @version 1.0
 * @date 2013-03-11
 * @author MING
 */ 
@Service
public class AttachmentRelGenServiceImpl extends BaseServiceImpl implements IAttachmentRelGenService {

    @Autowired
    private IAttachmentRelGenDAO attachmentRelGenDAO;

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{ 
        return attachmentRelGenDAO.qryListByParam(jsonObj);
    }

    @Override
    public void save(JSONObject jsonObj) throws Exception{
        attachmentRelGenDAO.save(jsonObj);
    }

    @Override
    public void delete(JSONObject jsonObj) throws Exception{
        attachmentRelGenDAO.delete(jsonObj);
    }

    @Override
    public void update(JSONObject jsonObj) throws Exception{
        attachmentRelGenDAO.update(jsonObj);
    }

    @Override
    public Page page(JSONObject jsonObj) throws Exception{
        return attachmentRelGenDAO.page(jsonObj);
    }

}
