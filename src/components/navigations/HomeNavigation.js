import React from "react";
import {StackNavigator, TabNavigator} from 'react-navigation';
import {HomeScreen} from "../screen/Home/HomeScreen";
import {MyInfoScreen} from "../screen/MyInfo/MyInfoScreen";
import {Icon} from 'react-native-elements';
import { } from 'react-native-material-bottom-navigation'
import {LectureInfoScreen} from "../screen/Lecture/LectureInfoScreen";

//홈 Tab 네비게이션
export const HomeTabs = TabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: '홈',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='home' size={24} color={tintColor}/>)
            }
        },
        Lecture: {
            screen: LectureInfoScreen,
            navigationOptions: {
                tabBarLabel: '강의평가',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='book' size={24} color={tintColor}/>)
            }
        },
        MyInfo: {
            screen: MyInfoScreen,
            navigationOptions: {
                tabBarLabel: '내정보',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='user' size={24} color={tintColor}/>)
            }
        },
    },
    {
        //lazy: true,
        initialRouteName: 'Home',
        tabBarPosition: 'bottom',
        //swipeEnabled:false,
        //animationEnabled:false,
        navigationOptions : {
            header: null
        },
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'black',
            indicatorStyle: {
                opacity: 0
            },
            style: {
                backgroundColor: 'white'
            },
            showIcon: true
        },
    }
);