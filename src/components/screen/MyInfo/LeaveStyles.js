import {StyleSheet} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flexGrow: 1,
        // paddingTop: 191,
        alignItems:'center',
        justifyContent:'center',
    },
    contentText: {
        marginBottom: '2.357rem',
        fontSize: '1rem',
        alignSelf: 'center',
        textAlign: 'center',
    },
    buttonSpace:{
        height:'5rem'
    },
    contentButton: {
        width:'51.47%',
        aspectRatio:193/46,
        alignSelf: 'center',
        justifyContent:'center',
        alignItems:'center',
        // marginTop: '5rem',
        backgroundColor: '#4a4a4a',
        borderRadius: '1.643rem'
    },
    disableButton: {
        width:'51.47%',
        aspectRatio:193/46,
        alignSelf: 'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#4a4a4a4d',
        borderRadius: '1.643rem'
    },
    buttonText: {
        fontSize: '1.143rem',
        color: 'white'
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
