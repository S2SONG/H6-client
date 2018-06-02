import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;

const HANDEL_CLASS_SEMESTER = 'HANDEL_CLASS_SEMESTER';

const initialState = {
    admissionYear: undefined,
};

export const handleSemester = (semester) => dispatch => {
    dispatch({type:HANDEL_CLASS_SEMESTER, payload:semester});
};

export default handleActions({
    [HANDEL_CLASS_SEMESTER]: (state, action) => {
        return {
            ...state,
            semester: action.payload
        }
    },

}, initialState)
