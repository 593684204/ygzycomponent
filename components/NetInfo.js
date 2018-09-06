import React,{Component} from 'react';
import  {
  NetInfo
} from 'react-native';
import PropTypes from 'prop-types';
class NetInfoReact extends React.Component{
    constructor(props){
        super(props)
    }
    static propTypes={
        FuncGetConnectionInfo:PropTypes.func,
        FuncIsConnected:PropTypes.func.isRequired
    };
  componentDidMount() {
    NetInfo.addEventListener(
        'connectionChange',
         this._handleConnectivityTypeChange
    );
    NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectivityChange
    );
  };
    _handleConnectivityTypeChange=(connectionInfo)=>{
        if(!this.props.FuncGetConnectionInfo==null){
            this.props.FuncGetConnectionInfo(connectionInfo);
            //console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        }
  };
    _handleConnectivityChange=(isConnected)=>{
        //console.log('=================isConnected='+isConnected);
        this.props.FuncIsConnected(isConnected);
    };
  render() {
    return null;
  }
}
export default NetInfoReact