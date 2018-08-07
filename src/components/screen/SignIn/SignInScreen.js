import React from 'react';
import {Alert, View, Text, TextInput, Animated, AsyncStorage, ScrollView, KeyboardAvoidingView, Keyboard, SafeAreaView, StatusBar, TouchableHighlight, Image} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {DotIndicator} from 'react-native-indicators';
import styles from "./SignInStyles";
import config from "../../../../config";
import {SignTextInput} from "../../ui/SignTextInput";
import {LinkText} from "../../ui/LinkText";
import * as signin from "../../../modules/signin";
import {validation} from "../../../utils/validations";
import {handleFindPwdModal} from "../../../modules/signin";
import {SignInButton} from "./ui/SignInButton";
import {CustomModal} from "../../ui/CustomModal";
import Toast from 'react-native-root-toast';

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
            keyboardSpace: 0,
        };
        // Keyboard.addListener('keyboardDidShow', (frames) => {
        //     if (!frames.endCoordinates) return;
        //     this.setState({keyboardSpace: frames.endCoordinates.height});
        // });
        // Keyboard.addListener('keyboardDidHide', (frames) => {
        //     this.setState({keyboardSpace: 0})
        // });

    }

    async componentDidMount() {
        const {SignIn} = this.props;
        await SignIn.initSignInState();
        await SignIn.initSignUpState();
        SignIn.signUpTerm1();
        SignIn.signUpTerm2();
        SignIn.trackList();
        SignIn.admissionYear();
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
        SignIn.appVersion();
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
    };
    //회원가입 클릭 시 동의화면 이동
    handleSignUpModal = () => {
        this.props.navigation.navigate('SignUpOne');
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


    renderSignInButton = () => {
        if(this.props.signInButton)
            return <SignInButton title={'시작하기'} handle={this.signInUser} iconColor={'white'} textColor={'white'} backgroundColor={'#4a4a4a'}/>
        else
            return <SignInButton title={'시작하기'} iconColor={'#fff'} textColor={'white'} backgroundColor={'#4a4a4a4D'}/>
    };

    autoLogin = async () => {
        const {SignIn} = this.props;
        await SignIn.checkToken();
        SignIn.handleAuto(true);
    };

    renderUnderLabel = () => {
        if (this.props.findPwdCheckNo == 0) {
            return <Text style={styles.findPwdModalTextInputLabel}>   </Text>;
        } else if (this.props.findPwdCheckNo == 1) {
            return (<Text style={styles.findPwdModalTextInputLabel}>{this.props.findPwdCheckLabel}</Text>)
        } else {
            return (<Text style={styles.findPwdModalTextInputLabelTrue}>{this.props.findPwdCheckLabel}</Text>)
        }
    };
    renderFindPwdModalBody = () => {
      return(
          <View>
            <Text style={styles.findPwdModalText}>{'가입시 입력한 이메일로\n임시 비밀번호를 전송합니다.'}</Text>
            <View style={styles.findPwdModalTextInput}>
                <TextInput
                    onChangeText={this.handleFindPwdUserId}
                    value={this.props.findPwdUserId}
                    style={styles.findPwdModalTextInputText}
                    underlineColorAndroid="transparent"
                    placeholder={'이메일을 입력해주세요.'}
                />
            </View>
            {this.renderUnderLabel()}
          </View>
      )
    };
    renderFindPwdResultModalBody = () => {
        return(
            <View>
                <Text style={styles.findPwdModalResultText}>{this.props.findPwdResultTitle}</Text>
            </View>
        )
    };

    render() {
        const {SignIn} = this.props;
        const animation = this._opacity;
        if (!this.props.auto) {
            return (
                <DotIndicator color='white'/>
            )
        }
        return (

            <SafeAreaView
                style={styles.container}
                behavior="padding" enabled>

                <CustomModal
                    visible={this.props.findPwd} ratio={'75%'}
                    width={280} height={291}
                    close={this.handleFindPwdModalClose} title={'비밀번호 찾기'} body={this.renderFindPwdModalBody} footerText={'이메일 전송'} footerHandle={this.sendFindPwd} footer={this.props.findPwdCheckNo==2?true:false}/>
                <CustomModal
                    width={280} height={156} ratio={'75%'}
                    visible={this.props.findPwdResult} body={this.renderFindPwdResultModalBody}
                    footerText={'확인'} footerHandle={this.handleFindPwdResultClose} footer={true}/>
                <Toast
                    visible={this.props.signUpToast}
                    position={Toast.positions.BOTTOM}
                    shadow={false}
                    animation={true}
                    hideOnPress={true}
                    onShown={()=>setTimeout(function () {SignIn.handleSignUpToast(false)}, 1500)}
                    >회원가입 성공!</Toast>
                <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>

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
                                        backgroundColor:'transparent',
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
                                    <View style={{height:40,}}></View>
                                    {this.renderSignInButton()}
                                </View>


                            </Animated.View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Animated.View style={{opacity: animation}}>
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
            </SafeAreaView>
        );
    }
}

export default connect((state) => ({
        login: state.signin.login,
        id: state.signin.id,
        pwd: state.signin.pwd,
        auto: state.signin.auto,
        signInButton: state.signin.signInButton,


        term1: state.signin.term1,
        term2: state.signin.term2,

        findPwd: state.signin.findPwd, //비번찾기
        findPwdUserId: state.signin.findPwdUserId,
        findPwdCheckNo: state.signin.findPwdCheckNo,
        findPwdCheckLabel: state.signin.findPwdCheckLabel,

        findPwdResult: state.signin.findPwdResult,
        findPwdResultTitle: state.signin.findPwdResultTitle,

        signInCheck: state.signin.signInCheck,
        signUpToast: state.signin.signUpToast
    }),
    (dispatch) => ({
        SignIn: bindActionCreators(signin, dispatch)
    })
)(SignInScreen);