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
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'transparent',
    },
    renderHeader: {
        height: 150,
        backgroundColor: '#8f96a0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    renderHeaderTitle: {
        color: 'white',
        fontSize: 20,
        margin: 20
    },
});