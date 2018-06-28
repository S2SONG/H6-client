import React from "react";
import {SafeAreaView} from 'react-native';
import {StackNavigator, TabNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {HomeScreen} from "../screen/Home/HomeScreen";
import MyInfoScreen from "../screen/MyInfo/MyInfoScreen";
import {Icon} from 'react-native-elements';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import {LectureInfoScreen} from "../screen/Lecture/LectureInfoScreen";
// import {EvaluationScreen} from "../screen/Lecture/EvaluationScreen";
import LectureScreen from "../screen/Lecture/LectureScreen";
import InfoScreen from "../screen/Lecture/InfoScreen";
import {TermScreen} from "../screen/MyInfo/TermScreen";
import LeaveScreen from "../screen/MyInfo/LeaveScreen";
import MailAuthScreen from "../screen/MyInfo/MailAuthScreen";
import AccountScreen from "../screen/MyInfo/AccountScreen";
import PasswordScreen from "../screen/MyInfo/PasswordScreen";

//홈 Tab 네비게이션
const TabBar = props => (
    <SafeAreaView
        forceInset={{ top: 'never', bottom: 'always', horizontal: 'never' }}
        style={{ backgroundColor: '#fff' }}
    >
        <NavigationComponent {...props} />
    </SafeAreaView>
);

const MyPage = createStackNavigator({
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
    },
    password:{
        screen: PasswordScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    }
},{
    initialRouteName: 'myInfo',
    headerMode: 'screen'
});

export const HomeTabs = createMaterialBottomTabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header:null,
                // labeled:false,
                tabBarLabel: 'Home',
                tabBarColor: 'rgb(127,0,247)',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='home' size={24} color={tintColor}/>),

            }
        },
        Lecture: {
            screen: LectureScreen,
            navigationOptions: {
                header:null,
                // labeled:false,
                tabBarLabel: 'Lecture',
                tabBarColor: 'rgb(56,74,255)',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='book' size={24} color={tintColor}/>)
            }
        },
        MyPage: {
            screen: MyPage,
            navigationOptions: {
                header:null,
                // labeled:false,
                tabBarLabel: 'MyPage',
                tabBarColor: 'rgb(0,113,108)',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='user' size={24} color={tintColor}/>)
            }
        },

    },
    {
        //lazy: true,
        initialRouteName: 'Home',
        // tabBarComponent: TabBar,
        // tabBarPosition: 'bottom',
        //swipeEnabled:false,
        //animationEnabled:false,
        headerMode:'null',
        navigationOptions : {
        },
        // tabBarOptions: {
        //     // activeTintColor: 'red',
        //     inactiveTintColor: 'black',
        //     indicatorStyle: {
        //         opacity: 0
        //     },
        //     showIcon: true,
        //     showLabel: false,
        //     bottomNavigationOptions: {
        //         // labelColor: 'black',
        //         backgroundColor: 'rgba(121,130,146,0.6)',
        //         rippleColor: 'white',
        //     }
        // },
        shifting: true,
        activeTintColor: '#ffffff',
        inactiveTintColor: 'rgba(255,255,255,0.4)',
        barStyle: { backgroundColor: 'rgb(207,210,216)' },
    }
);