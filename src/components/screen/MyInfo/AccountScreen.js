import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styles from "./MailAuthStyles";

class AccountScreen extends React.Component {

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
                <TitleView title={'계정정보'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView style={styles.contentContainer}>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default connect((state) => ({
    }),
    (dispatch) => ({
    })
)(AccountScreen);