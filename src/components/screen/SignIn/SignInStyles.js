import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        backgroundColor:'#ffffff',

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
        width: 200,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#8f96a0'
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
        color: 'black',
    }
});