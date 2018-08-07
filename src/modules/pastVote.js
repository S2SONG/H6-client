import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";
import {util} from "../utils/util";

const ROOT_URL = config.server;

const PAST_VOTE_LIST = 'PAST_VOTE_LIST';
const PAST_VOTE_LIST_INIT = 'PAST_VOTE_LIST_INIT';

const PAST_VOTE = 'PAST_VOTE';
const PAST_VOTE_INIT = 'PAST_VOTE_INIT';
const PAST_VOTE_ITEM_LIST = 'PAST_VOTE_ITEM_LIST';
const PAST_VOTE_PERCENT_1 = 'PAST_VOTE_PERCENT_1';
const PAST_VOTE_PERCENT_2 = 'PAST_VOTE_PERCENT_2';
const PAST_VOTE_SELECT_INDEX = 'PAST_VOTE_SELECT_INDEX';

const initialState = {
    voteItemList: [],
    voteTopic: {},
    percent1: 0,
    percent2: 0,
    selectIndex: -1,

    pastVoteList: [],
};

export const initPastVote = () => dispatch => {
  dispatch({type:PAST_VOTE_INIT});
};

export const initState = () => dispatch => {
    dispatch({type: PAST_VOTE_LIST_INIT});
    dispatch({type: PAST_VOTE, payload: {}});
    dispatch({type: PAST_VOTE_ITEM_LIST, payload: []});
    dispatch({type: PAST_VOTE_PERCENT_1, payload: 0});
    dispatch({type: PAST_VOTE_PERCENT_2, payload: 0});
    dispatch({type: PAST_VOTE_SELECT_INDEX, payload: -1});
};

export const getPastVoteList = (page, count) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const result = await fetch(`${ROOT_URL}/pastVote?page=${page}&count=${count}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    });

    const jsonData = await result.json();
    if (jsonData.statusCode == 200) {
        const past = jsonData.result;
        dispatch({type: PAST_VOTE_LIST, payload: past});
    } else {

    }
};

export const getPastVote = (index) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const result = await fetch(`${ROOT_URL}/pastVote/pastVoteTopicIndex/${index}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    });

    const jsonData = await result.json();
    if(jsonData.statusCode == 200){
        const data = jsonData.result.voteTopic;
        const voteItem = jsonData.result.voteItem;
        if(data.totalCount == 0) data.totalCount = 1;
        voteItem.map((item, i)=>{
            switch(item.itemOrder){
                case 1:
                    dispatch({type:PAST_VOTE_PERCENT_1, payload: Math.floor((item.count/data.totalCount)*100)});
                    break;
                case 2:
                    dispatch({type:PAST_VOTE_PERCENT_2, payload: Math.ceil((item.count/data.totalCount)*100)});
                    break;
            }
        });
        data.createdAt = util.timeToFormat(data.createdAt, "YY.MM.DD");
        data.dueDate = util.timeToFormat(data.dueDate, "YY.MM.DD");
        dispatch({type:PAST_VOTE, payload: data});
        dispatch({type:PAST_VOTE_ITEM_LIST, payload: voteItem});
    } else {

    }
};

export const checkVote = (voteTopicIndex) => async dispatch => {

    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    const result = await fetch(`${ROOT_URL}/checkVote/voteTopicIndex/${voteTopicIndex}/voteUserId/${userId}`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
    });

    const jsonData = await result.json();
    if(jsonData.statusCode == 200){
        const result = jsonData.result;
        dispatch({type:PAST_VOTE_SELECT_INDEX, payload:result.voteItemIndex})
    } else {
        dispatch({type:PAST_VOTE_SELECT_INDEX, payload: -1});
    }
};



export default handleActions({
    [PAST_VOTE_LIST_INIT]: (state, action) => {
        return {
            ...state,
            pastVoteList: [],
        }
    },
    [PAST_VOTE_LIST]: (state, action) => {
        return {
            ...state,
            pastVoteList: [
                ...state.pastVoteList,
                ...action.payload,
            ],
        }
    },
    [PAST_VOTE_SELECT_INDEX]: (state, action) => {
        return {
            ...state,
            selectIndex: action.payload,
        }
    },
    [PAST_VOTE_INIT]: (state, action) => {
        return {
            ...state,
            voteItemList: [],
            voteTopic: {},
            percent1: 0,
            percent2: 0,
            selectIndex: -1,
        }
    },
    [PAST_VOTE]: (state, action) => {
        return {
            ...state,
            voteTopic: action.payload,
        }
    },
    [PAST_VOTE_ITEM_LIST]: (state, action) => {
        return {
            ...state,
            voteItemList:[
                ...state.voteItemList,
                ...action.payload,
            ]
        }
    },
    [PAST_VOTE_PERCENT_1]: (state, action) => {
        return {
            ...state,
            percent1: action.payload,
        }
    },
    [PAST_VOTE_PERCENT_2]: (state, action) => {
        return {
            ...state,
            percent2: action.payload,
        }
    },
}, initialState)
