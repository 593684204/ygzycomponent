/**
 *Created by qiaozm on 2018/8/27
 * toast公共组件（android，iOS）
 */
import Toast from 'react-native-root-toast';
import Util from '../tools/Util';
export default {
    show(message,duration, position,options){
        if(!Util.FuncIsNull(message)){
            console.warn("toast组件show方法缺少必备参数message，请检查");
            return;
        }
        if((Util.FuncIsNull(duration) && typeof(duration)!=='number') ||
            (Util.FuncIsNull(position) && typeof(position)!=='number')){
            console.warn("toast组件的duration,position参数类型必须为number，请检查");
            return;
        }
        if(Util.FuncIsNull(options)){
            if(
                (Util.FuncIsNull(options.shadow) && typeof(options.shadow)!=='boolean') ||
                (Util.FuncIsNull(options.animation) && typeof(options.animation)!=='boolean') ||
                (Util.FuncIsNull(options.hideOnPress) && typeof(options.hideOnPress)!=='boolean') ||
                (Util.FuncIsNull(options.delay) && typeof(options.delay)!=='number')
            ){
                console.warn("shadow,animation,hideOnPress参数类型必须为boolean，delay必须为number，请检查");
                return;
            }
        }else{
            options={
                shadow:true,
                animation:true,
                hideOnPress:true,
                delay:0
            }
        }
        return Toast.show(message, {
            duration: Util.FuncIsNull(duration)?Toast.durations.LONG:duration,
            position: Util.FuncIsNull(position)?Toast.positions.BOTTOM:position,
            shadow: options.shadow,
            animation: options.animation,
            textColor:options.textColor,
            hideOnPress: options.hideOnPress,
            delay: options.delay,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
    },
    hide(toast){
        Toast.hide(toast);
    }
}