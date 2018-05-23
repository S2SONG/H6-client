import React from "react";
import {SafeAreaView, StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Constants} from 'expo';
import SignInScreen from "../screen/SignIn/SignInScreen";
import SignUpScreen from "../screen/SignUp/SignUpScreen";
import {TermsScreen} from "../screen/Terms/TermsScreen";
import {HomeTabs} from "./HomeNavigation";
import LectureInfoScreen from "../screen/Lecture/LectureInfoScreen";
import InfoScreen from "../screen/Lecture/InfoScreen";

//StackNavigation 사용
// 로그인, 동의화면, 회원가입, 홈 네비게이션
const SignNav = StackNavigator({
    SignIn: {
        screen: SignInScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    HomeTab: {
        screen: HomeTabs,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    LectureInfo: {
        screen: LectureInfoScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    }
}, {
    //네비게이션 첫 화면 = 로그인
    initialRouteName: 'SignIn',
    //타이틀바 설정을 화면마다 따로
    headerMode: 'screen'
});

export class SignNavigation extends React.Component {
    render() {
        return (
            <SignNav/>
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#000000',
        height: Constants.statusBarHeight
    }
});