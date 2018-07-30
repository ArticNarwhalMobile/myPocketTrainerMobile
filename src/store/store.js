import {createStore} from '../../../../Library/Caches/typescript/2.9/node_modules/redux';
import {authReducer} from './authReducer';

export const store = createStore(authReducer)