import {StyleSheet} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    contentContainer: {
        flexGrow: 1,
    },
    profileContainer: {
        width:'100%',
        aspectRatio:375/247,
        backgroundColor: 'white',
    },
    profile: {
        width:'100%',
        aspectRatio:375/247,
        paddingTop: '1.2857rem',
        alignItems:'center',
        backgroundColor: '#f5f5f5',
    },
    containerSpace:{
      height:'1.5rem'
    },
    infoContentLine: {
        width: '87.2%',
        aspectRatio:327/1,
        backgroundColor: '#d8d8d8'
    },
    addInfoContainer: {
        width:'100%',
        aspectRatio:375/220,
        backgroundColor: '#f5f5f5',
        paddingTop: '0.57rem',
        paddingBottom: '0.57rem',
        alignItems:'center',
    }
});