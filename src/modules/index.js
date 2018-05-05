import { combineReducers } from 'redux';
import signin from './signin';
import myinfo from './myinfo';

export default combineReducers({
    signin,
    myinfo
});