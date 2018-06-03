import React from "react";
import {SafeAreaView} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {HomeScreen} from "../screen/Home/HomeScreen";
import MyInfoScreen from "../screen/MyInfo/MyInfoScreen";
import {Icon} from 'react-native-elements';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import {LectureInfoScreen} from "../screen/Lecture/LectureInfoScreen";
import LectureScreen from "../screen/Lecture/LectureScreen";
import InfoScreen from "../screen/Lecture/InfoScreen";
import {TermScreen} from "../screen/MyInfo/TermScreen";
import LeaveScreen from "../screen/MyInfo/LeaveScreen";
import MailAuthScreen from "../screen/MyInfo/MailAuthScreen";
import AccountScreen from "../screen/MyInfo/AccountScreen";

//홈 Tab 네비게이션
const TabBar = props => (
    <SafeAreaView
        forceInset={{ top: 'never', bottom: 'always', horizontal: 'never' }}
        style={{ backgroundColor: '#fff' }}
    >
        <NavigationComponent {...props} />
    </SafeAreaView>
);

const MyInfo = StackNavigator({
    myInfo: {
        screen: MyInfoScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    account: {
        screen: AccountScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    terms: {
        screen: TermScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    leave:{
        screen: LeaveScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    mail:{
        screen: MailAuthScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    }
},{
    initialRouteName: 'myInfo',
    //타이틀바 설정을 화면마다 따로
    headerMode: 'screen'
});

export const HomeTabs = TabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header:null,
                tabBarLabel: '홈',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='home' size={24} color={tintColor}/>)
            }
        },
        Lecture: {
            screen: LectureScreen,
            // screen: InfoScreen,
            navigationOptions: {
                header:null,
                tabBarLabel: '강의평가',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='book' size={24} color={tintColor}/>)
            }
        },
        MyInfo: {
            screen: MyInfo,
            navigationOptions: {
                header:null,
                tabBarLabel: '마이페이지',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='user' size={24} color={tintColor}/>)
            }
        },
    },
    {
        //lazy: true,
        initialRouteName: 'Home',
        tabBarComponent: TabBar,
        tabBarPosition: 'bottom',
        //swipeEnabled:false,
        //animationEnabled:false,
        headerMode:'screen',
        navigationOptions : {
        },
        tabBarOptions: {
            // activeTintColor: 'red',
            inactiveTintColor: 'black',
            indicatorStyle: {
                opacity: 0
            },
            showIcon: true,
            bottomNavigationOptions: {
                labelColor: 'black',
                backgroundColor: 'rgba(121,130,146,0.6)',
                rippleColor: 'white',
            }
        }
    }
);