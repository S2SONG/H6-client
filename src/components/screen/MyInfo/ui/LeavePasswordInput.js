import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

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

const styles = EStyleSheet.create({
    container: {
        width:'100%',
        alignItems:'center',
        justifyContent: 'center',
    },
    textInput: {
        width:'64%',
        aspectRatio:240/40,
        paddingLeft: '1.07rem',
        justifyContent: 'center',
        borderColor: '#979797',
        borderWidth: 1,
        borderRadius:'1.4286rem',
    },
});