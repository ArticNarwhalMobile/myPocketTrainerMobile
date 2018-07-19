import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { createStackNavigator } from 'react-navigation';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});



class SignUpScreen extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      lastName: '',
      attributeList : [],
      password: "null",
      routeToConfirm: false
    }
  }

  userPool;
  // email = 'hnguyen31@gmail.com';
  // password = 'Pa$$w0rd';

  componentDidMount() {
    console.log('component did mount')
    //create user pool
    this.userPool = new CognitoUserPool({
      UserPoolId:'us-east-1_QcG34GN2z',
      ClientId: '7vt0o78qu344uisrulvv30uj3c'
    })
  }

  createUserInAmazonCognito() {
    console.log('create user in amazon invoked')
    const attributeGivenName = new CognitoUserAttribute({
      Name: 'given_name',
      Value: this.state.lastName
    })

    this.state.attributeList.push(attributeGivenName);

    var cognitoUser;

    //call signup function
    this.userPool.signUp(this.state.email, this.state.password, this.state.attributeList, null, (err, result) => {
      if (err) {
        console.log('error at signup', err);
        return
      }
      cognitoUser = result.user;
      console.log('cognitoUser', cognitoUser)
      this.props.navigation.navigate('Confirm')
    })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
      placeholder="Email"
      onChangeText={(email) => this.setState({email})}
      />
      <TextInput
      placeholder="Last Name"
      onChangeText={(lastName) => this.setState({lastName})}
      />
      <TextInput
      placeholder="Password"
      secureTextEntry={true}
      onChangeText={(password) => this.setState({password})}
      />
      <Button 
      title="Already a member? Sign in instead!"
      onPress={() => this.props.navigation.navigate('SignIn')}
      >
      </Button>
      <Button
      title="Sign Up"
      onPress={() => this.createUserInAmazonCognito()}
      />
    </View>
    )
  }
}

class ConfirmScreen extends React.Component {
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
  }

  componentDidMount() {
    console.log('component didt mount', this.userPool)
    //create user pool
    this.userPool = newCognitoUserPool({
              UserPoolId: 'us-east-1_QcG34GN2z',
        ClientId: '7vt0o78qu344uisrulvv30uj3c'
    })
    console.log('this.userpool', this.userPool)
  }
  //   componentDidMount() {
//     console.log('component did mount', this.userPool)
//     //1) Create User Pool
//     this.userPool = new CognitoUserPool({
//         UserPoolId: 'us-east-1_QcG34GN2z',
//         ClientId: '7vt0o78qu344uisrulvv30uj3c'
//     })

//     console.log('this.userpool', this.userPool)
//   }
  confirmCode() {
    const cognitoUser = new CognitoUser({
      Username: this.username
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
    return(
      <View>
        <Text>Please enter your confirmation code</Text>
      <TextInput onChange={() => this.setState({num1})} placeholder="apple"/>
      <TextInput onChange={() => this.setState({num2})} placeholder="apple"/>
      <TextInput onChange={() => this.setState({num3})} placeholder="apple"/>
      <TextInput onChange={() => this.setState({num4})} placeholder="apple"/>
      <TextInput onChange={() => this.setState({num5})} placeholder="apple"/>
      <TextInput onChange={() => this.setState({num6})} placeholder="apple"/>
      <Button
      onPress={this.handleSubmit}
      />
      </View>
    )
  }
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


class SignInScreen extends React.Component {
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

const RootStack = createStackNavigator(
  {
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
    Confirm: ConfirmScreen
  },
  {
    initialRouteName: 'SignUp'
  }
)

export default class App extends React.Component{
  render() {
    return <RootStack/>
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export default class App extends Component {
//   userPool = "sophia";
//   username = 'skadadfa@gmail.com';
//   password = 'Pa$$w0rd'

//   componentDidMount() {
//     console.log('component did mount', this.userPool)
//     //1) Create User Pool
//     this.userPool = new CognitoUserPool({
//         UserPoolId: 'us-east-1_QcG34GN2z',
//         ClientId: '7vt0o78qu344uisrulvv30uj3c'
//     })

//     console.log('this.userpool', this.userPool)
//   }

//   createUserInAmazonCognito() {
//     console.log('create user')

//     //Fill required atributes
//     const attributeList = [];
//     const attributeGivenName = new CognitoUserAttribute({
//       Name: 'given_name',
//       Value: 'Smith'
//     });

//     attributeList.push(attributeGivenName);

//     var cognitoUser;
//     //Call SignUp function
//     this.userPool.signUp(this.username, this.password, attributeList, null, (err, result) => {
//       if (err) {
//         console.log('Error at signup ', err);
//         return;
//       }
//       cognitoUser = result.user;
//       console.log('cognitoUser', cognitoUser)
//     });

//   }

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

//   signIn() {
//     const authenticationDetails = new AuthenticationDetails({
//       Username: this.username,
//       Password: this.password
//     });
//     const cognitoUser = new CognitoUser({
//       Username: this.username,
//       Pool: this.userPool
//     });
//     cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: (result) => {
//         console.log('onSuccess', result)
//         console.log('access token + ' + result.getAccessToken().getJwtToken());
//       },

//       onFailure: (err) => {
//         console.log('onFailure', err)
//       },
//       mfaRequired: (codeDeliveryDetails) => {
//         console.log('mfaRequired', codeDeliveryDetails)
//       }
//     });
//   }


//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Sign up" onPress={this.createUserInAmazonCognito.bind(this)}>
//         </Button>
//         <Button title="Confirm Code" onPress={this.confirmCode.bind(this)}>
//         </Button>
//         <Button title="Sign in" onPress={this.signIn.bind(this)}>
//         </Button>
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