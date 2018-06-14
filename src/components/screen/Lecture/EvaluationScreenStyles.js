import {StatusBar, StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    statusBar: {
        backgroundColor: '#8f96a0',
        height: StatusBar.currentHeight
    },
    titleBar: {
        //justifyContent: 'space-between',
        flexDirection: 'row',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    renderHeader: {
        height: 50,
        width:'100%',
        backgroundColor: '#8f96a0',
        //alignItems: 'center',
        justifyContent: 'flex-start',
    },
    arrow:{
        backgroundColor: 'transparent',
        paddingLeft: 13,
        paddingBottom: 14,
        paddingTop:10,
        alignSelf:'flex-start',
    },
    title:{
        backgroundColor:'transparent',
        alignSelf: 'center',
        paddingLeft:117,
    },
    titleText:{
        fontSize: 18,
        color: 'white',
    },

    item:{
        fontSize: 13,
        margin : 10,
        paddingTop:19,
    },
    homework:{
        height:25,
        width:20,
        backgroundColor:'rgb(216,216,216)',
    },
    textBox:{
        height: 82,
        width: 325,
        backgroundColor:'white',
        alignSelf:'flex-start',
        borderColor:'rgb(216,216,216)',
        borderRadius:3,
        borderWidth: 1,
        padding: 3,
    }

});