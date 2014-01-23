<%@page contentType="text/xml;charset=UTF-8" language="java"%><%
	String inputType = request.getParameter("inputType");
	if(inputType == null || inputType.length() == 0 || (!"noInput".equals(inputType) && !"checkbox".equals(inputType) && !"radio".equals(inputType))) {
		inputType = "noInput";		
	}
	String treeImagePath = request.getParameter("treeImagePath");
	if(treeImagePath == null || treeImagePath.length() == 0) {
		treeImagePath = "image";		
	}
	String xmlStr = request.getParameter("xmlArray");
	String xmlArrayL = request.getParameter("xmlArrayL");
	int xmlArrayLength = 0;
	String[] xmlArray = null;
	if(xmlStr == null || ("").equals(xmlStr) || "undefined".equals(xmlStr)){
		 xmlArrayLength = 0;
	}else{
		xmlArray = xmlStr.split(",");
		xmlArrayLength=Integer.parseInt(xmlArrayL);
	}
    String isOnlyLeaf = request.getParameter("isOnlyLeaf");
    if(isOnlyLeaf == null || isOnlyLeaf.length() == 0) {
        isOnlyLeaf="0";     
    }
    System.out.println("tan::::::::"+isOnlyLeaf);
    String winId = request.getParameter("winId");
    if(winId == null || ("").equals(winId) || "undefined".equals(winId)){
        winId = "";
    }
%><?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!--忽略xml声明-->
	<xsl:output method="html" encoding="UTF-8" omit-xml-declaration="yes"/>
	<!--处理根节点-->
	<xsl:template match="/">
		<xsl:apply-templates/>
	</xsl:template>
	<!--处理TreeNode节点-->
	<xsl:template match="TreeNode">
		<xsl:for-each select=".">
			<xsl:sort select=".//@orderStr"/>
			<div class="TreeNode" nowrap="true" name="deeptree_div">
				<!--div的属性开始-->
				<!--转换必填项属性-->
				<xsl:attribute name="id">deeptree_div<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
				<xsl:attribute name="realId"><xsl:value-of select="@id"/></xsl:attribute>
				<xsl:attribute name="text"><xsl:value-of select="@text"/></xsl:attribute>
				<xsl:attribute name="hasChild"><xsl:value-of select="@hasChild"/></xsl:attribute>
				<xsl:attribute name="qryType"><xsl:value-of select="@qryType"/></xsl:attribute>
				<xsl:attribute name="xmlSource"><xsl:value-of select="@xmlSource"/></xsl:attribute>
	
				<!--新添加的属性开始-->
				<xsl:attribute name="busContent"><xsl:value-of select="@busContent"/></xsl:attribute>
				<xsl:attribute name="parentId"><xsl:value-of select="@parentId"/></xsl:attribute>
				<xsl:attribute name="accountId"><xsl:value-of select="@accountId"/></xsl:attribute>
				<xsl:attribute name="accountName"><xsl:value-of select="@accountName"/></xsl:attribute>
				<xsl:attribute name="contractNumber"><xsl:value-of select="@contractNumber"/></xsl:attribute>
				<xsl:attribute name="isLeaf"><xsl:value-of select="@leaf"/></xsl:attribute>
				<xsl:attribute name="sex"><xsl:value-of select="@sex"/></xsl:attribute>
				<xsl:attribute name="email"><xsl:value-of select="@email"/></xsl:attribute>
				<xsl:attribute name="thisType"><xsl:value-of select="@thisType"/></xsl:attribute>
				<% for( int i=0; i<xmlArrayLength; i++){ %>
				<xsl:attribute name="<%=xmlArray[i]%>"><xsl:value-of select="@<%=xmlArray[i]%>"/></xsl:attribute>
				<% } %>
				<!--新添加的属性结束-->
				
				<!--转换树的外观属性-->
				<xsl:choose>
					<xsl:when test="@hasChild &gt; 0">
						<xsl:attribute name="defaultOpen">
							<xsl:choose>
								<xsl:when test="@defaultOpen != ''"><xsl:value-of select="@defaultOpen"/></xsl:when>
								<xsl:otherwise>0</xsl:otherwise>
							</xsl:choose>
						</xsl:attribute>
						<!--div的类型-->
						<xsl:attribute name="type">parent</xsl:attribute>
						<xsl:choose>
							<xsl:when test="TreeNode">
								<xsl:choose>
									<xsl:when test="@defaultOpen &gt; 0">
										<xsl:attribute name="open">true</xsl:attribute>
									</xsl:when>
									<xsl:otherwise>
										<xsl:attribute name="open">false</xsl:attribute>
									</xsl:otherwise>
								</xsl:choose>
								<xsl:attribute name="opened">true</xsl:attribute>
								<xsl:attribute name="send">true</xsl:attribute>
							</xsl:when>
							<xsl:otherwise>
								<!--div的当前打开状态-->
								<xsl:attribute name="open">false</xsl:attribute>
								<!--div是否已经打开了-->
								<xsl:attribute name="opened">false</xsl:attribute>
								<!--div是否已经获得子节点数据-->
								<xsl:attribute name="send">false</xsl:attribute>								
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="type">leaf</xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<!--转换表单提交属性-->
				<xsl:attribute name="returnValue">
					<xsl:choose>
						<xsl:when test="@returnValue != ''"><xsl:value-of select="@returnValue"/></xsl:when>
						<xsl:otherwise><xsl:value-of select="@id"/></xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="isSelected">
					<xsl:choose>
						<xsl:when test="@isSelected != ''"><xsl:value-of select="@isSelected"/></xsl:when>
						<xsl:otherwise>0</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="indeterminate">
					<xsl:choose>
						<xsl:when test="@indeterminate != ''"><xsl:value-of select="@indeterminate"/></xsl:when>
						<xsl:otherwise>0</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:attribute name="thisType"><xsl:value-of select="@thisType"/></xsl:attribute>
				<xsl:attribute name="detailedType"><xsl:value-of select="@detailedType"/></xsl:attribute>
				<xsl:attribute name="isSubmit">
					<xsl:choose>
						<xsl:when test="@isSubmit != ''"><xsl:value-of select="@isSubmit"/></xsl:when>
						<xsl:otherwise>1</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<!--转换不填的属性，预留-->
				<xsl:attribute name="parentId"><xsl:value-of select="@parentId"/></xsl:attribute>
				<xsl:attribute name="childIds"><xsl:value-of select="@childIds"/></xsl:attribute>
				<!--div的属性结束-->
				<!--隐藏属性的容器开始-->
				<input type="hidden"><xsl:copy-of select="@*"/></input>
				<!--隐藏属性的容器结束-->
				<!--树的图片开始-->
				<img type="img" align="left" use="tree" name="deeptree_treeImage">
					<xsl:attribute name="id">deeptree_treeImg<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
					<xsl:attribute name="src">
						<xsl:choose>
							<xsl:when test="@hasChild &gt; 0">
								<xsl:choose>
									<xsl:when test="TreeNode">
										<xsl:choose>
											<xsl:when test="@defaultOpen &gt; 0"><%=treeImagePath%>/v.png</xsl:when>
											<xsl:otherwise><%=treeImagePath%>/z.png</xsl:otherwise>
										</xsl:choose>
									</xsl:when>
									<xsl:otherwise><%=treeImagePath%>/z.png</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise><%=treeImagePath%>/l-.png</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="style">
						<xsl:choose>
							<xsl:when test="@hasChild &gt; 0">vertical-align:middle;cursor: pointer;</xsl:when>
							<xsl:otherwise>vertical-align:middle;cursor: default;</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
				</img>
				<!--树的图片结束-->
				<% if("checkbox".equals(inputType)) { %>
				<!--checkbox开始-->
				<input type="checkbox" name="deeptree_checkbox" style="margin:top" class="tree-firerift-style-checkbox-o">
					<xsl:attribute name="id">deeptree_checkbox<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
					<xsl:attribute name="value">
						<xsl:choose>
							<xsl:when test="@returnValue != ''"><xsl:value-of select="@returnValue"/></xsl:when>
							<xsl:otherwise><xsl:value-of select="@id"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:attribute name="text"><xsl:value-of select="@text"/></xsl:attribute>
					<xsl:if test="@isSelected &gt; 0">
						<xsl:attribute name="checked">true</xsl:attribute>
					</xsl:if>
					<xsl:if test="@indeterminate &gt; 0">
						<xsl:attribute name="indeterminate">true</xsl:attribute>
					</xsl:if>
					<xsl:if test="@isSubmit = '0'">
						<xsl:attribute name="style">display:none</xsl:attribute>
					</xsl:if>
				</input>
				<div class="tree-firerift-style-o  ">
					<xsl:attribute name="id">deeptree_checkbox<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
				</div>				
				<!--checkbox结束-->
                <!--radio开始-->
                <% } else if("radio".equals(inputType)) {
                            if("1".equals(isOnlyLeaf)){%>
                <xsl:choose>
                <xsl:when test="@isOptional = 1">
                </xsl:when>
                <xsl:otherwise>
                <xsl:choose>        
                <xsl:when test="@hasChild &lt; 1">
                <input type="radio" name="deeptree_radio" style="margin:top" class="tree-firerift-style-checkbox-o">
                    <xsl:attribute name="id">deeptree_radio<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="@returnValue != ''"><xsl:value-of select="@returnValue"/></xsl:when>
                            <xsl:otherwise><xsl:value-of select="@id"/></xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                    <xsl:attribute name="text"><xsl:value-of select="@text"/></xsl:attribute>
                    <xsl:if test="@isSelected &gt; 0">
                        <xsl:attribute name="checked">true</xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@isSubmit = '0'">
                        <xsl:attribute name="style">display:none</xsl:attribute>
                    </xsl:if>
                </input>
                <div class="tree-firerift-style-r">
                    <xsl:attribute name="id">deeptree_radio<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
                </div>  
                </xsl:when>
                </xsl:choose>
                </xsl:otherwise>
                </xsl:choose>               
                <%  }else{ %>
                <xsl:choose>
                <xsl:when test="@isOptional = 1">
                </xsl:when>
                <xsl:otherwise> 
                <input type="radio" name="deeptree_radio" style="margin:top" class="tree-firerift-style-checkbox-o">
                    <xsl:attribute name="id">deeptree_radio<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="@returnValue != ''"><xsl:value-of select="@returnValue"/></xsl:when>
                            <xsl:otherwise><xsl:value-of select="@id"/></xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                    <xsl:attribute name="text"><xsl:value-of select="@text"/></xsl:attribute>
                    <xsl:if test="@isSelected &gt; 0">
                        <xsl:attribute name="checked">true</xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@isSubmit = '0'">
                        <xsl:attribute name="style">display:none</xsl:attribute>
                    </xsl:if>
                </input>
                <div class="tree-firerift-style-r">
                    <xsl:attribute name="id">deeptree_radio<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
                </div>
                </xsl:otherwise>
                </xsl:choose>               
                <%  }} %>
                <!--radio结束-->
				<xsl:if test="@logoImagePath != ''">
					<img type="img"  use="logo" name="deeptree_logoImage" class="logoImage_left">
						<xsl:attribute name="id">deeptree_logoImg<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
						<xsl:attribute name="src"><xsl:value-of select="@logoImagePath"/></xsl:attribute>
					</img>
				</xsl:if>
				<!--标识图片结束-->				
				<!--文字开始-->
				<span type="label" name="deeptree_span">
					<xsl:attribute name="id">deeptree_span<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
					<xsl:if test="@statusFlag = 0">
						<xsl:attribute name="class">hidden</xsl:attribute>
						<xsl:attribute name="style">color:#CCCCCC</xsl:attribute>
					</xsl:if>
					<xsl:attribute name="title">
						<xsl:choose>
							<xsl:when test="@title != ''"><xsl:value-of select="@title"/></xsl:when>
							<xsl:otherwise><xsl:value-of select="@text"/></xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:choose>
						<xsl:when test="@hrefPath != ''">
							<a>
								<xsl:attribute name="href"><xsl:value-of select="@hrefPath"/></xsl:attribute>
								<xsl:attribute name="target">
									<xsl:choose>
										<xsl:when test="@target != ''"><xsl:value-of select="@target"/></xsl:when>
										<xsl:otherwise>_blank</xsl:otherwise>
									</xsl:choose>
								</xsl:attribute>
								<xsl:value-of select="@text"/>
							</a>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="@text"/>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:if test="@dbClick != ''">
						<xsl:attribute name="onDbClick"><xsl:value-of select="@dbClick"/></xsl:attribute>
					</xsl:if>
				</span>
				<!--文字结束-->
				<!--标识图片开始-->
				<xsl:if test="@imageUrl != ''">
					<img type="img"  use="logo" name="deeptree_imageUrl" class="logoImage_right">
						<xsl:attribute name="id">deeptree_imageUrl<xsl:value-of select="@id"/>-<xsl:number level="single" count="TreeNode"/></xsl:attribute>
						<xsl:attribute name="src"><xsl:value-of select="@imageUrl"/></xsl:attribute>
					</img>
				</xsl:if>
				<!--标识图片结束-->
			</div>
			<!--如果有子节点，继续递归的转换其子节点-->
			<xsl:if test="@hasChild &gt; 0">
				<div>
					<xsl:choose>
						<xsl:when test="TreeNode">
							<xsl:choose>
								<xsl:when test="@defaultOpen &gt; 0">
									<xsl:attribute name="style"><xsl:value-of select="'padding-left:16px;display:block;background:url(<%=treeImagePath%>/line.png) repeat-y'"/></xsl:attribute>
								</xsl:when>
								<xsl:otherwise>
									<xsl:attribute name="style"><xsl:value-of select="'padding-left:16px;display:none;background:url(<%=treeImagePath%>/line.png) repeat-y'"/></xsl:attribute>
								</xsl:otherwise>
							</xsl:choose>
							<xsl:attribute name="send">true</xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="style"><xsl:value-of select="'padding-left:16px;display:none;background:url(<%=treeImagePath%>/line.png) repeat-y'"/></xsl:attribute>
							<xsl:attribute name="send">false</xsl:attribute>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:apply-templates/>
				</div>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<!--处理message信息-->
	<xsl:template match="message">
		<div class="TreeNode" type="load" nowrap="true">
			<img type="img" src="<%=treeImagePath%>/file.gif" align="absmiddle"/>
			<span type="load" class="load">
				<xsl:value-of select="@text"/>
			</span>
		</div>
	</xsl:template>
	<!--处理翻页MoreTreeNode节点-->
	<xsl:template match="MoreTreeNode">
		<div class="TreeNode" type="more" nowrap="true">
			<span type="more" class="more" style="cursor:pointer">
				<xsl:attribute name="xmlSource"><xsl:value-of select="@xmlSource"/></xsl:attribute>
				<xsl:value-of select="@text"/>
			</span>
		</div>
	</xsl:template>
</xsl:stylesheet>