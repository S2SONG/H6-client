import React from 'react';
import {View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Button, ButtonGroup} from 'react-native-elements';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

export class LeavePasswordModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render() {
        return (
            <Modal isVisible={this.props.isVisible}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentTitle}>
                            <Text>비밀번호 확인</Text>
                        </View>
                        <View style={styles.contentBody}>
                            <Text>회원탈퇴를 위해 비밀번호를 확인해주세요.</Text>
                            <TextInput
                                style={styles.bodyTextInput}
                                value={this.props.password}
                                onChangeText={this.props.handlePassword}
                                maxLength={16}
                                underlineColorAndroid={'transparent'}
                                secureTextEntry={true}/>
                        </View>
                        <View style={styles.contentFooter}>
                            <TouchableOpacity onPress={this.props.handle}>
                                <View style={styles.footerLeftButton}>
                                    <Text>확인</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.handleVisible}>
                                <View style={styles.footerRightButton}>
                                    <Text>취소</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
}

LeavePasswordModal.propTypes = {
    handle: PropTypes.func,
    handleVisible: PropTypes.func,
    isVisible: PropTypes.bool,
    password: PropTypes.string,
    handlePassword: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    contentTitle: {
        width: 300,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentBody: {
        width: 300,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyTextInput: {
        width: 280,
        height: 40,
        paddingLeft: 10,
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    contentFooter: {
        width: 300,
        height: 50,
        flexDirection: 'row',
        padding: 0,
        margin: 0,
    },
    footerLeftButton: {
        width: 150,
        height: 50,
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'black',
        borderRightWidth: 1,
        borderRightColor: 'black',
    },
    footerRightButton: {
        width: 150,
        height: 50,
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'black',
        borderLeftWidth: 1,
        borderLeftColor: 'black',
    }

});