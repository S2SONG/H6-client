import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, Alert, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {MailInputText} from "./ui/MailInputText";
import * as mailauth from "../../../modules/mailauth";
import styles from "./MailAuthStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class MailAuthScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {MailAuth} = this.props;
        MailAuth.initState();
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    onChangeEmail = (email) => {
        const {MailAuth} = this.props;
        MailAuth.onChangeEmail(email);
    };

    sendAuthMail = async () => {
        const {MailAuth} = this.props;
        const resultValue = await MailAuth.sendAuthMail(this.props.mail);
        if(resultValue){
            return Alert.alert(
                '인증 확인',
                '인증메일을 보냈습니다. 확인 후 다시 로그인해 주세요.',
                [
                    {text: '확인', onPress: this.navigationBack},
                ],
                {cancelable: false}
            )
        } else {
            return Alert.alert(
                '경고',
                '인증메일을 보내는데 실패했습니다.',
                [
                    {text: '확인'},
                ],
                {cancelable: false}
            )
        }
    };

    renderButton = () => {
        if(this.props.mail === ''){
            return(
                <View style={styles.disableButton}>
                    <Text style={styles.buttonText}>인증메일 요청하기</Text>
                </View>
            )
        } else {
            return (<Button buttonStyle={styles.contentButton} title={'인증메일 요청하기'} fontSize={16} onPress={this.sendAuthMail}></Button>)
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'한성인 인증'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.contentText}>강의평가를 위해서는</Text>
                    <Text style={styles.contentText}>학교 이메일 계정을 통한 인증절차가 필요합니다.</Text>
                    <MailInputText handle={this.onChangeEmail} email={this.props.mail}/>
                    {this.renderButton()}
                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
        mail: state.mailauth.mail,
    }),
    (dispatch) => ({
        MailAuth: bindActionCreators(mailauth, dispatch)
    })
)(MailAuthScreen);