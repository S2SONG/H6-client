import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;

const MAIL_AUTH_EMAIL = 'MAIL_AUTH_EMAIL';

const initialState = {
    mail: ''
};

export const onChangeEmail = (email) => dispatch => {
    dispatch({type:MAIL_AUTH_EMAIL, payload: email});
};


export default handleActions({
    [MAIL_AUTH_EMAIL]: (state, action) =>{
        return {
            ...state,
            mail: action.payload
        }
    },
}, initialState)
