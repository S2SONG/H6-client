import React from 'react';
import {View, ScrollView, Text, SafeAreaView, TouchableHighlight, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import * as signin from "../../../modules/signin";
import {bindActionCreators} from 'redux';
import {SignUpIndicator} from "./ui/SignUpIndicator";
import {SignUpScreen1Icon1} from "./ui/SignUpScreen1Icon1";
import {SignUpScreen1Icon2} from "./ui/SignUpScreen1Icon2";
import {TitleView} from "../../ui/TitleView";
import EStyleSheet from 'react-native-extended-stylesheet';
import {CustomModal} from "../../ui/CustomModal";
import HTML from 'react-native-render-html';

class SignUpScreen1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            iconColor: false,
            touch1: false,
            touch2: false,
        };
    }

    //첫번째 동의 체크박스
    handleTermsFirstCheck = () => {
        const {SignIn} = this.props;
        if (this.returnFirstCheck())
            SignIn.handleTermsFirstCheck(false);
        else
            SignIn.handleTermsFirstCheck(true);
    };

    //두번째 동의 체크박스
    handleTermsSecondCheck = () => {
        const {SignIn} = this.props;
        if (this.returnSecondCheck())
            SignIn.handleTermsSecondCheck(false);
        else
            SignIn.handleTermsSecondCheck(true);
    };
    //모두 동의
    handleTermsAllTrue = () => {
        const {SignIn} = this.props;
        if (this.returnChecked()) {
            SignIn.handleTermsAll(false);
            this.state.iconColor = false;

        } else {
            SignIn.handleTermsAll(true);
            this.state.iconColor = true;
        }
    };

    //동의 체크
    returnChecked = () => {
        return this.props.isFirstChecked && this.props.isSecondChecked;
    };
    //첫번째 동의 체크
    returnFirstCheck = () => {
        return this.props.isFirstChecked;
    };
    //두번째 동의 체크
    returnSecondCheck = () => {
        return this.props.isSecondChecked;
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

    xButton = () => {
        this.props.navigation.goBack();
        const {SignIn} = this.props;
        SignIn.handleTermsAll(false);
        SignIn.handleSignUpUserId('');
        SignIn.handleSignUpUserPwd('');
        SignIn.handleSignUpUserRePwd('');
        SignIn.handleSignUpUserNickName('');
    };
    nextTerms = () => {
        if (this.returnChecked()) {
            this.props.navigation.navigate('SignUpTwo');
            return;
        }
    };

    renderNextButton = () => {
        if (this.props.isFirstChecked && this.props.isSecondChecked) {
            return (
                <TouchableOpacity style={styles.nextButtonTrue} onPress={this.nextTerms}>
                    <Text style={styles.nextButtonText}>계속 진행하기</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>계속 진행하기</Text>
                </View>
            )
        }
    };

    renderFirstModalBody = () => {
        return(
            <ScrollView style = {styles.modalBody} >
                <HTML html={this.props.term1}/>
            </ScrollView>
        )
    };

    renderSecondModalBody = () => {
        return (
            <ScrollView style = {styles.modalBody} >
                <HTML html={this.props.term2}/>
            </ScrollView>
        )
    };

    render() {
        const dataStyle = EStyleSheet.create({
            allButton: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '77%',
                aspectRatio: 289 / 53,
                borderRadius: 26.5,
                borderWidth: this.props.isFirstChecked && this.props.isSecondChecked ? 0 : 1,
                borderColor: '#9b9b9b',
                backgroundColor: this.props.isFirstChecked && this.props.isSecondChecked ? '#4a4a4a' : '#ffffff',
            },
            allButtonText: {
                fontSize: '1rem',
                color: this.props.isFirstChecked && this.props.isSecondChecked ? '#ffffff' : '#000000'
            },
            firstTermIcon: {
                marginRight: '0.643rem',
                alignSelf: 'flex-end'
            },
            firstTermButtonTitle: {
                marginLeft: '0.357rem',
                fontSize: '1rem',
            },
            firstTermButtonContent: {
                fontSize: '0.714rem',
                color: '#0000004D'
            }
        });
        return (
            <SafeAreaView style={styles.container}>
                {/*<StatusBar backgroundColor="#717882"*/}
                {/*translucent={true}*/}
                {/*/>*/}
                <TitleView title={'회원가입'} rightIcon={'md-close'} rightIconHandler={this.xButton}/>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={styles.indicatorContainer}>
                        <SignUpIndicator max={3} position={0}/>
                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TouchableOpacity onPress={this.handleTermsAllTrue}>
                            <View style={dataStyle.allButton}>
                                <SignUpScreen1Icon1
                                    iconHandle={this.props.isFirstChecked && this.props.isSecondChecked}/>
                                <View style={styles.allButtonSpace}/>
                                <Text style={dataStyle.allButtonText}>회원가입 약관에 모두 동의합니다.</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.allBottomMarginBottom}/>

                        <View style={{flexDirection: 'column', backgroundColor: this.state.touch1 ? '#d8d8d84d' : '#ffffff'}}>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableHighlight style={{flex: 80}} underlayColor={'transparent'}
                                                    onPress={this.handleTermsFirstCheck}
                                                    onPressIn={() => this.setState({touch1: true})}
                                                    onPressOut={() => this.setState({touch1: false})}>
                                    <View style={dataStyle.firstTermIcon}>
                                        <SignUpScreen1Icon2 iconHandle={this.props.isFirstChecked}/>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight underlayColor={'transparent'}
                                                    style={{flex: 295, justifyContent: 'center'}}
                                                    onPress={this.handleTermsFirstModalOpen}
                                                    onPressIn={() => this.setState({touch1: true})}
                                                    onPressOut={() => this.setState({touch1: false})}>
                                    <Text style={dataStyle.firstTermButtonTitle}>개인정보 수집 및 이용 (필수)</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableHighlight style={{flex: 80}} underlayColor={'transparent'}
                                                    onPress={this.handleTermsFirstCheck}
                                                    onPressIn={() => this.setState({touch1: true})}
                                                    onPressOut={() => this.setState({touch1: false})}>
                                    <View></View>
                                </TouchableHighlight>
                                <TouchableHighlight underlayColor={'transparent'}
                                                    style={{flex: 295, justifyContent: 'center'}}
                                                    onPress={this.handleTermsFirstModalOpen}
                                                    onPressIn={() => this.setState({touch1: true})}
                                                    onPressOut={() => this.setState({touch1: false})}>
                                    <Text style={dataStyle.firstTermButtonContent}>{'본 약관은 H6(이하 "소모임"이 제공하는 한성대학교 커뮤니\n티 서비스 한담(이하 "서비스")의 용에 관한 전반사항을...'}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.termsButtonMargin}/>
                        <View style={{flexDirection: 'column', backgroundColor: this.state.touch2 ? '#d8d8d84d' : '#ffffff'}}>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableHighlight style={{flex: 80}} underlayColor={'transparent'}
                                                    onPress={this.handleTermsSecondCheck}
                                                    onPressIn={() => this.setState({touch2: true})}
                                                    onPressOut={() => this.setState({touch2: false})}>
                                    <View style={dataStyle.firstTermIcon}>
                                        <SignUpScreen1Icon2 iconHandle={this.props.isSecondChecked}/>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight underlayColor={'transparent'}
                                                    style={{flex: 295, justifyContent: 'center'}}
                                                    onPress={this.handleTermsSecondModalOpen}
                                                    onPressIn={() => this.setState({touch2: true})}
                                                    onPressOut={() => this.setState({touch2: false})}>
                                    <Text style={dataStyle.firstTermButtonTitle}>한담 서비스 이용 약관 (필수)</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableHighlight style={{flex: 80}} underlayColor={'transparent'}
                                                    onPress={this.handleTermsSecondCheck}
                                                    onPressIn={() => this.setState({touch2: true})}
                                                    onPressOut={() => this.setState({touch2: false})}>
                                    <View></View>
                                </TouchableHighlight>
                                <TouchableHighlight underlayColor={'transparent'}
                                                    style={{flex: 295, justifyContent: 'center'}}
                                                    onPress={this.handleTermsSecondModalOpen}
                                                    onPressIn={() => this.setState({touch2: true})}
                                                    onPressOut={() => this.setState({touch2: false})}>
                                    <Text style={dataStyle.firstTermButtonContent}>{'제 1조 목적 및 효력의 변경\n1)본 약관은 한담에서 제공하는 서비스의 이용조건 및...'}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.nextButtonMargin}/>
                        {this.renderNextButton()}
                    </View>
                    <CustomModal
                        title={'개인정보 처리방침'} ratio={'93%'} width={349} height={559} body={this.renderFirstModalBody}
                        close={this.handleTermsFirstModalClose} visible={this.props.firstVisible} renderFooter={false}/>
                    <CustomModal title={'한담 서비스 이용약관'} ratio={'93%'} width={349} height={559} body={this.renderSecondModalBody}
                                 close={this.handleTermsSecondModalClose} visible={this.props.secondVisible} renderFooter={false}/>
                    {/*<TermsModal*/}
                        {/*closeModal={this.handleTermsFirstModalClose}*/}
                        {/*modalVisible={this.props.firstVisible}*/}
                        {/*title='개인정보 수집 및 이용'*/}
                        {/*htmlContent={this.props.term1}*/}
                    {/*/>*/}
                    {/*<TermsModal*/}
                        {/*closeModal={this.handleTermsSecondModalClose}*/}
                        {/*modalVisible={this.props.secondVisible}*/}
                        {/*title='한담 서비스 이용 약관'*/}
                        {/*htmlContent={this.props.term2}*/}
                    {/*/>*/}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    indicatorContainer: {
        marginBottom: '5.357rem',
        marginTop: '2rem',
    },
    allButtonSpace: {
        width: '1.214rem'
    },
    allBottomMarginBottom: {
        height: '3.93rem'
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '77%',
        aspectRatio: 289 / 53,
        borderRadius: 26.5,
        backgroundColor: '#4a4a4a4d',
    },
    nextButtonTrue: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '77%',
        aspectRatio: 289 / 53,
        borderRadius: 26.5,
        backgroundColor: '#4a4a4a',
    },
    nextButtonText: {
        fontSize: '1.143rem',
        color: '#ffffff'
    },
    termsButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    termsButtonMargin: {
        height: '1.714rem'
    },
    nextButtonMargin:{
        height: '4.5rem'
    },
    modalBody:{
        flex:1,
        paddingLeft: '1.214rem',
        paddingRight: '1.214rem',
        paddingBottom: '1.357rem',
    }
});

export default connect((state) => ({
        register: state.signin.register,
        currentPosition: state.signin.currentPosition,
        termsModal: state.signin.termsModal,
        isFirstChecked: state.signin.isFirstChecked,
        isSecondChecked: state.signin.isSecondChecked,
        isAllChecked: state.signin.isAllChecked,
        firstVisible: state.signin.firstVisible,
        secondVisible: state.signin.secondVisible,
        term1: state.signin.term1,
        term2: state.signin.term2,
        userId: state.signin.userId,
        userPw: state.signin.userPw,
        userRePw: state.signin.userRePw,
        userNickName: state.signin.userNickName,
    }),
    (dispatch) => ({
        SignIn: bindActionCreators(signin, dispatch)
    })
)(SignUpScreen1);