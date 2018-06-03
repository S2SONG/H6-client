import { combineReducers } from 'redux';
import signin from './signin';
import myinfo from './myinfo';
import lecture from './lecture';
import lectureInfo from './lectureInfo';
import evaluation from  './evaluation';
import mailauth from './mailauth';

export default combineReducers({
    signin,
    myinfo,
    lecture,
    lectureInfo,
    evaluation,
    mailauth
});