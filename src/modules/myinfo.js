import {handleActions} from 'redux-actions';
import {AsyncStorage} from "react-native";
import config from "../../config";


const MY_INFO_PROFILE = 'MY_INFO_PROFILE';

const initialState = {
    userNickName: '',
    userId: ''
};


export const setProfile = () => async dispatch => {
    console.log('start');
    const userNickName = await AsyncStorage.getItem("userNickName");
    const userId = await AsyncStorage.getItem("userId");
    dispatch({type: MY_INFO_PROFILE, userNickName: userNickName, userId: userId});
};

export default handleActions({
    // ... state, sample : action.payload.date
    [MY_INFO_PROFILE]: (state, action) => {
        return {
            ...state,
            userNickName: action.userNickName,
            userId: action.userId,
        }
    },
}, initialState)