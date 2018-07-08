import { combineReducers } from 'redux';
import signin from './signin';
import myinfo from './myinfo';
import lecture from './lecture';
import lectureInfo from './lectureInfo';
import evaluation from  './evaluation';
import mailauth from './mailauth';
import password from './password';
import leave from './leave';
import home from './home';
import currentVote from './currentVote';

export default combineReducers({
    signin,
    lecture,
    lectureInfo,
    evaluation,
    mailauth,
    myinfo,
    password,
    leave,
    home,
    currentVote,
});