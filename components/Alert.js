/**
 *Created by qiaozm on 2018/8/27
 * 弹窗口公共组件（android，iOS）
 */
import React, {Component} from 'react';
import {
    Alert,
    AlertIOS,
    Platform
} from 'react-native';
import Util from '../tools/Util';
export default class alert extends Component{
    static show=(title,message,buttons,alertType,cancelable)=>{
        if(Util.FuncIsNull(title)===false || Util.FuncIsNull(message)===false){
            console.warn('title,message,buttons是Alert组件的必备参数，请检查！')
        }else{

            if(Platform.OS==='ios' && alertType==='alert'){//弹出一个 iOS 提示框
                AlertIOS.alert(
                    title,
                    message
                );
            }else if(Platform.OS==='ios' && alertType==='prompt'){//弹出一个带输入框的 iOS 提示框 iOS未完善此方法
                AlertIOS.prompt(
                    'Enter a value',
                    null,
                    text => console.log("You entered "+text)
                );
            }else{//android,ios通用弹框
                Alert.alert(
                    title,
                    message,
                    buttons,
                    { cancelable: cancelable==null?true:cancelable }
                )
            }
        }
    }
}