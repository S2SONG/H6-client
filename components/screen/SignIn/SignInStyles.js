import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15
    },
    inputLayout: {
        marginBottom: 10,
    },
    input: {
        borderRadius: 4,
        height: 40,
        width: '100%',
    },
    button: {
        marginBottom: 10,
        width: '100%',
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    linkView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    link: {
        color: 'white',
    }
});