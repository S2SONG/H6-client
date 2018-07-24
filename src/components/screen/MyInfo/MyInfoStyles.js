import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    profile: {
        height: 83,
        marginBottom: 35,
        paddingLeft: 30,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: 'rgb(246, 246, 246)',
    },
    profileId: {
        color: '#8f96a0',
        fontSize: 12
    },
    profileNickName: {
        marginBottom: 6,
        color: 'black',
        fontSize: 14
    },
    subject: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft:13,
        justifyContent: 'center',
    },
    baseText: {
        // fontFamily: 'AppleSDGothicNeo'
    },
    contentContainer: {
        flex: 1,
        padding: 14,
    },
    infoContainer: {
        backgroundColor: 'white',
        marginBottom: 35,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    infoContentLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgb(216,216,216)'
    }
});