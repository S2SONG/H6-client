import {AsyncStorage} from 'react-native';
import {handleActions} from 'redux-actions';
import { NavigationActions } from 'react-navigation'
import config from "../../config";
import {util} from "../utils/util";
import NavigatorService from '../utils/navigator';
import { Actions } from 'react-native-navigation-actions';

const ROOT_URL = config.server;

const SIGN_IN = 'SIGN_IN';
const SIGN_IN_ID = 'SIGN_IN_ID';
const SIGN_IN_PWD = 'SIGN_IN_PWD';
const SIGN_IN_AUTO = 'SIGN_IN_AUTO';
const SIGN_IN_BUTTON = 'SIGN_IN_BUTTON';

const SIGN_UP_MODAL = 'SIGN_UP_MODAL';
const FIND_PWD_MODAL = 'FIND_PWD_MODAL';

const TERMS_FIRST_CHECKED = 'TERMS_FIRST_CHECKED';
const TERMS_FIRST_CHECKED_SET = 'TERMS_FIRST_CHECKED_SET';
const TERMS_SECOND_CHECKED = 'TERMS_SECOND_CHECKED';
const TERMS_SECOND_CHECKED_SET = 'TERMS_SECOND_CHECKED_SET';
const TERMS_FIRST_MODAL = 'TERMS_FIRST_MODAL';
const TERMS_SECOND_MODAL = 'TERMS_SECOND_MODAL';
const TERMS_ALL_CHECKED = 'TERMS_ALL_CHECKED';

const SIGN_UP_USER_ID = 'SIGN_UP_USER_ID';
const SIGN_UP_USER_PWD = 'SIGN_UP_USER_PWD';
const SIGN_UP_USER_RE_PWD = 'SIGN_UP_USER_RE_PWD';
const SIGN_UP_USER_NICKNAME = 'SIGN_UP_USER_NICKNAME';
const SIGN_UP_USER_EMAIL = 'SIGN_UP_USER_EMAIL';
const SIGN_UP_MAJOR = 'SIGN_UP_MAJOR';
const SIGN_UP_MINOR = 'SIGN_UP_MINOR';
const SIGN_UP_DOUBLE_MAJOR = 'SIGN_UP_DOUBLE_MAJOR';
const SIGN_UP_CONNECT_MAJOR = 'SIGN_UP_CONNECT_MAJOR';
const SIGN_UP_ADMISSION_YEAR = 'SIGN_UP_ADMISSION_YEAR';
const SIGN_UP_CHECK_ID_NO = 'SIGN_UP_CHECK_ID_NO';
const SIGN_UP_CHECK_ID_LABEL = 'SIGN_UP_CHECK_ID_LABEL';
const SIGN_UP_CHECK_ID_CLIENT = 'SIGN_UP_CHECK_ID_CLIENT';
const SIGN_UP_CHECK_ID_SERVER = 'SIGN_UP_CHECK_ID_SERVER';
const SIGN_UP_NICKNAME_NO = 'SIGN_UP_NICKNAME_NO';
const SIGN_UP_NICKNAME_LABEL = 'SIGN_UP_NICKNAME_LABEL';
const SIGN_UP_NICKNAME_CLIENT = 'SIGN_UP_NICKNAME_CLIENT';
const SIGN_UP_NICKNAME_SERVER = 'SIGN_UP_NICKNAME_SERVER';
const SIGN_UP_EMAIL_NO = 'SIGN_UP_EMAIL_NO';
const SIGN_UP_EMAIL_LABEL = 'SIGN_UP_EMAIL_LABEL';
const SIGN_UP_EMAIL_CLIENT = 'SIGN_UP_EMAIL_CLIENT';
const SIGN_UP_EMAIL_SERVER = 'SIGN_UP_EMAIL_SERVER';
const SIGN_UP_PWD_NO = 'SIGN_UP_PWD_NO';
const SIGN_UP_PWD_LABEL = 'SIGN_UP_PWD_LABEL';
const SIGN_UP_RE_PWD = 'SIGN_UP_RE_PWD';
const SIGN_UP_RE_PWD_LABEL = 'SIGN_UP_RE_PWD_LABEL';
const SIGN_UP_CHECK_PWD = 'SIGN_UP_CHECK_PWD';
const SIGN_UP_CHECK_RE_PWD = 'SIGN_UP_CHECK_RE_PWD';
const SIGN_UP_USER_ID_MODAL = 'SIGN_UP_USER_ID_MODAL';
const SIGN_UP_USER_EMAIL_MODAL = 'SIGN_UP_USER_EMAIL_MODAL';
const SIGN_UP_USER_NICKNAME_MODAL = 'SIGN_UP_USER_NICKNAME_MODAL';
const SIGN_UP_USER_PWD_MODAL = 'SIGN_UP_USER_PWD_MODAL';
const SIGN_UP_CURRENT_POSITION = 'SIGN_UP_CURRENT_POSITION';
const SIGN_UP_TERM_1 = 'SIGN_UP_TERM_1';
const SIGN_UP_TERM_2 = 'SIGN_UP_TERM_2';

const FIND_PWD_USER_ID = 'FIND_PWD_USER_ID';
const FIND_PWD_CHECK_NO = 'FIND_PWD_CHECK_NO';
const FIND_PWD_CHECK_LABEL = 'FIND_PWD_CHECK_LABEL';

const FIND_PWD_RESULT = 'FIND_PWD_RESULT';
const FIND_PWD_RESULT_TITLE = 'FIND_PWD_RESULT_TITLE';
const SIGN_IN_CHECK = 'SIGN_IN_CHECK';
const SIGN_IN_SCREEN1_BUTTON = 'SIGN_IN_SCREEN1_BUTTON';
const SIGN_IN_SCREEN1_BUTTON2 = 'SIGN_IN_SCREEN1_BUTTON2';
const SIGN_IN_SCREEN2_BUTTON='SIGN_IN_SCREEN2_BUTTON';
const SIGN_IN_SCREEN3_BUTTON='SIGN_IN_SCREEN3_BUTTON';

const ADMISSION_YEAR='ADMISSION_YEAR';

const TRACK_LIST='TRACK_LIST';
const MAJOR_CHECK='MAJOR_CHECK';
const CHANGE_FONT_COLOR='CHANGE_FONT_COLOR';
const CHECK_ALL='CHECK_ALL';

const APP_VERSION = 'APP_VERSION';

const SIGN_UP2_USER_ID_MODAL = 'SIGN_UP2_USER_ID_MODAL';
const SIGN_UP2_USER_NICKNAME_MODAL = 'SIGN_UP2_USER_NICKNAME_MODAL';

const SIGN_UP_MAJOR_MODAL = 'SIGN_UP_MAJOR_MODAL';
const SIGN_UP_DOUBLE_MAJOR_MODAL = 'SIGN_UP_DOUBLE_MAJOR_MODAL';
const SIGN_UP_MINOR_MODAL = 'SIGN_UP_MINOR_MODAL';
const SIGN_UP_CONNECTED_MAJOR_MODAL = 'SIGN_UP_CONNECTED_MAJOR_MODAL';
const SIGN_UP_YEAR_MODAL = 'SIGN_UP_YEAR_MODAL';

const SIGN_UP_TOAST = 'SIGN_UP_TOAST';


const initialState = {
    sample: "",
    auto: false,
    error: false,
    login: false,
    id: '',
    pwd: '',
    signInButton: false,
    register: false,
    currentPosition: 0,
    termsModal: false,
    userIdCheckModal: false,
    userEmailCheckModal: false,
    userNickNameCheckModal: false,
    userPasswordCheckModal: false,
    isFirstChecked: false,
    isSecondChecked: false,
    firstVisible: false,
    secondVisible: false,
    userId: '',
    userPw: '',
    userRePw: '',
    userNickName: '',
    userEmail: '',
    major: null,
    minor: null,
    doubleMajor: null,
    connectedMajor: null,
    admissionYear: null,

    checkIdNo: 0,
    checkIdLabel: '',
    checkIdClient: false,
    checkIdServer: false,

    checkNickNameNo: 0,
    checkNickNameLabel: '',
    checkNickNameClient: false,
    checkNickNameServer: false,

    checkEmailNo: 0,
    checkEmailLabel: '',
    checkEmailClient: false,
    checkEmailServer: false,

    checkPasswordNo: 0,
    checkPasswordLabel: '',
    checkPassRe: 0,
    checkPassReLabel: '',
    checkPassword: false,
    checkRePassword: false,

    term1: '',
    term2: '',

    findPwd: false,
    findPwdUserId: '',
    findPwdCheckNo: 0,
    findPwdCheckLabel: '',

    findPwdResult: false,
    findPwdResultTitle: '',

    signInCheck: false,
    signInScreen1Button:'#ffffff',
    signInScreen1Button2:'#c5c4c4',
    signInScreen2Button:'#c5c4c4',
    signInScreen3Button:'#c5c4c4',

    track:[],
    year:[],
    fontColor:'#000000',

    appVersion: {},
    userIdModal: false,
    userNickNameModal: false,

    majorModal: false,
    doubleMajorModal: false,
    minorModal: false,
    connectedMajorModal: false,
    yearModal: false,

    signUpToast: false,
};

export const initSignInState = () => dispatch => {
    dispatch({type: SIGN_IN_ID, payload: ''});
    dispatch({type: SIGN_IN_PWD, payload: ''});
    dispatch({type: SIGN_IN_CHECK, payload: false});
    dispatch({type: SIGN_IN_BUTTON, payload: false});
    dispatch({type: APP_VERSION, payload: {}});
};

export const initSignUpState = () => dispatch => {
    dispatch({type: SIGN_UP_USER_ID, payload: ''});
    dispatch({type: SIGN_UP_USER_PWD, payload: ''});
    dispatch({type: SIGN_UP_USER_RE_PWD, payload: ''});
    dispatch({type: SIGN_UP_USER_NICKNAME, payload: ''});
    dispatch({type: SIGN_UP_USER_EMAIL, payload: ''});
    dispatch({type: SIGN_UP_MAJOR, payload: null});
    dispatch({type: SIGN_UP_MINOR, payload: null});
    dispatch({type: SIGN_UP_DOUBLE_MAJOR, payload: null});
    dispatch({type: SIGN_UP_CONNECT_MAJOR, payload: null});
    dispatch({type: SIGN_UP_ADMISSION_YEAR, payload: null});

    dispatch({type: SIGN_UP_CHECK_ID_NO, payload: 0});
    dispatch({type: SIGN_UP_CHECK_ID_LABEL, payload: ''});
    dispatch({type: SIGN_UP_CHECK_ID_CLIENT, payload: false});
    dispatch({type: SIGN_UP_CHECK_ID_SERVER, payload: false});
    dispatch({type: SIGN_UP_NICKNAME_NO, payload: 0});
    dispatch({type: SIGN_UP_NICKNAME_LABEL, payload: ''});
    dispatch({type: SIGN_UP_NICKNAME_CLIENT, payload: false});
    dispatch({type: SIGN_UP_NICKNAME_SERVER, payload: false});
    dispatch({type: SIGN_UP_EMAIL_NO, payload: 0});
    dispatch({type: SIGN_UP_EMAIL_LABEL, payload: ''});
    dispatch({type: SIGN_UP_EMAIL_CLIENT, payload: false});
    dispatch({type: SIGN_UP_EMAIL_SERVER, payload: false});

    dispatch({type: SIGN_UP_PWD_NO, payload: 0});
    dispatch({type: SIGN_UP_PWD_LABEL, payload: ''});
    dispatch({type: SIGN_UP_RE_PWD, payload: 0});
    dispatch({type: SIGN_UP_RE_PWD_LABEL, payload: ''});
    dispatch({type: SIGN_UP_CHECK_PWD, payload: false});
    dispatch({type: SIGN_UP_CHECK_RE_PWD, payload: false});
    dispatch({type: SIGN_UP_CURRENT_POSITION, payload: 0});

    dispatch({type: SIGN_UP_USER_EMAIL_MODAL, payload: false});
    dispatch({type: SIGN_UP_USER_ID_MODAL, payload: false});
    dispatch({type: SIGN_UP_USER_PWD_MODAL, payload: false});
    dispatch({type: SIGN_UP_USER_NICKNAME_MODAL, payload: false});

    dispatch({type: TERMS_FIRST_MODAL, payload: false});
    dispatch({type: TERMS_SECOND_MODAL, payload: false});
    dispatch({type: TERMS_FIRST_CHECKED_SET, payload: false});
    dispatch({type: TERMS_SECOND_CHECKED_SET, payload: false});

    dispatch({type: FIND_PWD_MODAL, payload: false});

    dispatch({type: FIND_PWD_USER_ID, payload: ''});
    dispatch({type: FIND_PWD_CHECK_NO, payload: 0});
    dispatch({type: FIND_PWD_CHECK_LABEL, payload: ''});

    dispatch({type:FIND_PWD_RESULT, payload: false});
    dispatch({type:FIND_PWD_RESULT_TITLE, payload: ''});

    dispatch({type:SIGN_UP2_USER_ID_MODAL, payload: false});
    dispatch({type:SIGN_UP2_USER_NICKNAME_MODAL, payload: false});

    dispatch({type:SIGN_UP_MAJOR_MODAL, payload:false});
    dispatch({type:SIGN_UP_DOUBLE_MAJOR_MODAL, payload:false});
    dispatch({type:SIGN_UP_MINOR_MODAL, payload:false});
    dispatch({type:SIGN_UP_CONNECTED_MAJOR_MODAL, payload:false});
    dispatch({type:SIGN_UP_YEAR_MODAL, payload:false});

    dispatch({type:SIGN_UP_TOAST, payload:false});
};

export const handleSignUpToast = (toast) => dispatch => {
    dispatch({type:SIGN_UP_TOAST, payload: toast});
};

export const handleMajor = (major) => dispatch => {
    dispatch({type:SIGN_UP_MAJOR, payload: major});
};

export const handleDoubleMajor = (major) => dispatch => {
    dispatch({type:SIGN_UP_DOUBLE_MAJOR, payload: major});
};

export const handleMinor = (major) => dispatch => {
    dispatch({type:SIGN_UP_MINOR, payload: major});
};

export const handleConnectedMajor = (major) => dispatch => {
    dispatch({type:SIGN_UP_CONNECT_MAJOR, payload: major});
};

export const handleAdmissionYear = (year) => dispatch => {
    dispatch({type:SIGN_UP_ADMISSION_YEAR, payload: year});
};

export const handleMajorModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP_MAJOR_MODAL, payload: modal});
};
export const handleDoubleMajorModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP_DOUBLE_MAJOR_MODAL, payload: modal});
};
export const handleMinorModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP_MINOR_MODAL, payload: modal});
};
export const handleConnectedMajorModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP_CONNECTED_MAJOR_MODAL, payload: modal});
};
export const handleYearModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP_YEAR_MODAL, payload: modal});
};

export const handleUserIdModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP2_USER_ID_MODAL, payload: modal});
};

export const handleUserNickNameModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP2_USER_NICKNAME_MODAL, payload: modal});
};

export const handleSignInCheck = (value) => dispatch => {
    dispatch({type: SIGN_IN_CHECK, payload:value});
};

export const handleFindPwdCheckNo = (no) => dispatch => {
    dispatch({type:FIND_PWD_CHECK_NO, payload: no});
};
export const handleFindPwdCheckLabel = (label) => dispatch => {
    dispatch({type:FIND_PWD_CHECK_LABEL, payload: label});
};

export const handleFindPwdUserId = (userId) => dispatch => {
    dispatch({type:FIND_PWD_USER_ID, payload: userId});
};

export const handleAuto = (check) => dispatch => {
    dispatch({type: SIGN_IN_AUTO, payload: check});
};

export const handleSignInId = (id) => dispatch => {
    dispatch({type: SIGN_IN_ID, payload: id});
};
export const handleSignInPwd = (pwd) => dispatch => {
    dispatch({type: SIGN_IN_PWD, payload: pwd});
};

export const handleSignUpModal = () => dispatch => {
    dispatch({type: SIGN_UP_MODAL});
};

//비밀번호찾기
export const FindPwdModal = (modal) => dispatch => {
    dispatch({type: FIND_PWD_MODAL, payload: modal});
};

export const handleTermsFirstCheck = () => dispatch => {
    dispatch({type: TERMS_FIRST_CHECKED});
};

export const handleTermsFirstModal = (modal) => dispatch => {
    dispatch({type: TERMS_FIRST_MODAL, payload: modal});
};

export const handleTermsSecondCheck = () => dispatch => {
    dispatch({type: TERMS_SECOND_CHECKED});
};

export const handleTermsSecondModal = (modal) => dispatch => {
    dispatch({type: TERMS_SECOND_MODAL, payload: modal});
};

export const handleSignUpUserId = (id) => dispatch => {
    dispatch({type: SIGN_UP_USER_ID, payload: id});
};
export const handleSignUpUserPwd = (pwd) => dispatch => {
    dispatch({type: SIGN_UP_USER_PWD, payload: pwd});
};
export const handleSignUpUserNickName = (nickname) => dispatch => {
    dispatch({type: SIGN_UP_USER_NICKNAME, payload: nickname});
};
export const handleSignUpUserEmail = (email) => dispatch => {
    dispatch({type: SIGN_UP_USER_EMAIL, payload: email});
};
export const handleSignUpUserRePwd = (pwd) => dispatch => {
    dispatch({type: SIGN_UP_USER_RE_PWD, payload: pwd});
};
export const handleSignUpMajor = (major) => dispatch => {
    dispatch({type: SIGN_UP_MAJOR, payload: major});
};
export const handleSignUpMinor = (minor) => dispatch => {
    dispatch({type: SIGN_UP_MINOR, payload: minor});
};
export const handleSignUpDoubleMajor = (doublemajor) => dispatch => {
    dispatch({type: SIGN_UP_DOUBLE_MAJOR, payload: doublemajor});
};

export const handleSignUpConnectMajor = (major) => dispatch => {
    dispatch({type: SIGN_UP_CONNECT_MAJOR, payload: major});
};
export const handleSignUpAdmisstionYear = (year) => dispatch => {
    dispatch({type: SIGN_UP_ADMISSION_YEAR, payload: year});
};
export const handleSignUpCheckUserIdNo = (no) => dispatch => {
    dispatch({type: SIGN_UP_CHECK_ID_NO, payload: no});
};
export const handleSignUpCheckUserIdLabel = (label) => dispatch => {
    dispatch({type: SIGN_UP_CHECK_ID_LABEL, payload: label});
};
export const handleSignUpCheckUserIdClient = (client) => dispatch => {
    dispatch({type: SIGN_UP_CHECK_ID_CLIENT, payload: client});
};
export const handleSignUpCheckUserIdServer = (server) => dispatch => {
    dispatch({type: SIGN_UP_CHECK_ID_SERVER, payload: server});
};

export const handleSignUpCheckUserEmailNo = (no) => dispatch => {
    dispatch({type: SIGN_UP_EMAIL_NO, payload: no});
};
export const handleSignUpCheckUserEmailLabel = (label) => dispatch => {
    dispatch({type: SIGN_UP_EMAIL_LABEL, payload: label});
};
export const handleSignUpCheckUserEmailClient = (client) => dispatch => {
    dispatch({type: SIGN_UP_EMAIL_CLIENT, payload: client});
};
export const handleSignUpCheckUserEmailServer = (server) => dispatch => {
    dispatch({type: SIGN_UP_EMAIL_SERVER, payload: server});
};


export const handleSignUpCheckUserNickNameNo = (no) => dispatch => {
    dispatch({type: SIGN_UP_NICKNAME_NO, payload: no});
};
export const handleSignUpCheckUserNickNameLabel = (label) => dispatch => {
    dispatch({type: SIGN_UP_NICKNAME_LABEL, payload: label});
};
export const handleSignUpCheckUserNickNameClient = (client) => dispatch => {
    dispatch({type: SIGN_UP_NICKNAME_CLIENT, payload: client});
};
export const handleSignUpCheckUserNickNameServer = (server) => dispatch => {
    dispatch({type: SIGN_UP_NICKNAME_SERVER, payload: server});
};


export const handleSignUpCheckUserPasswordNo = (no) => dispatch => {
    dispatch({type: SIGN_UP_PWD_NO, payload: no});
};
export const handleSignUpCheckUserPasswordLabel = (label) => dispatch => {
    dispatch({type: SIGN_UP_PWD_LABEL, payload: label});
};
export const handleSignUpCheckUserPassword = (value) => dispatch => {
    dispatch({type: SIGN_UP_CHECK_PWD, payload: value});
};

export const handleSignUpCheckUserRePasswordNo = (no) => dispatch => {
    dispatch({type: SIGN_UP_RE_PWD, payload: no});
};
export const handleSignUpCheckUserRePasswordLabel = (label) => dispatch => {
    dispatch({type: SIGN_UP_RE_PWD_LABEL, payload: label});
};
export const handleSignUpCheckUserRePassword = (value) => dispatch => {
    dispatch({type: SIGN_UP_CHECK_RE_PWD, payload: value});
};

export const handleSignUpUserIdModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP_USER_ID_MODAL, payload: modal});
};
export const handleSignUpUserEmailModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP_USER_EMAIL_MODAL, payload: modal});
};
export const handleSignUpUserNickNameModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP_USER_NICKNAME_MODAL, payload: modal});
};
export const handleSignUpUserPwdModal = (modal) => dispatch => {
    dispatch({type: SIGN_UP_USER_PWD_MODAL, payload: modal});
};

export const handleSignUpCurrentPosition = (position) => dispatch => {
    dispatch({type: SIGN_UP_CURRENT_POSITION, payload: position});
};

export const handleSignUpTerm1 = (term) => dispatch => {
    dispatch({type: SIGN_UP_TERM_1, payload: term});
};

export const handleSignUpTerm2 = (term) => dispatch => {
    dispatch({type: SIGN_UP_TERM_2, payload: term});
};

export const handleTermsAll = (check) => dispatch => {
    dispatch({type: TERMS_ALL_CHECKED, payload: check});
};

export const handleSignInButton = (value) => dispatch => {
    dispatch({type:SIGN_IN_BUTTON, payload: value});
};

export const handleFindPwdResult = (value) => dispatch => {
    dispatch({type:FIND_PWD_RESULT, payload: value});
};

export const handleFindPwdResultTitle = (title) => dispatch => {
    dispatch({type:FIND_PWD_RESULT_TITLE, payload: title});
};
export const handleSignInScreen1Button = (value) =>dispatch =>{
    dispatch({type:SIGN_IN_SCREEN1_BUTTON, payload:value})
};
export const handleSignInScreen1Button2 =(value) => dispatch =>{
    dispatch ({type:SIGN_IN_SCREEN1_BUTTON2 ,payload:value})
};
export const handleSignInScreen2Button =(color)=>dispatch =>{
    dispatch({type:SIGN_IN_SCREEN2_BUTTON, payload:color})
};
export const handleMajorCheck =(check)=>dispatch =>{
    dispatch({type:MAJOR_CHECK, payload:check})
};
export const handleSignInScreen3Button =(color) => dispatch =>{
    dispatch({type:SIGN_IN_SCREEN3_BUTTON, payload:color})
};
export  const handleChangeFontColor =(color)=> dispatch =>{
    dispatch({type:CHANGE_FONT_COLOR,payload:color  })
};


export const signInUser = (userId, userPw) => async dispatch => {
    var userData = {
        userId: userId,
        userPw: userPw
    };

    //로그인 서버로 post 형식으로 보냄
    try {
        const signInCheck = await fetch(`${ROOT_URL}/signIn`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const jsonData = await signInCheck.json();
        if (jsonData.statusCode == 200) {
            dispatch({type: SIGN_IN, payload: true});
            AsyncStorage.setItem('admissionYear', jsonData.result.admissionYear==null||jsonData.result.admissionYear===undefined ?'':jsonData.result.admissionYear + '');
            AsyncStorage.setItem('connectedMajor', jsonData.result.connectedMajor==null||jsonData.result.connectedMajor===undefined?'':jsonData.result.connectedMajor);
            AsyncStorage.setItem('doubleMajor', jsonData.result.doubleMajor==null||jsonData.result.doubleMajor===undefined? '':jsonData.result.doubleMajor);
            AsyncStorage.setItem('isValidation', jsonData.result.isValidation + '');
            AsyncStorage.setItem('major', jsonData.result.major==null||jsonData.result.major===undefined? '':jsonData.result.major);
            AsyncStorage.setItem('minor', jsonData.result.minor==null||jsonData.result.minor===undefined ? '':jsonData.result.minor);
            AsyncStorage.setItem('token', jsonData.result.token);
            AsyncStorage.setItem('userId', jsonData.result.userId);
            AsyncStorage.setItem('userIndex', jsonData.result.userIndex + '');
            AsyncStorage.setItem('userNickName', jsonData.result.userNickName);
        } else {
            dispatch({type: SIGN_IN, payload: false});
            util.removeStorageAll();
        }
    } catch (err) {
        dispatch({type: SIGN_IN, payload: false});
        console.log(err);
    }
};

export const checkToken = () => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    if(token === null || token === undefined)
        return false;
    const userId = await AsyncStorage.getItem('userId');
    const userIdCheck = await fetch(`${ROOT_URL}/users/userId/${userId}`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    });

    const jsonData = await userIdCheck.json();
    if (jsonData.statusCode == 403) {
        util.removeStorageAll();
        return false;
    } else {
        NavigatorService.navigate('home');
        return true;
    }
};

export const appVersion = () => async dispatch => {
    const result = await fetch(`${ROOT_URL}/version`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const jsonData = await result.json();
    if(jsonData.statusCode == 200){
        dispatch({type:APP_VERSION, payload: jsonData.result});
    } else {

    }
};

export const checkUserId = (userId) => async dispatch => {
    const userIdCheck = await fetch(`${ROOT_URL}/userValidation/userId/${userId}`);

    const jsonData = await userIdCheck.json();
    if (jsonData.statusCode == 200) {
        return true;
    } else {
        return false;
    }
};

export const checkUserNickName = (nickname) => async dispatch => {
    const userNickNameCheck = await fetch(`${ROOT_URL}/userValidation/userNickName/${nickname}`);
    const jsonData = await userNickNameCheck.json();
    if (jsonData.statusCode == 200) {
        return true;
    } else {
        return false;
    }
};

export const checkUserEmail = (email) => async dispatch => {
    const userEmailCheck = await fetch(`${ROOT_URL}/userValidation/checkUserEmail/${email}`);
    const jsonData = await userEmailCheck.json();
    console.log('check dup email : ', jsonData.statusCode);
    if (jsonData.statusCode == 200) {
        return true;
    } else {
        return false;
    }
};

export const signUpUser = (userData) => async dispatch => {
    //서버로 전송
    const signUpCheck = await fetch(`${ROOT_URL}/signUp`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const jsonData = await signUpCheck.json();
    if (jsonData.statusCode == 200) {
        return true;
    } else {
        return false;
    }
};

export const signUpTerm1 = () => async dispatch => {
    const term = await fetch(`${ROOT_URL}/terms/service`);
    const jsonData = await term.json();
    if (jsonData.statusCode == 200) {
        dispatch({type: SIGN_UP_TERM_1, payload: jsonData.result});
    } else {
        dispatch({type: SIGN_UP_TERM_1, payload: ''});
    }
};

export const signUpTerm2 = () => async dispatch => {
    const term = await fetch(`${ROOT_URL}/terms/privacyPolicy`);
    const jsonData = await term.json();
    if (jsonData.statusCode == 200) {
        dispatch({type: SIGN_UP_TERM_2, payload: jsonData.result});
    } else {
        dispatch({type: SIGN_UP_TERM_2, payload: ''});
    }
};

export const sendFindPwd = (userId) => async dispatch => {
    const result = await fetch(`${ROOT_URL}/userValidation/sendPasswordMail/${userId}`);
    const jsonData = await result.json();
    if (jsonData.statusCode == 200) {
        return true;
    } else {
        return false;
    }
};
export const trackList = ()=> async dispatch =>{
    const track = await fetch(`${ROOT_URL}/track`);
    const jsonData =await track.json();
    if(jsonData.statusCode == 200){
        const data = jsonData.result;
        data.map((item, i)=>{
            dispatch({type:TRACK_LIST, payload: item.trackName});
        });
    }
    else{
        dispatch({type: TRACK_LIST, payload: []});
    }
};
export const admissionYear = ()=> async dispatch =>{
    const year = await fetch(`${ROOT_URL}/admissionYear`);
    const jsonData =await year.json();
    if(jsonData.statusCode == 200){
        const data = jsonData.result;
        data.map((item, i)=>{
            dispatch({type:ADMISSION_YEAR, payload: item.admissionYear+''});
        });
    }
    else{
        dispatch({type: ADMISSION_YEAR, payload: []});
    }
};

export default handleActions({
    // ... state, sample : action.payload.date
    [SIGN_IN]: (state, action) => {
        return {
            ...state,
            login: action.payload,
        }
    },
    [SIGN_IN_ID]: (state, action) => {
        return {
            ...state,
            id: action.payload,
        }
    },
    [SIGN_IN_PWD]: (state, action) => {
        return {
            ...state,
            pwd: action.payload
        }
    },
    [SIGN_UP_MODAL]: (state, action) => {
        return {
            ...state,
            register: !state.register,
        }
    },
    [FIND_PWD_MODAL]: (state, action) => {
        return {
            ...state,
            //register: !state.register,
            findPwd: action.payload,
        }
    },
    [TERMS_FIRST_CHECKED]: (state, action) => {
        return {
            ...state,
            isFirstChecked: !state.isFirstChecked
        }
    },
    [TERMS_FIRST_CHECKED_SET]: (state, action) => {
        return {
            ...state,
            isFirstChecked: action.payload
        }
    },
    [TERMS_SECOND_CHECKED_SET]: (state, action) => {
        return {
            ...state,
            isSecondChecked: action.payload
        }
    },
    [TERMS_FIRST_MODAL]: (state, action) => {
        return {
            ...state,
            firstVisible: action.payload
        }
    },
    [TERMS_SECOND_CHECKED]: (state, action) => {
        return {
            ...state,
            isSecondChecked: !state.isSecondChecked
        }
    },
    [TERMS_SECOND_MODAL]: (state, action) => {
        return {
            ...state,
            secondVisible: action.payload
        }
    },
    [SIGN_UP_USER_ID]: (state, action) => {
        return {
            ...state,
            userId: action.payload
        }
    },
    [SIGN_UP_USER_PWD]: (state, action) => {
        return {
            ...state,
            userPw: action.payload
        }
    },
    [SIGN_UP_USER_RE_PWD]: (state, action) => {
        return {
            ...state,
            userRePw: action.payload
        }
    },
    [SIGN_UP_USER_EMAIL]: (state, action) => {
        return {
            ...state,
            userEmail: action.payload
        }
    },
    [SIGN_UP_USER_NICKNAME]: (state, action) => {
        return {
            ...state,
            userNickName: action.payload
        }
    },
    [SIGN_UP_MAJOR]: (state, action) => {
        return {
            ...state,
            major: action.payload,

        }
    },
    [SIGN_UP_MINOR]: (state, action) => {
        return {
            ...state,
            minor: action.payload
        }
    },
    [SIGN_UP_DOUBLE_MAJOR]: (state, action) => {
        return {
            ...state,
            doubleMajor: action.payload
        }
    },
    [SIGN_UP_CONNECT_MAJOR]: (state, action) => {
        return {
            ...state,
            connectedMajor: action.payload
        }
    },

    [SIGN_UP_CHECK_ID_NO]: (state, action) => {
        return {
            ...state,
            checkIdNo: action.payload
        }
    },
    [SIGN_UP_CHECK_ID_LABEL]: (state, action) => {
        return {
            ...state,
            checkIdLabel: action.payload
        }
    },
    [SIGN_UP_CHECK_ID_CLIENT]: (state, action) => {
        return {
            ...state,
            checkIdClient: action.payload
        }
    },
    [SIGN_UP_CHECK_ID_SERVER]: (state, action) => {
        return {
            ...state,
            checkIdServer: action.payload
        }
    },
    [SIGN_UP_NICKNAME_NO]: (state, action) => {
        return {
            ...state,
            checkNickNameNo: action.payload
        }
    },
    [SIGN_UP_NICKNAME_LABEL]: (state, action) => {
        return {
            ...state,
            checkNickNameLabel: action.payload
        }
    },
    [SIGN_UP_NICKNAME_CLIENT]: (state, action) => {
        return {
            ...state,
            checkNickNameClient: action.payload
        }
    },
    [SIGN_UP_NICKNAME_SERVER]: (state, action) => {
        return {
            ...state,
            checkNickNameServer: action.payload
        }
    },
    [SIGN_UP_EMAIL_NO]: (state, action) => {
        return {
            ...state,
            checkEmailNo: action.payload
        }
    },
    [SIGN_UP_EMAIL_LABEL]: (state, action) => {
        return {
            ...state,
            checkEmailLabel: action.payload
        }
    },
    [SIGN_UP_EMAIL_CLIENT]: (state, action) => {
        return {
            ...state,
            checkEmailClient: action.payload
        }
    },
    [SIGN_UP_EMAIL_SERVER]: (state, action) => {
        return {
            ...state,
            checkEmailServer: action.payload
        }
    },
    [SIGN_UP_PWD_NO]: (state, action) => {
        return {
            ...state,
            checkPasswordNo: action.payload
        }
    },
    [SIGN_UP_PWD_LABEL]: (state, action) => {
        return {
            ...state,
            checkPasswordLabel: action.payload
        }
    },
    [SIGN_UP_RE_PWD]: (state, action) => {
        return {
            ...state,
            checkPassRe: action.payload
        }
    },
    [SIGN_UP_RE_PWD_LABEL]: (state, action) => {
        return {
            ...state,
            checkPassReLabel: action.payload
        }
    },
    [SIGN_UP_CHECK_PWD]: (state, action) => {
        return {
            ...state,
            checkPassword: action.payload
        }
    },
    [SIGN_UP_CHECK_RE_PWD]: (state, action) => {
        return {
            ...state,
            checkRePassword: action.payload
        }
    },
    [SIGN_UP_USER_ID_MODAL]: (state, action) => {
        return {
            ...state,
            userIdCheckModal: action.payload
        }
    },
    [SIGN_UP_USER_NICKNAME_MODAL]: (state, action) => {
        return {
            ...state,
            userNickNameCheckModal: action.payload
        }
    },
    [SIGN_UP_USER_EMAIL_MODAL]: (state, action) => {
        return {
            ...state,
            userEmailCheckModal: action.payload
        }
    },
    [SIGN_UP_USER_PWD_MODAL]: (state, action) => {
        return {
            ...state,
            userPasswordCheckModal: action.payload
        }
    },
    [SIGN_UP_CURRENT_POSITION]: (state, action) => {
        return {
            ...state,
            currentPosition: action.payload
        }
    },
    [SIGN_UP_TERM_1]: (state, action) => {
        return {
            ...state,
            term1: action.payload,
        }
    },
    [SIGN_UP_TERM_2]: (state, action) => {
        return {
            ...state,
            term2: action.payload
        }
    },
    [SIGN_IN_AUTO]: (state, action) => {
        return {
            ...state,
            auto: action.payload
        }
    },
    [TERMS_ALL_CHECKED]: (state, action) => {
        return {
            ...state,
            isFirstChecked: action.payload,
            isSecondChecked: action.payload,
        }
    },

    [FIND_PWD_USER_ID]: (state, action) => {
        return {
            ...state,
            findPwdUserId: action.payload
        }
    },
    [FIND_PWD_CHECK_NO]: (state, action) => {
        return {
            ...state,
            findPwdCheckNo: action.payload,
        }
    },
    [FIND_PWD_CHECK_LABEL]: (state, action) => {
        return {
            ...state,
            findPwdCheckLabel: action.payload,
        }
    },
    [SIGN_IN_BUTTON]: (state, action) => {
        return {
            ...state,
            signInButton: action.payload,
        }
    },
    [FIND_PWD_RESULT]: (state, action) => {
        return {
            ...state,
            findPwdResult: action.payload,
        }
    },
    [FIND_PWD_RESULT_TITLE]: (state, action) => {
        return {
            ...state,
            findPwdResultTitle: action.payload,
        }
    },
    [SIGN_IN_CHECK]: (state, action) => {
        return {
            ...state,
            signInCheck: action.payload,
        }
    },

    [SIGN_IN_SCREEN1_BUTTON]:(state,action)=>{

        return{
            ...state,
            signInScreen1Button:action.payload,
        }
    },
    [SIGN_IN_SCREEN1_BUTTON2]:(state,action)=>{
        return {
            ...state,
            signInScreen1Button2:action.payload
        }
    },

    [TRACK_LIST]:(state,action)=>{
        return {
            ...state,
            track:[
                ...state.track,
                action.payload
            ]
        }
    },
    [ADMISSION_YEAR]:(state,action)=>{
        return{
            ...state,
            year:[
                ...state.year,
                action.payload
            ]
        }
    },
    [SIGN_IN_SCREEN2_BUTTON]:(state,action)=>{
        return{
            ...state,
            signInScreen2Button:action.payload
        }
    },
    [SIGN_UP_ADMISSION_YEAR]:(state,action)=>{
        return{
            ...state,
            admissionYear:action.payload
        }
    },
    [SIGN_IN_SCREEN3_BUTTON]:(state,action)=>{
        return{
            ...state,
            signInScreen3Button:action.payload
        }
    },
    [CHANGE_FONT_COLOR]:(state,action)=> {
        return {
            ...state,
            fontColor:action.payload
        }
    },
    [APP_VERSION]: (state, action) => {
        return {
            ...state,
            appVersion: action.payload,
        }
    },
    [SIGN_UP2_USER_ID_MODAL]: (state, action) => {
        return {
            ...state,
            userIdModal: action.payload,
        }
    },
    [SIGN_UP2_USER_NICKNAME_MODAL]: (state, action) => {
        return {
            ...state,
            userNickNameModal: action.payload,
        }
    },
    [SIGN_UP_MAJOR_MODAL]: (state, action) => {
        return {
            ...state,
            majorModal: action.payload,
        }
    },
    [SIGN_UP_DOUBLE_MAJOR_MODAL]: (state, action) => {
        return {
            ...state,
            doubleMajorModal: action.payload,
        }
    },
    [SIGN_UP_MINOR_MODAL]: (state, action) => {
        return {
            ...state,
            minorModal: action.payload,
        }
    },
    [SIGN_UP_CONNECTED_MAJOR_MODAL]: (state, action) => {
        return {
            ...state,
            connectedMajorModal: action.payload,
        }
    },
    [SIGN_UP_YEAR_MODAL]: (state, action) => {
        return {
            ...state,
            yearModal: action.payload,
        }
    },
    [SIGN_UP_TOAST]: (state, action) => {
        return {
            ...state,
            signUpToast: action.payload,
        }
    }

}, initialState);