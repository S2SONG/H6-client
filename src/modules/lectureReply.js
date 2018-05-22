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
    textValue: ''
};


export default handleActions({
    // ... state, sample : action.payload.date

}, initialState)