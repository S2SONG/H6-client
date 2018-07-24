import {handleActions} from 'redux-actions';
import config from "../../config";
import {Alert, AsyncStorage} from "react-native";

const ROOT_URL = config.server;

const ACCOUNT_INIT = 'ACCOUNT_INIT';
const ACCOUNT_MAJOR = 'ACCOUNT_MAJOR';
const ACCOUNT_MINOR = 'ACCOUNT_MINOR';
const ACCOUNT_DOUBLE_MAJOR = 'ACCOUNT_DOUBLE_MAJOR';
const ACCOUNT_CONNECTED_MAJOR = 'ACCOUNT_CONNECTED_MAJOR';
const ACCOUNT_ADMISSION_YEAR = 'ACCOUNT_ADMISSION_YEAR';
const ACCOUNT_TRACK_LIST = 'ACCOUNT_TRACK_LIST';
const ACCOUNT_YEAR_LIST = 'ACCOUNT_YEAR_LIST';

const initialState = {
    major: null,
    minor: null,
    doubleMajor: null,
    connectedMajor: null,
    admissionYear: null,
    trackList: [],
    yearList: [],
};

export const initState = () => async dispatch => {
    await dispatch({type:ACCOUNT_INIT});
};

export const getAddInfo = () => async dispatch => {
    const major = await AsyncStorage.getItem('major');
    const minor = await AsyncStorage.getItem('minor');
    const doubleMajor = await AsyncStorage.getItem('doubleMajor');
    const connectedMajor = await AsyncStorage.getItem('connectedMajor');
    const admissionYear = await AsyncStorage.getItem('admissionYear');
    await dispatch({type:ACCOUNT_MAJOR, payload: major});
    await dispatch({type:ACCOUNT_MINOR, payload: minor});
    await dispatch({type:ACCOUNT_DOUBLE_MAJOR, payload: doubleMajor});
    await dispatch({type:ACCOUNT_CONNECTED_MAJOR, payload: connectedMajor});
    await dispatch({type:ACCOUNT_ADMISSION_YEAR, payload: admissionYear});
};

export const getTrack = () => async dispatch => {
    const result = await fetch(`${ROOT_URL}/track`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const jsonData = await result.json();
    if(jsonData.statusCode == 200) {
        const data = jsonData.result;
        data.map((item, i)=>{
            dispatch({type:ACCOUNT_TRACK_LIST, payload: item.trackName});
        });
    }
};

export const getYear = () => async dispatch => {
    const result = await fetch(`${ROOT_URL}/admissionYear`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const jsonData = await result.json();
    if(jsonData.statusCode == 200) {
        const data = jsonData.result;
        data.map((item, i) => {
            dispatch({type:ACCOUNT_YEAR_LIST, payload:item.admissionYear+''});
        })
    }
};

export default handleActions({
    [ACCOUNT_INIT]: (state, action) => {
        return {
            major: null,
            minor: null,
            doubleMajor: null,
            connectedMajor: null,
            admissionYear: null,
            trackList: [],
            yearList: [],
        }
    },
    [ACCOUNT_MAJOR]: (state, action) => {
        return {
            ...state,
            major: action.payload,
        }
    },
    [ACCOUNT_MINOR]: (state, action) => {
        return {
            ...state,
            minor: action.payload,
        }
    },
    [ACCOUNT_DOUBLE_MAJOR]: (state, action) => {
        return {
            ...state,
            doubleMajor: action.payload
        }
    },
    [ACCOUNT_CONNECTED_MAJOR]: (state, action) => {
        return {
            ...state,
            connectedMajor: action.payload,
        }
    },
    [ACCOUNT_ADMISSION_YEAR]: (state, action) => {
        return {
            ...state,
            admissionYear: action.payload,
        }
    },
    [ACCOUNT_YEAR_LIST]: (state, action) => {
        return {
            ...state,
            yearList: [
                ...state.yearList,
                action.payload
            ]
        }
    },
    [ACCOUNT_TRACK_LIST]: (state, action) => {
        return {
            ...state,
            trackList: [
                ...state.trackList,
                action.payload
            ]
        }
    }
}, initialState)
