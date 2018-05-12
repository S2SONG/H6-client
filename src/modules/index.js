import { combineReducers } from 'redux';
import signin from './signin';
import myinfo from './myinfo';
import lecture from './lecture';

export default combineReducers({
    signin,
    myinfo,
    lecture
});