import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styles from "./AccountStyles";
import {InfoListItem} from "./ui/InfoListItem";
import {AccountListItem} from "./ui/AccountListItem";
import config from "../../../../config";

class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addInfo: [
                {title: '전공', handle:this.navigationBack, right:'', rightTextColor:'black'},
                {title: '부전공', handle:this.navigationBack, right:'', rightTextColor:'black'},
                {title: '복수전공',handle:this.navigationBack, right:'', rightTextColor:'black'},
                {title: '연계전공',handle:this.navigationBack, right:'', rightTextColor:'black'},
                {title: '입학년도',handle:this.navigationBack, right:'', rightTextColor:'black'},
            ],
        }
    }

    componentDidMount() {
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    navigationPassword = () => {
        this.props.navigation.navigate('password');
    };

    renderAddInfo = () => {
        return (
            <View>
            {this.state.addInfo.map((data, i) => {
            return (
                <View key={i}>
                    <AccountListItem title={data.title} handle={data.handle} right={data.right} rightTextColor={data.rightTextColor}/>
                    {i < this.state.addInfo.length - 1 ?
                        <View style={styles.infoContentLine}/> : null}
                </View>)
        })}
        </View>)
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'계정정보'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.profileContainer}>
                        <View style={styles.profile}>
                            <Icon type='ionicon' name='ios-contact' size={85}/>
                        </View>
                        <AccountListItem title={'이메일'} right={this.props.userId}/>
                        <View style={styles.infoContentLine}/>
                        <AccountListItem title={'닉네임'} right={this.props.userNickName}/>
                        <View style={styles.infoContentLine}/>
                        <AccountListItem title={'비밀번호 변경'} handle={this.navigationPassword}/>
                    </View>
                    <View style={styles.addInfoTitle}>
                        <Text>추가정보</Text>
                    </View>
                    <View style={styles.addInfoContainer}>
                        {this.renderAddInfo()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
        userId: state.myinfo.userId,
        userNickName: state.myinfo.userNickName,
    }),
    (dispatch) => ({})
)(AccountScreen);