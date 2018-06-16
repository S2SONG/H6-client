import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;

const LECTURE_INFO = 'LECTURE_INFO';
const LECTURE_INFO_HEADER = 'LECTURE_INFO_HEADER';
const LECTURE_REPLY_LOADING = 'LECTURE_REPLY_LOADING';
const LECTURE_REPLY_LIST = 'LECTURE_REPLY_LIST';
const LECTURE_REPLY_LIST_INIT = 'LECTURE_REPLY_LIST_INIT';
const LECTURE_REPLY_CURRENT_PAGE = 'LECTURE_REPLY_CURRENT_PAGE';
const LECTURE_REPLY_LIST_LENGTH = 'LECTURE_REPLY_LIST_LENGTH';
const LECTURE_REPLY_TOTAL = 'LECTURE_REPLY_TOTAL';

//"average": 1,
// "lectureInfoIndex": 2,
// "lectureName": "os",
// "professorName": "신준태",
// "replyCount": 0,
// "track": "computer science",
// "updatedAt": "2018-05-07T18:33:42.000Z",
const initialState = {
    header: false,
    lecture: {
        average: 0
    },
    currentPage: 1,
    lectureReplyList: [],
    loading: false,
    total: 0,
    lectureReplyListLength: 0,
};

// export const onChangeTextValue = (value) => dispatch => {
//     dispatch({type: LECTURE_TEXT_VALUE, payload: value});
// };
export const lectureReplyInit = () => dispatch => {
    dispatch({type:LECTURE_INFO_HEADER, payload: false});
    dispatch({type:LECTURE_REPLY_CURRENT_PAGE, payload:1});
    dispatch({type:LECTURE_REPLY_LIST_INIT});
    dispatch({type: LECTURE_REPLY_LIST_LENGTH, payload:0});
    dispatch({type:LECTURE_REPLY_TOTAL, payload:0});
};

export const onChangeLecture = (lecture) => dispatch => {
    dispatch({type: LECTURE_INFO, payload: lecture});
};
export const onChangeHeaderTitle = (check) => dispatch => {
    dispatch({type:LECTURE_INFO_HEADER, payload: check});
};

export const getLectureReplyList = (lectureInfoIndex, page, length) => async dispatch => {
    dispatch({type: LECTURE_REPLY_LOADING, payload: true});
    const token = await AsyncStorage.getItem('token');
    const data = await fetch(`${ROOT_URL}/lecturesReply/lectureInfoIndex/${lectureInfoIndex}?page=${page}&count=3`, {
        method: "GET",
        headers: {
            'x-access-token': token
        }
    });
    const jsonData = await data.json();
    dispatch({type: LECTURE_REPLY_LIST, payload: jsonData.result});
    dispatch({type: LECTURE_REPLY_TOTAL, payload: jsonData.resultCount});
    dispatch({type: LECTURE_REPLY_CURRENT_PAGE, payload: page + 1});
    dispatch({type: LECTURE_REPLY_LOADING, payload: false});
    dispatch({type: LECTURE_REPLY_LIST_LENGTH, payload: length + jsonData.result.length});
};

export default handleActions({
    // ... state, sample : action.payload.date
    [LECTURE_INFO]: (state, action) => {
        return {
            ...state,
            lecture: action.payload,
        }
    },
    [LECTURE_INFO_HEADER]: (state, action) => {
        return {
            ...state,
            header: action.payload,
        }
    },
    [LECTURE_REPLY_LOADING]: (state, action) => {
        return {
            ...state,
            loading: action.payload
        }
    },
    [LECTURE_REPLY_LIST]: (state, action) => {
        return {
            ...state,
            lectureReplyList:[
                ...state.lectureReplyList,
                ...action.payload,
            ]
        }
    },
    [LECTURE_REPLY_LIST_INIT]: (state, action) => {
        return {
            ...state,
            lectureReplyList:[

            ]
        }
    },
    [LECTURE_REPLY_CURRENT_PAGE]: (state, action) => {
        return {
            ...state,
            currentPage: action.payload,
        }
    },
    [LECTURE_REPLY_LIST_LENGTH]: (state, action) => {
        return {
            ...state,
            lectureReplyListLength: action.payload,
        }
    },
    [LECTURE_REPLY_TOTAL]: (state, action) => {
        return {
            ...state,
            total: action.payload,
        }
    }
}, initialState)