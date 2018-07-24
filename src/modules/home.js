import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";
import {util} from "../utils/util";

const ROOT_URL = config.server;

const HOME_VOTE_TOPIC = 'HOME_VOTE_TOPIC';
const HOME_VOTE_ITEM_LIST = 'HOME_VOTE_ITEM_LIST';
const HOME_VOTE_ITEM_LIST_INIT = 'HOME_VOTE_ITEM_LIST_INIT';
const HOME_PERCENT_1 = 'HOME_PERCENT_1';
const HOME_PERCENT_2 = 'HOME_PERCENT_2';
const HOME_SECOND = 'HOME_SECOND';
const HOME_PAST_VOTE = 'HOME_PAST_VOTE';
const HOME_PAST_VOTE_INIT = 'HOME_PAST_VOTE_INIT';

const initialState = {
    voteItemList:[],
    voteTopic:{},
    percent1: 0,
    percent2: 0,
    seconds:0,
    pastVote: [],
};

export const initState = () => dispatch => {
    dispatch({type:HOME_VOTE_TOPIC, payload: {}});
    dispatch({type:HOME_VOTE_ITEM_LIST_INIT});
    dispatch({type:HOME_PERCENT_1, payload: 0});
    dispatch({type:HOME_PERCENT_2, payload: 0});
    dispatch({type:HOME_SECOND, payload: 0});
    dispatch({type:HOME_PAST_VOTE_INIT});
};

export const handleVoteTopic = (value) => dispatch => {
    dispatch({type:HOME_VOTE_TOPIC, payload: value});
};

export const getVote = () => async dispatch => {

    const token = await AsyncStorage.getItem('token');
    const result = await fetch(`${ROOT_URL}/vote`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
    });

    const jsonData = await result.json();
    if(jsonData.statusCode == 200){
        const data = jsonData.result.voteTopic;
        const voteItem = jsonData.result.voteItem;

        voteItem.map((item, i)=>{
           switch(item.itemOrder){
               case 1:
                   dispatch({type:HOME_PERCENT_1, payload: Math.floor((item.count/data.totalCount)*100)});
                   break;
               case 2:
                   dispatch({type:HOME_PERCENT_2, payload: Math.ceil((item.count/data.totalCount)*100)});
                   break;
           }
        });
        await dispatch({type:HOME_SECOND, payload:util.getTimerSecond(data.dueDate)});
        data.createdAt = util.timeToFormat(data.createdAt, "YY.MM.DD");
        data.dueDate = util.timeToFormat(data.dueDate, "YY.MM.DD");
        dispatch({type:HOME_VOTE_TOPIC, payload: data});
        dispatch({type:HOME_VOTE_ITEM_LIST, payload: voteItem});
    } else {

    }
};

export const getPastVote = (page, count) => async dispatch => {
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
    if(jsonData.statusCode == 200) {
        const past = jsonData.result;
        dispatch({type: HOME_PAST_VOTE, payload: past});
    }
};


export default handleActions({
    [HOME_VOTE_TOPIC]: (state, action) => {
        return {
            ...state,
            voteTopic: action.payload,
        }
    },
    [HOME_VOTE_ITEM_LIST_INIT]: (state, action) => {
        return {
            ...state,
            voteItemList: []
        }
    },
    [HOME_VOTE_ITEM_LIST]: (state, action) => {
        return {
            ...state,
            voteItemList: [
                ...action.payload,
            ]
        }
    },
    [HOME_PERCENT_1]: (state, action) => {
        return {
            ...state,
            percent1: action.payload,
        }
    },
    [HOME_PERCENT_2]: (state, action) => {
        return {
            ...state,
            percent2: action.payload,
        }
    },
    [HOME_SECOND]: (state, action) => {
        return {
            ...state,
            seconds: action.payload,
        }
    },
    [HOME_PAST_VOTE_INIT]: (state, action) => {
        return {
            ...state,
            pastVote: [],
        }
    },
    [HOME_PAST_VOTE]: (state, action) => {
        return {
            ...state,
            pastVote: [
                ...state.pastVote,
                ...action.payload,
            ]
        }
    },

}, initialState)
