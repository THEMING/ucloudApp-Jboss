
package com.unicom.ucloud.msgheader;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java class for MsgHeader complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="MsgHeader">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="SOURCE_APP_ID" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="SOURCE_APP_NAME" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="SOURCE_MOD_ID" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="SOURCE_MOD_NAME" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="TARGET_MOD_ID" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="TARGET_MOD_NAME" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="TOKEN" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="USERID" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="USERNAME" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="SUBMITDATE" type="{http://www.w3.org/2001/XMLSchema}dateTime"/>
 *         &lt;element name="PAGE_SIZE" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="CURRENT_PAGE" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="TOTAL_RECORD" type="{http://www.w3.org/2001/XMLSchema}decimal"/>
 *         &lt;element name="PROVINCE_CODE" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="ENVIRONMENT_NAME" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "MsgHeader", propOrder = {
    "sourceappid",
    "sourceappname",
    "sourcemodid",
    "sourcemodname",
    "targetmodid",
    "targetmodname",
    "token",
    "userid",
    "username",
    "submitdate",
    "pagesize",
    "currentpage",
    "totalrecord",
    "provincecode",
    "environmentname"
})
public class MsgHeader {

    @XmlElement(name = "SOURCE_APP_ID", required = true, nillable = true)
    protected String sourceappid;
    @XmlElement(name = "SOURCE_APP_NAME", required = true, nillable = true)
    protected String sourceappname;
    @XmlElement(name = "SOURCE_MOD_ID", required = true, nillable = true)
    protected String sourcemodid;
    @XmlElement(name = "SOURCE_MOD_NAME", required = true, nillable = true)
    protected String sourcemodname;
    @XmlElement(name = "TARGET_MOD_ID", required = true, nillable = true)
    protected String targetmodid;
    @XmlElement(name = "TARGET_MOD_NAME", required = true, nillable = true)
    protected String targetmodname;
    @XmlElement(name = "TOKEN", required = true, nillable = true)
    protected String token;
    @XmlElement(name = "USERID", required = true, nillable = true)
    protected BigDecimal userid;
    @XmlElement(name = "USERNAME", required = true, nillable = true)
    protected String username;
    @XmlElement(name = "SUBMITDATE", required = true, nillable = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar submitdate;
    @XmlElement(name = "PAGE_SIZE", required = true, nillable = true)
    protected BigDecimal pagesize;
    @XmlElement(name = "CURRENT_PAGE", required = true, nillable = true)
    protected BigDecimal currentpage;
    @XmlElement(name = "TOTAL_RECORD", required = true, nillable = true)
    protected BigDecimal totalrecord;
    @XmlElement(name = "PROVINCE_CODE", required = true, nillable = true)
    protected String provincecode;
    @XmlElement(name = "ENVIRONMENT_NAME", required = true, nillable = true)
    protected String environmentname;

    /**
     * Gets the value of the sourceappid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSOURCEAPPID() {
        return sourceappid;
    }

    /**
     * Sets the value of the sourceappid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSOURCEAPPID(String value) {
        this.sourceappid = value;
    }

    /**
     * Gets the value of the sourceappname property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSOURCEAPPNAME() {
        return sourceappname;
    }

    /**
     * Sets the value of the sourceappname property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSOURCEAPPNAME(String value) {
        this.sourceappname = value;
    }

    /**
     * Gets the value of the sourcemodid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSOURCEMODID() {
        return sourcemodid;
    }

    /**
     * Sets the value of the sourcemodid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSOURCEMODID(String value) {
        this.sourcemodid = value;
    }

    /**
     * Gets the value of the sourcemodname property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSOURCEMODNAME() {
        return sourcemodname;
    }

    /**
     * Sets the value of the sourcemodname property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSOURCEMODNAME(String value) {
        this.sourcemodname = value;
    }

    /**
     * Gets the value of the targetmodid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTARGETMODID() {
        return targetmodid;
    }

    /**
     * Sets the value of the targetmodid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTARGETMODID(String value) {
        this.targetmodid = value;
    }

    /**
     * Gets the value of the targetmodname property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTARGETMODNAME() {
        return targetmodname;
    }

    /**
     * Sets the value of the targetmodname property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTARGETMODNAME(String value) {
        this.targetmodname = value;
    }

    /**
     * Gets the value of the token property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTOKEN() {
        return token;
    }

    /**
     * Sets the value of the token property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTOKEN(String value) {
        this.token = value;
    }

    /**
     * Gets the value of the userid property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getUSERID() {
        return userid;
    }

    /**
     * Sets the value of the userid property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setUSERID(BigDecimal value) {
        this.userid = value;
    }

    /**
     * Gets the value of the username property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUSERNAME() {
        return username;
    }

    /**
     * Sets the value of the username property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUSERNAME(String value) {
        this.username = value;
    }

    /**
     * Gets the value of the submitdate property.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getSUBMITDATE() {
        return submitdate;
    }

    /**
     * Sets the value of the submitdate property.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setSUBMITDATE(XMLGregorianCalendar value) {
        this.submitdate = value;
    }

    /**
     * Gets the value of the pagesize property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getPAGESIZE() {
        return pagesize;
    }

    /**
     * Sets the value of the pagesize property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setPAGESIZE(BigDecimal value) {
        this.pagesize = value;
    }

    /**
     * Gets the value of the currentpage property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getCURRENTPAGE() {
        return currentpage;
    }

    /**
     * Sets the value of the currentpage property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setCURRENTPAGE(BigDecimal value) {
        this.currentpage = value;
    }

    /**
     * Gets the value of the totalrecord property.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getTOTALRECORD() {
        return totalrecord;
    }

    /**
     * Sets the value of the totalrecord property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setTOTALRECORD(BigDecimal value) {
        this.totalrecord = value;
    }

    /**
     * Gets the value of the provincecode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPROVINCECODE() {
        return provincecode;
    }

    /**
     * Sets the value of the provincecode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPROVINCECODE(String value) {
        this.provincecode = value;
    }

    /**
     * Gets the value of the environmentname property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getENVIRONMENTNAME() {
        return environmentname;
    }

    /**
     * Sets the value of the environmentname property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setENVIRONMENTNAME(String value) {
        this.environmentname = value;
    }

}
