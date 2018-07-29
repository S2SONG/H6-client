import React from "react";
import {View, StatusBar} from 'react-native';
import {StackNavigator, createStackNavigator} from 'react-navigation';
import SignInScreen from "../screen/SignIn/SignInScreen";
import SignUpScreen from "../screen/SignUp/SignUpScreen";
import {TermsScreen} from "../screen/Terms/TermsScreen";
import {HomeTabs} from "./HomeNavigation";
import LectureInfoScreen from "../screen/Lecture/LectureInfoScreen";
import InfoScreen from "../screen/Lecture/InfoScreen";
import EvaluationScreen from "../screen/Lecture/EvaluationScreen";
import AmendScreen from "../screen/Lecture/AmendScreen";
import SignUpScreen1 from "../screen/SignUp/SignUpScreen1";
import SignUpScreen2 from "../screen/SignUp/SignUpScreen2";
import SignUpScreen3 from "../screen/SignUp/SignUpScreen3";
import LectureScreen from "../screen/Lecture/LectureScreen";

import NavigatorService from '../../utils/navigator';

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
    SignUpOne: {
        screen: SignUpScreen1,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    SignUpTwo: {
        screen: SignUpScreen2,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    SignUpThree: {
        screen: SignUpScreen3,
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
    Evaluation: {
        screen: EvaluationScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    Amend: {
        screen: AmendScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    LectureScreen: {
        screen: LectureScreen,
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
            <View style={{flex:1}}>
                <SignNav ref={navigatorRef => {
                    NavigatorService.setContainer(navigatorRef);
                }}/>
            </View>
        )
    }
}