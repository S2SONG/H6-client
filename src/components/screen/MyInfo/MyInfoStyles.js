import {StyleSheet, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    profile: {
        width:'100%',
        aspectRatio:375/83,
        paddingLeft: '2.143rem',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: 'rgb(246, 246, 246)',
    },
    profileId: {
        color: '#8f96a0',
        fontSize: '0.857rem'
    },
    profileNickName: {
        marginBottom: '0.4286rem',
        color: 'black',
        fontSize: '1rem'
    },
    subject: {
        width:'87.2%',
        marginTop: '2.5rem',
        paddingLeft:'0.286rem',
        marginBottom: '0.57rem',
        // marginLeft:13,
        justifyContent: 'center',
    },
    baseText: {
        // fontFamily: 'AppleSDGothicNeo'
    },
    contentContainer: {
        flex: 1,
        alignItems:'center',
        // padding: '1rem',
    },
    infoContainer: {
        width:'100%',
        backgroundColor: 'white',
        alignItems:'center',
        // marginBottom: 35,
        // paddingLeft: 15,
        // paddingRight: 15,
        // paddingTop: 5,
        // paddingBottom: 5,
    },
    infoContentLine: {
        width: '87.2%',
        aspectRatio:327/1,
        // height: 1,
        backgroundColor: 'rgb(216,216,216)'
    },
    userOutModalBody:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    userOutModalText:{
        fontSize: '0.9rem'
    },
    logoutModalText:{
        fontSize: '1rem'
    }
});