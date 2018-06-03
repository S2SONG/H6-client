import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TitleView} from "../../ui/TitleView";
import styles from "./LeaveStyles";

class LeaveScreen extends React.Component {

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
                <TitleView title={'회원탈퇴'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.contentText}>탈퇴 시 모든 정보가 즉시 삭제되며 복구할 수 없습니다.</Text>
                    <Text style={styles.contentText}>모든 정보 삭제에 동의하시면 탈퇴를 진행하세요.</Text>
                    <Button buttonStyle={styles.contentButton} title={'한담 탈퇴'}></Button>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default connect((state) => ({}),
    (dispatch) => ({})
)(LeaveScreen);