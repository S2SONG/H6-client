import {handleActions} from 'redux-actions';
import config from "../../config";
import {AsyncStorage} from "react-native";
import {util} from "../utils/util";

const ROOT_URL = config.server;

const CURRENT_VOTE_ENABLE = 'CURRENT_VOTE_ENABLE';
const CURRENT_SELECT_INDEX = 'CURRENT_SELECT_INDEX';
const CURRENT_SELECT = 'CURRENT_SELECT';

const initialState = {
    enable: true,
    selectIndex: -1,
    select: false,
};

export const handleEnable = (value) => dispatch => {
    dispatch({type:CURRENT_VOTE_ENABLE, payload: value});
};

export const handleSelectIndex = (index) => dispatch => {
    dispatch({type:CURRENT_SELECT_INDEX, payload: index});
};

export const handleSelect = (value) => dispatch => {
    dispatch({type:CURRENT_SELECT, payload: value});
};

export const initState = () => dispatch => {
    dispatch({type:CURRENT_VOTE_ENABLE, payload: true});
    dispatch({type:CURRENT_SELECT_INDEX, payload: -1});
    dispatch({type:CURRENT_SELECT, payload: false})
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
        dispatch({type:CURRENT_VOTE_ENABLE, payload: false});
        dispatch({type:CURRENT_SELECT_INDEX, payload:result.voteItemIndex})
    } else if(jsonData.statusCode == 404){
        dispatch({type:CURRENT_VOTE_ENABLE, payload: true});
    } else {
        dispatch({type:CURRENT_VOTE_ENABLE, payload: false});
    }
};

export const postVote = (voteTopicIndex, voteItemIndex) => async dispatch => {

    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    const data = {
        voteTopicIndex: voteTopicIndex,
        voteItemIndex: voteItemIndex,
        userId: userId
    };
    const result = await fetch(`${ROOT_URL}/vote`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(data)
    });

    const jsonData = await result.json();
    if(jsonData.statusCode == 200){
        return true;
    } else {
        return false;
    }
};

export default handleActions({
    [CURRENT_VOTE_ENABLE]: (state, action) => {
        return {
            ...state,
            enable: action.payload,
        }
    },
    [CURRENT_SELECT]: (state, action) => {
        return {
            ...state,
            select: action.payload,
        }
    },
    [CURRENT_SELECT_INDEX]: (state, action) => {
        return {
            ...state,
            selectIndex: action.payload,
        }
    },

}, initialState)
