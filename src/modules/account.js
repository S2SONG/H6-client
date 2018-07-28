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
const ACCOUNT_ADD_INFO = 'ACCOUNT_ADD_INFO';
const ACCOUNT_MAJOR_MODAL = 'ACCOUNT_MAJOR_MODAL';
const ACCOUNT_MINOR_MODAL = 'ACCOUNT_MINOR_MODAL';
const ACCOUNT_DOUBLE_MAJOR_MODAL = 'ACCOUNT_DOUBLE_MAJOR_MODAL';
const ACCOUNT_CONNECTED_MAJOR_MODAL = 'ACCOUNT_CONNECTED_MAJOR_MODAL';
const ACCOUNT_ADMISSION_YEAR_MODAL = 'ACCOUNT_ADMISSION_YEAR_MODAL';

const initialState = {
    major: null,
    minor: null,
    doubleMajor: null,
    connectedMajor: null,
    admissionYear: null,
    trackList: [],
    yearList: [],
    addInfo: [],
    majorModal: false,
    minorModal: false,
    doubleMajorModal: false,
    connectedMajorModal: false,
    admissionYearModal: false,
};

export const initState = () => dispatch => {
    dispatch({type:ACCOUNT_INIT});
};

export const getAddInfo = () => async dispatch => {
    const major = await AsyncStorage.getItem('major');
    const minor = await AsyncStorage.getItem('minor');
    const doubleMajor = await AsyncStorage.getItem('doubleMajor');
    const connectedMajor = await AsyncStorage.getItem('connectedMajor');
    const admissionYear = await AsyncStorage.getItem('admissionYear');
    dispatch({type:ACCOUNT_MAJOR, payload: major});
    dispatch({type:ACCOUNT_MINOR, payload: minor});
    dispatch({type:ACCOUNT_DOUBLE_MAJOR, payload: doubleMajor});
    dispatch({type:ACCOUNT_CONNECTED_MAJOR, payload: connectedMajor});
    dispatch({type:ACCOUNT_ADMISSION_YEAR, payload: admissionYear});
};

export const handleAddInfo = (info) => dispatch => {
  dispatch({type:ACCOUNT_ADD_INFO, payload: info});
};

export const handleMajor = (major) => async dispatch => {
    console.log(major);
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    const data = {
        major: major
    };
    const result = await fetch(`${ROOT_URL}/users/userId/${userId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(data)
    });
    const jsonData = await result.json();
    AsyncStorage.setItem('major', major);
    dispatch({type:ACCOUNT_MAJOR, payload: major});
};

export const handleMinor = (minor) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    const data = {
        minor: minor
    };
    const result = await fetch(`${ROOT_URL}/users/userId/${userId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(data)
    });
    const jsonData = await result.json();
    AsyncStorage.setItem('minor', minor);
    dispatch({type:ACCOUNT_MINOR, payload: minor});
};
export const handleDoubleMajor = (major) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    const data = {
        doubleMajor: major
    };
    const result = await fetch(`${ROOT_URL}/users/userId/${userId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(data)
    });
    const jsonData = await result.json();
    AsyncStorage.setItem('doubleMajor', major);
    dispatch({type:ACCOUNT_DOUBLE_MAJOR, payload: major});
};
export const handleConnectedMajor = (major) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    const data = {
        connectedMajor: major
    };
    const result = await fetch(`${ROOT_URL}/users/userId/${userId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(data)
    });
    const jsonData = await result.json();
    AsyncStorage.setItem('connectedMajor', major);
    dispatch({type:ACCOUNT_CONNECTED_MAJOR, payload: major});
};
export const handleAdmissionYear = (year) => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');

    const data = {
        admissionYear: year
    };
    const result = await fetch(`${ROOT_URL}/users/userId/${userId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(data)
    });
    const jsonData = await result.json();
    AsyncStorage.setItem('admissionYear', year);
    dispatch({type:ACCOUNT_ADMISSION_YEAR, payload: year});
};

export const handleMajorModal = (modal) => dispatch => {
  dispatch({type:ACCOUNT_MAJOR_MODAL, payload:modal});
};

export const handleMinorModal = (modal) => dispatch => {
    dispatch({type:ACCOUNT_MINOR_MODAL, payload:modal});
};

export const handleDoubleMajorModal = (modal) => dispatch => {
    dispatch({type:ACCOUNT_DOUBLE_MAJOR_MODAL, payload:modal});
};

export const handleConnectedMajorModal = (modal) => dispatch => {
    dispatch({type:ACCOUNT_CONNECTED_MAJOR_MODAL, payload:modal});
};

export const handleAdmissionYearModal = (modal) => dispatch => {
    dispatch({type:ACCOUNT_ADMISSION_YEAR_MODAL, payload:modal});
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
            addInfo: [],
            majorModal: false,
            minorModal: false,
            doubleMajorModal: false,
            connectedMajorModal: false,
            admissionYearModal: false,
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
    },
    [ACCOUNT_ADD_INFO]: (state, action) => {
        return {
            ...state,
            addInfo: action.payload,
        }
    },
    [ACCOUNT_MAJOR_MODAL]: (state, action) => {
        return {
            ...state,
            majorModal: action.payload,
        }
    },
    [ACCOUNT_MINOR_MODAL]: (state, action) => {
        return {
            ...state,
            minorModal: action.payload,
        }
    },
    [ACCOUNT_DOUBLE_MAJOR_MODAL]: (state, action) => {
        return {
            ...state,
            doubleMajorModal: action.payload,
        }
    },
    [ACCOUNT_CONNECTED_MAJOR_MODAL]: (state, action) => {
        return {
            ...state,
            connectedMajorModal: action.payload,
        }
    },
    [ACCOUNT_ADMISSION_YEAR_MODAL]: (state, action) => {
        return {
            ...state,
            admissionYearModal: action.payload,
        }
    }
}, initialState)
