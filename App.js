/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
    Image
} from 'react-native';
import Alert from './components/Alert';
import NetInfo from './components/NetInfo';
import Button from './components/Button';
import Util from './tools/Util';
import toast from './components/Toast';
import Loading from './components/LoadIng';
import CheckBox from './components/Checkbox';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            checkedCustom:false
        };
    }
    componentWillMount() {
       // console.warn(Platform.OS);
      //  Alert.show('标题','测试报错信息');
        toast.show('错误信息展示',2000);
    }
    componentDidMount() {
        //console.warn(Platform.OS);
        //Alert.show('slslsl');

    }
  render() {
    return (
      <View style={styles.container}>
        <NetInfo FuncIsConnected={(isConnected)=>console.log(isConnected)}/>
          <Button text='我不是背景图1按钮'
          style={{alignItems: 'center',justifyContent: 'center',height: Util.getSize(73, 1334, 'h'),width: Util.getSize(340, 750, 'w'),backgroundColor:'blue'}}
          fontStyle={{color:'#5e5a57',fontSize:12}}
          source={require("./resources/images/btn.png")}
          />
          <CheckBox
              title='Custom123'
              titleStyle={{color: '#8a6d3b', paddingLeft: 4}}
              checkedIcon={<Image style={{width: 15, height: 15, tintColor: '#8a6d3b'}} source={require('./resources/icons/checked.png')} />}
              uncheckedIcon={<Image style={{width: 15, height: 15, tintColor: '#8a6d3b'}} source={require('./resources/icons/unchecked.png')} />}
              checked={this.state.checkedCustom}
              onChange={checked => this.setState({checkedCustom: checked})}
          />
        <Text style={styles.instructions}>
            this.state.checkedCustom:{this.state.checkedCustom?'1':'2'}
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
