import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from "./MyInfoStyles";
import {InfoListItem} from "./ui/InfoListItem";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as myinfo from "../../../modules/myinfo";
import {TitleView} from "../../ui/TitleView";
import config from '../../../../config';

class MyInfoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: [
                {title: '계정정보', handle: this.navigationAccountScreen},
                {title: '로그아웃', handle: this.handleLogout},
                {title: '회원탈퇴', handle: this.handleLeave},
                {title: '한성인 인증', handle: this.navigationMainAuthScreen},
            ],
            appInfo: [
                {title: '개인정보처리방침', handle:()=>this.navigationTermScreen('개인정보처리방침', this.props.term2)},
                {title: '이용약관', handle:()=>this.navigationTermScreen('이용약관', this.props.term1)},
                {title: '앱 버전', right:`${config.appVersion}(${config.appVersionDate})`}
            ],
            contact: [
                {title: '팀 정보'},
                {title: '공지사항'},
                {title: '문의'}
            ]
        }
    }

    componentDidMount(){
        const {MyInfo} = this.props;
        MyInfo.setProfile();
    }

    navigationAccountScreen = () => {
        this.props.navigation.navigate('account');
    };

    navigationMainAuthScreen = () => {
        if(this.props.isValidation == 0)
            this.props.navigation.navigate('mail');
        else
            return Alert.alert(
                '경고',
                '이미 메일을 인증하셨습니다.',
                [
                    {text:'확인'}
                ],
                {cancelable: false}
            )
    };



    navigationLeaveScreen = () => {
        this.props.navigation.navigate('leave');
    };

    navigationTermScreen = (title, content) => {
        this.props.navigation.navigate('terms',{title:title, content:content});
    };

    renderAccount = () => {
        return (
            <View style={styles.infoContainer}>
                {this.state.account.map((data, i) => {
                    return (
                        <View key={i}>
                            <InfoListItem title={data.title} handle={data.handle} right={data.right}/>
                            {i < this.state.account.length - 1 ?
                                <View style={styles.infoContentLine}/> : null}
                        </View>)
                })}
            </View>
        )
    };

    renderAppInfo = () => {
        return (
            <View style={styles.infoContainer}>
                {this.state.appInfo.map((data, i) => {
                    return (
                        <View key={i}>
                            <InfoListItem title={data.title} handle={data.handle} right={data.right}/>
                            {i < this.state.appInfo.length - 1 ?
                                <View style={styles.infoContentLine}/> : null}
                        </View>)
                })}
            </View>
        )
    };
    renderContact = () => {
        return (
            <View style={styles.infoContainer}>
                {this.state.contact.map((data, i) => {
                    return (
                        <View key={i}>
                            <InfoListItem title={data.title} handle={data.handle} right={data.right}/>
                            {i < this.state.appInfo.length - 1 ?
                                <View style={styles.infoContentLine}/> : null}
                        </View>)
                })}
            </View>
        )
    };

    handleLeave = () => {
      return Alert.alert(
          '탈퇴 확인',
          '탈퇴 시 모든 정보가 즉시 삭제되며 복구할 수 없습니다. 모든 정보 삭제에 동의하시면 탈퇴를 진행하세요.',
          [
              {text: '취소'},
              {text: '계속하기', onPress:this.navigationLeaveScreen}
          ],
          {cancelable: false}
      )
    };

    handleLogout = () => {
        return Alert.alert(
            '로그아웃 확인',
            '로그아웃하시겠습니까?',
            [
                {text: '취소'},
                {text: '확인', onPress: this.deleteItem},
            ],
            {cancelable: false}
        )

    };

    deleteItem = async () => {
        await AsyncStorage.removeItem('token');
        this.props.navigation.navigate('SignIn');
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'마이페이지'}/>
                <View style={styles.profile}>
                    <Icon type='ionicon' name='ios-contact' size={60}/>
                    <Text style={styles.profileNickName}>{this.props.userId}</Text>
                    <Text style={styles.profileId}>{this.props.userNickName}</Text>
                </View>
                <ScrollView style={styles.container}>

                    <View style={styles.contentContainer}>
                        <View style={styles.subject}><Text style={styles.baseText}> Account </Text></View>
                        {this.renderAccount()}
                        <View style={styles.subject}><Text> Settings </Text></View>
                        {this.renderAppInfo()}
                        <View style={styles.subject}><Text> Contact us </Text></View>
                        {this.renderContact()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect((state) => ({
    term1: state.signin.term1,
    term2: state.signin.term2,
    userId: state.myinfo.userId,
    userNickName: state.myinfo.userNickName,
    isValidation: state.myinfo.isValidation
    }),
    (dispatch) => ({
        MyInfo: bindActionCreators(myinfo, dispatch)
    })
)(MyInfoScreen);