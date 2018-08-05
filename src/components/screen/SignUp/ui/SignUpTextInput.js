import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

export class SignUpTextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
        };
    }

    handleFocused = () => {
        if (this.props.checkNo == 1) {
            this.setState({
                isFocused: true,
            })
        } else {
            this.setState({
                isFocused: true,
            })
        }

    };

    handleBlur = () => {
        this.setState({
            isFocused: false,
        })
    };

    renderLabel = () => {
        const dataStyles = EStyleSheet.create({
            container: {
                width: '85.85%',
                height: '0.857rem',
                justifyContent: 'center',
            },
            label: {
                fontSize: '0.7857rem',
                color: this.props.checkNo == 1 ? '#d0021b' : '#000000'
            }
        });
        return(
            <View style={dataStyles.container}>
                <Text style={dataStyles.label}>
                    {this.state.isFocused || this.props.value.length > 0 ? this.props.label : ' '}
                </Text>
            </View>
        );
    };

    render() {
        const dataStyles = EStyleSheet.create({
            container: {
                width: '82.93%',
                justifyContent:'center',
                alignItems:'center',
                borderBottomWidth: 2,
                borderBottomColor: this.props.checkNo == 1? '#d0021b': this.props.value.length == 0 ? '#00000033' : '#000000'
            },
            textInput: {
                width: '85.85%',
                height:'2.7143rem',
                fontSize: this.state.isFocused && this.props.value.length == 0 ? '0.857rem' : '1.143rem',
            }
        });
        return (
            <View style={dataStyles.container}>
                {this.renderLabel()}
                <TextInput style={dataStyles.textInput} secureTextEntry={this.props.secureText}
                           onFocus={this.handleFocused} onBlur={this.handleBlur}
                           placeholder={this.state.isFocused ? this.props.placeholder : this.props.label}
                           placeholderTextColor={'#00000033'} value={this.props.value}
                           onChangeText={this.props.handle}
                           underlineColorAndroid="transparent"/>
            </View>

        )
    }
}

SignUpTextInput.propTypes = {
    secureText: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    blur: PropTypes.func,
    checkNo: PropTypes.number,
    handle: PropTypes.func
};
SignUpTextInput.defaultProps = {
    secureText: false,
    value: '',
    label: '',
    checkNo: 0,
};

const styles = EStyleSheet.create({});