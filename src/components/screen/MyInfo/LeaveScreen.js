import React from 'react';
import {View, Text, ScrollView, AsyncStorage, SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {TitleView} from "../../ui/TitleView";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
        paddingTop: 191
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
        marginTop: 52,
        backgroundColor: 'rgb(124,130,140)',
        borderRadius: 29
    }

});

export default connect((state) => ({}),
    (dispatch) => ({})
)(LeaveScreen);