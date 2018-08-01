import React from 'react';
import {View, Text, ScrollView, SafeAreaView, Alert, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styles from "./PasswordStyles";
import * as password from "../../../modules/password";
import {validation} from "../../../utils/validations";
import {PasswordInput} from "./ui/PasswordInput";
import {CustomModal} from "../../ui/CustomModal";

class PasswordScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          keyboardSpace: 0,
        };
    }

    componentWillUnmount () {
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
    }

    componentDidMount() {
        this.props.Password.initState();
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (frames) => {
        //     if (!frames.endCoordinates) return;
        //     this.setState({keyboardSpace: frames.endCoordinates.height});
        // });
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (frames) => {
        //     this.setState({keyboardSpace: 0})
        // });
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    passwordChange = async () => {
        const {Password} = this.props;
        // if (this.props.currentPassword.length == 0) {
        //     return Alert.alert(
        //         '경고',
        //         '현재 비밀번호를 입력해주세요.',
        //         [
        //             {text: '확인'},
        //         ],
        //         {cancelable: false}
        //     )
        // }
        //
        //
        // if (this.props.newPasswordCheckNo != 2 || this.props.reNewPasswordCheckNo != 2) {
        //     return Alert.alert(
        //         '경고',
        //         '새로운 비밀번호를 확인해 주세요.',
        //         [
        //             {text: '확인'},
        //         ],
        //         {cancelable: false}
        //     )
        // }
        if (this.props.currentPassword === this.props.newPassword) {
            // return Alert.alert(
            //     '경고',
            //     '현재 비밀번호와 새로운 비밀번호가 동일합니다.',
            //     [
            //         {text: '확인'},
            //     ],
            //     {cancelable: false}
            // )
            this.handleCurrentChangeModal(true);
            return;
        }
        const returnValue = await Password.passwordChange(this.props.currentPassword, this.props.newPassword);
        if (returnValue) {
            // return Alert.alert(
            //     '',
            //     '비밀번호가 수정되었습니다.',
            //     [
            //         {text: '확인', onPress: () => this.navigationBack()},
            //     ],
            //     {cancelable: false}
            // )
            this.handleSuccessModal(true);
            return;
        } else {
            // return Alert.alert(
            //     '경고',
            //     '현재 비밀번호가 일치하지 않습니다.',
            //     [
            //         {text: '확인'},
            //     ],
            //     {cancelable: false}
            // )
            this.handleCurrentFailModal(true);
            return;
        }
    };

    onChangeCurrentPassword = (e) => {
        const {Password} = this.props;
        Password.onChangeCurrentPassword(e);
    };
    onChangeNewPassword = (e) => {
        const {Password} = this.props;
        if (this.props.reNewPassword.length != 0) {
            if (e === this.props.reNewPassword) {
                Password.onChangeReNewPasswordCheckNo(2);
                Password.onChangeReNewPasswordCheckLabel('비밀번호가 일치합니다.');
            } else {
                Password.onChangeReNewPasswordCheckNo(1);
                Password.onChangeReNewPasswordCheckLabel('비밀번호가 일치하지 않습니다.');
            }
        }

        if (validation.checkPassLength(e)) {
            if (e.length == 0) {
                Password.onChangeNewPasswordCheckNo(0);
                Password.onChangeNewPasswordCheckLabel('');
            } else {
                Password.onChangeNewPasswordCheckNo(2);
                Password.onChangeNewPasswordCheckLabel('비밀번호 조건에 만족합니다.');
            }
        } else {
            Password.onChangeNewPasswordCheckNo(1);
            Password.onChangeNewPasswordCheckLabel('7자이상 16자이하 영문,숫자,특수문자를 포함해야합니다.');
        }


        Password.onChangeNewPassword(e);
    };
    onChangeReNewPassword = (e) => {
        const {Password} = this.props;

        if (e.length == 0) {
            Password.onChangeReNewPasswordCheckNo(0);
            Password.onChangeReNewPasswordCheckLabel('');
        } else {
            if (this.props.newPassword === e) {
                Password.onChangeReNewPasswordCheckNo(2);
                Password.onChangeReNewPasswordCheckLabel('비밀번호가 일치합니다.');
            } else {
                Password.onChangeReNewPasswordCheckNo(1);
                Password.onChangeReNewPasswordCheckLabel('비밀번호가 일치하지 않습니다.');
            }
        }
        Password.onChangeReNewPassword(e);

    };

    handleCurrentChangeModal = (modal) => {
        const {Password} = this.props;
        Password.handleCurrentChangeModal(modal);
    };

    handleCurrentFailModal = (modal) => {
        const {Password} = this.props;
        Password.handleCurrentFailModal(modal);
    };

    handleSuccessModal = (modal) => {
        const {Password} = this.props;
        Password.handleSuccessModal(modal);
        if(!modal) this.navigationBack();
    };

    renderCurrentChangeModalBody = () => {
        return(
            <View style={styles.resultModalBody}>
                <View style={{flex:37}}></View>
                <View style={{flex:38, alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.resultModalBodyText}>현재 비밀번호와 새로운 비밀번호가 동일합니다.</Text>
                </View>
                <View style={{flex:36}}></View>
            </View>
        )
    };
    renderCurrentFailModalBody = () => {
        return(
            <View style={styles.resultModalBody}>
                <View style={{flex:37}}></View>
                <View style={{flex:38, alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.resultModalBodyText}>현재 비밀번호가 일치하지 않습니다.</Text>
                </View>
                <View style={{flex:36}}></View>
            </View>
        )
    };
    renderSuccessModalBody = () => {
        return(
            <View style={styles.resultModalBody}>
                <View style={{flex:37}}></View>
                <View style={{flex:38, alignItems:'center', justifyContent:'center'}}>
                    <Text style={styles.resultModalBodyText}>비밀번호가 수정되었습니다.</Text>
                </View>
                <View style={{flex:36}}></View>
            </View>
        )
    };

    renderButton = () => {
        if(this.props.currentPassword.length == 0 || this.props.newPasswordCheckNo != 2 || this.props.reNewPasswordCheckNo != 2){
            return(
                <View style={styles.disableButton}>
                    <Text style={styles.buttonText}>저장하기</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity style={styles.button} onPress={this.passwordChange}>
                    <Text style={styles.buttonText}>저장하기</Text>
                </TouchableOpacity>
            );
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CustomModal visible={this.props.currentChangeModal} width={280} height={156} ratio={'75%'}
                             footer={true} footerText={'확인'} footerHandle={()=>this.handleCurrentChangeModal(false)} body={this.renderCurrentChangeModalBody}/>
                <CustomModal visible={this.props.currentFailModal} width={280} height={156} ratio={'75%'}
                             footer={true} footerText={'확인'} footerHandle={()=>this.handleCurrentFailModal(false)} body={this.renderCurrentFailModalBody}/>
                <CustomModal visible={this.props.successModal} width={280} height={156} ratio={'75%'}
                             footer={true} footerText={'확인'} footerHandle={()=>this.handleSuccessModal(false)} body={this.renderSuccessModalBody}/>
                <TitleView title={'비밀번호 변경'} rightIcon={'md-close'} rightIconHandler={this.navigationBack}/>
                <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.currentPassLabel}>
                        <Text>소중한 정보 보호를 위해</Text>
                        <Text>현재 비밀번호를 확인해 주세요.</Text>
                    </View>
                    <View style={styles.currentPassLabelSpace}/>
                    <PasswordInput
                        secureText={true}
                        value={this.props.currentPassword}
                        handle={this.onChangeCurrentPassword}/>
                    <View style={styles.currentChangeSpace}/>
                    <PasswordInput
                        label={'새로운 비밀번호'}
                        secureText={true}
                        value={this.props.newPassword}
                        handle={this.onChangeNewPassword}
                        checkNo={this.props.newPasswordCheckNo}
                        checkLabel={this.props.newPasswordCheckLabel}/>
                    <View style={styles.changePassSpace}/>
                    <PasswordInput
                        label={'새로운 비밀번호 확인'}
                        secureText={true}
                        value={this.props.reNewPassword}
                        handle={this.onChangeReNewPassword}
                        checkNo={this.props.reNewPasswordCheckNo}
                        checkLabel={this.props.reNewPasswordCheckLabel}/>
                    <View style={styles.buttonSpace}/>
                    {this.renderButton()}
                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
        currentPassword: state.password.currentPassword,
        newPassword: state.password.newPassword,
        reNewPassword: state.password.reNewPassword,
        newPasswordCheckNo: state.password.newPasswordCheckNo,
        newPasswordCheckLabel: state.password.newPasswordCheckLabel,
        reNewPasswordCheckNo: state.password.reNewPasswordCheckNo,
        reNewPasswordCheckLabel: state.password.reNewPasswordCheckLabel,
        currentChangeModal: state.password.currentChangeModal,
        currentFailModal: state.password.currentFailModal,
        successModal: state.password.successModal
    }),
    (dispatch) => ({
        Password: bindActionCreators(password, dispatch)
    })
)(PasswordScreen);