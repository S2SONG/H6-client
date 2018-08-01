import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;

const PASSWORD_CURRENT_PASSWORD = 'PASSWORD_CURRENT_PASSWORD';
const PASSWORD_NEW_PASSWORD = 'PASSWORD_NEW_PASSWORD';
const PASSWORD_RE_NEW_PASSWORD = 'PASSWORD_RE_NEW_PASSWORD';
const PASSWORD_NEW_PASSWORD_CHECK_NO = 'PASSWORD_NEW_PASSWORD_CHECK_NO';
const PASSWORD_NEW_PASSWORD_CHECK_LABEL = 'PASSWORD_NEW_PASSWORD_CHECK_LABEL';
const PASSWORD_RE_NEW_PASSWORD_CHECK_NO = 'PASSWORD_RE_NEW_PASSWORD_CHECK_NO';
const PASSWORD_RE_NEW_PASSWORD_CHECK_LABEL = 'PASSWORD_RE_NEW_PASSWORD_CHECK_LABEL';
const PASSWORD_CURRENT_CHANGE_MODAL = 'PASSWORD_CURRENT_CHANGE_MODAL';
const PASSWORD_CURRENT_FAIL_MODAL = 'PASSWORD_CURRENT_FAIL_MODAL';
const PASSWORD_SUCCESS_MODAL = 'PASSWORD_SUCCESS_MODAL';

const initialState = {
    currentPassword:'',
    newPassword:'',
    reNewPassword:'',
    newPasswordCheckNo:0,
    newPasswordCheckLabel:'',
    reNewPasswordCheckNo:0,
    reNewPasswordCheckLabel:'',
    currentChangeModal: false,
    successModal: false,
    currentFailModal: false,
};

export const initState = () => dispatch => {
    dispatch({type:PASSWORD_CURRENT_PASSWORD, payload: ''});
    dispatch({type:PASSWORD_NEW_PASSWORD, payload: ''});
    dispatch({type:PASSWORD_RE_NEW_PASSWORD, payload: ''});
    dispatch({type:PASSWORD_NEW_PASSWORD_CHECK_NO, payload: 0});
    dispatch({type:PASSWORD_NEW_PASSWORD_CHECK_LABEL, payload: ''});
    dispatch({type:PASSWORD_RE_NEW_PASSWORD_CHECK_NO, payload: 0});
    dispatch({type:PASSWORD_RE_NEW_PASSWORD_CHECK_LABEL, payload: ''});
    dispatch({type:PASSWORD_CURRENT_CHANGE_MODAL, payload:false});
    dispatch({type:PASSWORD_CURRENT_FAIL_MODAL, payload:false});
    dispatch({type:PASSWORD_SUCCESS_MODAL, payload:false});
};

export const handleCurrentChangeModal = (modal) => dispatch => {
    dispatch({type:PASSWORD_CURRENT_CHANGE_MODAL, payload:modal});
};

export const handleCurrentFailModal = (modal) => dispatch => {
    dispatch({type:PASSWORD_CURRENT_FAIL_MODAL, payload:modal});
};

export const handleSuccessModal = (modal) => dispatch => {
    dispatch({type:PASSWORD_SUCCESS_MODAL, payload:modal});
};

export const onChangeCurrentPassword = (value) => dispatch => {
    dispatch({type:PASSWORD_CURRENT_PASSWORD, payload: value});
};

export const onChangeNewPassword = (value) => dispatch => {
    dispatch({type:PASSWORD_NEW_PASSWORD, payload: value});
};

export const onChangeReNewPassword = (value) => dispatch => {
    dispatch({type:PASSWORD_RE_NEW_PASSWORD, payload: value});
};

export const onChangeNewPasswordCheckNo = (value) => dispatch => {
    dispatch({type:PASSWORD_NEW_PASSWORD_CHECK_NO, payload: value});
};
export const onChangeNewPasswordCheckLabel = (value) => dispatch => {
    dispatch({type:PASSWORD_NEW_PASSWORD_CHECK_LABEL, payload: value});
};

export const onChangeReNewPasswordCheckNo = (value) => dispatch => {
    dispatch({type:PASSWORD_RE_NEW_PASSWORD_CHECK_NO, payload: value});
};
export const onChangeReNewPasswordCheckLabel = (value) => dispatch => {
    dispatch({type:PASSWORD_RE_NEW_PASSWORD_CHECK_LABEL, payload: value});
};

export const passwordChange = (currentPassword, newPassword) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    let userData = {
        userPw: currentPassword,
        userNewPw: newPassword
    };

    //서버로 전송
    const returnCheck = await fetch( `${ROOT_URL}/users/userId/${userId}/password`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(userData),
    });

    const jsonData = await returnCheck.json();
    console.log(jsonData);
    if(jsonData.statusCode == 200){
        return true;
    } else {
        return false;
    }
};


export default handleActions({
    [PASSWORD_CURRENT_PASSWORD]: (state, action) => {
        return {
            ...state,
            currentPassword: action.payload,
        }
    },
    [PASSWORD_NEW_PASSWORD]: (state, action) => {
        return {
            ...state,
            newPassword: action.payload,
        }
    },
    [PASSWORD_RE_NEW_PASSWORD]: (state, action) => {
        return {
            ...state,
            reNewPassword: action.payload,
        }
    },
    [PASSWORD_NEW_PASSWORD_CHECK_NO]: (state, action) => {
        return {
            ...state,
            newPasswordCheckNo: action.payload,
        }
    },
    [PASSWORD_NEW_PASSWORD_CHECK_LABEL]: (state, action) => {
        return {
            ...state,
            newPasswordCheckLabel: action.payload,
        }
    },
    [PASSWORD_RE_NEW_PASSWORD_CHECK_NO]: (state, action) => {
        return {
            ...state,
            reNewPasswordCheckNo: action.payload,
        }
    },
    [PASSWORD_RE_NEW_PASSWORD_CHECK_LABEL]: (state, action) => {
        return {
            ...state,
            reNewPasswordCheckLabel: action.payload,
        }
    },
    [PASSWORD_CURRENT_CHANGE_MODAL]: (state, action) => {
        return {
            ...state,
            currentChangeModal: action.payload,
        }
    },
    [PASSWORD_CURRENT_FAIL_MODAL]: (state, action) => {
        return {
            ...state,
            currentFailModal: action.payload,
        }
    },
    [PASSWORD_SUCCESS_MODAL]: (state, action) => {
        return {
            ...state,
            successModal: action.payload,
        }
    },
}, initialState)
