import React from 'react';
import {
  Platform
} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ConfirmScreen from './authentication/ConfirmScreen'
import SignInScreen from './authentication/SignInScreen'
import SignUpScreen from './authentication/SignUpScreen'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});





///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const SignUpConfirmStack = createStackNavigator({
  SignUp: SignUpScreen,
  Confirm: ConfirmScreen
});


const RootStack = createBottomTabNavigator(
  {
    SignUp: SignUpConfirmStack,
    SignIn: SignInScreen,
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  
  }
)

export default class App extends React.Component{
  render() {
    return (
      <Provider store={store}>
         <RootStack/>
      </Provider>
           
    )
    
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