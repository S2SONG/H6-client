import React from 'react';
import {
    View,
    Text,
    SafeAreaView,

} from 'react-native';
import {Button,Icon} from 'react-native-elements';
import {connect} from "react-redux";
import * as signin from "../../../modules/signin";
import {bindActionCreators} from 'redux';
import {SignUpIndicator} from "./ui/SignUpIndicator";
import {SignUpMajor} from "../../ui/SignUpMajor";
import {SignUpDatePicker} from "../../ui/SignUpDatePicker";
import Toast, {DURATION} from 'react-native-easy-toast';
import config from "../../../../config";
const ROOT_URL = config.server;
import {AsyncStorage} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



class SignUpScreen3 extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pwd: '',
            register: false,
            termsModal: false,
            keyboardSpace: 0,
            findPwd: false,
            track:' '
        };
    }
    navigationGoBack = () => {
        this.props.navigation.goBack();
    };
    xButton = () => {
        // const {SignIn} = this.props;
        // SignIn.initSignUpState();
        // SignIn.handleSignUpModal();
        this.props.navigation.navigate('SignIn');

    };
    handleSignUpModal = () => {
        // const {SignIn} = this.props;
        // SignIn.initSignUpState();
        // SignIn.handleSignUpModal();
        this.props.navigation.navigate('SignIn');

    };
    handleStateMajor = (major) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpMajor(major);
        if(this.props.major!==undefined &&this.props.admissionYear!==undefined){
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleStateMinor = (minor) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpMinor(minor);
        if(this.props.major!==undefined &&this.props.admissionYear!==undefined){
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleStateDoubleMajor = (doubleMajor) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpDoubleMajor(doubleMajor);
        if(this.props.major!==undefined &&this.props.admissionYear!==undefined){
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleStateConnectedMajor = (connectedMajor) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpConnectMajor(connectedMajor);
        if(this.props.major!==undefined &&this.props.admissionYear!==undefined){
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleStateAdmissionYear = (admissionYear) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpAdmisstionYear(admissionYear);
        if(this.props.major!==undefined &&this.props.admissionYear!==undefined){
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleMajorCheck =()=>{
        console.log('e');
    };
    signUpUser = async () => {
        const {SignInThree} = this.props;
        const {userId, userPw, userNickName, major, minor, doubleMajor, connectedMajor, admissionYear} = this.props;

        console.log(this.props.major);
        console.log(this.props.doubleMajor);
        console.log(this.props.connectedMajor);
        console.log(this.props.admissionYear);
        console.log(userId, userPw, userNickName, major, minor, doubleMajor, connectedMajor, admissionYear);

        if( major===undefined&&admissionYear===undefined){
            console.log('hello');
        }
        else if( major !== undefined && admissionYear === undefined ) {
            console.log('hello2');

        }
        else if(major === undefined && admissionYear !== undefined ) {
            console.log('hello3');

        }
        else{
            console.log('회원가입');
            let signUpCheck = await SignInThree.signUpUser(userId, userPw, userNickName, major, minor, doubleMajor, connectedMajor, admissionYear);
            if (signUpCheck) {
                this.handleSignUpModal();

            }
        }

    };

    render() {
        // console.log(this.props.track);
        //     console.log(this.props.year);
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor:'#FFFFFF'}}>
                <Toast ref="toast"/>
                <KeyboardAwareScrollView>

                    <View style={{flex: 1, justifyContent: 'center',marginTop:20}}>
                        <View style ={{flexDirection:'row',justifyContent: 'space-between'}}>
                            <View style={{marginLeft:10}}>
                                <Icon name={'ios-arrow-back-outline'} type='ionicon' size={40} color={'black'} style={{alignSelf:'flex-first'}}  onPress={this.navigationGoBack}/>

                            </View>
                            <View style={{marginRight:10}}>
                                <Icon name="md-close" type="ionicon" size={40} color={'black'} style={{alignSelf:'flex-end'}} onPress ={this.xButton} />
                            </View>
                        </View>

                    </View>
                    <View style={{}}>
                        <Text style={{fontSize:17,alignSelf:'center'}}> 회원가입 </Text>
                    </View>


                    <View style={{flex:4, alignItems: 'center'}}>
                        <View style ={{marginBottom:50}}>
                            <SignUpIndicator max={3} position={2} />
                        </View>

                        {/*<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>*/}
                        <SignUpMajor handle={this.handleStateMajor}
                                     track={this.props.track}
                                     value={this.props.major}
                                     placeholder={'전공'}
                        />
                        <SignUpMajor handle={this.handleStateMinor}
                                     track={this.props.track}
                                     value={this.props.minor}
                                     placeholder={'부전공'}/>
                        <SignUpMajor handle={this.handleStateDoubleMajor}
                                     track={this.props.track}
                                     value={this.props.doubleMajor}
                                     placeholder={'복수전공'}/>
                        <SignUpMajor handle={this.handleStateConnectedMajor}
                                     track={this.props.track}
                                     value={this.props.connectedMajor}
                                     placeholder={'연계전공'}/>
                        <SignUpDatePicker handle={this.handleStateAdmissionYear}
                                          year={this.props.year}
                                          value={this.props.admissionYear}
                                          placeholder={'입학년도'}/>
                        <Button buttonStyle={{
                            backgroundColor: this.props.signInScreen3Button,
                            borderRadius: 30,
                            width: 289,
                            height:53,
                            alignSelf: 'center',
                            marginTop:35
                        }} onPress={this.signUpUser} title="한담 시작하기"/>
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


        findPwd: state.signin.findPwd, //비번찾기
        track:state.signin.track,
        year:state.signin.year,
        signInScreen3Button:state.signin.signInScreen3Button

    }),
    (dispatch) => ({
        SignInThree: bindActionCreators(signin, dispatch)
    })
)(SignUpScreen3);