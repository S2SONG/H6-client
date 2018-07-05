import {StyleSheet, StatusBar} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    statusBar: {
        backgroundColor: 'transparent',
        height: StatusBar.currentHeight
    },
    renderHeader: {
        height: 200,
        backgroundColor: 'white',
        //justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    arrow: {
        flexDirection: 'row',
        //justifyContent: 'flex-start',
        height: 50,
        width:70,
        paddingTop: 25,
        paddingLeft: 20,
        backgroundColor: 'white',
    },
    title:{
        flexDirection: 'row',
        //justifyContent: 'flex-start',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 20,
        backgroundColor: 'transparent',
        alignItems:'flex-start'
    },
    renderHeaderTitle: {
        color: 'black',
        fontSize: 17,
        fontWeight:'800',
        margin: 10,
        textAlign:'left'
    },
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        width:56,
        height:56,
        backgroundColor: '#d8d8d8',
        borderRadius:100,
        alignSelf:'flex-end'
    }
});