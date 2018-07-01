import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        height: 150,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        // borderTopWidth: 2,
        // borderBottomWidth: 2,
        // borderTopColor: '#dddce0',
        // borderBottomColor: '#dddce0',
    },
    profileId: {
        margin: 2,
        color: '#8f96a0',
        fontSize: 10
    },
    profileNickName: {
        margin: 2,
        color: '#8f96a0',
        fontSize: 15
    },
    subject: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    baseText: {
        fontFamily: 'AppleSDGothicNeo'
    },
    contentContainer: {
        flex: 1,
        padding: 14,
    },
    infoContainer: {
        backgroundColor: 'white',
        marginBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopColor: '#dddce0',
        borderBottomColor: '#dddce0',
        borderRightColor: '#dddce0',
        borderLeftColor: '#dddce0',
        borderRadius: 3,
    },
    infoContentLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgb(216,216,216)'
    }
});