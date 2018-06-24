import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;

const LEAVE_PASSWORD_MODAL = 'LEAVE_PASSWORD_MODAL';
const LEAVE_PASSWORD = 'LEAVE_PASSWORD';

const initialState = {
    passwordModal: false,
    password: '',
};

export const initState = () => dispatch => {

};

export const handlePasswordModal = (open) => dispatch => {
    dispatch({type:LEAVE_PASSWORD_MODAL, payload:open});
};

export const handlePassword = (password) => dispatch => {
    dispatch({type:LEAVE_PASSWORD, payload:password});
};

export const handleDeleteUser = () => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    const returnCheck = await fetch( `${ROOT_URL}/users/userId/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
    });

    const jsonData = await returnCheck.json();
    console.log(jsonData);
    if(jsonData.statusCode == 200){
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('admissionYear');
        await AsyncStorage.removeItem('connectedMajor');
        await AsyncStorage.removeItem('doubleMajor');
        await AsyncStorage.removeItem('isValidation');
        await AsyncStorage.removeItem('major');
        await AsyncStorage.removeItem('minor');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userIndex');
        await AsyncStorage.removeItem('userNickName');
        return true;
    } else {
        return false;
    }
};

export default handleActions({
    [LEAVE_PASSWORD_MODAL]: (state, action) => {
        return {
            ...state,
            passwordModal: action.payload,
        }
    },
    [LEAVE_PASSWORD]: (state, action) => {
        return {
            ...state,
            password: action.payload,
        }
    },
}, initialState)
