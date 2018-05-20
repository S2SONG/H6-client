import { combineReducers } from 'redux';
import signin from './signin';
import myinfo from './myinfo';
import lecture from './lecture';
import lectureInfo from './lectureInfo';

export default combineReducers({
    signin,
    myinfo,
    lecture,
    lectureInfo
});