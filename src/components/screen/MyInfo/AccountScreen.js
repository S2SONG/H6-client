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
        this.state = {
            addInfo: [
                {title: '전공', handle:this.navigationBack, right:this.props.major, rightTextColor:'black'},
                {title: '부전공', handle:this.navigationBack, right:this.props.minor, rightTextColor:'black'},
                {title: '복수전공',handle:this.navigationBack, right:this.props.doubleMajor, rightTextColor:'black'},
                {title: '연계전공',handle:this.navigationBack, right:this.props.connectedMajor, rightTextColor:'black'},
                {title: '입학년도',handle:this.navigationBack, right:this.props.admissionYear, rightTextColor:'black'},
            ]
        }
    }

    async componentDidMount() {
        const {Account} = this.props;
        await Account.initState();
        await Account.getAddInfo();
        const addInfo =  [
            {title: '전공', handle:()=>this.handleMajorModal(true), right:this.props.major, rightTextColor:'black'},
            {title: '부전공', handle:()=>this.handleMinorModal(true), right:this.props.minor, rightTextColor:'black'},
            {title: '복수전공',handle:()=>this.handleDoubleMajorModal(true), right:this.props.doubleMajor, rightTextColor:'black'},
            {title: '연계전공',handle:()=>this.handleConnectedMajorModal(true), right:this.props.connectedMajor, rightTextColor:'black'},
            {title: '입학년도',handle:()=>this.handleAdmissionYearModal(true), right:this.props.admissionYear, rightTextColor:'black'},
        ];
        await Account.handleAddInfo(addInfo);
        Account.getTrack();
        Account.getYear();
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    navigationPassword = () => {
        this.props.navigation.navigate('password');
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
            this.props.addInfo.map((data, i) => {
            return (
                <View key={i}>
                    <AccountListItem title={data.title} handle={data.handle} right={data.right==null?'없음':data.right} rightTextColor={data.rightTextColor}/>
                    {i < this.state.addInfo.length - 1 ?
                        <View style={styles.infoContentLine}/> : null}
                </View>)
        }))
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MajorPickerModal visible={this.props.majorModal} closeModal={()=>this.handleMajorModal(false)}/>
                <MajorPickerModal visible={this.props.minorModal} closeModal={()=>this.handleMinorModal(false)}/>
                <MajorPickerModal visible={this.props.doubleMajorModal} closeModal={()=>this.handleDoubleMajorModal(false)}/>
                <MajorPickerModal visible={this.props.connectedMajorModal} closeModal={()=>this.handleConnectedMajorModal(false)}/>
                <MajorPickerModal visible={this.props.admissionYearModal} closeModal={()=>this.handleAdmissionYearModal(false)}/>
                <TitleView title={'계정정보'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.profileContainer}>
                        <View style={styles.profile}>
                            <Icon type='ionicon' name='ios-contact' size={85}/>
                        <AccountListItem title={'이메일'} right={this.props.userId}/>
                        <View style={styles.infoContentLine}/>
                        <AccountListItem title={'닉네임'} right={this.props.userNickName}/>
                        <View style={styles.infoContentLine}/>
                        <AccountListItem title={'비밀번호 변경'} handle={this.navigationPassword}/>
                        </View>
                    </View>
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