/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
// import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'react-native-aws-cognito-js';

// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {

//     }
//   }
//     // let userPool;
//     // let username = 'user@company.com';
//     // let password = 'Pa$$word';
  
//     componentDidMount() {
//       console.log('component did mount');
//       //create user pool
//       this.userPool = new CognitoUserPool({
//         UserPoolId: 'us-east-1_QcG34GN2z',
//         ClientId: '7vt0o78qu344uisrulvv30uj3c'
  
//       })

//       CanvasRenderingContext2D
//     }
  

 

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// macroTrackrUserPool;


// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to myPocketTrainer</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });





import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component {
  userPool;
  username = 'hnguyen31@gmail.com';
  password = 'Pa$$w0rd'

  componentDidMount() {
    console.log('component did mount')
    //1) Create User Pool
    this.userPool = new CognitoUserPool({
        UserPoolId: 'us-east-1_QcG34GN2z',
        ClientId: '7vt0o78qu344uisrulvv30uj3c'
    })
  }

  createUserInAmazonCognito() {
    console.log('create user')

    //Fill required atributes
    const attributeList = [];
    const attributeGivenName = new CognitoUserAttribute({
      Name: 'given_name',
      Value: 'Smith'
    });

    attributeList.push(attributeGivenName);

    var cognitoUser;
    //Call SignUp function
    this.userPool.signUp(this.username, this.password, attributeList, null, (err, result) => {
      if (err) {
        console.log('Error at signup ', err);
        return;
      }
      cognitoUser = result.user;
      console.log('cognitoUser', cognitoUser)
    });

  }

  confirmCode() {
    const cognitoUser = new CognitoUser({
      Username: this.username,
      Pool: this.userPool
    });
    cognitoUser.confirmRegistration('104055', true, (err, result) => {
      if (err) {
        console.log('Error at confirmRegistration ', err);
        return;
      }
      console.log('result', result)
    });
  }

  signIn() {
    const authenticationDetails = new AuthenticationDetails({
      Username: this.username,
      Password: this.password
    });
    const cognitoUser = new CognitoUser({
      Username: this.username,
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
    return (
      <View style={styles.container}>
        <Button title="Sign up" onPress={this.createUserInAmazonCognito.bind(this)}>
        </Button>
        <Button title="Confirm Code" onPress={this.confirmCode.bind(this)}>
        </Button>
        <Button title="Sign in" onPress={this.signIn.bind(this)}>
        </Button>
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