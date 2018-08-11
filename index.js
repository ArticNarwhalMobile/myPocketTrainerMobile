/** @format */

import {AppRegistry} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';

import Amplify from 'aws-amplify';
import configuration from './src/aws-exports';

Amplify.configure(configuration);

AppRegistry.registerComponent(appName, () => App);
