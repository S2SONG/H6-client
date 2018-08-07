import {handleActions} from 'redux-actions';
import {AsyncStorage} from "react-native";
import config from "../../config";

const MY_INFO_INIT = 'MY_INFO_INIT';
const MY_INFO_PROFILE = 'MY_INFO_PROFILE';
const MY_INFO_USER_NICKNAME = 'MY_INFO_USER_NICKNAME';
const MY_INFO_USER_ID = 'MY_INFO_USER_ID';
const MY_INFO_IS_VALIDATION = 'MY_INFO_IS_VALIDATION';
const MY_INFO_LOGOUT_MODAL = 'MY_INFO_LOGOUT_MODAL';
const MY_INFO_USER_OUT_MODAL = 'MY_INFO_USER_OUT_MODAL';

const initialState = {
    userNickName: '',
    userId: '',
    isValidation: 0,
    logoutModal: false,
    userOutModal: false,
};

export const initState = () => dispatch => {
    dispatch({type: MY_INFO_INIT});
};
export const handleLogoutModal = (modal) => dispatch => {
    dispatch({type: MY_INFO_LOGOUT_MODAL, payload: modal});
};
export const handleUserOutModal = (modal) => dispatch => {
    dispatch({type: MY_INFO_USER_OUT_MODAL, payload: modal});
};


export const setProfile = () => async dispatch => {
    const userNickName = await AsyncStorage.getItem("userNickName");
    const userId = await AsyncStorage.getItem("userId");
    const isValidation = await AsyncStorage.getItem('isValidation');
    // dispatch({type: MY_INFO_PROFILE, userNickName: userNickName, userId: userId});
    dispatch({type: MY_INFO_USER_ID, payload: userId});
    dispatch({type: MY_INFO_USER_NICKNAME, payload: userNickName});
    dispatch({type: MY_INFO_IS_VALIDATION, payload: isValidation});
};

export default handleActions({
    // ... state, sample : action.payload.date
    [MY_INFO_INIT]: (state, action) => {
      return {
          userNickName: '',
          userId: '',
          isValidation: 0,
          logoutModal: false,
          userOutModal: false,
      }
    },
    [MY_INFO_PROFILE]: (state, action) => {
        return {
            ...state,
            userNickName: action.userNickName,
            userId: action.userId,
        }
    },
    [MY_INFO_USER_NICKNAME]: (state, action) => {
        return {
            ...state,
            userNickName: action.payload,
        }
    },
    [MY_INFO_USER_ID]: (state, action) => {
        return {
            ...state,
            userId: action.payload,
        }
    },
    [MY_INFO_IS_VALIDATION]: (state, action) => {
        return {
            ...state,
            isValidation: action.payload,
        }
    },
    [MY_INFO_LOGOUT_MODAL]: (state, action) => {
        return {
            ...state,
            logoutModal: action.payload,
        }
    },
    [MY_INFO_USER_OUT_MODAL]: (state, action) => {
        return {
            ...state,
            userOutModal: action.payload,
        }
    }

}, initialState)