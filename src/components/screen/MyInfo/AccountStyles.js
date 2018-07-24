import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    contentContainer: {
        flexGrow: 1,
    },
    profileContainer: {
        height: 288,
        backgroundColor: 'white',
    },
    profile: {
        height: 247,
        paddingTop: 18,
        paddingBottom: 21,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#f5f5f5',
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
        height:220,
        backgroundColor: '#f5f5f5',
        paddingLeft: 23,
        paddingRight: 22,
        paddingTop: 8,
        paddingBottom: 8,
    }
});