import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, Alert, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TitleView} from "../../ui/TitleView";
import * as leave from "../../../modules/leave";
import styles from "./LeaveStyles";
import {LeavePasswordInput} from "./ui/LeavePasswordInput";
import {CustomModal} from "../../ui/CustomModal";

class LeaveScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const {Leave} = this.props;
        await Leave.initState();
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    handlePassword = (password) => {
        const {Leave} = this.props;
        Leave.handlePassword(password);
    };

    handlePasswordModal = (modal) => {
        const {Leave} = this.props;
        Leave.handlePasswordModal(modal);
    };

    handleResultModal = (modal) => {
        const {Leave} = this.props;
        Leave.handleResultModal(modal);
    };

    handleResultFailModal = (modal) => {
        const {Leave} = this.props;
        Leave.handleResultFailModal(modal);
    };

    navigateSignIn = async () => {
        this.handleResultModal(false);
        this.props.navigation.navigate('SignIn');
    };

    handleLeaveUser = async () => {
      const {Leave} = this.props;
      const checkPwd = await Leave.checkPassword(this.props.password);
      if(!checkPwd){
          this.handlePasswordModal(true);
          return;
      }
      const result = await Leave.handleLeaveUser();
      if(result){
          this.handleResultModal(true);
      }else{
          this.handleResultFailModal(true);
      }
    };

    renderPasswordModalBody = () => {
        return(
            <View style={styles.resultModalBody}>
                <View style={{flex:37}}></View>
                <View style={{flex:38, alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.resultModalBodyText}>비밀번호가 틀렸습니다.</Text>
                </View>
                <View style={{flex:36}}></View>
            </View>
        )
    };

    renderResultModalBody = () => {
        return(
            <View style={styles.resultModalBody}>
                <View style={{flex:37}}></View>
                <View style={{flex:38, alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.resultModalBodyText}>한담을 이용해주셔서 감사합니다.</Text>
                    <Text style={styles.resultModalBodyText}>탈퇴 절차가 완료되었습니다.</Text>
                </View>
                <View style={{flex:36}}></View>
            </View>
        )
    };

    renderResultFailModalBody = () => {
        return(
            <View style={styles.resultModalBody}>
                <View style={{flex:37}}></View>
                <View style={{flex:38, alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.resultModalBodyText}>회원탈퇴에 실패하였습니다.</Text>
                    <Text style={styles.resultModalBodyText}>다시 시도해 주세요.</Text>
                </View>
                <View style={{flex:36}}></View>
            </View>
        )
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CustomModal width={280} height={156} visible={this.props.passwordModal}
                             footer={true} footerHandle={()=>this.handlePasswordModal(false)} body={this.renderPasswordModalBody}
                             footerText={'확인'} ratio={'75%'}/>
                <CustomModal width={280} height={172} visible={this.props.resultModal}
                             footer={true} footerHandle={this.navigateSignIn} body={this.renderResultModalBody}
                             footerText={'확인'} ratio={'75%'}/>
                <CustomModal width={280} height={172} visible={this.props.resultFailModal}
                             footer={true} footerHandle={()=>this.handleResultFailModal(false)} body={this.renderResultFailModalBody}
                             footerText={'확인'} ratio={'75%'}/>
                <TitleView title={'회원탈퇴'} rightIcon={'md-close'} rightIconHandler={this.navigationBack}/>
                <KeyboardAvoidingView style={{flex:1, }} behavior="padding"  enabled>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.contentText}>본인확인을 위해 비밀번호를 확인합니다.</Text>
                    <LeavePasswordInput handle={this.handlePassword} value={this.props.password}/>
                    <View style={styles.buttonSpace}/>
                    {this.props.password===''?
                    <View style={styles.disableButton}>
                        <Text style={styles.buttonText}>한담 탈퇴</Text>
                    </View>:
                    <TouchableOpacity onPress={this.handleLeaveUser}>
                        <View style={styles.contentButton}>
                            <Text style={styles.buttonText}>한담 탈퇴</Text>
                        </View>
                    </TouchableOpacity>}
                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

export default connect((state) => ({
        password: state.leave.password,
        passwordModal: state.leave.passwordModal,
        resultModal: state.leave.resultModal,
        resultFailModal: state.leave.resultFailModal,
    }),
    (dispatch) => ({
        Leave: bindActionCreators(leave, dispatch)
    })
)(LeaveScreen);