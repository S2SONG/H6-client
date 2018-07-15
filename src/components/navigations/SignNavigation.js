import React from "react";
import {SafeAreaView, StyleSheet} from 'react-native';
import {StackNavigator, createStackNavigator} from 'react-navigation';
import SignInScreen from "../screen/SignIn/SignInScreen";
import SignUpScreen from "../screen/SignUp/SignUpScreen";
import {TermsScreen} from "../screen/Terms/TermsScreen";
import {HomeTabs} from "./HomeNavigation";
import LectureInfoScreen from "../screen/Lecture/LectureInfoScreen";
import InfoScreen from "../screen/Lecture/InfoScreen";
import EvaluationScreen from "../screen/Lecture/EvaluationScreen";
import AmendScreen from "../screen/Lecture/AmendScreen";

//StackNavigation 사용
// 로그인, 동의화면, 회원가입, 홈 네비게이션
const SignNav = createStackNavigator({
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
        },
    Evaluation:{
        screen: EvaluationScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    Amend:{
        screen: AmendScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    }
}, {
    //네비게이션 첫 화면 = 로그인
    initialRouteName: 'SignIn',
    //타이틀바 설정을 화면마다 따로
    headerMode: 'null'
});

export class SignNavigation extends React.Component {
    render() {
        return (
            <SignNav/>
        )
    }
}