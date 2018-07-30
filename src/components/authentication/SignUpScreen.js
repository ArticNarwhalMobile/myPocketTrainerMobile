import React from "../../../../../Library/Caches/typescript/2.9/node_modules/@types/react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";
import { connect } from "../../../../../Library/Caches/typescript/2.9/node_modules/redux";
import { authInfo } from "../../store/actions/authActions";
import store from "../../store/store";

class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      lastName: "",
      attributeList: [],
      password: "null",
      routeToConfirm: false
    };
  }

  userPool;
  // email = 'hnguyen31@gmail.com';
  // password = 'Pa$$w0rd';

  componentDidMount() {
    console.log("component did mount");
    //create user pool
    this.userPool = new CognitoUserPool({
      UserPoolId: "us-east-1_QcG34GN2z",
      ClientId: "7vt0o78qu344uisrulvv30uj3c"
    });
  }

  createUserInAmazonCognito() {
    console.log("create user in amazon invoked");
    const attributeGivenName = new CognitoUserAttribute({
      Name: "given_name",
      Value: this.state.lastName
    });

    this.state.attributeList.push(attributeGivenName);

    var cognitoUser;

    //call signup function
    this.userPool.signUp(
      this.state.email,
      this.state.password,
      this.state.attributeList,
      null,
      (err, result) => {
        if (err) {
          console.log("error at signup", err);
          return;
        }
        cognitoUser = result.user;
        console.log("cognitoUser", cognitoUser);
        this.props.navigation.navigate("Confirm");
      }
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          // autoCapitalize="none"
          // autoCorrect={false}
          // keyboardType='email-address'
          // returnKeyType="next"
          // placeholder='Email or Mobile Num'
          // placeholderTextColor='rgba(225,225,225,0.7)'/>
          placeholder="Last Name"
          onChangeText={lastName => this.setState({ lastName })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />

        <TouchableOpacity
          style={styles.button}
          //   title="Sign Up"
          onPress={() => this.createUserInAmazonCognito()}
        >
          <Text> Sign Up </Text>
        </TouchableOpacity>
        {/* <Button 
        title="Already a member? Sign in instead!"
        color="#841584"
        onPress={() => this.props.navigation.navigate('SignIn')}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

const mapStateToProps = state => {
  return {};
};

export default SignUpScreen;
