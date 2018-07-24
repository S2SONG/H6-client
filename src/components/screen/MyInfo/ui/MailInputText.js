import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export class MailInputText extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputText}
                    onChangeText={this.props.handle}
                    value={this.props.email}
                    placeholder={'학교 전자 메일 주소를 입력하십시오.'}
                    keyboardType={'email-address'}
                    underlineColorAndroid = "transparent"/>
            </View>
        )
    }
}

MailInputText.propTypes = {
    handle: PropTypes.func,
    email: PropTypes.string,
    right: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        width: 277,
        marginTop: 41,
        alignSelf: 'center',
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgb(151,151,151)',
        borderRadius: 20
    },
    inputText: {
        fontSize: 14,
        textAlign: 'center'
    }
});