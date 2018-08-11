import React from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import axios from 'axios';

import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});


class App extends React.Component{
  constructor() {
    super();
    this.state = {

    }
    this.handleTest = this.handleTest.bind(this)
  }


  handleTest() {
   
  }
  render() {
    return (
         <View>
        <Button
  onPress={this.handleTest}
  title="click"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>     
         </View>    
    )
    
  }
}

export default withAuthenticator(App, { includeGreetings: true });
