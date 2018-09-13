/**
 * 常量配置
 *Created by qiaozm on 2018/9/4
 */
import {Platform} from 'react-native';
export default {
    timeout:10*1000,//10s超时
    OS:(Platform.OS==='ios'?'ios':'android'),//判断平台类型
    type:(Platform.OS==='ios'?'01':'10'),//平台类型type=01 ios type=10 android
    //Checkbox
    checkBox:{
        cbTitleColor: '#333',
        cbFontSizeLG: 20,
        cbFontSizeMD: 14,
        cbFontSizeSM: 10,
        cbTitlePaddingLeftLG: 8,
        cbTitlePaddingLeftMD: 6,
        cbTitlePaddingLeftSM: 4,
        cbCheckedTintColor: '#337ab7',
        cbUncheckedTintColor: '#ccc',
        cbIconSizeLG: 18,
        cbIconSizeMD: 13,
        cbIconSizeSM: 10,
        cbDisabledOpacity: 0.65,
    },
}