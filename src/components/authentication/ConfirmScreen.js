import React from 'react';
import {
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import CodeInput from 'react-native-confirmation-code-input';
import {connect} from 'react-redux';
import {store} from '../../store/store';



class ConfirmScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        passcode: null
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
  
    confirmCode(passcode) {
      console.log('confirmcode invoked')
      const cognitoUser = new CognitoUser({
        Username: this.props.email,
        Pool: this.userPool
      })
     
      cognitoUser.confirmRegistration(passcode, true, (err, result) => {
        if (err) {
          console.log('Error at confirmRegistration ', err);
          return;
        }
        console.log('result', result)
      })
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
      console.log('passcode', this.state.passcode)
      console.log('this.props', this.props)
      return(
        <View>
          <Text>Please enter your confirmation code</Text>
        {/* <TextInput onChange={() => this.setState({num1})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num2})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num3})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num4})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num5})} placeholder="apple"/>
        <TextInput onChange={() => this.setState({num6})} placeholder="apple"/> */}
      
    <CodeInput
      ref="codeInputRef2"
      secureTextEntry
      // compareWithCode='123456'
      activeColor='black'
      inactiveColor='rgba(49, 180, 4, 1.3)'
      autoFocus={false}
      ignoreCase={true}
      inputPosition='center'
      size={50}
      codeLength={6}
      onFulfill={(passcode) => {this.confirmCode(passcode)}}
      containerStyle={{ marginTop: 30 }}
      codeInputStyle={{ borderWidth: 1.5 }}
    />
    
        </View>
      )
    }
  }

  const mapStateToProps = state => {
    console.log(state);
    const {email} = state.payload
    return {email};
  }

  export default connect(mapStateToProps, null)(ConfirmScreen)