import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import {Button,Icon} from 'react-native-elements';
import {connect} from "react-redux";
import * as signin from "../../../modules/signin";
import {bindActionCreators} from 'redux';
import {SignUpIndicator} from "./ui/SignUpIndicator";
import {SignUpTextInput} from "../../ui/SignUpTextInput";
import {validation} from "../../../utils/validations";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAvoidingView } from 'react-native';


class SignUpScreen2 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id:false,
            pwd:false,
            rePwd:false,
            nickName:false,
            checkId:true,
            checkNic:true,
            changePage:false,
            changePage2:false
        };
    }
    navigationGoBack = () => {
        const {SignInTwo} = this.props;

        // this.props.navigation.goBack();
        this.props.navigation.goBack();


    };
    xButton = () => {
        // const {SignIn} = this.props;
        // SignIn.initSignUpState();
        // SignIn.handleSignUpModal();
        const {SignInTwo} = this.props;

        SignInTwo.handleTermsAll(false);
        SignInTwo.handleSignInScreen1Button('#ffffff');
        SignInTwo.handleSignInScreen1Button2('#c5c4c4');
        SignInTwo.handleChangeFontColor('#000000');
        SignInTwo.handleSignUpUserId('');
        SignInTwo.handleSignUpUserPwd('');
        SignInTwo.handleSignUpUserRePwd('');
        SignInTwo.handleSignUpUserNickName('');
        SignInTwo.handleSignInScreen2Button('#c5c4c4');

        this.props.navigation.navigate('SignIn');
        // this.attendee.setNativeProps({ text: '' })
    };
    handleStateUserId = async (userId) => {
        const {SignInTwo} = this.props;
        let checkId;

        if(validation.checkEmail(userId)){
            if (userId.length == 0) {
                SignInTwo.handleSignUpCheckUserIdClient(false);
                SignInTwo.handleSignUpCheckUserIdNo(0);
                SignInTwo.handleSignUpCheckUserIdLabel('');
                this.state.id=false;
            } else {
                SignInTwo.handleSignUpCheckUserIdClient(true);
                SignInTwo.handleSignUpCheckUserIdNo(0);
                SignInTwo.handleSignUpCheckUserIdLabel('');
                this.state.id=true;
            }
            // console.log(this.props.checkNickNameClient);
            // if (this.props.checkIdClient){
            //     console.log(this.props.checkIdClient);
            //     checkId = await SignInTwo.checkUserId(userId);
            //     if (!checkId){
            //         SignInTwo.handleSignUpCheckUserIdNo(1);
            //         this.state.checkId=false;
            //     }
            //     else{
            //         this.state.checkId=true;
            //     }
            // }
        }
        else {
            SignInTwo.handleSignUpCheckUserIdClient(false);
            SignInTwo.handleSignUpCheckUserIdNo(1);
        }
        SignInTwo.handleSignUpUserId(userId);
        if(this.state.id&&this.state.pwd&&this.state.rePwd&&this.state.nickName&&this.state.checkId&&this.state.checkNic){
            SignInTwo.handleSignInScreen2Button('#4a4a4a');
        }
        else{
            SignInTwo.handleSignInScreen2Button('#c5c4c4');
        }
    };
    handleStateUserPw = (userPw) => {
        const {SignInTwo} = this.props;
        SignInTwo.handleSignUpUserPwd(userPw);
        if (validation.checkPassLength(userPw)) {
            if (userPw.length == 0) {
                SignInTwo.handleSignUpCheckUserPassword(false);
                SignInTwo.handleSignUpCheckUserPasswordNo(0);
                // SignInTwo.handleSignUpCheckUserPasswordLabel('');
            } else {
                SignInTwo.handleSignUpCheckUserPassword(true);
                SignInTwo.handleSignUpCheckUserPasswordNo(0);
                this.state.pwd=true;
            }
        } else {
            SignInTwo.handleSignUpCheckUserPassword(false);
            SignInTwo.handleSignUpCheckUserPasswordNo(1);
        }

        if (userPw.length == 0 || !validation.checkPassLength(userPw)) {
            SignInTwo.handleSignUpCheckUserRePassword(false);
            SignInTwo.handleSignUpCheckUserRePasswordNo(0);
            SignInTwo.handleSignUpCheckUserRePasswordLabel('');
        } else if (userPw.length > 0 && this.props.userRePw.length > 0 && validation.checkPassCompare(userPw, this.props.userRePw)) {
            SignInTwo.handleSignUpCheckUserRePassword(true);
            SignInTwo.handleSignUpCheckUserRePasswordNo(2);
            this.state.pwd=true;

            // SignInTwo.handleSignUpCheckUserRePasswordLabel('비밀번호가 일치 합니다');
        } else if (userPw.length > 0 && this.props.userRePw.length > 0 && !validation.checkPassCompare(userPw, this.props.userRePw)) {
            SignInTwo.handleSignUpCheckUserRePassword(false);
            SignInTwo.handleSignUpCheckUserRePasswordNo(1);
            this.state.pwd=false;
            // SignInTwo.handleSignUpCheckUserRePasswordLabel('비밀번호가 불일치 합니다');
        }
        if(this.state.id&&this.state.pwd&&this.state.rePwd&&this.state.nickName&&this.state.checkId&&this.state.checkNic){
            // console.log('버튼 색 바꾸자');
            SignInTwo.handleSignInScreen2Button('#4a4a4a');
        }
        else{
            SignInTwo.handleSignInScreen2Button('#c5c4c4');

        }

    };
    handleStateUserRePw = (userRePw) => {
        const {SignInTwo} = this.props;
        // this.setState({userRePw});
        SignInTwo.handleSignUpUserRePwd(userRePw);
        if ((this.props.userPw.length == 0 || !validation.checkPassLength(this.props.userPw)) || userRePw.length == 0) {
            SignInTwo.handleSignUpCheckUserRePassword(false);
            SignInTwo.handleSignUpCheckUserRePasswordNo(0);
            SignInTwo.handleSignUpCheckUserRePasswordLabel('');
        } else if (validation.checkPassCompare(this.props.userPw, userRePw)) {
            SignInTwo.handleSignUpCheckUserRePassword(true);
            SignInTwo.handleSignUpCheckUserRePasswordNo(2);
            this.state.rePwd=true;
        } else {
            SignInTwo.handleSignUpCheckUserRePassword(false);
            SignInTwo.handleSignUpCheckUserRePasswordNo(1);
            this.state.rePwd=false;
        }
        if(this.state.id&&this.state.pwd&&this.state.rePwd&&this.state.nickName&&this.state.checkId&&this.state.checkNic){
            SignInTwo.handleSignInScreen2Button('#4a4a4a');
        }
        else{
            SignInTwo.handleSignInScreen2Button('#c5c4c4');
        }
    };
    handleStateUserNickName = async (userNickName) => {
        const {SignInTwo} = this.props;
        let checkNickname;

        if (validation.checkNickNameLength(userNickName)) {
            if (userNickName.length == 0) {
                SignInTwo.handleSignUpCheckUserNickNameClient(false);
                SignInTwo.handleSignUpCheckUserNickNameNo(0);
                SignInTwo.handleSignUpCheckUserNickNameLabel('');

            }
            else {
                SignInTwo.handleSignUpCheckUserNickNameClient(true);
                SignInTwo.handleSignUpCheckUserNickNameNo(0);
                SignInTwo.handleSignUpCheckUserNickNameLabel('');
                this.state.nickName=true;
            }

        }
        else {
            SignInTwo.handleSignUpCheckUserNickNameClient(false);
            SignInTwo.handleSignUpCheckUserNickNameNo(1);
            this.state.nickName=false;


        }
        if(this.state.id&&this.state.pwd&&this.state.rePwd&&this.state.nickName&&this.state.checkId&&this.state.checkNic){
            SignInTwo.handleSignInScreen2Button('#4a4a4a');
        }
        else{
            SignInTwo.handleSignInScreen2Button('#c5c4c4');

        }
        SignInTwo.handleSignUpUserNickName(userNickName);
    };
    handleCheckUserNickName = async () => {
        const {SignInTwo} = this.props;
        let checkNickname;
        // console.log(userNickName);
        if(validation.checkNickNameLength(this.props.userNickName)){
            checkNickname = await SignInTwo.checkUserNickName(this.props.userNickName);
            console.log('checkNick='+checkNickname);
            if (!checkNickname) {
                SignInTwo.handleSignUpCheckUserNickNameNo(1);
                this.state.checkNic = false;
                this.state.changePage2=false;


            }
            else {
                this.state.checkNic = true;
                this.state.changePage2=true;

            }

        }
        if(this.state.id&&this.state.pwd&&this.state.rePwd&&this.state.nickName&&this.state.checkId&&this.state.checkNic){
            SignInTwo.handleSignInScreen2Button('#4a4a4a');
        }
        else{
            SignInTwo.handleSignInScreen2Button('#c5c4c4');

        }

    };
    handleCheckUserId = async() =>{
        let checkId;
        const {SignInTwo} = this.props;
        console.log(this.props.userId);
        if(validation.checkEmail(this.props.userId)){
            // console.log(this.props.checkIdClient);
            checkId = await SignInTwo.checkUserId(this.props.userId);
            if (!checkId){
                SignInTwo.handleSignUpCheckUserIdNo(1);
                this.state.checkId=false;
                this.state.changePage=false;

            }
            else{
                this.state.checkId=true;
                this.state.changePage=true;

            }
        }
        if(this.state.id&&this.state.pwd&&this.state.rePwd&&this.state.nickName&&this.state.checkId&&this.state.checkNic){
            SignInTwo.handleSignInScreen2Button('#4a4a4a');
        }
        else{
            SignInTwo.handleSignInScreen2Button('#c5c4c4');

        }

    };
    //     if (this.props.checkNickNameClient && this.props.userNickName.length > 0) {
    //         const result = await SignIn.checkUserNickName(this.props.userNickName);
    //         if (result) {
    //             SignInTwo.handleSignUpCheckUserNickNameServer(true);
    //             SignInTwo.handleSignUpCheckUserNickNameNo(2);
    //             SignInTwo.handleSignUpCheckUserNickNameLabel('사용 가능한 닉네임 입니다.');
    //         } else {
    //             SignInTwo.handleSignUpCheckUserNickNameServer(false);
    //             SignInTwo.handleSignUpCheckUserNickNameNo(1);
    //             SignInTwo.handleSignUpCheckUserNickNameLabel('사용 불가능한 닉네임 입니다.');
    //         }
    //     } else {
    //         SignInTwo.handleSignUpCheckUserNickNameServer(false);
    //     }
    // };
    nextTerms = () =>{
        this.props.navigation.navigate('SignUpThree');

    };
    handleCheckUserIdModal = () => {
        const {SignInTwo} = this.props;
        SignInTwo.handleSignUpUserIdModal(!this.props.userIdCheckModal);
    };
    handleCheckUserEmailModal = () => {
        const {SignInTwo} = this.props;
        SignInTwo.handleSignUpUserEmailModal(!this.props.userEmailCheckModal);
    };

    handleCheckUserNickNameModal = () => {
        const {SignInTwo} = this.props;
        SignInTwo.handleSignUpUserNickNameModal(!this.props.userNickNameCheckModal);
    };

    handleCheckUserPasswordModal = () => {
        const {SignInTwo} = this.props;
        SignInTwo.handleSignUpUserPwdModal(!this.props.userPasswordCheckModal);
    };
    basicChecked = async () => {
        const {SignInTwo} = this.props;

        // return this.handleCheckUserIdModal();
        // let checkid = await SignInTwo.checkUserId(this.props.userId);
        // if (!checkid) return this.handleCheckUserIdModal();
        //
        // if (!this.props.checkNickNameClient)
        //     return this.handleCheckUserNickNameModal();
        // let checknickname = await SignInTwo.checkUserNickName(this.props.userNickName);
        // if (!checknickname) return this.handleCheckUserNickNameModal();

        // if (this.props.userEmail.length > 0) {
        //     if (!this.props.checkEmailClient)
        //         return this.handleCheckUserEmailModal();
        //     let checkemail = await SignIn.checkUserEmail(this.props.userEmail);
        //     if (!checkemail) return this.handleCheckUserEmailModal();
        // }
        console.log(this.state.changePage);
        console.log(this.state.changePage2);

        if (!(this.props.checkPassword && this.props.checkRePassword))
            return this.handleCheckUserPasswordModal();
        // 3번째 page
        SignInTwo.trackList();
        SignInTwo.AdmissionYear();
        if(this.state.changePage&&this.state.changePage2) {
            this.nextTerms();
        }

    };

    render() {

        return (

            <SafeAreaView style={{
                flex: 1,
                backgroundColor:'#FFFFFF'}}>
                <StatusBar backgroundColor="#717882"
                           translucent={true}
                />
                <KeyboardAwareScrollView>

                    <View style={{flex: 1, justifyContent: 'center',marginTop:19}}>
                        <View style ={{flexDirection:'row',justifyContent: 'space-between'}}>
                            <View style={{marginLeft:10}}>
                                <Icon name={'ios-arrow-back-outline'} type='ionicon' size={40} color={'black'} style={{alignSelf:'flex-first'}}  onPress={this.navigationGoBack}/>

                            </View>
                            <View style={{marginRight:10}}>
                                <Icon name="md-close" type="ionicon" size={40} color={'black'} style={{alignSelf:'flex-end'}} onPress ={this.xButton} />
                            </View>
                        </View>

                    </View>
                    <View style={{marginTop:15,marginLeft:10}}>
                        <Text style={{fontSize:17,alignSelf:'flex-start',fontWeight: 'bold'}}> 회원가입 </Text>
                    </View>


                    <View style={{flex:4}}>
                        <View style ={{marginBottom:50,marginTop:20}}>
                            <SignUpIndicator max={3} position={1} />
                        </View>


                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // paddingTop: this.state.keyboardSpace ? 40 : 0,
                            // paddingBottom: this.state.keyboardSpace ? 65 : 0
                        }} behavior="padding" enabled>



                            <SignUpTextInput handle={this.handleStateUserId}
                                             value={this.props.userId}
                                             placeholder={'이메일'}
                                             icon={'user'}
                                             label={'이메일'}
                                             checkNo={this.props.checkIdNo}
                                             checkLabel={this.props.checkIdLabel}
                                             blur={this.handleCheckUserId}
                                             changePlaceholder={'정확한 이메일 형태를 입력'}
                                             inputFontSize={this.props.inputFontSize}
                            />


                            <SignUpTextInput handle={this.handleStateUserPw}
                                             value={this.props.userPw}
                                             placeholder={'비밀번호'}
                                             icon={'lock'}
                                             secureText={true}
                                             label={'비밀번호'}
                                             checkNo={this.props.checkPasswordNo}
                                             checkLabel={this.props.checkPasswordLabel}
                                             changePlaceholder={'특수문자를 포함한 6자리 이상'}
                            />
                            <SignUpTextInput handle={this.handleStateUserRePw}
                                             value={this.props.userRePw}
                                             placeholder={'비밀번호 확인'}
                                             icon={'lock'}
                                             secureText={true}
                                             label={'비밀번호 확인'}
                                             checkNo={this.props.checkPassRe}
                                             checkLabel={this.props.checkPassReLabel}
                                             changePlaceholder={'한번 더'}


                            />

                            <SignUpTextInput handle={this.handleStateUserNickName}
                                             value={this.props.userNickName}
                                             placeholder={'닉네임'}
                                             icon={'user-secret'}
                                             label={'닉네임'}
                                             checkNo={this.props.checkNickNameNo}
                                             checkLabel={this.props.checkNickNameLabel}
                                             blur={this.handleCheckUserNickName}
                                             changePlaceholder={'닉네임은 변경이 불가하니 신중!'}

                            />

                            <Button buttonStyle={{
                                backgroundColor: this.props.signInScreen2Button,
                                borderRadius: 30,
                                width: 289,
                                height:53,
                                alignSelf: 'center',
                                marginTop:16
                            }} onPress={this.basicChecked} title="계속 진행하기"/>
                            {/*<WarningModal*/}
                            {/*visible={this.props.userIdCheckModal}*/}
                            {/*title={'경고'}*/}
                            {/*body={'아이디를 확인 해주세요.'}*/}
                            {/*handle={this.handleCheckUserIdModal}*/}
                            {/*/>*/}
                            {/*<WarningModal*/}
                            {/*visible={this.props.userNickNameCheckModal}*/}
                            {/*title={'경고'}*/}
                            {/*body={'닉네임을 확인 해주세요.'}*/}
                            {/*handle={this.handleCheckUserNickNameModal}*/}
                            {/*/>*/}
                            {/*<WarningModal*/}
                            {/*visible={this.props.userPasswordCheckModal}*/}
                            {/*title={'경고'}*/}
                            {/*body={'비밀번호를 다시 확인해 주세요.'}*/}
                            {/*handle={this.handleCheckUserPasswordModal}*/}
                            {/*/>*/}
                            {/*<WarningModal*/}
                            {/*visible={this.props.userEmailCheckModal}*/}
                            {/*title={'경고'}*/}
                            {/*body={'이메일을 확인 해주세요.'}*/}
                            {/*handle={this.handleCheckUserEmailModal}*/}
                            {/*/>*/}

                        </View>
                    </View>
                </KeyboardAwareScrollView>

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


        findPwdUserId: state.signin.findPwdUserId,
        findPwdCheckNo: state.signin.findPwdCheckNo,
        findPwdCheckLabel: state.signin.findPwdCheckLabel,
        signInScreen2Button:state.signin.signInScreen2Button,
        inputFontSize:state.signin.inputFontSize

    }),
    (dispatch) => ({
        SignInTwo: bindActionCreators(signin, dispatch)
    })
)(SignUpScreen2);