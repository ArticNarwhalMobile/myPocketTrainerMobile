import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity
  } from 'react-native';
  import { AmazonCognitoIdentity, CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

export default class SignInScreen extends Component {
    constructor() {
      super();
      this.state = {
        username: '',
        password: ''
      }
 
    }
    
    userPool;

      componentDidMount() {
    //1) Create User Pool
    this.userPool = new CognitoUserPool({
        UserPoolId: 'us-east-1_QcG34GN2z',
        ClientId: '7vt0o78qu344uisrulvv30uj3c'
    })
  }

      signIn() {
    const authenticationDetails = new AuthenticationDetails({
      Username: this.state.username,
      Password: this.state.password
    });


    const cognitoUser = new CognitoUser({
      Username: this.state.username,
      Pool: this.userPool
    });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('onSuccess', result)
        console.log('access token + ' + result.getAccessToken().getJwtToken());
      },

      onFailure: (err) => {
        console.log('onFailure', err)
      },
      mfaRequired: (codeDeliveryDetails) => {
        console.log('mfaRequired', codeDeliveryDetails)
      }
    });

  }

  
    render() {
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={(username) => this.setState({username})}
          />
          <TextInput
          onChangeText={(password) => this.setState({password})}
          style={styles.input}
          placeholder="password"
          />
          <TouchableOpacity 
          style={styles.button}
          onPress={() => this.signIn()}
          >
            <Text>Log in</Text>
          </TouchableOpacity>
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