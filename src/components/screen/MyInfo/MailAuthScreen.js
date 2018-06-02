import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class MailAuthScreen extends React.Component {

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
                <TitleView title={'한성이인증'} leftIcon={'ios-arrow-back-outline'} leftIconHandler={this.navigationBack}/>
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.contentText}>강의평가를 위해서는</Text>
                    <Text style={styles.contentText}>학교 이메일 계정을 통한 인증절차가 필요합니다.</Text>

                    <Button buttonStyle={styles.contentButton} title={'인증번호 요청'}></Button>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
        paddingTop: 157
    },
    contentText: {
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center'
    },
    contentButton: {
        width: 224,
        height: 58,
        alignSelf:'center',
        marginTop: 41,
        backgroundColor: 'rgb(124,130,140)',
        borderRadius: 29
    }

});

export default connect((state) => ({}),
    (dispatch) => ({})
)(MailAuthScreen);