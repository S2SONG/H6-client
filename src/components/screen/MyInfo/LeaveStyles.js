import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flexGrow: 1,
        paddingTop: 191,
    },
    contentText: {
        marginBottom: 43,
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center',
    },
    contentButton: {
        width: 193,
        height: 46,
        alignSelf: 'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 70,
        backgroundColor: 'rgb(124,130,140)',
        borderRadius: 29
    },
    disableButton: {
        width: 193,
        height: 46,
        alignSelf: 'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 70,
        backgroundColor: '#304a4a4a',
        borderRadius: 29
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    }

});
