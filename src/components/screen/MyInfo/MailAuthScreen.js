import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {MailInputText} from "./ui/MailInputText";
import * as mailauth from "../../../modules/mailauth";
import styles from "./MailAuthStyles";

class MailAuthScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    onChangeEmail = (email) => {
        const {MailAuth} = this.props;
        MailAuth.onChangeEmail(email);
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'한성인인증'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.contentText}>강의평가를 위해서는</Text>
                    <Text style={styles.contentText}>학교 이메일 계정을 통한 인증절차가 필요합니다.</Text>
                    <MailInputText handle={this.onChangeEmail} email={this.props.mail}/>
                    <Button buttonStyle={styles.contentButton} title={'인증번호 요청'}></Button>
                </ScrollView>
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