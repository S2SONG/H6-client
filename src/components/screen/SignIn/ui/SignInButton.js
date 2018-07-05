import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class SignInButton extends React.Component {

    render() {
        const styles = StyleSheet.create({
            button: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 40,
                marginBottom: 10,
                paddingLeft:35.9,
                paddingRight:35.9,
                width: 289,
                height: 53,
                borderRadius: 26.5,
                borderWidth: 1,
                borderColor: '#9b9b9b',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: this.props.backgroundColor
            },
            left:{
                alignSelf: 'flex-start',
                width:20,
            },
            buttonText: {
                fontSize: 16,
                color: this.props.textColor,
                fontWeight: 'bold',
                alignSelf: 'center'
            },
            rightIcon: {
                alignSelf: 'flex-end',
                width:20,
            }
        });
        return (
            <TouchableOpacity onPress={this.props.handle}>
                <View style={styles.button}>
                    <View style={styles.left}/>
                    <Text style={styles.buttonText}>{this.props.title}</Text>
                    <Icon iconStyle={styles.rightIcon} name={'md-arrow-forward'} type='ionicon' color={this.props.iconColor}/>
                </View>
            </TouchableOpacity>
        )
    }

    const
}

SignInButton.propTypes = {
    title: PropTypes.string,
    handle: PropTypes.func,
    iconColor: PropTypes.string,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
};

