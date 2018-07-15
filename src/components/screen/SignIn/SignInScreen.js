import React from 'react';
import {Alert, View, Text, TextInput, Animated, AsyncStorage, ScrollView, KeyboardAvoidingView, Keyboard, SafeAreaView, StatusBar, TouchableHighlight, Image} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {DotIndicator} from 'react-native-indicators';

import styles from "./SignInStyles";
import config from "../../../../config";
import {SignTextInput} from "../../ui/SignTextInput";
import {LinkText} from "../../ui/LinkText";
import * as signin from "../../../modules/signin";
import RoundCheckbox from 'rn-round-checkbox';
import {TermsModal} from "../../ui/TermsModal";
import {SignUpMajor} from "../../ui/SignUpMajor";
import {SignUpDatePicker} from "../../ui/SignUpDatePicker";
import Toast, {DURATION} from 'react-native-easy-toast';
import {validation} from "../../../utils/validations";
import {WarningModal} from "../../ui/WarningModal";
import {TermsListItem} from "../../ui/TermsListItem";
import {SignUpIndicator} from "./ui/SignUpIndicator";

import {SignUpTextInput} from "../../ui/SignUpTextInput";
import {FindPwdModal} from "../../ui/FindPwdModal";
import {handleFindPwdModal} from "../../../modules/signin";
import {SignInButton} from "./ui/SignInButton";
import {SignInFindPwdModal} from "./ui/SignInFindPwdModal";
import {CustomModal} from "../../ui/CustomModal";

const labels = ["가입동의", "기본정보", "부가정보"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#989898',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#989898',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#989898',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#989898',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#989898',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#989898'
};


class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this._opacity = new Animated.Value(0);
        this.translate = this._opacity.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [200, 20, 0],
        });
        this.state = {
            id: '',
            pwd: '',
            register: false,
            termsModal: false,
            keyboardSpace: 0,
            findPwd: false,
        };
        Keyboard.addListener('keyboardDidShow', (frames) => {
            if (!frames.endCoordinates) return;
            this.setState({keyboardSpace: frames.endCoordinates.height});
        });
        Keyboard.addListener('keyboardDidHide', (frames) => {
            this.setState({keyboardSpace: 0})
        });

    }

    componentDidMount() {
        const {SignIn} = this.props;
        SignIn.initSignInState();
        SignIn.initSignUpState();
        SignIn.signUpTerm1();
        SignIn.signUpTerm2();
        //로그인화면 애니메이션 효과
        Animated.timing(          // Uses easing functions
            this._opacity,    // The value to drive
            {
                toValue: 1,
                duration: 3000,
                // ease: Easing.inout(),
                delay: 1000,
            }            // Configuration
        ).start();                // Don't forget start!
        this.autoLogin();

    }

    //로그인화면 id 입력
    handleSignInId = (id) => {
        const {SignIn} = this.props;
        SignIn.handleSignInId(id);
        this.handleSignInButton(id, this.props.pwd);
    };

    //로그인화면 password 입력
    handleSignInPwd = (pwd) => {
        const {SignIn} = this.props;
        SignIn.handleSignInPwd(pwd);
        this.handleSignInButton(this.props.id, pwd);
    };

    handleSignInButton = (id, pwd) => {
        const {SignIn} = this.props;
        if(id.length == 0 || pwd.length == 0)
            SignIn.handleSignInButton(false);
        else
            SignIn.handleSignInButton(true);
    };

    //로그인버튼 클릭 시
    signInUser = async () => {
        const {SignIn} = this.props;
        await SignIn.signInUser(this.props.id, this.props.pwd);
        this.loginResult();
    };

    //로그인 결과
    loginResult = () => {
        const {SignIn} = this.props;
        if (this.props.login === true) {
            SignIn.initSignInState();
            this.props.navigation.navigate('Home');
        } else {
            SignIn.handleSignInCheck(true);
        }
        SignIn.handleSignInCheck(false);
        // else {
        //     Alert.alert(
        //         '로그인 오류',
        //         '아이디와 비밀번호를 확인해 주세요',
        //         // ' ',
        //         // '비밀번호가 일치하지 않습니다.',
        //         [
        //             {text: 'OK', onPress: () => console.log('OK Pressed')},
        //         ],
        //         {cancelable: false}
        //     )
        // }
    };
    //회원가입 클릭 시 동의화면 이동
    handleSignUpModal = () => {
        const {SignIn} = this.props;
        SignIn.initSignUpState();
        SignIn.handleSignUpModal();
    };

    //비밀번호 찾기
    handleFindPwdModal = () => {
        const {SignIn} = this.props;
        SignIn.handleFindPwdUserId('');
        SignIn.handleFindPwdCheckNo(0);
        SignIn.handleFindPwdCheckLabel('');
        SignIn.FindPwdModal(true);
    };
    handleFindPwdModalClose = () => {
        const {SignIn} = this.props;
        SignIn.FindPwdModal(false);
    };
    handleFindPwdUserId = async (id) => {
        const {SignIn} = this.props;
        SignIn.handleFindPwdUserId(id);
        const check = await this.checkFindPwdUserId(id);
        if(check){
            const returnValue = await SignIn.checkUserId(id);
            if (!returnValue) {
                SignIn.handleFindPwdCheckNo(2);
                SignIn.handleFindPwdCheckLabel('가입확인 된 이메일입니다.');
            } else {
                SignIn.handleFindPwdCheckNo(1);
                SignIn.handleFindPwdCheckLabel('가입되지 않은 이메일입니다.');
            }
        }

    };
    checkFindPwdUserId = (id) => {
        const {SignIn} = this.props;
        if (validation.checkEmail(id)) {
            if (id.length == 0) {
                SignIn.handleFindPwdCheckNo(0);
                SignIn.handleFindPwdCheckLabel('');
            } else {
                SignIn.handleFindPwdCheckNo(0);
                SignIn.handleFindPwdCheckLabel('');
                return true;
            }
        } else {
            SignIn.handleFindPwdCheckNo(1);
            SignIn.handleFindPwdCheckLabel('이메일 형식이 아닙니다.');
        }
        return false;
    };
    sendFindPwd = async () => {
        const {SignIn} = this.props;
        if(this.props.findPwdCheckNo!=2){
            return;
        }
        const resultValue = await SignIn.sendFindPwd(this.props.findPwdUserId);
        this.handleFindPwdModalClose();

        if (resultValue) {
            SignIn.handleFindPwdResultTitle('임시 비밀번호가 전송되었습니다.');
        } else {
            SignIn.handleFindPwdResultTitle('임시 비밀번호 전송에 실패했습니다.');
        }
        SignIn.handleFindPwdResult(true);
    };

    handleFindPwdResultClose = async () => {
        const {SignIn} = this.props;
        await SignIn.handleFindPwdResult(false);
        SignIn.handleFindPwdResultTitle('');
    };


    //약관동의 처리
    handleTerms = () => {
        this.setState({
            termsModal: !this.state.termsModal
        })
    };

    //첫번째 동의 체크박스
    handleTermsFirstCheck = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsFirstCheck();
    };

    //두번째 동의 체크박스
    handleTermsSecondCheck = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsSecondCheck();
    };

    //모두 동의
    handleTermsAllTrue = () => {
        const {SignIn} = this.props;
        if (this.returnChecked()) {
            SignIn.handleTermsAll(false);
        } else {
            SignIn.handleTermsAll(true);
        }

    };

    //동의 체크
    returnChecked = () => {
        return this.props.isFirstChecked && this.props.isSecondChecked;
    };

    //첫번째 동의 모달 열기, 닫기
    handleTermsFirstModalOpen = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsFirstModal(true);
    };

    handleTermsFirstModalClose = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsFirstModal(false);
    };

    //두번째 동의 모달 열기, 닫기
    handleTermsSecondModalOpen = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsSecondModal(true);
    };
    handleTermsSecondModalClose = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsSecondModal(false);
    };

    nextTerms = () => {
        if (this.returnChecked()) {
            return this.onPageChange(1);
        }
        this.handleTerms();
    };

    handleCheckUserIdModal = () => {
        const {SignIn} = this.props;
        SignIn.handleSignUpUserIdModal(!this.props.userIdCheckModal);
    };

    handleCheckUserEmailModal = () => {
        const {SignIn} = this.props;
        SignIn.handleSignUpUserEmailModal(!this.props.userEmailCheckModal);
    };

    handleCheckUserNickNameModal = () => {
        const {SignIn} = this.props;
        SignIn.handleSignUpUserNickNameModal(!this.props.userNickNameCheckModal);
    };

    handleCheckUserPasswordModal = () => {
        const {SignIn} = this.props;
        SignIn.handleSignUpUserPwdModal(!this.props.userPasswordCheckModal);
    };

    handleStateUserId = (userId) => {
        const {SignIn} = this.props;
        // if (validation.checkIdLength(userId)) {
        if (validation.checkEmail(userId)) {
            if (userId.length == 0) {
                SignIn.handleSignUpCheckUserIdClient(false);
                SignIn.handleSignUpCheckUserIdNo(0);
                SignIn.handleSignUpCheckUserIdLabel('');
            } else {
                SignIn.handleSignUpCheckUserIdClient(true);
                SignIn.handleSignUpCheckUserIdNo(0);
                SignIn.handleSignUpCheckUserIdLabel('');
            }
        } else {
            SignIn.handleSignUpCheckUserIdClient(false);
            SignIn.handleSignUpCheckUserIdNo(1);
            SignIn.handleSignUpCheckUserIdLabel('아이디는 이메일 형식이어야 합니다.');
        }
        SignIn.handleSignUpUserId(userId);
    };
    handleCheckUserId = async () => {
        const {SignIn} = this.props;
        if (this.props.checkIdClient && this.props.userId.length > 0) {
            const result = await SignIn.checkUserId(this.props.userId);
            if (result) {
                SignIn.handleSignUpCheckUserIdServer(true);
                SignIn.handleSignUpCheckUserIdNo(2);
                SignIn.handleSignUpCheckUserIdLabel('사용 가능한 아이디 입니다.');
            } else {
                SignIn.handleSignUpCheckUserIdServer(false);
                SignIn.handleSignUpCheckUserIdNo(1);
                SignIn.handleSignUpCheckUserIdLabel('사용 불가능한 아이디 입니다.');
            }
        } else {
            SignIn.handleSignUpCheckUserIdServer(false);
        }
    };

    handleStateUserNickName = (userNickName) => {
        const {SignIn} = this.props;
        if (validation.checkNickNameLength(userNickName)) {
            if (userNickName.length == 0) {
                SignIn.handleSignUpCheckUserNickNameClient(false);
                SignIn.handleSignUpCheckUserNickNameNo(0);
                SignIn.handleSignUpCheckUserNickNameLabel('');
            }
            else {
                SignIn.handleSignUpCheckUserNickNameClient(true);
                SignIn.handleSignUpCheckUserNickNameNo(0);
                SignIn.handleSignUpCheckUserNickNameLabel('');
            }
        } else {
            SignIn.handleSignUpCheckUserNickNameClient(false);
            SignIn.handleSignUpCheckUserNickNameNo(1);
            SignIn.handleSignUpCheckUserNickNameLabel('닉네임은 두글자 이상이여야 합니다.');
        }
        SignIn.handleSignUpUserNickName(userNickName);
    };
    handleCheckUserNickName = async () => {
        const {SignIn} = this.props;
        if (this.props.checkNickNameClient && this.props.userNickName.length > 0) {
            const result = await SignIn.checkUserNickName(this.props.userNickName);
            if (result) {
                SignIn.handleSignUpCheckUserNickNameServer(true);
                SignIn.handleSignUpCheckUserNickNameNo(2);
                SignIn.handleSignUpCheckUserNickNameLabel('사용 가능한 닉네임 입니다.');
            } else {
                SignIn.handleSignUpCheckUserNickNameServer(false);
                SignIn.handleSignUpCheckUserNickNameNo(1);
                SignIn.handleSignUpCheckUserNickNameLabel('사용 불가능한 닉네임 입니다.');
            }
        } else {
            SignIn.handleSignUpCheckUserNickNameServer(false);
        }
    };


    handleStateUserEmail = (userEmail) => {
        const {SignIn} = this.props;
        if (validation.checkEmail(userEmail)) {
            SignIn.handleSignUpCheckUserEmailClient(true);
            SignIn.handleSignUpCheckUserEmailNo(0);
            SignIn.handleSignUpCheckUserEmailLabel('');
        } else {
            if (userEmail.length == 0) {
                SignIn.handleSignUpCheckUserEmailClient(false);
                SignIn.handleSignUpCheckUserEmailNo(0);
                SignIn.handleSignUpCheckUserEmailLabel('');
            } else {
                SignIn.handleSignUpCheckUserEmailClient(false);
                SignIn.handleSignUpCheckUserEmailNo(1);
                SignIn.handleSignUpCheckUserEmailLabel('이메일 형식이 아닙니다.');
            }
        }
        SignIn.handleSignUpUserEmail(userEmail);
    };

    handleCheckUserEmail = async () => {
        const {SignIn} = this.props;
        if (this.props.checkEmailClient && this.props.userEmail.length > 0) {
            const result = await SignIn.checkUserEmail(this.props.userEmail);
            if (result) {
                SignIn.handleSignUpCheckUserEmailServer(true);
                SignIn.handleSignUpCheckUserEmailNo(2);
                SignIn.handleSignUpCheckUserEmailLabel('사용 가능한 이메일 입니다.');
            } else {
                SignIn.handleSignUpCheckUserEmailServer(false);
                SignIn.handleSignUpCheckUserEmailNo(1);
                SignIn.handleSignUpCheckUserEmailLabel('사용 불가능한 이메일 입니다.');
            }
        } else {
            SignIn.handleSignUpCheckUserEmailServer(false);
        }
    };

    handleStateUserPw = (userPw) => {
        const {SignIn} = this.props;
        SignIn.handleSignUpUserPwd(userPw);
        if (validation.checkPassLength(userPw)) {
            if (userPw.length == 0) {
                SignIn.handleSignUpCheckUserPassword(false);
                SignIn.handleSignUpCheckUserPasswordNo(0);
                SignIn.handleSignUpCheckUserPasswordLabel('');
            } else {
                SignIn.handleSignUpCheckUserPassword(true);
                SignIn.handleSignUpCheckUserPasswordNo(0);
                SignIn.handleSignUpCheckUserPasswordLabel('');
            }
        } else {
            SignIn.handleSignUpCheckUserPassword(false);
            SignIn.handleSignUpCheckUserPasswordNo(1);
            SignIn.handleSignUpCheckUserPasswordLabel('8자이상 16자이하의 영문,숫자,특수문자를 포함해야합니다.');
        }

        if (userPw.length == 0 || !validation.checkPassLength(userPw)) {
            SignIn.handleSignUpCheckUserRePassword(false);
            SignIn.handleSignUpCheckUserRePasswordNo(0);
            SignIn.handleSignUpCheckUserRePasswordLabel('');
        } else if (userPw.length > 0 && this.props.userRePw.length > 0 && validation.checkPassCompare(userPw, this.props.userRePw)) {
            SignIn.handleSignUpCheckUserRePassword(true);
            SignIn.handleSignUpCheckUserRePasswordNo(2);
            SignIn.handleSignUpCheckUserRePasswordLabel('비밀번호가 일치 합니다');
        } else if (userPw.length > 0 && this.props.userRePw.length > 0 && !validation.checkPassCompare(userPw, this.props.userRePw)) {
            SignIn.handleSignUpCheckUserRePassword(false);
            SignIn.handleSignUpCheckUserRePasswordNo(1);
            SignIn.handleSignUpCheckUserRePasswordLabel('비밀번호가 불일치 합니다');
        }
    };

    handleStateUserRePw = (userRePw) => {
        const {SignIn} = this.props;
        // this.setState({userRePw});
        SignIn.handleSignUpUserRePwd(userRePw);
        if ((this.props.userPw.length == 0 || !validation.checkPassLength(this.props.userPw)) || userRePw.length == 0) {
            SignIn.handleSignUpCheckUserRePassword(false);
            SignIn.handleSignUpCheckUserRePasswordNo(0);
            SignIn.handleSignUpCheckUserRePasswordLabel('');
        } else if (validation.checkPassCompare(this.props.userPw, userRePw)) {
            SignIn.handleSignUpCheckUserRePassword(true);
            SignIn.handleSignUpCheckUserRePasswordNo(2);
            SignIn.handleSignUpCheckUserRePasswordLabel('비밀번호가 일치 합니다');
        } else {
            SignIn.handleSignUpCheckUserRePassword(false);
            SignIn.handleSignUpCheckUserRePasswordNo(1);
            SignIn.handleSignUpCheckUserRePasswordLabel('비밀번호가 불일치 합니다');
        }
    };

    handleStateMajor = (major) => {
        const {SignIn} = this.props;
        SignIn.handleSignUpMajor(major);
    };
    handleStateMinor = (minor) => {
        const {SignIn} = this.props;
        SignIn.handleSignUpMinor(minor);
    };
    handleStateDoubleMajor = (doubleMajor) => {
        const {SignIn} = this.props;
        SignIn.handleSignUpDoubleMajor(doubleMajor);
    };
    handleStateConnectedMajor = (connectedMajor) => {
        const {SignIn} = this.props;
        SignIn.handleSignUpConnectMajor(connectedMajor);
    };
    handleStateAdmissionYear = (admissionYear) => {
        const {SignIn} = this.props;
        SignIn.handleSignUpAdmisstionYear(admissionYear);
    };

    onPageChange = (diff) => {
        const {SignIn} = this.props;
        SignIn.handleSignUpCurrentPosition(this.props.currentPosition + diff);
    };
    renderModalHeader = (page) => {
        if (this.props.currentPosition !== 0)
            return (
                <Icon name="ios-arrow-back-outline" type="ionicon" style={{alignSelf: 'flex-start'}} onPress={() => {
                    this.onPageChange(-1)
                }}/>);
        else {
            return (<View style={{alignSelf: 'flex-start'}}></View>);
        }
    };
    renderModalBody = (page) => {

        switch (page) {
            case 0:
                return (
                    <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
                        <TouchableHighlight underlayColor='#ececec' onPress={this.handleTermsAllTrue}>
                            <View style={{alignItems: 'center'}}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    height: 40,
                                    width: 300,
                                    marginBottom: 10,
                                    padding: 10,
                                    paddingLeft: 20
                                }}>
                                    <RoundCheckbox
                                        size={24}
                                        checked={this.returnChecked()}
                                        backgroundColor="#989898"
                                        onValueChange={this.handleTermsAllTrue}
                                    />
                                    <Text style={{width: 190, marginLeft: 10}}>
                                        회원가입 약관에 모두 동의합니다.
                                    </Text>
                                </View>

                            </View>
                        </TouchableHighlight>
                        <TermsListItem
                            title='개인정보 수집 및 이용 (필수)'
                            checked={this.props.isFirstChecked}
                            onValueChange={this.handleTermsFirstCheck}
                            modalHandle={this.handleTermsFirstModalOpen}
                            modalText='보기'
                        />
                        <TermsListItem
                            title='한담 서비스 이용 약관 (필수)'
                            checked={this.props.isSecondChecked}
                            onValueChange={this.handleTermsSecondCheck}
                            modalHandle={this.handleTermsSecondModalOpen}
                            modalText='보기'
                        />
                    </View>
                );
            case 1:
                return (
                    <ScrollView>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: this.state.keyboardSpace ? 50 : 0,
                            paddingBottom: this.state.keyboardSpace ? 65 : 0
                        }} behavior="padding" enabled>
                            <SignUpTextInput handle={this.handleStateUserId}
                                             value={this.props.userId}
                                             placeholder={'Email'}
                                             icon={'user'}
                                             label={'ID'}
                                             checkNo={this.props.checkIdNo}
                                             checkLabel={this.props.checkIdLabel}
                                             blur={this.handleCheckUserId}
                            />
                            <SignUpTextInput handle={this.handleStateUserPw}
                                             value={this.props.userPw}
                                             placeholder={'Password'}
                                             icon={'lock'}
                                             secureText={true}
                                             label={'Password'}
                                             checkNo={this.props.checkPasswordNo}
                                             checkLabel={this.props.checkPasswordLabel}
                            />
                            <SignUpTextInput handle={this.handleStateUserRePw}
                                             value={this.props.userRePw}
                                             placeholder={'Password again'}
                                             icon={'lock'}
                                             secureText={true}
                                             label={'Password again'}
                                             checkNo={this.props.checkPassRe}
                                             checkLabel={this.props.checkPassReLabel}
                            />
                            <SignUpTextInput handle={this.handleStateUserNickName}
                                             value={this.props.userNickName}
                                             placeholder={'UserNickName'}
                                             icon={'user-secret'}
                                             label={'Nickname'}
                                             checkNo={this.props.checkNickNameNo}
                                             checkLabel={this.props.checkNickNameLabel}
                                             blur={this.handleCheckUserNickName}
                            />
                        </View>
                    </ScrollView>
                );
            case 2:
                return (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <SignUpMajor handle={this.handleStateMajor}
                                     value={this.props.major}
                                     placeholder={'전공을 선택해 주세요'}/>
                        <SignUpMajor handle={this.handleStateMinor}
                                     value={this.props.minor}
                                     placeholder={'부전공을 선택해 주세요'}/>
                        <SignUpMajor handle={this.handleStateDoubleMajor}
                                     value={this.props.doubleMajor}
                                     placeholder={'복수전공을 선택해 주세요'}/>
                        <SignUpMajor handle={this.handleStateConnectedMajor}
                                     value={this.props.connectedMajor}
                                     placeholder={'연계전공을 선택해 주세요'}/>
                        <SignUpDatePicker handle={this.handleStateAdmissionYear}
                                          value={this.props.admissionYear}
                                          placeholder={'입학년도를 선택해 주세요'}/>
                    </View>
                );

        }
    };
    renderModalFooter = (page) => {
        switch (page) {
            case 0:
                return (
                    <View>
                        <Button buttonStyle={{
                            backgroundColor: '#8f96a0',
                            borderRadius: 30,
                            width: 200,
                            alignSelf: 'center'
                        }} onPress={this.nextTerms} title="Continue"/>
                    </View>
                );
            case 1:
                return (
                    <View>
                        <Button buttonStyle={{
                            backgroundColor: '#8f96a0',
                            borderRadius: 30,
                            width: 200,
                            alignSelf: 'center'
                        }} onPress={this.basicChecked} title="Continue"/>
                    </View>
                );
            case 2:
                return (
                    <View>
                        <Button buttonStyle={{
                            backgroundColor: '#8f96a0',
                            borderRadius: 30,
                            width: 200,
                            alignSelf: 'center'
                        }} onPress={this.signUpUser} title="Finish"/>
                    </View>
                );
        }
    };

    renderSignInButton = () => {
        if(this.props.signInButton)
            return <SignInButton title={'시작하기'} handle={this.signInUser} iconColor={'white'} textColor={'white'} backgroundColor={'#4a4a4a'}/>
        else
            return <SignInButton title={'시작하기'} iconColor={'#9b9b9b'} textColor={'black'} backgroundColor={'white'}/>
    };

    basicChecked = async () => {
        const {SignIn} = this.props;
        if (!this.props.checkIdClient)
            return this.handleCheckUserIdModal();
        let checkid = await SignIn.checkUserId(this.props.userId);
        if (!checkid) return this.handleCheckUserIdModal();

        if (!this.props.checkNickNameClient)
            return this.handleCheckUserNickNameModal();
        let checknickname = await SignIn.checkUserNickName(this.props.userNickName);
        if (!checknickname) return this.handleCheckUserNickNameModal();

        // if (this.props.userEmail.length > 0) {
        //     if (!this.props.checkEmailClient)
        //         return this.handleCheckUserEmailModal();
        //     let checkemail = await SignIn.checkUserEmail(this.props.userEmail);
        //     if (!checkemail) return this.handleCheckUserEmailModal();
        // }
        if (!(this.props.checkPassword && this.props.checkRePassword))
            return this.handleCheckUserPasswordModal();
        this.onPageChange(1);
    };
    signUpUser = async () => {
        const {SignIn} = this.props;
        const {userId, userPw, userNickName, major, minor, doubleMajor, connectedMajor, admissionYear} = this.props;
        let signUpCheck = await SignIn.signUpUser(userId, userPw, userNickName, major, minor, doubleMajor, connectedMajor, admissionYear);
        if (signUpCheck) {
            this.handleSignUpModal();
            this.refs.toast.show('회원가입에 성공했습니다.');
        } else {

        }
    };

    autoLogin = async () => {
        const {SignIn} = this.props;
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            this.props.navigation.navigate('Home');
        }
        SignIn.handleAuto(true);
    };

    renderUnderLabel = () => {
        if (this.props.findPwdCheckNo == 0) {
            return null;
        } else if (this.props.findPwdCheckNo == 1) {
            return (<Text style={{
                width: '100%',
                marginTop: 5,
                textAlign: 'center',
                color: 'rgb(208,2,27)',
                fontSize:12,
            }}>{this.props.findPwdCheckLabel}</Text>)
        } else {
            return (<Text style={{
                width: '100%',
                marginTop: 5,
                textAlign: 'center',
                color: '#4085d5',
                fontSize:12,
            }}>{this.props.findPwdCheckLabel}</Text>)
        }
    };
    renderFindPwdModalBody = () => {
      return(
          <View>
            <Text style={{
                fontSize: 15,
                color: 'black',
                alignSelf: 'center',
                textAlign: 'center',
                marginBottom: 30,
            }}>{'가입시 입력한 이메일로\n임시 비밀번호를 전송합니다.'}</Text>
            <View style={{
                flexDirection: 'row',
                height: 44,
                width: 250,
                backgroundColor: 'white',
                paddingLeft: 10,
                borderColor:'#979797',
                borderWidth:1,
                alignSelf: 'center',
            }}>
                <TextInput
                    onChangeText={this.handleFindPwdUserId}
                    value={this.props.findPwdUserId}
                    style={{flex: 1}}
                    underlineColorAndroid="transparent"
                    placeholder={'이메일을 입력해주세요.'}
                />
            </View>
            {this.renderUnderLabel()}
          </View>
      )
    };

    render() {

        const animation = this._opacity;
        if (!this.props.auto) {
            return (
                <DotIndicator color='white'/>
            )
        }
        return (

            <KeyboardAvoidingView
                style={styles.container}>

                <CustomModal
                    visible={this.props.findPwd}
                    close={this.handleFindPwdModalClose} title={'비밀번호 찾기'} body={this.renderFindPwdModalBody} footerText={'이메일 전송'} footerHandle={this.sendFindPwd} footer={this.props.findPwdCheckNo==2?true:false}/>
                <CustomModal
                    height={156}
                    visible={this.props.findPwdResult} title={this.props.findPwdResultTitle} footerText={'확인'} footerHandle={this.handleFindPwdResultClose} footer={true}/>

                <SafeAreaView style={{flex: 1}}>
                    <Toast ref="toast"/>
                    <Modal isVisible={this.props.register} transparent={false}>

                        <TermsModal
                            closeModal={this.handleTermsFirstModalClose}
                            modalVisible={this.props.firstVisible}
                            title='개인정보 수집 및 이용'
                            htmlContent={this.props.term1}
                        />
                        <TermsModal
                            closeModal={this.handleTermsSecondModalClose}
                            modalVisible={this.props.secondVisible}
                            title='한담 서비스 이용 약관'
                            htmlContent={this.props.term2}
                        />
                        <WarningModal
                            visible={this.state.termsModal}
                            title={'경고'}
                            body={'약관에 동의 해주세요.'}
                            handle={this.handleTerms}
                        />
                        <WarningModal
                            visible={this.props.userIdCheckModal}
                            title={'경고'}
                            body={'아이디를 확인 해주세요.'}
                            handle={this.handleCheckUserIdModal}
                        />
                        <WarningModal
                            visible={this.props.userNickNameCheckModal}
                            title={'경고'}
                            body={'닉네임을 확인 해주세요.'}
                            handle={this.handleCheckUserNickNameModal}
                        />
                        <WarningModal
                            visible={this.props.userPasswordCheckModal}
                            title={'경고'}
                            body={'비밀번호를 다시 확인해 주세요.'}
                            handle={this.handleCheckUserPasswordModal}
                        />
                        <WarningModal
                            visible={this.props.userEmailCheckModal}
                            title={'경고'}
                            body={'이메일을 확인 해주세요.'}
                            handle={this.handleCheckUserEmailModal}
                        />
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                            <View
                                style={{height: 497, width: 342, backgroundColor: 'rgb(246,246,246)', borderRadius: 8}}>
                                <View name='header' style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    height: 40,
                                    width: 340,
                                    padding: 10
                                }}>
                                    {this.renderModalHeader(this.props.currentPosition)}
                                    <Icon name="md-close" type="ionicon" style={{alignSelf: 'flex-end'}}
                                          onPress={this.handleSignUpModal}/>
                                </View>
                                <Text style={{marginBottom: 10, alignSelf: 'center', fontSize: 18}}>회원가입</Text>
                                <View name='body' style={{flex: 1, height: 460, width: 340}}>
                                    <SignUpIndicator max={3} position={this.props.currentPosition}/>
                                    {this.renderModalBody(this.props.currentPosition)}
                                </View>
                                <View name='footer' style={{height: 100, width: 340, padding: 10}}>
                                    {this.renderModalFooter(this.props.currentPosition)}
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            <StatusBar barStyle="dark-content"/>

                            <Animated.View
                                style={[
                                    {
                                        height: 270.6,
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    },
                                    {
                                        transform: [
                                            {translateY: this.translate}
                                        ]
                                    },
                                ]}>
                                <Image
                                    source={require('../../../../assets/Handam.png')}
                                />
                            </Animated.View>
                            <Animated.View style={{flex: 1, opacity: animation}}>
                                <View style={{flex: 1}}>
                                    <SignTextInput
                                        handle={this.handleSignInId}
                                        value={this.props.id}
                                        placeholder={'이메일'}
                                        icon={'user'}
                                        bounce={this.props.signInCheck}
                                    />
                                    <SignTextInput
                                        handle={this.handleSignInPwd}
                                        value={this.props.pwd}
                                        placeholder={'비밀번호'}
                                        icon={'lock'}
                                        secureText={true}
                                        bounce={this.props.signInCheck}
                                    />
                                    {this.renderSignInButton()}


                                </View>
                                <View style={styles.linkView}>
                                    <LinkText
                                        value={'비밀번호 찾기'}
                                        handle={this.handleFindPwdModal}
                                        link_style={{alignSelf:'flex-start', fontSize:14, color: 'black'}}/>
                                    <View style={{alignSelf:'center', width:10}}/>
                                    <LinkText
                                        value={'가입하기'}
                                        handle={this.handleSignUpModal}
                                        link_style={{alignSelf:'flex-end', fontSize:14, color: 'black'}}/>
                                </View>

                            </Animated.View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

export default connect((state) => ({
        login: state.signin.login,
        id: state.signin.id,
        pwd: state.signin.pwd,
        auto: state.signin.auto,
        signInButton: state.signin.signInButton,

        register: state.signin.register,
        currentPosition: state.signin.currentPosition,
        termsModal: state.signin.termsModal,
        userIdCheckModal: state.signin.userIdCheckModal,
        userEmailCheckModal: state.signin.userEmailCheckModal,
        userNickNameCheckModal: state.signin.userNickNameCheckModal,
        userPasswordCheckModal: state.signin.userPasswordCheckModal,
        isFirstChecked: state.signin.isFirstChecked,
        isSecondChecked: state.signin.isSecondChecked,
        isAllChecked: state.signin.isAllChecked,

        firstVisible: state.signin.firstVisible,
        secondVisible: state.signin.secondVisible,
        userId: state.signin.userId,
        userPw: state.signin.userPw,
        userRePw: state.signin.userRePw,
        userNickName: state.signin.userNickName,
        userEmail: state.signin.userEmail,

        major: state.signin.major,
        minor: state.signin.minor,
        doubleMajor: state.signin.doubleMajor,
        connectedMajor: state.signin.connectedMajor,
        admissionYear: state.signin.admissionYear,
        checkIdNo: state.signin.checkIdNo,
        checkIdLabel: state.signin.checkIdLabel,
        checkIdClient: state.signin.checkIdClient,
        checkIdServer: state.signin.checkIdServer,

        checkNickNameNo: state.signin.checkNickNameNo,
        checkNickNameLabel: state.signin.checkNickNameLabel,
        checkNickNameClient: state.signin.checkNickNameClient,
        checkNickNameServer: state.signin.checkNickNameServer,

        checkEmailNo: state.signin.checkEmailNo,
        checkEmailLabel: state.signin.checkEmailLabel,
        checkEmailClient: state.signin.checkEmailClient,
        checkEmailServer: state.signin.checkEmailServer,

        checkPasswordNo: state.signin.checkPasswordNo,
        checkPasswordLabel: state.signin.checkPasswordLabel,
        checkPassRe: state.signin.checkPassRe,
        checkPassReLabel: state.signin.checkPassReLabel,
        checkPassword: state.signin.checkPassword,
        checkRePassword: state.signin.checkRePassword,
        term1: state.signin.term1,
        term2: state.signin.term2,

        findPwd: state.signin.findPwd, //비번찾기
        findPwdUserId: state.signin.findPwdUserId,
        findPwdCheckNo: state.signin.findPwdCheckNo,
        findPwdCheckLabel: state.signin.findPwdCheckLabel,

        findPwdResult: state.signin.findPwdResult,
        findPwdResultTitle: state.signin.findPwdResultTitle,

        signInCheck: state.signin.signInCheck,
    }),
    (dispatch) => ({
        SignIn: bindActionCreators(signin, dispatch)
    })
)(SignInScreen);