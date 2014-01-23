package com.unicom.ucloud.eom.base.daas;

public class UnisequenceMana {
    // 模块名
    private String modelCode;
    // 表名
    private String table;
    // 字段名
    private String idField;

    /**
     * 
     * @param modelCode
     *            模块名
     * @param table
     *            表名
     * @param idField
     *            字段名
     */
    public UnisequenceMana(String modelCode, String table, String idField) {
        this.modelCode = modelCode;
        this.table = table;
        this.idField = idField;
    }

    /**
     * 产生主键序列，目前暂时使用随机数，正式对接时应该使用daas提供的全局序列服务
     * 
     * @param modelCode
     *            模块名
     * @param table
     *            表名
     * @param idField
     *            字段名
     * @return
     * @see
     * @since
     */
    public Long next() {
        // select <模块名_表名_字段名>.nextval from unisequence;
        return (long) ((1 + 9 * Math.random()) * 100000000000L + 99999999999L * Math.random());
    }

    /**
     * @param args
     * @see
     * @since
     */
    public static void main(String[] args) {
        // select dzyw_order_orderid.nextval from unisequence
        UnisequenceMana us = new UnisequenceMana("E24", "ORDER", "ORDER_ID");
        System.out.println(us.next());
        System.out.println(us.next());
        System.out.println(us.next());
        System.out.println(us.next());
        System.out.println(us.next());

    }

}
