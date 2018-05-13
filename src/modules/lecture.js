import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;
const CURRENT_PAGE = 'CURRENT_PAGE';
const LECTURE_LOADING = 'LECTURE_LOADING';
const LECTURE_LIST = 'LECTURE_LIST';
const LECTURE_TOTAL = 'LECTURE_TOTAL';
const LECTURE_LIST_LENGTH = 'LECTURE_LIST_LENGTH';

const initialState = {
    currentPage: 1,
    lectureList: [],
    loading: false,
    total: 0,
    lectureListLength: 0,
};

export const getLectureList = (page, length) => async dispatch => {
    dispatch({type: LECTURE_LOADING, payload: true});
    const token = await AsyncStorage.getItem('token');
    const data = await fetch(`${ROOT_URL}/lecturesInfo?page=${page}&count=3`, {
        method: "GET",
        headers: {
            'x-access-token': token
        }
    });
    const jsonData = await data.json();
    dispatch({type: LECTURE_LIST, payload: jsonData.result});
    dispatch({type: LECTURE_TOTAL, payload: jsonData.resultCount});
    dispatch({type: CURRENT_PAGE, payload: page + 1});
    dispatch({type: LECTURE_LOADING, payload: false});
    dispatch({type: LECTURE_LIST_LENGTH, payload: length + jsonData.result.length});
};


export default handleActions({
    // ... state, sample : action.payload.date
    [LECTURE_LOADING]: (state, action) => {
        return {
            ...state,
            loading: action.payload,
        }
    },
    [CURRENT_PAGE]: (state, action) => {
        return {
            ...state,
            currentPage: action.payload,
        }
    },
    [LECTURE_LIST]: (state, action) => {
        return {
            ...state,
            lectureList: [
                ...state.lectureList,
                ...action.payload,
            ]
        }
    },
    [LECTURE_TOTAL]: (state, action) => {
        return {
            ...state,
            total: action.payload
        }
    },
    [LECTURE_LIST_LENGTH]: (state, action) => {
        return {
            ...state,
            lectureListLength: action.payload
        }
    }

}, initialState)