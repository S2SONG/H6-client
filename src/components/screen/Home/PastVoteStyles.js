import {Dimensions, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    contentContainer: {
        flexGrow: 1,

    },
    mainContainer: {
        width:'100%',
        aspectRatio: 357/403,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    topicText: {
        fontSize: '1.43rem',
        marginTop: '3.357rem',
        marginBottom: '1.143rem',
    },
    timeText: {
        fontSize: '0.7857rem',
        marginBottom: '3.643rem',
    },
    bodyContainer:{
        flexDirection:'row',
        height:'10rem',
    },
    warnText: {
        fontSize: '0.7857rem',
        marginBottom: '1.07143rem',
        color: 'rgba(0,0,0,0.3)'
    },
    selectView:{
        width: '8.07rem',
        height: '2.5rem',
        marginTop:'1.571rem',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#4a4a4a30',
        borderRadius: 17.5,
    },
    selectButton:{
        width: '8.07rem',
        height: '2.5rem',
        marginTop:'1.571rem',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#4a4a4a',
        borderRadius: 17.5,
    },
    selectButtonText:{
        fontSize:'1rem',
        color:'#ffffff'
    },
    selectButtonSpace: {
        // width:'4.357rem',
        width: Dimensions.get('window').width*0.1627,
        // width: 61,
        // height: 111
    }
});