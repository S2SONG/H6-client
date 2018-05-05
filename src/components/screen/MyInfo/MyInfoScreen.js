import React from 'react';
import { View, Text, ScrollView, AsyncStorage } from 'react-native';
import styles from "./MyInfoStyles";
import {InfoListItem} from "../../ui/InfoListItem";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import myinfo from "../../../modules/myinfo";

class MyInfoScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            account:[
                {title:'메일 인증'},
                {title:'닉네임 변경'},
                {title:'회원 탈퇴'},
                {title:'로그아웃', handle:this.handleLogout}
            ],
            appInfo:[
                {title:'앱 버전'},
                {title:'문의하기'},
                {title:'공지사항'},
                {title:'커뮤니티 이용규칙'},
                {title:'개인정보 처리방침'},
                {title:'오픈소스 라이센스'},
                {title:'폰트 라이센스'},
            ]
        }
    }
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerLeft: (
                <View></View>
            ),
            title:'내정보'
        };
    };

    renderAccount = () => {
        return(
            this.state.account.map((data, i)=>{
                return(<InfoListItem key={i} title={data.title} handle={data.handle}/>)
            })
        )
    };

    renderAppInfo = () => {
      return(
          this.state.appInfo.map((data, i) => {
              return(<InfoListItem key={i} title={data.title}/>)
          })
      )
    };

    handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        this.props.navigation.navigate('SignIn');
    };
    render(){
        return(
            <ScrollView style = {styles.container}>
                <View style={styles.profile}>
                </View>
                <View style={styles.subject}><Text> 계정 </Text></View>
                {this.renderAccount()}
                <View style={styles.subject}><Text> 앱 정보 </Text></View>
                {this.renderAppInfo()}
            </ScrollView>
        )
    }
}

export default connect((state) => ({
    }),
    (dispatch) => ({
        MyInfo: bindActionCreators(myinfo, dispatch)
    })
)(MyInfoScreen);