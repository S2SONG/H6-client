import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;
const CURRENT_POSITION = 'CURRENT_POSITION';
const LECTURE_LIST = 'LECTURE_LIST';

const initialState = {
    currentPosition: 0,
    lectureList:{},
};

export const getLectureList = (page) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const data = await fetch(`${ROOT_URL}/lecturesInfo?page=${page}&count=3`,{
        method: "GET",
        headers:{
            'x-access-token':token
        }
    });
    const jsonData = await data.json();
    dispatch({type:LECTURE_LIST, payload: jsonData.result});
};


export default handleActions({
    // ... state, sample : action.payload.date
    [LECTURE_LIST]: (state, action) => {
        return {
            ...state,
            lectureList: [
                ...state.lectureList,
                action.payload,
            ]
        }
    },

}, initialState)