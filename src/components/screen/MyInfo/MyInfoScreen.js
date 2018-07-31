import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, Alert, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from "./MyInfoStyles";
import {InfoListItem} from "./ui/InfoListItem";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as myinfo from "../../../modules/myinfo";
import config from '../../../../config';
import {TitleView} from "../../ui/TitleView";
import {util} from '../../../utils/util';
import {CustomModal} from "../../ui/CustomModal";

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
                {title: '개인정보처리방침', handle: () => this.navigationTermScreen('개인정보처리방침', this.props.term2)},
                {title: '이용약관', handle: () => this.navigationTermScreen('이용약관', this.props.term1)},
                {
                    title: '앱 버전',
                    right: `${Platform.OS === 'ios' ? this.props.appVersion.ios : this.props.appVersion.android}(${util.timeToFormat(this.props.appVersion.createdAt, 'YYYYMMDD')})`
                }
            ],
            contact: [
                {title: '팀 정보'},
                {title: '공지사항'},
                {title: '문의'}
            ]
        }
    }

    async componentDidMount() {
        const {MyInfo} = this.props;
        await MyInfo.initState();
        MyInfo.setProfile();
    }

    navigationAccountScreen = () => {
        this.props.navigation.navigate('account');
    };

    navigationMainAuthScreen = () => {
        if (this.props.isValidation == 0)
            this.props.navigation.navigate('mail');
        else
            return Alert.alert(
                '경고',
                '이미 메일을 인증하셨습니다.',
                [
                    {text: '확인'}
                ],
                {cancelable: false}
            )
    };


    navigationLeaveScreen = () => {
        this.handleUserOutModal(false);
        this.props.navigation.navigate('leave');
    };

    navigationTermScreen = (title, content) => {
        this.props.navigation.navigate('terms', {title: title, content: content});
    };

    renderAccount = () => {
        return (
            <View style={styles.infoContainer}>
                {this.state.account.map((data, i) => {
                    return (
                        <View key={i}>
                            <InfoListItem title={data.title} handle={data.handle} right={data.right}/>
                            <View style={styles.infoContentLine}/>
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
                            <View style={styles.infoContentLine}/>
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
                            <View style={styles.infoContentLine}/>
                        </View>)
                })}
            </View>
        )
    };

    handleLeave = () => {
        this.handleUserOutModal(true);
    };

    handleLogout = () => {
        this.handleLogoutModal(true);
    };

    deleteItem = async () => {
        await AsyncStorage.removeItem('token');
        await this.handleLogoutModal(false);
        this.props.navigation.navigate('SignIn');
    };

    handleLogoutModal = (modal) => {
        const {MyInfo} = this.props;
        MyInfo.handleLogoutModal(modal);
    };

    handleUserOutModal = (modal) => {
        const {MyInfo} = this.props;
        MyInfo.handleUserOutModal(modal);
    };

    renderLogoutModal = () => {
        return (
            <View style={styles.userOutModalBody}>
                <View style={styles.userOutModalBody}></View>
                <Text style={styles.logoutModalText}>로그아웃하시겠습니까?</Text>
                <View style={styles.userOutModalBody}></View>
            </View>
        )
    };

    renderUserOutModal = () => {
        return (
            <View style={styles.userOutModalBody}>
                <View style={styles.userOutModalBody}></View>
                <View style={styles.userOutModalBody}>
                    <Text style={styles.userOutModalText}>탈퇴 시 모든 정보가 즉시 삭제되며 복구할 수 없습니다.</Text>
                    <Text style={styles.userOutModalText}>모든 정보 삭제에 동의하시면 탈퇴를 진행하세요.</Text>
                </View>
                <View style={styles.userOutModalBody}></View>
            </View>
        )
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CustomModal width={280} height={156} visible={this.props.logoutModal}
                             close={() => this.handleLogoutModal(false)}
                             footer={true} footerText={'확인'} body={this.renderLogoutModal}
                             footerHandle={this.deleteItem} ratio={'75%'}/>
                <CustomModal width={315} height={168} padding={7} visible={this.props.userOutModal}
                             close={() => this.handleUserOutModal(false)}
                             footer={true} footerHandle={this.navigationLeaveScreen} body={this.renderUserOutModal}
                             footerText={'계속하기'} ratio={'84%'}/>
                <TitleView title={'마이페이지'}/>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.profile}>
                        <Icon type='ionicon' name='ios-contact' size={60}/>
                        <View style={{marginLeft: 20,}}>
                            <Text style={styles.profileNickName}>{this.props.userNickName}</Text>
                            <Text style={styles.profileId}>{this.props.userId}</Text>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.subject}><Text style={styles.baseText}>Account</Text></View>
                        {this.renderAccount()}
                        <View style={styles.subject}><Text>Settings</Text></View>
                        {this.renderAppInfo()}
                        <View style={styles.subject}><Text>Contact us</Text></View>
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
        appVersion: state.signin.appVersion,
        userId: state.myinfo.userId,
        userNickName: state.myinfo.userNickName,
        isValidation: state.myinfo.isValidation,
        logoutModal: state.myinfo.logoutModal,
        userOutModal: state.myinfo.userOutModal,
    }),
    (dispatch) => ({
        MyInfo: bindActionCreators(myinfo, dispatch)
    })
)(MyInfoScreen);