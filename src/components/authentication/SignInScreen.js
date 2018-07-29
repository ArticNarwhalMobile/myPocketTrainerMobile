import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
  } from 'react-native';
  import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

export default class SignInScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        email: '',
        password: ''
      }
    }
  
    render() {
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
          placeholder="email"
          // onChange={() => this.setState({email})}
          />
          <TextInput
          placeholder="password"
          />
          <Button
          title="Log in"
          />
          <Button
          title="Sign up instead"
          onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
      )
      
    }
  }