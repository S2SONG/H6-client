import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import {connect} from "react-redux";
import * as signin from "../../../modules/signin";
import {bindActionCreators} from 'redux';
import {SignUpIndicator} from "./ui/SignUpIndicator";
import {validation} from "../../../utils/validations";
import EStyleSheet from 'react-native-extended-stylesheet';
import {TitleView} from "../../ui/TitleView";
import {SignUpTextInput} from "./ui/SignUpTextInput";
import {CustomModal} from "../../ui/CustomModal";


class SignUpScreen2 extends React.Component {

    constructor(props) {
        super(props);
    }

    navigationGoBack = () => {
        this.props.navigation.goBack();
    };
    xButton = () => {
        const {SignInTwo} = this.props;

        SignInTwo.handleTermsAll(false);
        SignInTwo.handleSignUpUserId('');
        SignInTwo.handleSignUpUserPwd('');
        SignInTwo.handleSignUpUserRePwd('');
        SignInTwo.handleSignUpUserNickName('');
        SignInTwo.handleMajor(null);
        SignInTwo.handleDoubleMajor(null);
        SignInTwo.handleMinor(null);
        SignInTwo.handleConnectedMajor(null);
        SignInTwo.handleAdmissionYear(null);
        SignInTwo.handleSignUpCheckUserIdNo(0);
        SignInTwo.handleSignUpCheckUserPasswordNo(0);
        SignInTwo.handleSignUpCheckUserRePasswordNo(0);
        SignInTwo.handleSignUpCheckUserNickNameNo(0);

        this.props.navigation.navigate('SignIn');
    };
    handleStateUserId = async (userId) => {
        const {SignInTwo} = this.props;
        SignInTwo.handleSignUpUserId(userId);
        if (validation.checkEmail(userId)) {
            SignInTwo.handleSignUpCheckUserIdNo(2);
        } else {
            if (userId.length == 0) {
                SignInTwo.handleSignUpCheckUserIdNo(0);
            } else {
                SignInTwo.handleSignUpCheckUserIdNo(1);
            }
        }
    };
    handleStateUserPw = (userPw) => {
        const {SignInTwo} = this.props;
        SignInTwo.handleSignUpUserPwd(userPw);
        if (validation.checkPassLength(userPw)) {
            SignInTwo.handleSignUpCheckUserPasswordNo(2);
        } else {
            if (userPw.length == 0) {
                SignInTwo.handleSignUpCheckUserPasswordNo(0);
            } else {
                SignInTwo.handleSignUpCheckUserPasswordNo(1);
            }
        }

        if (this.props.userRePw.length == 0) {
            SignInTwo.handleSignUpCheckUserRePasswordNo(0);
        } else if (validation.checkPassCompare(userPw, this.props.userRePw)) {
            SignInTwo.handleSignUpCheckUserRePasswordNo(2);
        } else {
            SignInTwo.handleSignUpCheckUserRePasswordNo(1);
        }
    };

    handleStateUserRePw = (userRePw) => {
        const {SignInTwo} = this.props;
        SignInTwo.handleSignUpUserRePwd(userRePw);
        if (userRePw.length == 0) {
            SignInTwo.handleSignUpCheckUserRePasswordNo(0);
        } else if (validation.checkPassCompare(userRePw, this.props.userPw)) {
            SignInTwo.handleSignUpCheckUserRePasswordNo(2);
        } else {
            SignInTwo.handleSignUpCheckUserRePasswordNo(1);
        }
    };

    handleStateUserNickName = async (userNickName) => {
        const {SignInTwo} = this.props;

        SignInTwo.handleSignUpUserNickName(userNickName);
        if (validation.checkNickNameLength(userNickName)) {
            SignInTwo.handleSignUpCheckUserNickNameNo(2);
        } else {
            if (userNickName.length == 0) {
                SignInTwo.handleSignUpCheckUserNickNameNo(0);
            } else {
                SignInTwo.handleSignUpCheckUserNickNameNo(1);
            }
        }
    };

    handleUserIdModal = (modal) => {
        const {SignInTwo} = this.props;
        SignInTwo.handleUserIdModal(modal);
    };

    handleUserNickNameModal = (modal) => {
        const {SignInTwo} = this.props;
        SignInTwo.handleUserNickNameModal(modal);
    };

    handleNextButton = async () => {
        const {SignInTwo} = this.props;
        let idResult = await SignInTwo.checkUserId(this.props.userId);
        if(!idResult){
            SignInTwo.handleUserIdModal(true);
            SignInTwo.handleSignUpCheckUserIdNo(1);
            return;
        }
        let nickNameResult = await SignInTwo.checkUserNickName(this.props.userNickName);
        if(!nickNameResult){
            SignInTwo.handleUserNickNameModal(true);
            SignInTwo.handleSignUpCheckUserNickNameNo(1);
            return;
        }

        this.props.navigation.navigate('SignUpThree');
    };

    renderButton = () => {
        const dataStyles = EStyleSheet.create({
            container: {
                width: '77.1%',
                aspectRatio: 289 / 53,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#4a4a4a4d',
                borderRadius:'1.9rem'
            },
            selectContainer: {
                width: '77.1%',
                aspectRatio: 289 / 53,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#4a4a4a',
                borderRadius:'1.9rem'
            },
            text: {
                fontSize: '1.143rem',
                color: 'white',
            }
        });
        if (this.props.checkIdNo == 2 && this.props.checkNickNameNo == 2 && this.props.checkPasswordNo == 2 && this.props.checkPassRe == 2) {
            return (
                <TouchableOpacity style={dataStyles.selectContainer} onPress={this.handleNextButton}>
                    <Text style={dataStyles.text}>계속 진행하기</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={dataStyles.container}>
                    <Text style={dataStyles.text}>계속 진행하기</Text>
                </View>
            )
        }
    };

    renderUserIdModal = () => {
        return(
            <View style={styles.userOutModalBody}>
                <View style={styles.userOutModalBody}></View>
                <Text style={styles.logoutModalText}>중복되는 이메일 입니다.</Text>
                <View style={styles.userOutModalBody}></View>
            </View>
        )
    };

    renderUserNickNameModal = () => {
        return(
            <View style={styles.userOutModalBody}>
                <View style={styles.userOutModalBody}></View>
                <Text style={styles.logoutModalText}>중복되는 닉네임 입니다.</Text>
                <View style={styles.userOutModalBody}></View>
            </View>
        )
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <CustomModal width={280} height={156} ratio={'75%'} footer={true} footerText={'확인'} footerHandle={()=>this.handleUserIdModal(false)}
                             body={this.renderUserIdModal} visible={this.props.userIdModal}/>
                <CustomModal width={280} height={156} ratio={'75%'} footer={true} footerText={'확인'} footerHandle={()=>this.handleUserNickNameModal(false)}
                             body={this.renderUserNickNameModal} visible={this.props.userNickNameModal}/>

                <TitleView title={'회원가입'} rightIcon={'md-close'} rightIconHandler={this.xButton}
                           leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationGoBack}/>
                <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                <View style={{flex: 1}}>
                    <View style={styles.indicatorContainer}>
                        <SignUpIndicator max={3} position={1}/>
                    </View>

                        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}} style={{flex: 1}}>
                            <SignUpTextInput label={'이메일'} placeholder={'정확한 이메일 형태를 입력'} value={this.props.userId}
                                             checkNo={this.props.checkIdNo} handle={this.handleStateUserId}/>
                            <View style={styles.inputSpace}/>
                            <SignUpTextInput label={'비밀번호'} placeholder={'영문,숫자,특수문자를 포함한 7자이상'}
                                             value={this.props.userPw}
                                             checkNo={this.props.checkPasswordNo} handle={this.handleStateUserPw}
                                             secureText={true}/>
                            <View style={styles.inputSpace}/>
                            <SignUpTextInput label={'비밀번호 확인'} placeholder={'한번 더'} value={this.props.userRePw}
                                             checkNo={this.props.checkPassRe} handle={this.handleStateUserRePw}
                                             secureText={true}/>
                            <View style={styles.inputSpace}/>
                            <SignUpTextInput label={'닉네임'} placeholder={'닉네임은 변경이 불가하니 신중!(2글자 이상)'}
                                             value={this.props.userNickName}
                                             checkNo={this.props.checkNickNameNo}
                                             handle={this.handleStateUserNickName}/>
                            <View style={styles.buttonSpace}/>
                            {this.renderButton()}
                        </ScrollView>

                </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = EStyleSheet.create({
    indicatorContainer: {
        marginBottom: '3.92857rem',
        marginTop: '2rem',
    },
    inputSpace:{
        height:'1.2134rem'
    },
    buttonSpace:{
        height:'3.57143rem',
    },
    userOutModalBody:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    logoutModalText:{
        fontSize: '1rem'
    }
});
export default connect((state) => ({

        userId: state.signin.userId,
        userPw: state.signin.userPw,
        userRePw: state.signin.userRePw,
        userNickName: state.signin.userNickName,

        checkIdNo: state.signin.checkIdNo,
        checkNickNameNo: state.signin.checkNickNameNo,

        checkPasswordNo: state.signin.checkPasswordNo,
        checkPassRe: state.signin.checkPassRe,

        userIdModal: state.signin.userIdModal,
        userNickNameModal: state.signin.userNickNameModal,

        isFirstChecked: state.signin.isFirstChecked,
        isSecondChecked: state.signin.isSecondChecked,

    }),
    (dispatch) => ({
        SignInTwo: bindActionCreators(signin, dispatch)
    })
)(SignUpScreen2);