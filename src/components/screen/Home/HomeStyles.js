import {StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    contentContainer: {
        alignItems:'center',
    },
    homeVoteBottom: {
        height:'3.356rem'
    },
    pastVoteLine:{
        width:'89%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    pastVote:{
        width:'100%',
        alignItems:'center'
    },
    pastVoteSpace:{
        height: '0.86rem'
    },
    pastVoteText1:{
        alignSelf: 'flex-start',
        fontSize: '0.857rem'
    },
    pastVoteText2:{
        alignSelf: 'flex-end',
        fontSize: '0.857rem'
    }

});