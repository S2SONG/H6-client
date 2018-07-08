import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    contentContainer: {
        flexGrow: 1,

    },
    mainContainer: {
        height: 403,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    topicText: {
        fontSize: 20,
        marginTop:47,
        marginBottom: 16,
    },
    timeText: {
        fontSize: 11,
        marginBottom: 51,
    },
    bodyContainer:{
        flexDirection:'row',
        height:140,
    },
    warnText: {
        fontSize: 11,
        marginBottom: 15,
        color: 'rgba(0,0,0,0.3)'
    },
    selectView:{
        width: 113,
        height: 35,
        marginTop:22,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#4a4a4a30',
        borderRadius: 17.5,
    },
    selectButton:{
        width: 113,
        height: 35,
        marginTop:22,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#4a4a4a',
        borderRadius: 17.5,
    },
    selectButtonText:{
        fontSize:14,
        color:'#ffffff'
    }

});