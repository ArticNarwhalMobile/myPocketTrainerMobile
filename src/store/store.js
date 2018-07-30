import { createStore, combineReducers } from 'redux';
import { auth } from './authReducer';

export const store = createStore(auth)