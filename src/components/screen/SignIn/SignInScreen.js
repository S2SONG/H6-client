import React from 'react';
import {Alert, View, Text, Animated, AsyncStorage} from 'react-native';
import {LinearGradient} from 'expo';
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
import StepIndicator from 'react-native-step-indicator';
import RoundCheckbox from 'rn-round-checkbox';
import {TermsModal} from "../../ui/TermsModal";
import {SignUpMajor} from "../../ui/SignUpMajor";
import {SignUpDatePicker} from "../../ui/SignUpDatePicker";
import Toast, {DURATION} from 'react-native-easy-toast';
import {validation} from "../../../utils/validations";
import {WarningModal} from "../../ui/WarningModal";

const labels = ["가입동의","기본정보","부가정보"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#0b6aff',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#0b6aff',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#0b6aff',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#0b6aff',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#0b6aff',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#0b6aff'
};


class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this._opacity = new Animated.Value(0);
        this.state = {
            id: '',
            pwd: '',
            register:false,
            termsModal:false,
        }
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
                duration: 500,
                // ease: Easing.inout(),
                delay: 200,
            }            // Configuration
        ).start();                // Don't forget start!
        this.autoLogin();
    }

    //로그인화면 id 입력
    handleSignInId = (id) => {
        const {SignIn} = this.props;
        SignIn.handleSignInId(id);
    };

    //로그인화면 password 입력
    handleSignInPwd = (pwd) => {
        const {SignIn} = this.props;
        SignIn.handleSignInPwd(pwd);
    };

    //로그인버튼 클릭 시
    signInUser = async () => {
        const {SignIn} = this.props;
        await SignIn.signInUser(this.props.id, this.props.pwd);
        this.loginResult();
    };

    //로그인 결과
    loginResult = () => {
        if (this.props.login === true) {
            this.props.navigation.navigate('Home');
        } else {
            Alert.alert(
                '로그인 오류',
                '아이디와 비밀번호를 확인해 주세요',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
    };

    //회원가입 클릭 시 동의화면 이동
    handleSignUpModal = () => {
        const {SignIn} = this.props;
        SignIn.initSignUpState();
        SignIn.handleSignUpModal();
    };

    //약관동의 처리
    handleTerms = () => {
        this.setState({
            termsModal:!this.state.termsModal
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
        if(this.returnChecked()){
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
        if (validation.checkIdLength(userId)) {
            if(userId.length==0){
                SignIn.handleSignUpCheckUserIdClient(false);
                SignIn.handleSignUpCheckUserIdNo(0);
                SignIn.handleSignUpCheckUserIdLabel('');
            }else{
                SignIn.handleSignUpCheckUserIdClient(true);
                SignIn.handleSignUpCheckUserIdNo(0);
                SignIn.handleSignUpCheckUserIdLabel('');
            }
        } else {
            SignIn.handleSignUpCheckUserIdClient(false);
            SignIn.handleSignUpCheckUserIdNo(1);
            SignIn.handleSignUpCheckUserIdLabel('아이디는 6자 이상이여야 합니다.');
        }
        SignIn.handleSignUpUserId(userId);
    };
    handleCheckUserId = async () => {
      const {SignIn} = this.props;
      if(this.props.checkIdClient && this.props.userId.length > 0) {
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
        if(validation.checkNickNameLength(userNickName)){
            if(userNickName.length==0) {
                SignIn.handleSignUpCheckUserNickNameClient(false);
                SignIn.handleSignUpCheckUserNickNameNo(0);
                SignIn.handleSignUpCheckUserNickNameLabel('');
            }
            else {
                SignIn.handleSignUpCheckUserNickNameClient(true);
                SignIn.handleSignUpCheckUserNickNameNo(0);
                SignIn.handleSignUpCheckUserNickNameLabel('');
            }
        }else{
            SignIn.handleSignUpCheckUserNickNameClient(false);
            SignIn.handleSignUpCheckUserNickNameNo(1);
            SignIn.handleSignUpCheckUserNickNameLabel('닉네임은 두글자 이상이여야 합니다.');
        }
        SignIn.handleSignUpUserNickName(userNickName);
    };
    handleCheckUserNickName = async () => {
      const {SignIn} = this.props;
      if(this.props.checkNickNameClient && this.props.userNickName.length > 0) {
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
        if(validation.checkEmail(userEmail)){
            SignIn.handleSignUpCheckUserEmailClient(true);
            SignIn.handleSignUpCheckUserEmailNo(0);
            SignIn.handleSignUpCheckUserEmailLabel('');
        }else{
            if(userEmail.length==0) {
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
        if(this.props.checkEmailClient && this.props.userEmail.length > 0) {
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
        if(validation.checkPassLength(userPw)) {
            if(userPw.length==0) {
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
            SignIn.handleSignUpCheckUserPasswordLabel('8자 이상 입력 해주세요');
        }

        if(userPw.length==0 || !validation.checkPassLength(userPw)){
            SignIn.handleSignUpCheckUserRePassword(false);
            SignIn.handleSignUpCheckUserRePasswordNo(0);
            SignIn.handleSignUpCheckUserRePasswordLabel('');
        } else if(userPw.length > 0 && this.props.userRePw.length > 0 && validation.checkPassCompare(userPw, this.props.userRePw)){
            SignIn.handleSignUpCheckUserRePassword(true);
            SignIn.handleSignUpCheckUserRePasswordNo(2);
            SignIn.handleSignUpCheckUserRePasswordLabel('비밀번호가 일치 합니다');
        } else if(userPw.length > 0 && this.props.userRePw.length > 0 && !validation.checkPassCompare(userPw, this.props.userRePw)){
            SignIn.handleSignUpCheckUserRePassword(false);
            SignIn.handleSignUpCheckUserRePasswordNo(1);
            SignIn.handleSignUpCheckUserRePasswordLabel('비밀번호가 불일치 합니다');
        }
    };

    handleStateUserRePw = (userRePw) => {
        const {SignIn} = this.props;
        // this.setState({userRePw});
        SignIn.handleSignUpUserRePwd(userRePw);
        if((this.props.userPw.length == 0 || !validation.checkPassLength(this.props.userPw)) || userRePw.length == 0){
            SignIn.handleSignUpCheckUserRePassword(false);
            SignIn.handleSignUpCheckUserRePasswordNo(0);
            SignIn.handleSignUpCheckUserRePasswordLabel('');
        } else if (validation.checkPassCompare(this.props.userPw, userRePw)){
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
        SignIn.handleSignUpCurrentPosition(this.props.currentPosition+diff);
    };
    renderModalHeader = (page) => {
        if(this.props.currentPosition!==0)
            return(<Icon name="arrow-left" type="font-awesome" style={{alignSelf:'flex-start'}} onPress={()=>{this.onPageChange(-1)}}/>);
        else{
            return(<View style={{alignSelf:'flex-start'}}></View>);
        }
    };
    renderModalBody = (page) => {

        switch(page){
            case 0:
                return(
                    <View style={{flex:1, marginTop:20}}>
                        <View style={{flexDirection:'row', alignItems:'center', height:40, width:280, marginBottom:10, padding:10, borderWidth:1}}>
                            <RoundCheckbox
                                size={24}
                                checked={this.props.isFirstChecked}
                                onValueChange={this.handleTermsFirstCheck}
                            />
                            <Text style={{width:180, marginLeft:10}}>
                                개인정보 수집 및 이용 (필수)
                            </Text>
                            <LinkText
                                value='보기'
                                handle={this.handleTermsFirstModalOpen}
                                link_style={{color:'grey'}}
                            />
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', height:40, width:280, marginBottom:10, padding:10, borderWidth:1}}>
                            <RoundCheckbox
                                size={24}
                                checked={this.props.isSecondChecked}
                                onValueChange={this.handleTermsSecondCheck}
                            />
                            <Text style={{width:180, marginLeft:10}}>
                                한담 서비스 이용 약관 (필수)
                            </Text>
                            <LinkText
                                value='보기'
                                handle={this.handleTermsSecondModalOpen}
                                link_style={{color:'grey'}}
                            />
                        </View>
                    </View>
                );
            case 1:
                return(
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <SignTextInput handle={this.handleStateUserId}
                                       value={this.props.userId}
                                       placeholder={'아이디'}
                                       icon={'user'}
                                       label={'아이디'}
                                       checkNo={this.props.checkIdNo}
                                       checkLabel={this.props.checkIdLabel}
                                       blur={this.handleCheckUserId}
                        />
                        <SignTextInput handle={this.handleStateUserPw}
                                       value={this.props.userPw}
                                       placeholder={'비밀번호'}
                                       icon={'lock'}
                                       secureText={true}
                                       label={'비밀번호'}
                                       checkNo={this.props.checkPasswordNo}
                                       checkLabel={this.props.checkPasswordLabel}
                        />
                        <SignTextInput handle={this.handleStateUserRePw}
                                       value={this.props.userRePw}
                                       placeholder={'비밀번호 확인'}
                                       icon={'lock'}
                                       secureText={true}
                                       label={'비밀번호 확인'}
                                       checkNo ={this.props.checkPassRe}
                                       checkLabel={this.props.checkPassReLabel}
                        />
                        <SignTextInput handle={this.handleStateUserNickName}
                                       value={this.props.userNickName}
                                       placeholder={'닉네임'}
                                       icon={'user-secret'}
                                       label={'닉네임'}
                                       checkNo={this.props.checkNickNameNo}
                                       checkLabel={this.props.checkNickNameLabel}
                                       blur={this.handleCheckUserNickName}
                        />
                        <SignTextInput handle={this.handleStateUserEmail}
                                       value={this.props.userEmail}
                                       placeholder={'이메일'}
                                       icon={'envelope'}
                                       label={'이메일'}
                                       checkNo={this.props.checkEmailNo}
                                       checkLabel={this.props.checkEmailLabel}
                                       blur={this.handleCheckUserEmail}
                        />
                    </View>
                );
            case 2:
                return(
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
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
      switch(page){
          case 0:
              return(
                  <View>
                      <Button onPress={this.nextTerms} title="다음"/>
                  </View>
              );
          case 1:
              return(
                  <View>
                      <Button onPress={this.basicChecked} title="다음"/>
                  </View>
              );
          case 2:
              return(
                  <View>
                      <Button onPress={this.signUpUser} title="가입 완료"/>
                  </View>
              );
      }
    };

    basicChecked = async () => {
        const { SignIn } = this.props;
        if(!this.props.checkIdClient)
            return this.handleCheckUserIdModal();
        let checkid = await SignIn.checkUserId(this.props.userId);
        if(!checkid) return this.handleCheckUserIdModal();

        if(!this.props.checkNickNameClient)
            return this.handleCheckUserNickNameModal();
        let checknickname = await SignIn.checkUserNickName(this.props.userNickName);
        if(!checknickname) return this.handleCheckUserNickNameModal();

        if(this.props.userEmail.length > 0) {
            if (!this.props.checkEmailClient)
                return this.handleCheckUserEmailModal();
            let checkemail = await SignIn.checkUserEmail(this.props.userEmail);
            if (!checkemail) return this.handleCheckUserEmailModal();
        }else{
            return this.handleCheckUserEmailModal();
        }
        if(!(this.props.checkPassword && this.props.checkRePassword))
            return this.handleCheckUserPasswordModal();
        this.onPageChange(1);
    };
    signUpUser = async () => {
      const {SignIn} = this.props;
      const {userId, userPw, userNickName, userEmail, major, minor, doubleMajor, connectedMajor, admissionYear} = this.props;
      let signUpCheck = await SignIn.signUpUser(userId, userPw, userNickName, userEmail, major, minor, doubleMajor, connectedMajor, admissionYear);
      if(signUpCheck){
          this.handleSignUpModal();
          this.refs.toast.show('회원가입에 성공했습니다.');
      } else {

      }
    };

    autoLogin = async () => {
        const {SignIn} = this.props;
        // const token = await AsyncStorage.getItem('token');
        // if(token !== null){
        //     this.props.navigation.navigate('Home');
        // }
        SignIn.handleAuto(true);
    };

    render() {
        const animation = this._opacity;
        if(!this.props.auto){
            return(
                <DotIndicator color='white' />
            )
        }
        return (
            <LinearGradient
                colors={[config.main_background_color1, config.main_background_color2, config.main_background_color3]}
                style={styles.container}
            >
                <Toast ref="toast"/>
                <Modal isVisible={this.props.register}>
                    <TermsModal
                        closeModal = { this.handleTermsFirstModalClose }
                        modalVisible = { this.props.firstVisible }
                        title = '개인정보 수집 및 이용'
                        htmlContent={this.props.term1}
                    />
                    <TermsModal
                        closeModal = { this.handleTermsSecondModalClose }
                        modalVisible = { this.props.secondVisible }
                        title = '한담 서비스 이용 약관'
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
                    <View style={{ flex: 1,justifyContent:'center', alignItems:'center'}}>
                        <View style={{height:600, width:300, backgroundColor:'#ffffff'}}>
                            <View name='header' style={{flex:1, flexDirection:'row', justifyContent: 'space-between', height:60, width:300, padding:10}}>
                                {this.renderModalHeader(this.props.currentPosition)}
                                <Icon name="times" type="font-awesome" style={{alignSelf:'flex-end'}}  onPress={this.handleSignUpModal}/>
                            </View>
                            <View name='body' style={{height:480, width:300, padding:10}}>
                                <StepIndicator
                                    stepCount={3}
                                    customStyles={customStyles}
                                    currentPosition={this.props.currentPosition}
                                    labels={labels}
                                />
                                {this.renderModalBody(this.props.currentPosition)}
                            </View>
                            <View name='footer' style={{height:60, width:300, padding:10}}>
                                {this.renderModalFooter(this.props.currentPosition)}
                            </View>
                        </View>
                    </View>
                </Modal>

                <Animated.View style={{opacity: animation}}>
                    <SignTextInput
                        handle={this.handleSignInId}
                        value={this.props.id}
                        placeholder={'아이디'}
                        icon={'user'}
                    />
                    <SignTextInput
                        handle={this.handleSignInPwd}
                        value={this.props.pwd}
                        placeholder={'비밀번호'}
                        icon={'lock'}
                        secureText={true}
                    />
                    <Button
                        title='로그인'
                        titleStyle={styles.buttonText}
                        buttonStyle={styles.button}
                        onPress={this.signInUser}
                    />
                    <View style={styles.linkView}>
                        <LinkText
                            value='회원가입'
                            handle={this.handleSignUpModal}
                            link_style={{color:'white'}}
                        />
                        <Text> </Text>
                        <Text
                            style={styles.link}

                        >
                            아이디/비밀번호 찾기
                        </Text>
                    </View>
                </Animated.View>
            </LinearGradient>
        );
    }
}

export default connect((state) => ({
        login: state.signin.login,
        id: state.signin.id,
        pwd: state.signin.pwd,
        auto: state.signin.auto,

        register: state.signin.register,
        currentPosition: state.signin.currentPosition,
        termsModal: state.signin.termsModal,
        userIdCheckModal: state.signin.userIdCheckModal,
        userEmailCheckModal: state.signin.userEmailCheckModal,
        userNickNameCheckModal: state.signin.userNickNameCheckModal,
        userPasswordCheckModal: state.signin.userPasswordCheckModal,
        isFirstChecked: state.signin.isFirstChecked,
        isSecondChecked: state.signin.isSecondChecked,
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
    }),
    (dispatch) => ({
        SignIn: bindActionCreators(signin, dispatch)
    })
)(SignInScreen);