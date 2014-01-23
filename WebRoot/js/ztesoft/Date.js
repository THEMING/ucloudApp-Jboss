/**
 * 扩展原有Date
 * get("dd")
 * set("dd",1)
 * diff(d1,d2)
 * add("dd",-1)
 */
var _DATEC__={yy: "FullYear",mm: "Month",dd: "Date",wk: "Date",dw: "Day",hh: "Hours",mi: "Minutes",ss: "Seconds",ms: "Milliseconds"};Date.prototype.get=function(b){return(_DATEC__[b])?eval("this.get"+_DATEC__[b]+"()"+((b!="mm")?"":"+1")):null;};Date.prototype.set=function(b,c){if((c%1)!=0)throw new Error(0,"is not an integer");if(_DATEC__[b])eval("this.set"+_DATEC__[b]+"(c"+((b!="mm")?"":"-1")+")");};Date.prototype.add=function(b,c){if((c%1)!=0)throw new Error(0,"is not an integer");if(_DATEC__[b])eval("this.set"+_DATEC__[b]+"(this.get"+_DATEC__[b]+"()+c"+((b!="wk")?"":"*7")+")");};Date.prototype.diff=function(b,d){if(!(d instanceof Date))return null;switch(b){case"yy":return eval("this.get"+_DATEC__[b]+"()-d.get"+_DATEC__[b]+"()");case"mm":return eval("(this.get"+_DATEC__["yy"]+"()-d.get"+_DATEC__["yy"]+"())*12+this.get"+_DATEC__[b]+"()-d.get"+_DATEC__[b]+"()");case"dd":return Math.floor((this.getTime()-d.getTime())/(1000*60*60*24));case"hh":return Math.floor((this.getTime()-d.getTime())/(1000*60*60));case"mi":return Math.floor((this.getTime()-d.getTime())/(1000*60));case"ss":return Math.floor((this.getTime()-d.getTime())/1000);case"ms":return(this.getTime()-d.getTime());};}

/**
 * 补0
 */
function StrZeroAdd(s){
    s="0"+s;
    return s.substr(s.length-2);
};

/**
 * 日期转化成字符串
 * @param d Date类型
 * @param useTime 是否需要时分秒true\false
 * @returns {String}
 */
function DateToString(d,useTime){
    if(d){
        return d.getFullYear()+"-"+StrZeroAdd(d.getMonth()+1)+"-"+StrZeroAdd(d.getDate())+((useTime)?" "+StrZeroAdd(d.getHours())+":"+StrZeroAdd(d.getMinutes())+":"+StrZeroAdd(d.getSeconds()):"");
    } else {
        return "";
    }
};

/**
 * 字符串转化成日期
 * @param s 字符串2010-11-11 11:11:11
 * @returns
 */
function StringToDate(s){
    if(s&&typeof(s)=="string"){
        var s = s.substring(0,19);
        var aD=s.split(/[\/\-: ]/);
        if(aD.length<3){
            return null;
        }
        if(aD.length<4){
            aD[3]=aD[4]=aD[5]="00";
        }
        var d=new Date(aD[0],parseInt(aD[1]-1,10),aD[2],aD[3],aD[4],aD[5]);
        if(isNaN(d)){
            return null;
        }
        return d;
    }else {
        return null;
    }
};
