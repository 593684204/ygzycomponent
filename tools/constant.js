/**
 * 常量配置
 *Created by qiaozm on 2018/9/4
 */
import {Platform} from 'react-native';
export const timeout=10*1000;//10s超时
export const OS=(Platform.OS==='ios'?'ios':'android');//判断平台类型
export const type=(Platform.OS==='ios'?'01':'10');//平台类型type=01 ios type=10 android