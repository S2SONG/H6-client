import React from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    TouchableHighlight,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import {Icon,Button} from 'react-native-elements';
import RoundCheckbox from 'rn-round-checkbox';
import {connect} from "react-redux";
import * as signin from "../../../modules/signin";
import {bindActionCreators} from 'redux';
import {SignUpIndicator} from "./ui/SignUpIndicator";
import styles from "../Lecture/EvaluationScreenStyles";
import {WarningModal} from "../../ui/WarningModal";
import {TermsModal} from "../../ui/TermsModal";
import Toast, {DURATION} from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {SignUpScreen1Icon1} from "./ui/SignUpScreen1Icon1";
import{SignUpScreen1Icon2} from "./ui/SignUpScreen1Icon2";

class SignUpScreen1 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pwd: '',
            register: false,
            termsModal: false,
            keyboardSpace: 0,
            findPwd: false,
            check1:false,
            check2:false,
            modalCheck1:false,
            modalCheck2:false,
            iconColor:false,
        };
    }
    //약관동의 처리
    handleTerms = () => {
        console.log(this.props.SignInScreen1Button);

        this.setState({
            termsModal: !this.state.termsModal
        })
    };
    //첫번째 동의 체크박스
    handleTermsFirstCheck = () => {
        const {SignIn} = this.props;
        if(this.returnFirstCheck()) {
            SignIn.handleTermsFirstCheck(false);
            this.state.check1=false;
            this.state.modalCheck1=false;

            this.handleTerms()


        }else {
            SignIn.handleTermsFirstCheck(true);
            this.state.check1=true;
            this.state.modalCheck1=true;

            this.handleTerms()
        }
    };

    //두번째 동의 체크박스
    handleTermsSecondCheck = () => {
        const {SignIn} = this.props;
        if(this.returnSecondCheck()){
            SignIn.handleTermsSecondCheck(false);
            this.state.check2=false;
            this.state.modalCheck2=false;
            this.handleTerms()

        }
        else{
            SignIn.handleTermsSecondCheck(true);
            this.state.check2=true;
            this.state.modalCheck2=true;
            this.handleTerms()

        }
    };
    handleTerms =() =>{
        const {SignIn} = this.props;

        if( this.props.isFirstChecked && this.props.isSecondChecked){
            SignIn.handleSignInScreen1Button('#4a4a4a');
            SignIn.handleSignInScreen1Button2('#4a4a4a');
            SignIn.handleChangeFontColor('#000000');
            this.state.iconColor=false;
        }
        else if(!this.props.isFirstChecked&&!this.props.isSecondChecked){
            SignIn.handleSignInScreen1Button('#ffffff');
            SignIn.handleSignInScreen1Button2('#c5c4c4');
            SignIn.handleChangeFontColor('#000000');
            this.state.iconColor=false;

        }
        else if(!this.state.check1 &&!this.state.check2){
            SignIn.handleSignInScreen1Button('#ffffff');
            SignIn.handleSignInScreen1Button2('#c5c4c4');
            SignIn.handleChangeFontColor('#000000');
            this.state.iconColor=false;

        }
        else {
            SignIn.handleSignInScreen1Button('#ffffff');
            SignIn.handleSignInScreen1Button2('#c5c4c4');
            // SignIn.handleChangeFontColor('#ffffff');
            this.state.iconColor=true;


        }
    };
    handleModal =() =>{
        console.log(this.state.modalCheck1);
        console.log(this.state.modalCheck2);
        const {SignIn} = this.props;
        if(this.state.modalCheck1 && this.state.modalCheck2){
            SignIn.handleSignInScreen1Button('#4a4a4a');
            SignIn.handleSignInScreen1Button2('#4a4a4a');
            SignIn.handleChangeFontColor('#ffffff');
            this.state.iconColor=true;


        }
        else{
            SignIn.handleSignInScreen1Button('#ffffff');
            SignIn.handleSignInScreen1Button2('#c5c4c4');
            SignIn.handleChangeFontColor('#000000');
            this.state.iconColor=false;

        }
    };
    //모두 동의
    handleTermsAllTrue = () => {
        const {SignIn} = this.props;
        // SignIn.handleSignInScreen1Button('black');
        console.log(this.props.SignInScreen1Button);
        if (this.returnChecked()) {
            // SignIn.handleisAllChecked(false);
            SignIn.handleTermsAll(false);
            SignIn.handleSignInScreen1Button('#ffffff');
            SignIn.handleSignInScreen1Button2('#c5c4c4');
            SignIn.handleChangeFontColor('#000000');
            this.state.iconColor=false;

        } else {
            // SignIn.handleisAllChecked(true);

            SignIn.handleTermsAll(true);
            SignIn.handleSignInScreen1Button('#4a4a4a');
            SignIn.handleSignInScreen1Button2('#4a4a4a');
            SignIn.handleChangeFontColor('#ffffff');
            // SignIn.handleisAllChecked(false);
            this.state.iconColor=true;

        }
    };

    //동의 체크
    returnChecked = () => {
        return this.props.isFirstChecked && this.props.isSecondChecked;
    };
    //첫번째 동의 체크
    returnFirstCheck = () =>{
        return this.props.isFirstChecked;
    };
    //두번째 동의 체크
    returnSecondCheck = () =>{
        return this.props.isSecondChecked;
    };

    //첫번째 동의 모달 열기, 닫기
    handleTermsFirstModalOpen = () => {

        const {SignIn} = this.props;
        SignIn.handleTermsFirstCheck(true);
        SignIn.handleTermsFirstModal(true);
        // console.log(this.state.modalCheck1);

        if(!this.state.modalCheck1){
            this.state.check1=true;
            this.state.modalCheck1=true;
            this.handleModal();}
        else {
            this.state.check1=false;
            this.state.modalCheck1=false;
            this.handleModal();
        }
    };

    handleTermsFirstModalClose = () => {

        const {SignIn} = this.props;
        SignIn.handleTermsFirstModal(false);
    };

    //두번째 동의 모달 열기, 닫기
    handleTermsSecondModalOpen = () => {
        const {SignIn} = this.props;
        // console.log(this.state.modalCheck2);

        SignIn.handleTermsSecondCheck(true);
        SignIn.handleTermsSecondModal(true);
        if(!this.state.modalCheck2){
            this.state.modalCheck2=true;
            this.state.check2=true;
            this.handleModal();}
        else {
            this.state.modalCheck2=false;
            this.state.check2=false;
            this.handleModal();
        }

    };
    handleTermsSecondModalClose = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsSecondModal(false);

    };

    xButton = () => {

        this.props.navigation.navigate('SignIn');

    };
    nextTerms = () => {
        if (this.returnChecked()) {
            this.props.navigation.navigate('SignUpTwo');
            return;
        }
        this.handleTerms();
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>

                <KeyboardAwareScrollView>
                    <StatusBar backgroundColor="#717882"
                               translucent={true}
                    />
                    {/*<Toast ref="toast"/>*/}
                    <View style={{flex: 1, justifyContent: 'center',marginTop:30}}>
                        <View style ={{flexDirection:'row',justifyContent: 'space-between'}}>
                            <View style={{marginLeft:10}}>
                            </View>
                            <View style={{marginRight:10}}>
                                <Icon name="md-close" type="ionicon" size={40} color={'black'} style={{alignSelf:'flex-end'}} onPress ={this.xButton} />
                            </View>
                        </View>

                    </View>
                    <View style={{marginTop:10,marginLeft:10}}>
                        <Text style={{fontSize:17,alignSelf:'flex-start',fontWeight: 'bold'}}> 회원가입 </Text>
                    </View>

                    <View style={{flex:4, alignItems: 'center'}}>
                        <View style ={{marginBottom:32,marginTop:20}}>
                            <SignUpIndicator max={3} position={0} />
                        </View>

                        <View style={{alignItems: 'center',justifyContent: 'center',marginLeft:20}}>
                            <View style={{width:320,marginBottom:50}}>

                                <TouchableOpacity  onPress={this.handleTermsAllTrue}>
                                    <View style={{
                                        flexDirection: 'row',
                                        // justifyContent: 'space-between',
                                        marginTop: 40,
                                        paddingLeft:15.9,
                                        // paddingRight:35.9,
                                        width: 298,
                                        height: 53,
                                        borderRadius: 26.5,
                                        borderWidth: 1,
                                        borderColor: '#9b9b9b',
                                        // alignItems: 'center',
                                        // alignSelf: 'center',
                                        backgroundColor: this.props.SignInScreen1Button
                                    }}>
                                        <View>

                                            <View style={{marginTop:15}}>
                                                <SignUpScreen1Icon1
                                                iconHandle={this.state.iconColor}
                                                />
                                            </View>
                                        </View>
                                        <View style={{marginLeft:10,backgroundColor:'red'}}/>
                                        <Text style={{fontSize:14,marginLeft:15,marginTop:17,color:this.props.fontColor}}>회원가입 약관에 모두 동의합니다.</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                            <TouchableHighlight  underlayColor= '#d8d8d8' onPress={this.handleTermsFirstModalOpen} style={{alignItems: 'center'}}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{
                                        flexDirection: 'row',
                                        height: 71,
                                        width: 500,
                                        marginBottom: 5,
                                        padding: 10,
                                        marginLeft:170

                                        // paddingLeft: 20,
                                        // alignItems: 'center',
                                        // justifyContent: 'center'
                                    }}
                                    >
                                        <View  style={{flexDirection:'column'}}>
                                            <View style={{flexDirection:'row'}}>
                                                {/*<RoundCheckbox*/}
                                                    {/*size={24}*/}
                                                    {/*checked={this.returnFirstCheck()}*/}
                                                    {/*backgroundColor="#989898"*/}
                                                    {/*onValueChange={this.handleTermsFirstCheck}*/}
                                                {/*/>*/}
                                            <SignUpScreen1Icon2 iconHandle={this.props.isFirstChecked}/>

                                                <Text style={{width: 190, marginLeft: 15 ,fontSize:14,marginBottom:5}}>
                                                    개인정보 수집 및 이용 (필수)
                                                </Text>
                                            </View>
                                            <Text style={{fontSize:10,opacity:0.3,marginLeft:38}}>본 약관은 H6(이하 "소모임"이 제공하는 한성대학교 커뮤니 </Text>
                                            <Text style={{fontSize:10,opacity:0.3,marginLeft:38}}>티 서비스 한담(이하 "서비스")의 야용에 관한 전반사항을...</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight  underlayColor= '#d8d8d8' onPress={this.handleTermsSecondModalOpen} style={{alignItems: 'center'}}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{
                                        flexDirection: 'row',
                                        height: 71,
                                        width: 500,
                                        marginBottom: 5,
                                        padding: 10,
                                        marginLeft:170

                                        // paddingLeft: 20,
                                        // alignItems: 'center',
                                        // justifyContent: 'center'
                                    }}
                                    >
                                        <View  style={{flexDirection:'column'}}>
                                            <View style={{flexDirection:'row'}}>
                                                {/*<RoundCheckbox*/}
                                                    {/*size={24}*/}
                                                    {/*checked={this.returnSecondCheck()}*/}
                                                    {/*backgroundColor="#989898"*/}
                                                    {/*onValueChange={this.handleTermsSecondCheck}*/}
                                                {/*/>*/}
                                                <SignUpScreen1Icon2 iconHandle={this.props.isSecondChecked}/>

                                                <Text style={{width: 190, marginLeft: 15 ,fontSize:14,marginBottom:5}}>
                                                    한담 서비스 이용 약관 (필수)
                                                </Text>
                                            </View>
                                            <Text style={{fontSize:10,opacity:0.3,marginLeft:38}}>제 1조 목적 및 효력의 변경</Text>
                                            <Text style={{fontSize:10,opacity:0.3,marginLeft:38}}>1)본 약관은 한담에서 제공하는 서비스의 이용조건 및...</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
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
                        <View>
                            <Button buttonStyle={{
                                backgroundColor: this.props.SignInScreen1Button2,
                                borderRadius: 30,
                                width: 289,
                                height:53,
                                alignSelf: 'center',
                                marginTop:60
                            }} onPress={this.nextTerms} title="계속 진행하기"/>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}
export default connect((state) => ({
        SignInScreen1Button:state.signin.signInScreen1Button,
        SignInScreen1Button2:state.signin.signInScreen1Button2,
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
        findPwd: state.signin.findPwd, //비번찾기
        fontColor:state.signin.fontColor,


    }),
    (dispatch) => ({
        SignIn: bindActionCreators(signin, dispatch)
    })
)(SignUpScreen1);