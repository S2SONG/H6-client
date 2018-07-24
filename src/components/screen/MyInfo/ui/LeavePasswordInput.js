import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export class LeavePasswordInput extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    value={this.props.value}
                    onChangeText={this.props.handle}
                    maxLength={16}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                    placeholder={'비밀번호를 입력하세요.'}
                />
            </View>
        )
    }
}

LeavePasswordInput.propTypes = {
    handle: PropTypes.func,
    value: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: 240,
        height: 40,
        paddingLeft: 15,
        justifyContent: 'center',
        borderColor: '#979797',
        borderWidth: 1,
        borderRadius:20,
    },
});