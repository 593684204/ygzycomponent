import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import constant from '../tools/constant';

export default class Checkbox extends TouchableOpacity {
    static propTypes={
        ...TouchableOpacity.propTypes,
        checked:PropTypes.bool,
        defaultChecked:PropTypes.bool,
        size:PropTypes.oneOf(['lg','md','sm']),
        title:PropTypes.oneOfType([PropTypes.element,PropTypes.string,PropTypes.number]),
        titleStyle:Text.propTypes.style,
        checkedIcon:PropTypes.oneOfType([PropTypes.element,PropTypes.shape({uri:PropTypes.string}),PropTypes.number]),
        checkedIconStyle:Image.propTypes.style,
        uncheckedIcon:PropTypes.oneOfType([PropTypes.element,PropTypes.shape({uri:PropTypes.string}),PropTypes.number]),
        uncheckedIconStyle:Image.propTypes.style,
        onChange:PropTypes.func
    };

    static defaultProps={
        ...TouchableOpacity.defaultProps,
        defaultChecked:false,
        size:'md',
        checkedIcon:require('../resources/icons/checked.png'),
        uncheckedIcon:require('../resources/icons/unchecked.png'),
        hitSlop:{top:8,bottom:8,left:8,right:8}
    };

    shouldComponentUpdate(nextProps,nextState) {
        return this.props.checked !== nextProps.checked;
    }
    buildProps(){
        let {checked,style, size, title, checkedIcon, uncheckedIcon, titleStyle, checkedIconStyle, uncheckedIconStyle, children, onPress, onChange, ...others} = this.props;
        let iconSize, textFontSize, textPaddingLeft;
        switch(size){
            case 'lg':
                iconSize=constant.checkBox.cbIconSizeLG;
                textFontSize=constant.checkBox.cbFontSizeLG;
                textPaddingLeft=constant.checkBox.cbTitlePaddingLeftLG;
                break;
            case 'sm':
                iconSize = constant.checkBox.cbIconSizeSM;
                textFontSize = constant.checkBox.cbFontSizeSM;
                textPaddingLeft = constant.checkBox.cbTitlePaddingLeftSM;
                break;
            default:
                iconSize = constant.checkBox.cbIconSizeMD;
                textFontSize = constant.checkBox.cbFontSizeMD;
                textPaddingLeft = constant.checkBox.cbTitlePaddingLeftMD;
        }
        style=[{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center'
        }].concat(style);
        let iconStyle=[{
            tintColor:checked?constant.checkBox.cbCheckedTintColor:constant.checkBox.cbUncheckedTintColor,
            width:iconSize,
            height:iconSize
        }].concat(checked?checkedIconStyle:uncheckedIconStyle);
        let textStyle=[{
            color: constant.checkBox.cbTitleColor,
            fontSize: textFontSize,
            overflow: 'hidden',
            paddingLeft: textPaddingLeft,
        }].concat(titleStyle);
        if(React.isValidElement(checkedIcon)){
            checkedIcon=React.cloneElement(checkedIcon,{key:'icon'});
        }else if(checkedIcon || checkedIcon===0){
            checkedIcon=<Image key='icon' style={iconStyle} source={checkedIcon}/>;
        }
        if(React.isValidElement(uncheckedIcon)){
            uncheckedIcon=React.cloneElement(uncheckedIcon,{key:'icon'});
        }else if(uncheckedIcon || uncheckedIcon===0){
            uncheckedIcon=<Image key='icon' style={iconStyle} source={uncheckedIcon}/>;
        }
        if(React.isValidElement(title)){
            title=React.cloneElement(title,{key:'title'});
        }else if(title || title==='' || title===0){
            title=(<Text key='title' style={textStyle} numberOfLines={1}>{title}</Text>);
        }
        children = [
            checked ? checkedIcon : uncheckedIcon,
            title ? title : null,
        ];
        onPress = () => {
            alert(checked);
            onChange && onChange(!checked);
        };
        this.props = {style, size, title, checkedIcon, uncheckedIcon, titleStyle, checkedIconStyle, uncheckedIconStyle, children, onPress, onChange, ...others};
    }
    render(){
        this.buildProps();
        if (this.props.disabled) {
            return (
                <View style={{opacity: constant.checkBox.cbDisabledOpacity}}>
                    {super.render()}
                </View>
            );
        } else {
            return super.render();
        }
    }
}