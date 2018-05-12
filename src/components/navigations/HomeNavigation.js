import React from "react";
import {SafeAreaView} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {HomeScreen} from "../screen/Home/HomeScreen";
import MyInfoScreen from "../screen/MyInfo/MyInfoScreen";
import {Icon} from 'react-native-elements';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import {LectureInfoScreen} from "../screen/Lecture/LectureInfoScreen";
import LectureScreen from "../screen/Lecture/LectureScreen";

//홈 Tab 네비게이션
const TabBar = props => (
    <SafeAreaView
        forceInset={{ top: 'never', bottom: 'always', horizontal: 'never' }}
        style={{ backgroundColor: '#fff' }}
    >
        <NavigationComponent {...props} />
    </SafeAreaView>
);

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
            navigationOptions: {
                header:null,
                tabBarLabel: '강의평가',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='book' size={24} color={tintColor}/>)
            }
        },
        MyInfo: {
            screen: MyInfoScreen,
            navigationOptions: {
                header:null,
                tabBarLabel: '마이페이지',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='user' size={24} color={tintColor}/>)
            }
        },
    },
    {
        //lazy: true,
        initialRouteName: 'Lecture',
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
                backgroundColor: '#ebebeb',
                rippleColor: 'white',
            }
        }
    }
);