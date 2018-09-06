/**
 * Created by qiaozm on 2018/5/8.
 * 提供公用方法
 */
import React from 'react-native';
import {
    PixelRatio,
    Platform,
    NativeModules,
    Image,
    Linking,
    ToastAndroid,
    Dimensions
    } from 'react-native';
const RNBridgeModule=NativeModules.RNBridgeModule;
export default {
    /*最小线宽*/
    pixel:1/PixelRatio.get(),

    /*实际像素*/
    getPixelSizeForLayoutSize(param){
        return PixelRatio.getPixelSizeForLayoutSize(param);
    },
    /**
    * param:实际PX的值
    * return:实际展示dp值
   **/
    getDpSize(param){
        return param/PixelRatio.get();
    },
    /*屏幕尺寸*/
    size:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    /*判断千分位符*/
    comdify(param){
    　　let re=/\d{1,3}(?=(\d{3})+$)/g;
    　　let n1=param.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
    　　return n1;
    },

    /**
     * fetch的get方法
     * @method get
     * @param {string} url
     * @param {function} callback请求成功回调
     */
    get(url,successCallback,failCallback){
        fetch(url).then((response)=>response.text())
        .then((_responseText)=>{
            successCallback(JSON.parse(_responseText));
        }).catch(function(err){
            failCallback(err);
        });
    },

    /**
     * fetch的post方法
     * fromData
     * @method post
     * @param {string} url
     * @param {function} callback请求成功回调
     */
    post(url,fromData,successCallback,failCallback){
        fetch(url, {
           method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: fromData})
         .then((response) => response.json())
        .then((responseJson)=>{
            successCallback(responseJson);
        }).catch(function(err){
            failCallback(err);
        });
    },

    _toQueryString(obj) {
        return obj ? Object.keys(obj).sort().map(function (key) {
            let val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map(function (val2) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                }).join('&');
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }).join('&') : '';
    },

    /**
    *判断请求数据是否超时
    *@param {string} s
    **/
    FuncTimeOut(){
        return new Promise(function (resolve, reject) {
            let _data={
                data:{},
                message:'timeout'
            };
           setTimeout(resolve, 10000, _data);
       });
    },

    /**
    *人民币格式化
    *@param {string} s
    **/
    FuncRmbFormat(s){
        if(/[^0-9\.]/.test(s)) return "invalid value";
        	s=s+'';
            s=s.replace(/^(\d*)$/,"$1.");
            s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
            s=s.replace(".",",");
            let re=/(\d)(\d{3},)/;
            while(re.test(s))
                    s=s.replace(re,"$1,$2");
            s=s.replace(/,(\d\d)$/,".$1");
            if(s.indexOf('.')>0){
            	let temp=s.substring(s.indexOf('.'));
            	/*if(temp=='.00'){
            		s=s.substring(0,s.indexOf('.'));
            	}*/
            }
            return "￥" + s.replace(/^\./,"0.");
    },

    /**
    *删除字符串左右的空格
    *@param {string} str
    **/
    FuncStrFormateSpace1(str){
    	return str.replace(/(^\s*)|(\s*$)/g,'');
    },

    /**
    *删除字符串左右的空格保留中间一个空格
    *@param {string} str
    **/
    FuncStrFormateSpace2(str){
    	let _str=str.replace(/(^\s*)|(\s*$)/g,'');  //删除左右的空格
    	_str=_str.replace(/\s+/g,' ');  //保留中间一个空格
    	return _str;
    },

    /**
     * 删除字符串所有的空格
     *@param {string} str
     */
    FuncStrFormateSpace3(str){
    	return str.replace(/\s/g, "");
    },

    /**
     * 判断是否为非负整数字
     *@param {string} str
     */
    FuncStrFormateSpace4(str){
        return /^[0-9]*[1-9][0-9]*$/.test(this.FuncStrFormateSpace3(str));
    },

    /**
     * 判断是否为非负浮点数
     *@param {string} str
     */
    FuncStrFormateSpace5(str){
        return /^(([0-9]*[1-9][0-9]*\.[0-9])|([0-9]*[1-9][0-9]*))$/.test(this.FuncStrFormateSpace3(str));
    },
    /**
     * 判断str为1-999的整数或者1-999.9（小数点后保留1位）
     *@param {string} str
     */
    FuncStrFormatespace6(str){
        return /^[1-9]{1}\d{0,2}\.{1}\d{1}$|^[1-9]{1}\d{0,2}$/.test(this.FuncStrFormateSpace3(str));
    },

    /**
     * 判断str为1-999的整数
     *@param {string} str
     */
    FuncStrFormatespace7(str){
        return /^[1-9]{1}\d{0,2}$/.test(this.FuncStrFormateSpace3(str));
    },

    /**
     * 判断str为11位手机号
     *@param {string} str
     */
    FuncStrFormatespace11(str){
        return /^[1-9]{1}\d{0,10}$/.test(this.FuncStrFormateSpace3(str));
    },

    /**
     * 获取字符串的字符长度
     */
    FuncGetTextLength(str){// 获取字符串的长度 一个汉字为2个字符
    	return str.replace(/[^\x00-\xff]/g,"xx").length;
    },

    fixedFont(size) {
        // NOTE: Font Scale should always be the same as the Pixel Ratio on iOS, making this
        // a no-op.
        return size * React.PixelRatio.get() / React.PixelRatio.getFontScale();
    },

      /**
      *替换所有str字符为repStr
      */
    _FuncReplaceAll(str,repStr){
        if(str!=null){
            str = str.replace(/,/g,repStr)
        }
        return str;
    },

    /**
    *去除所有的html标签
    */
    _FuncRemoveHTMLTag(str){
        //str=str.replace
        str = str.replace(/&lt;\/?[^&gt;]*&gt;/g,''); //去除HTML tag 去除转义以后的html标签
        str = str.replace(/<\/?[^>]*</g,''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
        //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str=str.replace(/ /ig,'');//去掉
        return str;
    },
    /**
    *格式化日期字符串YYYY-MM-dd HH:mm:ss为YYYY年MM月dd日
    */
    _FuncFormateDate(date){
        if(date!=null && date!=''){
            let _year=date.substring(0,4);
            let _month=date.substring(5,7);
            let _day=date.substring(8,10);
            return _year+'年'+_month+'月'+_day+'日';
        }else{
            return 'error';
        }
    },
    /**
     *获取服务接口地址
     */
    _FuncGetServerName(){
        if(Platform.OS=='ios'){
            RNBridgeModule.getServerUrl(
                {'name':'ipurl'},
                (error,events)=>{
                    if(error){
                        console.error(error);
                    }else{
                        g_serviceName = events;
                    }
                }
            );
        }else{
            RNBridgeModule.getServerUrl().then((map)=>{
               // alert(map['severUrl']);
                 g_serviceName=map['severUrl'];
//                g_serviceName = "http://192.168.11.25:8080/sunsoft-app/";
              },(code,message)=>{
                console.error(message);
                //alert(message);
            })
        }
    },

    /**
     *获取图片宽，高，地址
     */
    _FuncGetRnPicUrl(url,FuncGetSizeSuccess,FuncGetSizeFailure){
        if(Platform.OS=='ios'){
            RNBridgeModule.FuncImageSize(url,
                (error,events)=>{
                    if(error){
                        console.error(error);
                        FuncGetSizeFailure(error);
                    }else{
                        let PicUrl=events;
                        PicUrl=eval('(' + PicUrl + ')');
                        FuncGetSizeSuccess(PicUrl);
                    }
                }
            );
        }else{
            RNBridgeModule.FuncImageSize(url).then((map)=>{
             let PicUrl=map['urlInfo'];
             PicUrl=eval('(' + PicUrl + ')');
             FuncGetSizeSuccess(PicUrl);
          },(code,message)=>{
            FuncGetSizeFailure(message);
            //alert(message);
        })
        }
    },

    // 自定义返回按钮事件
    customHandleBack(navigator, handleBack) {
        if (navigator) {
            let routes = navigator.getCurrentRoutes(); //nav是导航器对象
            let lastRoute = routes[routes.length - 1]; // 当前页面对应的route对象
            lastRoute.handleBack = handleBack;
        }
    },
    /**
     * @param datumSize 基准屏幕下的尺寸
     * @param datumDimenSize 基准屏幕下的屏幕尺寸
     * @param datum 以基准屏幕下的高（h）宽（w）那个为基准点
     * @return 实际屏幕下的尺寸
     */
    getSize(datumSize,datumDimenSize,datum){
        let size=0;
        if(datum=='h'){
            size=datumSize/datumDimenSize * this.size.height;
        }else if(datum=='w'){
            size=datumSize/datumDimenSize * this.size.width;
        }
        return size;
    },
    /**
     * 获取远程图片宽高的方法
     * @method getImageSize
     * @param {string} uri 远程图片地址
     * @param {function} FuncGetSizeSuccess 图片获取成功调用方法
     * @param {function} FuncGetSizeFailure 图片获取失败调用方法
     */
    getImageSize(uri,FuncGetSizeSuccess,FuncGetSizeFailure){
        Image.getSize(uri,(width, height) => { FuncGetSizeSuccess(width,height) },(err)=>{FuncGetSizeFailure(err)});
    },
    /**
    *判断输入的是否为表情符号
    *return true表示输入的是表情符号，false标识非表情符号
    **/
    isEmojiCharacter(substring){
        let bool=false;
        for ( let i = 0; i < substring.length; i++) {
            let hs = substring.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
                if (substring.length > 1) {
                    let ls = substring.charCodeAt(i + 1);
                    let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                    if (0x1d000 <= uc && uc <= 0x1f77f) {
                        bool= true;
                    }
                }
            } else if (substring.length > 1) {
                let ls = substring.charCodeAt(i + 1);
                if (ls == 0x20e3) {
                   bool= true;
                }
            } else {
                if (0x2100 <= hs && hs <= 0x27ff) {
                    return true;
                } else if (0x2B05 <= hs && hs <= 0x2b07) {
                    return true;
                } else if (0x2934 <= hs && hs <= 0x2935) {
                    return true;
                } else if (0x3297 <= hs && hs <= 0x3299) {
                    return true;
                } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                        || hs == 0x2b50) {
                    bool= true;
                }
            }
        }
        return bool;
    },
    /**
    *过滤掉表情符号
    **/
    FilterEmoJi(substring){
        let ranges = [
            '\ud83c[\udf00-\udfff]',
            '\ud83d[\udc00-\ude4f]',
            '\ud83d[\ude80-\udeff]'
        ];
        return substring.replace(new RegExp(ranges.join('|'), 'g'), '');
    },

    //拨打电话功能
    FuncCallPhone(phone){
        Linking.openURL("tel:"+phone).catch(()=>{});
    },

    //对象防止赋值时篡改原对象支持多层级
    cloneObjectFn (obj){ // 对象复制
        return JSON.parse(JSON.stringify(obj))
    },
    //删除数组中的指定元素 arr数组 val数组中的元素
    removeByValue(arr, val) {
      for(let i=0; i<arr.length; i++) {
        if(arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
      return arr;
    },
    //计算金额精确小数点两位price单价，count数量,precision精度（比如两位就是100，三位就是1000，四位10000）
    FuncCalculatePay(price,count,precision){
        return Math.round(parseFloat(price*precision * count))/precision;//Math.floor()向下取整Math.ceil() 是向上取整 Math.round()四舍五入，和后台确认人民币四舍五入
    },

    /**
    *计算两个时间差
    *startTime,endTime格式为YYYY-MM-dd HH:mm:ss
    *return arr['天数','小时数','分钟数','秒数',开始时间时间戳，结束时间时间戳]
    **/
    FuncTimeDiff(startTime,endTime){
         startTime=startTime.replace(/\-/g, "/");
         endTime=endTime.replace(/\-/g, "/");
        //  let endTime=endTime.replace(/\-/g, "/");
         let millisecondDiff= parseInt(new Date(endTime).getTime()) - parseInt(new Date(startTime).getTime());   //时间差的毫秒数
         //计算出相差天数
         let days=Math.floor(millisecondDiff/(24*3600*1000));
         //计算出小时数
         let  hoursMsec=millisecondDiff%(24*3600*1000);    //计算天数后剩余的毫秒数
         let hours=Math.floor(hoursMsec/(3600*1000));
         //计算相差分钟数
         let minuteMsec=hoursMsec%(3600*1000);//计算小时数后剩余的毫秒数
         let minutes=Math.floor(minuteMsec/(60*1000));
            //计算相差秒数
         let secondsMsec=minuteMsec%(60*1000);      //计算分钟数后剩余的毫秒数
         let seconds=Math.round(secondsMsec/1000);
         //alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
         return [days,hours,minutes,seconds,parseInt(new Date(startTime).getTime()),parseInt(new Date(endTime).getTime())];
    },
    //根据时间戳计算相距的时间
    FuncTimeDiffByTimeStamp(startStamp,endStamp){
         let millisecondDiff= endStamp - startStamp;   //时间差的毫秒数
         //计算出小时数
         let  hoursMsec=millisecondDiff%(24*3600*1000);    //计算天数后剩余的毫秒数
         let hours=Math.floor(hoursMsec/(3600*1000));
         if(hours<10){
             hours='0'+hours;
         }
         //计算相差分钟数
         let minuteMsec=hoursMsec%(3600*1000);//计算小时数后剩余的毫秒数
         let minutes=Math.floor(minuteMsec/(60*1000));
         if(minutes<10){
             minutes='0'+minutes;
         }
         //计算相差秒数
         let secondsMsec=minuteMsec%(60*1000);      //计算分钟数后剩余的毫秒数
         let seconds=Math.round(secondsMsec/1000);
         if(seconds<10){
             seconds="0"+seconds;
         }
         if(hours==0 && minutes==0 && seconds==0){
             return 0;
         }else{
            return hours+':'+minutes+':'+seconds;
         }
    },

    //倒计时 如果为00：00：00则返回0
    FuncCountDown(startTime,endTime){
        let diffTime=this.FuncTimeDiff(startTime,endTime);
        let countDown=[diffTime[0]+'天',diffTime[4],diffTime[5]];
        if(diffTime[0]<1){
            if(diffTime[1]=='00' && diffTime[2]=='00' && diffTime[3]=='00'){
                countDown=[0,0,0];
            }else{
                countDown=[diffTime[1]+': '+diffTime[2]+': '+diffTime[3],diffTime[4],diffTime[5]];
            }
        }
        return countDown;
    },
    //截取图片的格式 return 格式化过的url
    //url图片地址 thumbnail缩略图处理规格(!t166x166)
    FuncGetPicFormat(url,thumbnail){
        if(url==null){
            url='';
        }
        let picFormat=url.substring(url.lastIndexOf('.'));
        let reusltUrl=url;
        if(picFormat.toLowerCase()=='.jpg' || picFormat.toLowerCase()=='.png'){
            if(thumbnail!=null && thumbnail!=''){
                reusltUrl= url+thumbnail+picFormat;
            }
        }
        return reusltUrl;
    },
    //非空判断
    FuncIsNull(str){
        if(str!=null && str!='' && str!=undefined){
            return true;
        }else{
         return false;
        }
    },
    //toast提示
    FuncToast(message){
         if(Platform.OS=='ios'){
            RNBridgeModule.toast(message);
        }else{
            ToastAndroid.show(message, 2000);
        }
    },

     //初始化sizeData对象
    FuncInitSizeData(item){
        let sizeModalType='';//弹出何种类型尺码弹框(sizeModal:平台尺码弹框,customSizeModal:平台特体尺码弹框，otherSizeModal:外商尺码弹框,cusSizeModal:外商特体尺码弹框bodyMeasure如何测量弹框)
        if(item.sizeRules=='00'){  //平台
    //            if(item.goodsAttrValue=='定制'){ //mjx
            if((item.bust != null && item.bust != '') && (item.waist != null && item.waist != '') && (item.hip != null && item.hip != '') ){
                sizeModalType='customSizeModal';
            }else{
                sizeModalType='sizeModal';
            }
        }else if(item.sizeRules=='01'){  //外商
            if(item.goodsAttrId=='T/T'){
                sizeModalType='cusSizeModal';
            }else{
                sizeModalType='otherSizeModal';
            }
        }
        let specialData={
            height:item.height,//身高
            weight:item.weight,//体重
            bust:item.bust,//胸围
            waist:item.waist,//腰围
            hip:item.hip,//臂围
            shoulderWidth:(item.shoulderWidth==''||item.shoulderWidth==null||item.shoulderWidth=='null')?'':item.shoulderWidth,//肩宽
            sleeveLength:(item.sleeveLength==''||item.sleeveLength==null||item.sleeveLength=='null')?'':item.sleeveLength,//袖长
            outsideLength:(item.outsideLength==''||item.outsideLength==null||item.outsideLength=='null')?'':item.outsideLength//裤长
        };
        let sizeData={
            checkedSizeId: item.goodsAttrId,
            checkedSize:item.goodsAttrValue,
            sizeModalType:sizeModalType,
            specialData
        }
        return sizeData;
    },

    /*
    * code : 0:强制更新   1：普通更新  2 ：bundle更新
    * data：后台返回的json字符串
    * */
    FuncUpdate(code,data){
        if(Platform.OS=='ios'){
            RNBridgeModule.downLoadBundle(code,data);
        }else{
            RNBridgeModule.update(code,JSON.stringify(data));
        }
    },

    /*
    *检测Bundle是否更新
    * 
    * */
    FuncMesssageCode(result){
        RNBridgeModule.detectionBundle(result);
    }

};
