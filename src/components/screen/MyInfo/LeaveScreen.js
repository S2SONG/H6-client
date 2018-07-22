import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, Alert, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TitleView} from "../../ui/TitleView";
import * as leave from "../../../modules/leave";
import styles from "./LeaveStyles";
import {LeavePasswordInput} from "./ui/LeavePasswordInput";

class LeaveScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const {Leave} = this.props;
        await Leave.initState();
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    handlePassword = (password) => {
        const {Leave} = this.props;
        Leave.handlePassword(password);
    };

    navigateSignIn = async () => {
      this.props.navigation.navigate('SignIn');
    };

    handleLeaveUser = async () => {
      const {Leave} = this.props;
      const checkPwd = await Leave.checkPassword(this.props.password);
      if(!checkPwd){
          return Alert.alert(
              '오류',
              '비밀번호가 틀렸습니다.',
              [
                  {text: '확인'},
              ],
              {cancelable: false}
          )
      }
      const result = await Leave.handleLeaveUser();
      if(result){
          Alert.alert(
              '회원 탈퇴',
              '회원 탈퇴 되었습니다.',
              [
                  {text: '확인', onPress:this.navigateSignIn},
              ],
              {cancelable: false}
          )
      }else{
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
                <TitleView title={'회원탈퇴'} rightIcon={'md-close'} rightIconHandler={this.navigationBack}/>
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.contentText}>본인확인을 위해 비밀번호를 확인합니다.</Text>
                    <LeavePasswordInput handle={this.handlePassword} value={this.props.password}/>
                    {/*<Button buttonStyle={styles.contentButton} title={'한담 탈퇴'} onPress={this.handleLeaveUser}></Button>*/}
                    {this.props.password===''?
                    <View style={styles.disableButton}>
                        <Text style={styles.buttonText}>한담 탈퇴</Text>
                    </View>:
                    <TouchableOpacity onPress={this.handleLeaveUser}>
                        <View style={styles.contentButton}>
                            <Text style={styles.buttonText}>한담 탈퇴</Text>
                        </View>
                    </TouchableOpacity>}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect((state) => ({
        password: state.leave.password,

    }),
    (dispatch) => ({
        Leave: bindActionCreators(leave, dispatch)
    })
)(LeaveScreen);