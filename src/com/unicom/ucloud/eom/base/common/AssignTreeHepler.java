package com.unicom.ucloud.eom.base.common;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONException;

import com.ucloud.paas.proxy.aaaa.entity.AssignTreeEntity;
import com.unicom.ucloud.eom.base.common.CommonUtils;

public class AssignTreeHepler {

    /**
     * @param args
     * @author feng.yang
     * @throws JSONException
     * @see
     * @since
     */
    public AssignTreeHepler(){
        
    }
    
    /**
     * parse list to xml string for tree
     * 
     * @param treeDatas
     * @return
     * @author feng.yang
     * @see
     * @since
     */
    public static String buildXMLString(List<AssignTreeEntity> treeDatas) {
        Document document = DocumentHelper.createDocument(); // 创建文档
        if (CommonUtils.isEmpty(treeDatas)) {
            document.addElement("Trees");
            return document.asXML();
        }
        sort(treeDatas);

        Element root = document.addElement("Trees");

        for (AssignTreeEntity treeEntity : treeDatas) {

            Integer parentNodeId = treeEntity.getParentNodeId();
            if (parentNodeId == null) {
                parentNodeId = 0;
            }
            Integer nodeId = treeEntity.getNodeId();
            if (CommonUtils.isEmpty(nodeId)) {
                continue;
            }
            // find parent node
            String path = "//TreeNode[@id='" + parentNodeId.intValue() + "']";
            Object parentElement = document.selectSingleNode(path);

            Element treeNode = null;
            if (parentElement != null) {
                // appent to parent
                Element parent = (Element) parentElement;
                treeNode = parent.addElement("TreeNode");
                parent.addAttribute("hasChild", "1");
                parent.addAttribute("leaf", "0");
            } else {
                // append to root
                treeNode = root.addElement("TreeNode");
            }

            treeNode.addAttribute("parentNodeId", parentNodeId.toString());
            treeNode.addAttribute("id", nodeId.toString());

            treeNode.addAttribute("nodeId", nodeId.toString());
            treeNode.addAttribute("name", treeEntity.getName());
            treeNode.addAttribute("noteType", String.valueOf(treeEntity.getNoteType()));
            if (!CommonUtils.isEmpty(treeEntity.getNoteType()) && treeEntity.getNoteType() == 1) {
                treeNode.addAttribute("thisType", "Company");
                treeNode.addAttribute("detailedType", "Company");
                treeNode.addAttribute("defaultOpen", "1");

            } else {
                treeNode.addAttribute("thisType", "Person");
                treeNode.addAttribute("detailedType", "Person");
                treeNode.addAttribute("defaultOpen", "0");
            }
            treeNode.addAttribute("parentNodeId", parentNodeId.toString());
            treeNode.addAttribute("portalId", String.valueOf(treeEntity.getPortalId()));
            treeNode.addAttribute("hasChild", "0");
            treeNode.addAttribute("leaf", "1");

            treeNode.addAttribute("id", nodeId.toString());
            treeNode.addAttribute("text", treeEntity.getName());
            treeNode.addAttribute("xmlSource", "");
            treeNode.addAttribute("logoImagePath", "");
            treeNode.addAttribute("statusFlag", "");
            treeNode.addAttribute("title", treeEntity.getName());
            treeNode.addAttribute("hrefPath", "");
            treeNode.addAttribute("target", "");
            treeNode.addAttribute("dbClick", "");
            treeNode.addAttribute("orderStr", "");
            treeNode.addAttribute("returnValue", "");
            treeNode.addAttribute("isSelected", "");
            treeNode.addAttribute("indeterminate", "");
            treeNode.addAttribute("isSubmit", "");
            treeNode.addAttribute("parentId", parentNodeId.toString());
            treeNode.addAttribute("childIds", "");
            treeNode.addAttribute("imageUrl", "");
            treeNode.addAttribute("busContent", "UCloud");
            if(treeEntity.getAccountId() != null){
                treeNode.addAttribute("accountId", String.valueOf(treeEntity.getAccountId()));
            }
            treeNode.addAttribute("contractNumber", "");
            // if(!CommonUtils.isEmpty(qryType)){
            // treeNode.addAttribute("qryType", qryType);
            // }
        }

        return document.asXML();

    }

    private static void sort(List<AssignTreeEntity> assingTree) {

        // 3.最后按结点ID，小的排前面
        Collections.sort(assingTree, new Comparator<AssignTreeEntity>() {
            @Override
            public int compare(AssignTreeEntity node1, AssignTreeEntity node2) {

                if (node1.getNodeId() > node2.getNodeId()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });

        // 2.再按父结点大小，小的排前面
        Collections.sort(assingTree, new Comparator<AssignTreeEntity>() {
            @Override
            public int compare(AssignTreeEntity node1, AssignTreeEntity node2) {

                if (node1.getParentNodeId() > node2.getParentNodeId()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });

        // 1.先将组织结点排前面,即数据类型小的排前面
        Collections.sort(assingTree, new Comparator<AssignTreeEntity>() {
            @Override
            public int compare(AssignTreeEntity node1, AssignTreeEntity node2) {

                if (node1.getNoteType() > node2.getNoteType()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });

    }

}

