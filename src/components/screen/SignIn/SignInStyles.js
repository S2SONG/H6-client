import {StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
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
    },
    findPwdModalText: {
        fontSize: '1rem',
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: '0.43rem',
        marginBottom: '1.2rem',
    },
    findPwdModalTextInput: {
        flexDirection: 'row',
        width: '89%',
        aspectRatio:250/44,
        backgroundColor: 'white',
        paddingLeft: '1.6rem',
        borderColor:'#979797',
        borderWidth:1,
        alignSelf: 'center',
    },
    findPwdModalTextInputText:{
        flex: 1,
        fontSize: '1rem',
    },
    findPwdModalTextInputLabel: {
        width: '100%',
        marginTop: '0.36rem',
        marginBottom: '1.286rem',
        textAlign: 'center',
        color: 'rgb(208,2,27)',
        fontSize: '0.85rem',
    },
    findPwdModalTextInputLabelTrue: {
        width: '100%',
        marginTop: '0.36rem',
        marginBottom: '1.286rem',
        textAlign: 'center',
        color: '#4085d5',
        fontSize: '0.85rem',
    },
    findPwdModalResultText: {
        width:'100%',
        alignSelf:'center',
        textAlign: 'center',
        marginTop: '2.86rem',
        marginBottom:'2.76rem',
        fontSize: '1rem',
    },
});