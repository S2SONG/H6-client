import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 10
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
        marginTop: 40,
        marginBottom: 10,
        width: 289,
        height: 53,
        borderRadius: 26.5,
        borderWidth: 1,
        borderColor: '#4a4a4a',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },
    linkView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 18,
        paddingRight: 18,
        paddingBottom: 14
    },
    link: {
        color: 'black',
    }
});