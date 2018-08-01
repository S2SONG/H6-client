import {StyleSheet} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:'3.57rem'
    },
    currentPassLabel: {
        alignItems:'center',
        // marginTop: '3.42857rem',
    },
    currentPassLabelSpace:{
        height:'0.9286rem',
    },
    currentChangeSpace:{
        height:'4.7143rem'
    },
    changePassSpace:{
        height:'1.857rem'
    },
    buttonSpace:{
        height:'5.286rem',
    },
    button: {
        width:'51.47%',
        aspectRatio:193/46,
        borderRadius: '2.07rem',
        backgroundColor: '#7c828c',
        justifyContent:'center',
        alignItems:'center',
    },
    disableButton: {
        width:'51.47%',
        aspectRatio:193/46,
        borderRadius: '2.07rem',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#4a4a4a4d',
    },
    buttonText:{
        color:'white',
        fontSize: '1.143rem',
    },
    resultModalBody:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    resultModalBodyText:{
        fontSize:'1rem'
    }
});