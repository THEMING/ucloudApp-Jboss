package com.unicom.ucloud.eom.e19.service;

import java.util.Map;
import java.util.List;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.unicom.ucloud.eom.base.bean.Page;

import com.unicom.ucloud.eom.base.service.BaseServiceImpl; 
import com.unicom.ucloud.eom.e19.dao.IAttachmentRelProcDAO; 

/** 
 * 业务层实现类 
 * @version 1.0
 * @date 2013-04-09
 * @author MING
 */ 
@Service
public class AttachmentRelProcServiceImpl extends BaseServiceImpl implements IAttachmentRelProcService {

    @Autowired
    private IAttachmentRelProcDAO attachmentRelProcDAO;

    @Override
    public List<Map<String, Object>> qryListByParam(JSONObject jsonObj) throws Exception{ 
        return attachmentRelProcDAO.qryListByParam(jsonObj);
    }

    @Override
    public void save(JSONObject jsonObj) throws Exception{
        attachmentRelProcDAO.save(jsonObj);
    }

    @Override
    public void delete(JSONObject jsonObj) throws Exception{
        attachmentRelProcDAO.delete(jsonObj);
    }

    @Override
    public void update(JSONObject jsonObj) throws Exception{
        attachmentRelProcDAO.update(jsonObj);
    }

    @Override
    public Page page(JSONObject jsonObj) throws Exception{
        return attachmentRelProcDAO.page(jsonObj);
    }

}
