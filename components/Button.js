/**
 *Created by qiaozm on 2018/8/29
 * button口公共组件（android，iOS）
 */
import React, { Component } from 'react';
import {
    Text,
    ImageBackground,
    TouchableHighlight,
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import Util from '../tools/Util';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes={
        source:PropTypes.oneOfType([PropTypes.shape({uri:PropTypes.string}),PropTypes.number]),
        text:PropTypes.string.isRequired,
        fontStyle:Text.propTypes.style,
        style:View.propTypes.style
    };

    render() {
        return (
            <TouchableHighlight underlayColor="rgba(255,255,155,0)" style={this.props.style==null?{alignItems: 'center',justifyContent: 'center'}:this.props.style}>
                {
                    Util.FuncIsNull(this.props.source)?
                        <ImageBackground underlayColor="rgba(255,255,155,0)" source={this.props.source} style={{width:'100%', height:'100%',justifyContent:'center',alignItems:'center'}}>
                            <Text style={this.props.fontStyle}>{this.props.text}</Text>
                        </ImageBackground>
                    :
                        <Text style={this.props.fontStyle==null?{color:'#5e5a57',fontSize:9}:this.props.fontStyle}>{this.props.text}</Text>
                }
            </TouchableHighlight>

        );
    }
}