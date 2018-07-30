import React from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import CodeInput from 'react-native-confirmation-code-input';



export default class ConfirmScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        num1: 0,
        num2: 0,
        num3: 0,
        num4: 0,
        num5: 0,
        num6: 0
      }
  
      this.confirmCode = this.confirmCode.bind(this);
    }
  
    userPool;
  
    componentDidMount() {
      console.log('component did mount', this.userPool)
      //create user pool
      this.userPool = new CognitoUserPool({
          UserPoolId: 'us-east-1_QcG34GN2z',
          ClientId: '7vt0o78qu344uisrulvv30uj3c'
      })
      console.log('this.userpool', this.userPool)
    }
  
    confirmCode() {
      const cognitoUser = new CognitoUser({
        Username: this.username,
        Pool: this.userPool
      })
      let code = ''
      code += this.state.num1
      code += this.state.num2
      code += this.state.num3
      code += this.state.num4
      code += this.state.num5
      code += this.state.num6
      console.log('code',code)
      // cognitoUser.confirmRegistration()
    }
  
    //   confirmCode() {
  //     const cognitoUser = new CognitoUser({
  //       Username: this.username,
  //       Pool: this.userPool
  //     });
  //     cognitoUser.confirmRegistration('104055', true, (err, result) => {
  //       if (err) {
  //         console.log('Error at confirmRegistration ', err);
  //         return;
  //       }
  //       console.log('result', result)
  //     });
  //   }
  
    render() {
      return(
        <View>
          <Text>Please enter your confirmation code</Text>
        <TextInput onChange={() => this.setState({num1})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num2})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num3})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num4})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num5})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num6})} placeholder="apple"/>
      
    <CodeInput
      ref="codeInputRef2"
      secureTextEntry
      compareWithCode='123456'
      activeColor='black'
      inactiveColor='rgba(49, 180, 4, 1.3)'
      autoFocus={false}
      ignoreCase={true}
      inputPosition='center'
      size={50}
      codeLength={6}
      onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
      containerStyle={{ marginTop: 30 }}
      codeInputStyle={{ borderWidth: 1.5 }}
    />
    
        </View>
      )
    }
  }