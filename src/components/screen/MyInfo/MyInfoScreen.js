import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from "./MyInfoStyles";
import {InfoListItem} from "./ui/InfoListItem";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import myinfo from "../../../modules/myinfo";
import {TitleView} from "../../ui/TitleView";
import config from '../../../../config';

class MyInfoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: [
                {title: '계정정보'},
                {title: '로그아웃', handle: this.handleLogout},
                {title: '회원탈퇴', handle: this.navigationLeaveScreen},
                {title: '한성인 인증', handle: this.navigationMainAuthScreen},
            ],
            appInfo: [
                {title: '이용약관', handle:()=>this.navigationTermScreen('이용약관', this.props.term1)},
                {title: '개인정보처리방침', handle:()=>this.navigationTermScreen('개인정보처리방침', this.props.term2)},
                {title: '앱 버전', right:`${config.appVersion}(${config.appVersionDate})`}
            ]
        }
    }

    navigationMainAuthScreen = () => {
        this.props.navigation.navigate('mail');
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

    handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        this.props.navigation.navigate('SignIn');
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'마이페이지'}/>
                <ScrollView style={styles.container}>
                    <View style={styles.profile}>
                        <Icon type='ionicon' name='ios-contact' size={60}/>
                        <Text style={styles.profileNickName}>so02</Text>
                        <Text style={styles.profileId}>so0j914_@gmail.com</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.subject}><Text> Account </Text></View>
                        {this.renderAccount()}
                        <View style={styles.subject}><Text> Settings </Text></View>
                        {this.renderAppInfo()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect((state) => ({
    term1: state.signin.term1,
    term2: state.signin.term2
    }),
    (dispatch) => ({
        MyInfo: bindActionCreators(myinfo, dispatch)
    })
)(MyInfoScreen);