import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    currentPassLabel: {
        alignItems:'center',
        marginTop: 70,
        marginBottom: 17,
    },
    button: {
        width: 193,
        height: 46,
        marginTop: 39,
        borderRadius: 29,
        backgroundColor: '#7c828c',
    },
    disableButton: {
        width: 193,
        height: 46,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 39,
        borderRadius: 29,
        backgroundColor: '#4a4a4a30',
    },
    buttonText:{
        color:'white',
        fontSize: 16,
    }
});