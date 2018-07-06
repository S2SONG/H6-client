import {StatusBar, StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
    },
    statusBar: {
        backgroundColor: '#8f96a0',
        height: StatusBar.currentHeight
    },
    header:{
        height:270,
        backgroundColor:'white',
        // justifyContent:'center',
        paddingLeft: 25,
    },
    headerTitle:{
        paddingTop: 80,
        fontSize: 18,
        fontWeight:'bold'
    },
    updateText:{
        fontSize:13,
        color:'black',
        opacity:0.3,
        paddingTop: 10,
    },
    searchContainer: {
        paddingTop: 30,
        width:'95%',
        height: 130,
        backgroundColor: 'white',
    },
    titleBar: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8f96a0',
    },
    titleBarText: {
        color: 'white',
        fontSize: 15
    },
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchBarInput: {
        paddingLeft: 20,
        backgroundColor: '#f6f7f9',
        height: 40,
        borderRadius: 25
    },
    searchBarContainer: {
        padding: 0,
        margin: 0,
        backgroundColor: 'white',
        borderWidth: 0,
        borderBottomColor: 'white',
        borderTopColor: 'white'
    },
    searchBarLabel: {
        paddingLeft:10,
        fontSize: 10,
        color: '#b9bdc3'
    },
    listContainer: {
        flex: 1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

});