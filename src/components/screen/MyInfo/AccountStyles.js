import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
    },
    profileContainer: {
        height: 288,
        backgroundColor: 'white',
        paddingLeft: 23,
        paddingRight: 22,
    },
    profile: {
        height: 153,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    infoContentLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#d8d8d8'
    },
    addInfoTitle: {
        height: 27,
        paddingLeft: 23,
        justifyContent: 'center'
    },
    addInfoContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 23,
        paddingRight: 22,
        paddingTop: 15,
    }
});