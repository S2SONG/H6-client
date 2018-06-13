import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styles from "./MailAuthStyles";
import * as password from "../../../modules/password";
import {SignTextInput} from "../../ui/SignTextInput";
import {validation} from "../../../utils/validations";

class PasswordScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.Password.initState();
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    passwordChange = async () => {
        const {Password} = this.props;
        if (this.props.currentPassword.length == 0) {
            return Alert.alert(
                '경고',
                '현재 비밀번호를 입력해주세요.',
                [
                    {text: '확인'},
                ],
                {cancelable: false}
            )
        }


        if (this.props.newPasswordCheckNo != 2 || this.props.reNewPasswordCheckNo != 2) {
            return Alert.alert(
                '경고',
                '새로운 비밀번호를 확인해 주세요.',
                [
                    {text: '확인'},
                ],
                {cancelable: false}
            )
        }
        if (this.props.currentPassword === this.props.newPassword) {
            return Alert.alert(
                '경고',
                '현재 비밀번호와 새로운 비밀번호가 동일합니다.',
                [
                    {text: '확인'},
                ],
                {cancelable: false}
            )
        }
        const returnValue = await Password.passwordChange(this.props.currentPassword, this.props.newPassword);
        if (returnValue) {
            return Alert.alert(
                '',
                '비밀번호가 수정되었습니다.',
                [
                    {text: '확인', onPress: () => this.navigationBack()},
                ],
                {cancelable: false}
            )
        } else {
            return Alert.alert(
                '경고',
                '현재 비밀번호가 일치하지 않습니다.',
                [
                    {text: '확인'},
                ],
                {cancelable: false}
            )
        }
    };

    onChangeCurrentPassword = (e) => {
        const {Password} = this.props;
        Password.onChangeCurrentPassword(e);
    };
    onChangeNewPassword = (e) => {
        const {Password} = this.props;
        if (this.props.reNewPassword.length != 0) {
            if (e === this.props.reNewPassword) {
                Password.onChangeReNewPasswordCheckNo(2);
                Password.onChangeReNewPasswordCheckLabel('비밀번호가 일치합니다.');
            } else {
                Password.onChangeReNewPasswordCheckNo(1);
                Password.onChangeReNewPasswordCheckLabel('비밀번호가 일치하지 않습니다.');
            }
        }

        if (validation.checkPassLength(e)) {
            if (e.length == 0) {
                Password.onChangeNewPasswordCheckNo(0);
                Password.onChangeNewPasswordCheckLabel('');
            } else {
                Password.onChangeNewPasswordCheckNo(2);
                Password.onChangeNewPasswordCheckLabel('비밀번호 조건에 만족합니다.');
            }
        } else {
            Password.onChangeNewPasswordCheckNo(1);
            Password.onChangeNewPasswordCheckLabel('8자이상 16자이하의 영문,숫자,특수문자를 포함해야합니다.');
        }


        Password.onChangeNewPassword(e);
    };
    onChangeReNewPassword = (e) => {
        const {Password} = this.props;

        if (e.length == 0) {
            Password.onChangeReNewPasswordCheckNo(0);
            Password.onChangeReNewPasswordCheckLabel('');
        } else {
            if (this.props.newPassword === e) {
                Password.onChangeReNewPasswordCheckNo(2);
                Password.onChangeReNewPasswordCheckLabel('비밀번호가 일치합니다.');
            } else {
                Password.onChangeReNewPasswordCheckNo(1);
                Password.onChangeReNewPasswordCheckLabel('비밀번호가 일치하지 않습니다.');
            }
        }
        Password.onChangeReNewPassword(e);

    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'비밀번호 변경'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView style={styles.contentContainer} contentContainerStyle={{paddingLeft: 17, paddingRight: 15}}>
                    <SignTextInput
                        label={'현재 비밀번호'}
                        secureText={true}
                        value={this.props.currentPassword}
                        handle={this.onChangeCurrentPassword}/>

                    <SignTextInput
                        label={'새로운 비밀번호'}
                        secureText={true}
                        value={this.props.newPassword}
                        handle={this.onChangeNewPassword}
                        checkNo={this.props.newPasswordCheckNo}
                        checkLabel={this.props.newPasswordCheckLabel}/>

                    <SignTextInput
                        label={'비밀번호 확인'}
                        secureText={true}
                        value={this.props.reNewPassword}
                        handle={this.onChangeReNewPassword}
                        checkNo={this.props.reNewPasswordCheckNo}
                        checkLabel={this.props.reNewPasswordCheckLabel}/>
                    <Button value={'변경하기'} onPress={this.passwordChange}/>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
        currentPassword: state.password.currentPassword,
        newPassword: state.password.newPassword,
        reNewPassword: state.password.reNewPassword,
        newPasswordCheckNo: state.password.newPasswordCheckNo,
        newPasswordCheckLabel: state.password.newPasswordCheckLabel,
        reNewPasswordCheckNo: state.password.reNewPasswordCheckNo,
        reNewPasswordCheckLabel: state.password.reNewPasswordCheckLabel,

    }),
    (dispatch) => ({
        Password: bindActionCreators(password, dispatch)
    })
)(PasswordScreen);