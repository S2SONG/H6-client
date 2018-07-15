import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";

const ROOT_URL = config.server;

const EVALUATION_SEMESTER = 'EVALUATION_SEMESTER';
const EVALUATION_SCORE = 'EVALUATION_SCORE';
const EVALUATION_HOMEWORK = 'EVALUATION_HOMEWORK';
const EVALUATION_HOMEWORK_TYPE = 'EVALUATION_HOMEWORK_TYPE';
const EVALUATION_TEST_COUNT='EVALUATION_TEST_COUNT';
const EVALUATION_RECEIVED_GRADE='EVALUATION_RECEIVED_GRADE';
const EVALUATION_REVIEW = 'EVALUATION_REVIEW';
const SAVE_REPLY_MODAL = 'SAVE_REPLY_MODAL';
const UPDATE_NEW_REPLY = 'UPDATE_NEW_REPLY';
const REMOVE_REPLY_MODAL = 'REMOVE_REPLY_MODAL';
const REPLY_INDEX = 'REPLY_INDEX';
const CHECK_GET_LECTURE_REPLY = 'CHECK_GET_LECTURE_REPLY';

const initialState = {
    lectureInfoIndex: undefined,
    userIndex: undefined,
    semester: undefined,
    homework: undefined,
    homeworkType: 0,
    testCount: 0,
    receivedGrade: 0,
    review: undefined,
    score: 0,
    saveModal:false,
    lectureReplyIndex:undefined,
    removeModal:false,
    reply:undefined,
    check:false
};

export const initReplyState = () => dispatch => {
    dispatch({type: EVALUATION_SEMESTER, payload: undefined});
    dispatch({type: EVALUATION_SCORE, payload: undefined});
    dispatch({type: EVALUATION_HOMEWORK, payload: undefined});
    dispatch({type: EVALUATION_HOMEWORK_TYPE, payload: undefined});
    dispatch({type: EVALUATION_TEST_COUNT, payload: undefined});
    dispatch({type: EVALUATION_RECEIVED_GRADE, payload: undefined});
    dispatch({type: EVALUATION_REVIEW, payload: ''});
    dispatch({type: SAVE_REPLY_MODAL, payload:false});
    dispatch({type: UPDATE_NEW_REPLY, payload: undefined});
    dispatch({type: REMOVE_REPLY_MODAL, payload:false});
    dispatch({type: REPLY_INDEX, payload: undefined});
};

export const handleSemester = (semester) => dispatch => {
    dispatch({type:EVALUATION_SEMESTER, payload:semester});
};

export const handleScore = (score) => dispatch => {
    dispatch({type:EVALUATION_SCORE, payload:score});
};

export const handleHomework = (homework) => dispatch => {
    dispatch({type:EVALUATION_HOMEWORK, payload:homework});
};

export const handleHomeworkType = (homeworkType) => dispatch => {
    dispatch({type:EVALUATION_HOMEWORK_TYPE, payload:homeworkType});
};

export const handleTestCount = (testCount) => dispatch => {
    dispatch({type:EVALUATION_TEST_COUNT, payload:testCount});
};

export const handleReceivedGrade = (receivedGrade) => dispatch => {
    dispatch({type:EVALUATION_RECEIVED_GRADE, payload:receivedGrade});
};

export const handleReview = (review) => dispatch => {
    dispatch({type:EVALUATION_REVIEW, payload:review});
};

export const saveModal = (modal) => dispatch => {
    dispatch({type:SAVE_REPLY_MODAL, payload:modal});
};
export const removeReplyModal = (modal) => dispatch=> {
    dispatch({type:REMOVE_REPLY_MODAL, payload:modal});
};

export const updateNewReply = (updateReply) => dispatch=>{
    dispatch({type: UPDATE_NEW_REPLY, payload: updateReply });
};

export const postReply = (semester, homework, homeworkType, testCount, receivedGrade, review, score, lectureInfoIndex) => async dispatch=> {
    //const lectureIndex = await AsyncStorage.getItem('lectureInfoIndex');
    const userIndex = await AsyncStorage.getItem('userIndex');
    let lectureReplyData = {
        semester: semester,
        homework: homework,
        homeworkType: homeworkType,
        testCount: testCount,
        receivedGrade: receivedGrade,
        review: review,
        score: score,
        lectureInfoIndex:lectureInfoIndex,
        userIndex: userIndex,
    };
    //서버로 전송
    console.log(lectureInfoIndex,userIndex);

    const token = await AsyncStorage.getItem('token');
    const saveCheck = await fetch(`${ROOT_URL}/lecturesReply`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(lectureReplyData),
    });

    const jsonData = await saveCheck.json();
    console.log(jsonData);
    if (jsonData.statusCode == 200) {
        return true;
    } else {
        return false;
    }
};

export const getReplyIndex = (lectureInfoIndex) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const userIndex = await AsyncStorage.getItem('userIndex');
    const url = `${ROOT_URL}/lecturesReply/checkUpdateLectureReply/lectureInfoIndex/${lectureInfoIndex}/userIndex/${userIndex}`;
    const Index = await fetch(url, {
        method: "GET",
        headers: {
            'x-access-token': token
        }
    });
    const jsonData = await Index.json();
    if (jsonData.statusCode == 200) {
        dispatch({type: REPLY_INDEX, payload: jsonData.result});
    } else {
        dispatch({type: REPLY_INDEX, payload:""});
    }
};

export const getLectureReplyByLectureReplyIndex = (lectureReplyIndex) => async dispatch => {
    //const lectureReplyIndex = await AsyncStorage.getItem('lectureReplyIndex');
    const newRe = await fetch(`${ROOT_URL}/lecturesReply/lectureReplyIndex/${lectureReplyIndex}`);
    const jsonData = await newRe.json();
    if (jsonData.statusCode == 200) {
    } else {
    }
};

export const checkGetLectureReply = (lectureInfoIndex) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const userIndex = await AsyncStorage.getItem('userIndex');
    const url = `${ROOT_URL}/lecturesReply/checkGetLectureReply/lectureInfoIndex/${lectureInfoIndex}/userIndex/${userIndex}`;
    const check = await fetch(url, {
        method: "GET",
        headers: {
            'x-access-token': token
        }
    });
    const jsonData = await check.json();
    if (jsonData.statusCode == 200) {
        dispatch({type: CHECK_GET_LECTURE_REPLY, payload:true});
    } else {
        dispatch({type: CHECK_GET_LECTURE_REPLY, payload:false});
    }
};
export const updateLectureReply = (semester, homework, homeworkType, testCount, receivedGrade, review, score, lectureInfoIndex, lectureReplyIndex) => async dispatch=> {
    const userIndex = await AsyncStorage.getItem('userIndex');
    //const lectureReplyIndex = await AsyncStorage.getItem('lectureReplyIndex');
    let lectureReplyData = {
        semester: semester,
        homework: homework,
        homeworkType: homeworkType,
        testCount: testCount,
        receivedGrade: receivedGrade,
        review: review,
        score: score,
        lectureInfoIndex:lectureInfoIndex,
        userIndex: userIndex,
        lectureReplyIndex:lectureReplyIndex
    };
    //서버로 전송
    console.log(lectureReplyIndex,userIndex);
    const token = await AsyncStorage.getItem('token');
    const saveCheck = await fetch(`${ROOT_URL}/lecturesReply/lectureReplyIndex/${lectureReplyIndex}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(lectureReplyData),
    });

    const jsonData = await saveCheck.json();
    console.log(jsonData);
    if (jsonData.statusCode == 200) {
        //dispatch({type: UPDATE_NEW_REPLY, payload: jsonData.result});
        return true;
    } else {
        return false;
    }
};

export const deleteReply = (lectureReplyIndex) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const returnCheck = await fetch( `${ROOT_URL}/lecturesReply/lectureReplyIndex/${lectureReplyIndex}`, {
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
        await AsyncStorage.removeItem('semester');
        await AsyncStorage.removeItem('homework');
        await AsyncStorage.removeItem('homeworkType');
        await AsyncStorage.removeItem('testCount');
        await AsyncStorage.removeItem('receivedGrade');
        await AsyncStorage.removeItem('updatedAt');
        await AsyncStorage.removeItem('createdAt');
        await AsyncStorage.removeItem('review');
        await AsyncStorage.removeItem('score');
        return true;
    } else {
        console.log('삭제안됨');
        return false;
    }
};

export default handleActions({
    [EVALUATION_SCORE]: (state, action) => {
        return {
            ...state,
            score: action.payload
        }
    },
    [EVALUATION_SEMESTER]: (state, action) => {
        return {
            ...state,
            semester: action.payload
        }
    },
    [EVALUATION_HOMEWORK]: (state, action) => {
        return {
            ...state,
            homework: action.payload
        }
    },
    [EVALUATION_HOMEWORK_TYPE]: (state, action) => {
        return {
            ...state,
            homeworkType: action.payload
        }
    },
    [EVALUATION_TEST_COUNT]: (state, action) => {
        return {
            ...state,
            testCount: action.payload
        }
    },
    [EVALUATION_RECEIVED_GRADE]: (state, action) => {
        return {
            ...state,
            receivedGrade: action.payload
        }
    },
    [EVALUATION_REVIEW]: (state, action) => {
        return {
            ...state,
            review: action.payload
        }
    },
    [SAVE_REPLY_MODAL]: (state,action) => {
        return {
            ...state,
            visible: action.payload
        }
    },
    [UPDATE_NEW_REPLY]: (state, action) => {
        return{
            ...state,
            updateReply:action.payload
        }
    },
    [REMOVE_REPLY_MODAL]: (state, action) => {
        return{
            ...state,
            removeModal:action.payload
        }
    },
    [REPLY_INDEX]: (state, action) => {
        return{
            ...state,
            reply:action.payload
        }
    },
    [CHECK_GET_LECTURE_REPLY]: (state, action) => {
        return{
            ...state,
            check:action.payload
        }
    },
}, initialState);