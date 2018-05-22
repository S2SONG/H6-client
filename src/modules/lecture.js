import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;
const CURRENT_PAGE = 'CURRENT_PAGE';
const LECTURE_LOADING = 'LECTURE_LOADING';
const LECTURE_LIST = 'LECTURE_LIST';
const LECTURE_LIST_INIT = 'LECTURE_LIST_INIT';
const LECTURE_TOTAL = 'LECTURE_TOTAL';
const LECTURE_LIST_LENGTH = 'LECTURE_LIST_LENGTH';
const LECTURE_TEXT_VALUE = 'LECTURE_TEXT_VALUE';
const LECTURE_SEARCH_TEXT = 'LECTURE_SEARCH_TEXT';

const initialState = {
    currentPage: 1,
    lectureList: [],
    loading: false,
    total: 0,
    lectureListLength: 0,
    textValue: '',
    searchText: '',
};

export const initLectureList = () => dispatch => {
    dispatch({type: CURRENT_PAGE, payload: 1});
    dispatch({type: LECTURE_TOTAL, payload: 0});
    dispatch({type: LECTURE_LIST_LENGTH, payload: 0});
    dispatch({type: LECTURE_LIST_INIT});
};

export const onChangeTextValue = (value) => dispatch => {
    dispatch({type: LECTURE_TEXT_VALUE, payload: value});
};

export const handleSearchText = (value) => dispatch => {
    dispatch({type: LECTURE_SEARCH_TEXT, payload: value});
};

export const getLectureList = (searchText, page, length) => async dispatch => {
    dispatch({type: LECTURE_LOADING, payload: true});
    const token = await AsyncStorage.getItem('token');
    const url = searchText===''?`${ROOT_URL}/lecturesInfo?page=${page}&count=3`:`${ROOT_URL}/pageListLectureInfoBySearchTerm/${searchText}?page=${page}&count=3\``;
    const data = await fetch(url, {
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
    [LECTURE_LIST_INIT]: (state, action) => {
        return {
            ...state,
            lectureList: []
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
    },
    [LECTURE_TEXT_VALUE]: (state, action) => {
        return {
            ...state,
            textValue: action.payload,
        }
    },
    [LECTURE_SEARCH_TEXT]: (state, action) => {
        return {
            ...state,
            searchText: action.payload,
        }
    },
}, initialState)