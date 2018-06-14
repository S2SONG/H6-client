import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;

const MAIL_AUTH_EMAIL = 'MAIL_AUTH_EMAIL';

const initialState = {
    mail: ''
};

export const initState = () => dispatch => {
    dispatch({type:MAIL_AUTH_EMAIL, payload: ''});
};

export const onChangeEmail = (email) => dispatch => {
    dispatch({type:MAIL_AUTH_EMAIL, payload: email});
};

export const sendAuthMail = (email) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    let userData = {
        userId: userId,
        email: email
    };

    //서버로 전송
    const returnCheck = await fetch( `${ROOT_URL}/userValidation/sendValidationMail`, {
        method: "POST",
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
    [MAIL_AUTH_EMAIL]: (state, action) =>{
        return {
            ...state,
            mail: action.payload
        }
    },
}, initialState)
