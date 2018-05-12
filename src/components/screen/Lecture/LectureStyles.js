import {StatusBar, StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    statusBar: {
        backgroundColor: '#8f96a0',
        height: StatusBar.currentHeight
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
    searchContainer: {
        padding:10,
        height: 160,
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
        backgroundColor: '#f5f5f5',
        padding: 10,
    },

});