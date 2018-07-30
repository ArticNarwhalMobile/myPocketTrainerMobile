import React from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity
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
          style={styles.input}
          placeholder="email"
          // onChange={() => this.setState({email})}
          />
          <TextInput
          style={styles.input}
          placeholder="password"
          />
          <TouchableOpacity style={styles.button}>
            <Text>Log in</Text>
          </TouchableOpacity>
          {/* <Button
          style={styles.button}
          title="Log in"
          /> */}
          {/* <Button
          title="Sign up instead"
          onPress={() => this.props.navigation.navigate('SignUp')}
          /> */}
        </View>
      )
      
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    input: {
      width: 300,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      },
  });