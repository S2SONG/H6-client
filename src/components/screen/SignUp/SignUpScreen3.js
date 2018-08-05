import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import {connect} from "react-redux";
import * as signin from "../../../modules/signin";
import {bindActionCreators} from 'redux';
import {SignUpIndicator} from "./ui/SignUpIndicator";
import {TitleView} from "../../ui/TitleView";
import EStyleSheet from "react-native-extended-stylesheet";
import {SignUpPicker} from "./ui/SignUpPicker";
import {SignUpPickerModal} from "./ui/SignUpPickerModal";


class SignInScreen3 extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pwd: '',
            register: false,
            termsModal: false,
            keyboardSpace: 0,
            findPwd: false,
            track: ' '
        };
    }

    componentDidMount() {
    }

    navigationGoBack = () => {
        this.props.navigation.goBack();
    };

    xButton = () => {
        const {SignIn} = this.props;

        SignIn.handleTermsAll(false);
        SignIn.handleSignUpUserId('');
        SignIn.handleSignUpUserPwd('');
        SignIn.handleSignUpUserRePwd('');
        SignIn.handleSignUpUserNickName('');
        SignIn.handleMajor(null);
        SignIn.handleDoubleMajor(null);
        SignIn.handleMinor(null);
        SignIn.handleConnectedMajor(null);
        SignIn.handleAdmissionYear(null);
        SignIn.handleSignUpCheckUserIdNo(0);
        SignIn.handleSignUpCheckUserPasswordNo(0);
        SignIn.handleSignUpCheckUserRePasswordNo(0);
        SignIn.handleSignUpCheckUserNickNameNo(0);

        this.props.navigation.navigate('SignIn');

    };

    handleStateMajor = (major) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpMajor(major);
        if (this.props.major !== undefined && this.props.admissionYear !== undefined) {
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleStateMinor = (minor) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpMinor(minor);
        if (this.props.major !== undefined && this.props.admissionYear !== undefined) {
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleStateDoubleMajor = (doubleMajor) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpDoubleMajor(doubleMajor);
        if (this.props.major !== undefined && this.props.admissionYear !== undefined) {
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleStateConnectedMajor = (connectedMajor) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpConnectMajor(connectedMajor);
        if (this.props.major !== undefined && this.props.admissionYear !== undefined) {
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleStateAdmissionYear = (admissionYear) => {
        const {SignInThree} = this.props;
        SignInThree.handleSignUpAdmisstionYear(admissionYear);
        if (this.props.major !== undefined && this.props.admissionYear !== undefined) {
            SignInThree.handleSignInScreen3Button('#4a4a4a');
        }
    };
    handleMajorCheck = () => {
        console.log('e');
    };
    signUpUser = async () => {
        const {SignIn} = this.props;
        const {userId, userPw, userNickName, major, minor, doubleMajor, connectedMajor, admissionYear} = this.props;
        let userData = {
            userId: userId,
            userPw: userPw,
            userNickName: userNickName,
            major: major,
            minor: minor,
            doubleMajor: doubleMajor,
            connectedMajor: connectedMajor,
            admissionYear: admissionYear
        };
        let result = await SignIn.signUpUser(userData);
        if(result){
            this.xButton();
            SignIn.handleSignUpToast(true);
        }
    };

    handleMajor = (major) => {
        const {SignIn} = this.props;
        SignIn.handleMajor(major);
    };

    handleDoubleMajor = (major) => {
        const {SignIn} = this.props;
        SignIn.handleDoubleMajor(major);
    };

    handleMinor = (major) => {
        const {SignIn} = this.props;
        SignIn.handleMinor(major);
    };

    handleConnectedMajor = (major) => {
        const {SignIn} = this.props;
        SignIn.handleConnectedMajor(major);
    };

    handleAdmissionYear = (year) => {
        const {SignIn} = this.props;
        SignIn.handleAdmissionYear(year);
    };

    handleMajorModal = (modal) => {
        const {SignIn} = this.props;
        SignIn.handleMajorModal(modal);
    };
    handleDoubleMajorModal = (modal) => {
        const {SignIn} = this.props;
        SignIn.handleDoubleMajorModal(modal);
    };
    handleMinorModal = (modal) => {
        const {SignIn} = this.props;
        SignIn.handleMinorModal(modal);
    };
    handleConnectedMajorModal = (modal) => {
        const {SignIn} = this.props;
        SignIn.handleConnectedMajorModal(modal);
    };
    handleYearModal = (modal) => {
        const {SignIn} = this.props;
        SignIn.handleYearModal(modal);
    };

    renderButton = () => {
        if(this.props.major != null && this.props.admissionYear != null){
            return (
                <TouchableOpacity style={styles.selectButton} onPress={this.signUpUser}>
                    <Text style={styles.buttonText}>한담 시작하기</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.button}>
                    <Text style={styles.buttonText}>한담 시작하기</Text>
                </View>
            )
        }
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <SignUpPickerModal visible={this.props.majorModal}
                                   closeModal={() => this.handleMajorModal(false)}
                                   data={this.props.track} value={this.props.major} handle={this.handleMajor}/>
                <SignUpPickerModal visible={this.props.doubleMajorModal}
                                   closeModal={() => this.handleDoubleMajorModal(false)}
                                   data={this.props.track} value={this.props.doubleMajor} handle={this.handleDoubleMajor}/>
                <SignUpPickerModal visible={this.props.minorModal} closeModal={() => this.handleMinorModal(false)}
                                   data={this.props.track} value={this.props.minor} handle={this.handleMinor}/>
                <SignUpPickerModal visible={this.props.connectedMajorModal}
                                   closeModal={() => this.handleConnectedMajorModal(false)}
                                   data={this.props.track} value={this.props.connectedMajor} handle={this.handleConnectedMajor}/>
                <SignUpPickerModal visible={this.props.yearModal}
                                   closeModal={() => this.handleYearModal(false)}
                                   data={this.props.year} value={this.props.admissionYear} handle={this.handleAdmissionYear}/>
                <TitleView title={'회원가입'} leftIconHandler={this.navigationGoBack} leftIcon={'ios-arrow-back-outline'}
                           rightIconHandler={this.xButton} rightIcon={'md-close'}/>
                <View style={{flex: 1}}>
                    <View style={styles.indicatorContainer}>
                        <SignUpIndicator max={3} position={2}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <SignUpPicker label={'전공(1트랙) - 필수'} handle={() => this.handleMajorModal(true)} value={this.props.major}/>
                        <View style={styles.pickerSpace}/>
                        <SignUpPicker label={'복수전공(2트랙)'} handle={() => this.handleDoubleMajorModal(true)} value={this.props.doubleMajor}/>
                        <View style={styles.pickerSpace}/>
                        <SignUpPicker label={'부전공'} handle={() => this.handleMinorModal(true)} value={this.props.minor}/>
                        <View style={styles.pickerSpace}/>
                        <SignUpPicker label={'연계전공'} handle={() => this.handleConnectedMajorModal(true)} value={this.props.connectedMajor}/>
                        <View style={styles.pickerSpace}/>
                        <SignUpPicker label={'입학년도 - 필수'} handle={() => this.handleYearModal(true)} value={this.props.admissionYear}/>
                        <View style={styles.buttonSpace}/>
                        {this.renderButton()}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = EStyleSheet.create({
    indicatorContainer: {
        marginBottom: '3.92857rem',
        marginTop: '2rem',
    },
    pickerSpace: {
        height: '0.2143rem'
    },
    buttonSpace: {
        height: '3.7857rem'
    },
    button: {
        width:'77.067%',
        aspectRatio:289/53,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#4a4a4a4d',
        borderRadius:'1.893rem'
    },
    selectButton:{
        width:'77.067%',
        aspectRatio:289/53,
        backgroundColor:'#4a4a4a',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:'1.893rem'
    },
    buttonText:{
        fontSize:'1.143rem',
        color:'white'
    }
});
export default connect((state) => ({

        userId: state.signin.userId,
        userPw: state.signin.userPw,
        userRePw: state.signin.userRePw,
        userNickName: state.signin.userNickName,

        major: state.signin.major,
        minor: state.signin.minor,
        doubleMajor: state.signin.doubleMajor,
        connectedMajor: state.signin.connectedMajor,
        admissionYear: state.signin.admissionYear,
        checkIdNo: state.signin.checkIdNo,

        checkPasswordNo: state.signin.checkPasswordNo,
        checkPassRe: state.signin.checkPassRe,

        checkNickNameNo: state.signin.checkNickNameNo,

        track: state.signin.track,
        year: state.signin.year,
        signInScreen3Button: state.signin.signInScreen3Button,

        majorModal: state.signin.majorModal,
        doubleMajorModal: state.signin.doubleMajorModal,
        minorModal: state.signin.minorModal,
        connectedMajorModal: state.signin.connectedMajorModal,
        yearModal: state.signin.yearModal,

        signUpToast: state.signin.signUpToast

    }),
    (dispatch) => ({
        SignIn: bindActionCreators(signin, dispatch)
    })
)(SignInScreen3);