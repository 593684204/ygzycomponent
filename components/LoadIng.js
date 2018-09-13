/**
 * Created on 2018/05/08.
 *
 */
import React,{Component} from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import Util from '../tools/Util';
class Loading extends React.Component{
    constructor(props) {
   	    super(props);
    };
    static propTypes={
        source:PropTypes.oneOfType([PropTypes.shape({uri:PropTypes.string}),PropTypes.number])
    };
    render(){
        return(
            <View style={{width:Util.size.width,height:Util.size.height,justifyContent:'center',alignItems:'center',opacity:0.6,position:'absolute'}}>
                {
                    Util.FuncIsNull(this.props.source) ?
                        typeof(this.props.source) === 'string' ?
                            <Text>{this.props.source}</Text>
                            :
                            <Image source={this.props.source} style={{ width: 25, height: 25 }} />
                        :
                        <Image source={require('../resources/images/loading.gif')} style={{ width: 25, height: 25 }} />
                }
            </View>
        );
    };
}
export default Loading;
