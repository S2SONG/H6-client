import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TitleView} from "../../ui/TitleView";
import * as leave from "../../../modules/leave";
import styles from "./LeaveStyles";
import {LeavePasswordModal} from "./ui/LeavePasswordModal";

class LeaveScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    onClickOpenModal = () => {
        const {Leave} = this.props;
        Leave.handlePasswordModal(!this.props.passwordModal);
        Leave.handlePassword('');
    };

    handlePassword = (password) => {
        const {Leave} = this.props;
        Leave.handlePassword(password);
    };

    navigateSignIn = async () => {
      this.props.navigation.navigate('SignIn');
    };

    handleDeleteUser = async () => {
      const {Leave} = this.props;
      const result = await Leave.handleDeleteUser();
      if(result){
          this.onClickOpenModal();
          Alert.alert(
              '회원 탈퇴',
              '회원 탈퇴 되었습니다.',
              [
                  {text: '확인', onPress:this.navigateSignIn},
              ],
              {cancelable: false}
          )
      }else{
          this.onClickOpenModal();
          Alert.alert(
              '탈퇴 실패',
              '회원탈퇴에 실패하였습니다. 다시 시도해 주세요.',
              [
                  {text: '확인'},
              ],
              {cancelable: false}
          )
      }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LeavePasswordModal
                    isVisible={this.props.passwordModal}
                    handleVisible={this.onClickOpenModal}
                    password={this.props.password}
                    handlePassword={this.handlePassword}
                    handle={this.handleDeleteUser}
                />
                <TitleView title={'회원탈퇴'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.contentText}>탈퇴 시 모든 정보가 즉시 삭제되며 복구할 수 없습니다.</Text>
                    <Text style={styles.contentText}>모든 정보 삭제에 동의하시면 탈퇴를 진행하세요.</Text>
                    <Button buttonStyle={styles.contentButton} title={'한담 탈퇴'} onPress={this.onClickOpenModal}></Button>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect((state) => ({
        passwordModal: state.leave.passwordModal,
        password: state.leave.password,

    }),
    (dispatch) => ({
        Leave: bindActionCreators(leave, dispatch)
    })
)(LeaveScreen);