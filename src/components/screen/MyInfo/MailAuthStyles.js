import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent:'center',
        // paddingTop: 157,
        backgroundColor: 'white'
    },
    contentText: {
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center'
    },
    contentButton: {
        width: 223,
        height: 46,
        alignSelf: 'center',
        marginTop: 70,
        backgroundColor: 'rgb(124,130,140)',
        borderRadius: 29
    },
    disableButton: {
        width: 223,
        height: 46,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
        backgroundColor: '#4a4a4a30',
        borderRadius: 29
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }

});