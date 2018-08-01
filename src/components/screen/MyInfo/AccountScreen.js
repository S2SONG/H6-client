import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styles from "./AccountStyles";
import {InfoListItem} from "./ui/InfoListItem";
import {AccountListItem} from "./ui/AccountListItem";
import config from "../../../../config";
import * as account from "../../../modules/account";
import {MajorPickerModal} from "./ui/MajorPickerModal";

class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const {Account} = this.props;
        await Account.initState();
        await Account.getAddInfo();
        Account.getTrack();
        Account.getYear();
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    navigationPassword = () => {
        this.props.navigation.navigate('password');
    };

    handleMajor = (major) => {
        const {Account} = this.props;
        Account.handleMajor(major);
    };

    handleMinor = (minor) => {
        const {Account} = this.props;
        Account.handleMinor(minor);
    };
    handleDoubleMajor = (minor) => {
        const {Account} = this.props;
        Account.handleDoubleMajor(minor);
    };
    handleConnectedMajor = (minor) => {
        const {Account} = this.props;
        Account.handleConnectedMajor(minor);
    };
    handleAdmissionYear = (year) => {
        const {Account} = this.props;
        Account.handleAdmissionYear(year);
    };

    handleMajorModal = (modal) => {
        const {Account} = this.props;
        Account.handleMajorModal(modal);
    };
    handleMinorModal = (modal) => {
        const {Account} = this.props;
        Account.handleMinorModal(modal);
    };
    handleDoubleMajorModal = (modal) => {
        const {Account} = this.props;
        Account.handleDoubleMajorModal(modal);
    };
    handleConnectedMajorModal = (modal) => {
        const {Account} = this.props;
        Account.handleConnectedMajorModal(modal);
    };
    handleAdmissionYearModal = (modal) => {
        const {Account} = this.props;
        Account.handleAdmissionYearModal(modal);
    };

    renderAddInfo = () => {
        return (
            <View>
                <AccountListItem title={'전공'} handle={() => this.handleMajorModal(true)}
                                 right={this.props.major == null ? '없음' : this.props.major} rightTextColor={'black'}/>
                <View style={styles.infoContentLine}/>
                <AccountListItem title={'부전공'} handle={() => this.handleMinorModal(true)}
                                 right={this.props.minor == null ? '없음' : this.props.minor} rightTextColor={'black'}/>
                <View style={styles.infoContentLine}/>
                <AccountListItem title={'복수전공'} handle={() => this.handleDoubleMajorModal(true)}
                                 right={this.props.doubleMajor == null ? '없음' : this.props.doubleMajor} rightTextColor={'black'}/>
                <View style={styles.infoContentLine}/>
                <AccountListItem title={'연계전공'} handle={() => this.handleConnectedMajorModal(true)}
                                 right={this.props.connectedMajor == null ? '없음' : this.props.connectedMajor} rightTextColor={'black'}/>
                <View style={styles.infoContentLine}/>
                <AccountListItem title={'입학년도'} handle={() => this.handleAdmissionYearModal(true)}
                                 right={this.props.admissionYear == null ? '없음' : this.props.admissionYear} rightTextColor={'black'}/>
            </View>)
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MajorPickerModal visible={this.props.majorModal} closeModal={() => this.handleMajorModal(false)}
                                  data={this.props.trackList} value={this.props.major} handle={this.handleMajor}/>
                <MajorPickerModal visible={this.props.minorModal} closeModal={() => this.handleMinorModal(false)}
                                  data={this.props.trackList} value={this.props.minor} handle={this.handleMinor}/>
                <MajorPickerModal visible={this.props.doubleMajorModal}
                                  closeModal={() => this.handleDoubleMajorModal(false)} data={this.props.trackList}
                                  value={this.props.doubleMajor} handle={this.handleDoubleMajor}/>
                <MajorPickerModal visible={this.props.connectedMajorModal}
                                  closeModal={() => this.handleConnectedMajorModal(false)} data={this.props.trackList}
                                  value={this.props.connectedMajor} handle={this.handleConnectedMajor}/>
                <MajorPickerModal visible={this.props.admissionYearModal}
                                  closeModal={() => this.handleAdmissionYearModal(false)} data={this.props.yearList}
                                  value={this.props.admissionYear} handle={this.handleAdmissionYear}/>
                <TitleView title={'계정정보'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.profile}>
                        <Icon type='ionicon' name='ios-contact' size={85}/>
                        <AccountListItem title={'이메일'} right={this.props.userId}/>
                        <View style={styles.infoContentLine}/>
                        <AccountListItem title={'닉네임'} right={this.props.userNickName}/>
                        <View style={styles.infoContentLine}/>
                        <AccountListItem title={'비밀번호 변경'} handle={this.navigationPassword}/>
                    </View>
                    <View style={styles.containerSpace}/>
                    <View style={styles.addInfoContainer}>
                        {this.renderAddInfo()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
        userId: state.myinfo.userId,
        userNickName: state.myinfo.userNickName,
        major: state.account.major,
        minor: state.account.minor,
        doubleMajor: state.account.doubleMajor,
        connectedMajor: state.account.connectedMajor,
        admissionYear: state.account.admissionYear,
        trackList: state.account.trackList,
        yearList: state.account.yearList,
        addInfo: state.account.addInfo,
        majorModal: state.account.majorModal,
        minorModal: state.account.minorModal,
        doubleMajorModal: state.account.doubleMajorModal,
        connectedMajorModal: state.account.connectedMajorModal,
        admissionYearModal: state.account.admissionYearModal,
    }),
    (dispatch) => ({
        Account: bindActionCreators(account, dispatch)
    })
)(AccountScreen);