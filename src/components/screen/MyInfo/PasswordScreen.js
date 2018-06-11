import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styles from "./MailAuthStyles";
import {AccountTextView} from "./ui/AccountTextView";

class PasswordScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    navigationBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TitleView title={'비밀번호 변경'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView style={styles.contentContainer} contentContainerStyle={{paddingLeft:17, paddingRight:15}}>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
    }),
    (dispatch) => ({
    })
)(PasswordScreen);