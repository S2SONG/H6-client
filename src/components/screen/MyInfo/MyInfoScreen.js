import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from "./MyInfoStyles";
import {InfoListItem} from "./ui/InfoListItem";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import myinfo from "../../../modules/myinfo";
import {TitleView} from "../../ui/TitleView";

class MyInfoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: [
                {title: '계정정보'},
                {title: '로그아웃', handle: this.handleLogout},
                {title: '회원탈퇴'},
                {title: '한성인 인증'},
            ],
            appInfo: [
                {title: '이용약관'},
                {title: '개인정보취급방침'},
                {title: '업데이트 정보'}
            ]
        }
    }

    // static navigationOptions = ({ navigation }) => {
    //     const params = navigation.state.params || {};
    //
    //     return {
    //         headerLeft: (
    //             <View></View>
    //         ),
    //         title:'내정보'
    //     };
    // };

    renderAccount = () => {
        return (
            <View style={styles.infoContainer}>
                {this.state.account.map((data, i) => {
                    return (<InfoListItem key={i} title={data.title} handle={data.handle}/>)
                })}
            </View>
        )
    };

    renderAppInfo = () => {
        return (
            <View style={styles.infoContainer}>
                {this.state.appInfo.map((data, i) => {
                    return (<InfoListItem key={i} title={data.title}/>)
                })}
            </View>
        )
    };

    handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        this.props.navigation.navigate('SignIn');
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'마이페이지'}/>
                <ScrollView style={styles.container}>
                    <View style={styles.profile}>
                        <Icon type='ionicon' name='ios-contact' size={60}/>
                        <Text style={styles.profileNickName}>so02</Text>
                        <Text style={styles.profileId}>so0j914_@gmail.com</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.subject}><Text> ACCOUNT </Text></View>
                        {this.renderAccount()}
                        <View style={styles.subject}><Text> SETTING </Text></View>
                        {this.renderAppInfo()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect((state) => ({}),
    (dispatch) => ({
        MyInfo: bindActionCreators(myinfo, dispatch)
    })
)(MyInfoScreen);