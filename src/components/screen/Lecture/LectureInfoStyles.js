import {StyleSheet, StatusBar} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    statusBar: {
        backgroundColor: '#8f96a0',
        height: StatusBar.currentHeight
    },
    arrow: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: 150,
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: 'transparent',
    },
    renderHeader: {
        height: 150,
        backgroundColor: '#7c828c',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',

    },
    title:{
        flexDirection: 'column',
        justifyContent: 'center',
        height: 150,
        paddingTop: 10,
        paddingLeft: 50,
        paddingBottom: 20,
        backgroundColor: 'transparent',
    },
    renderHeaderTitle: {
        color: 'white',
        fontSize: 20,
        margin: 20,
        textAlign:'center'
    },
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        width:60,
        height:60,
        backgroundColor: 'gray',
        borderRadius:100,
        alignSelf:'flex-end'
    }
});