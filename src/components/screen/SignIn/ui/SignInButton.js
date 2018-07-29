import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

export class SignInButton extends React.Component {

    render() {
        const styles = EStyleSheet.create({
            button: {
                flexDirection: 'row',
                width: '77%',
                aspectRatio: 289/53,
                borderRadius: 26.5,
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: this.props.backgroundColor
            },
            left:{
                marginLeft: '2.07rem',
                alignSelf: 'flex-start',
                width:30,
            },
            buttonText: {
                fontSize: '1.15rem',
                color: this.props.textColor,
                fontWeight: 'bold',
                alignSelf: 'center'
            },
            rightIcon: {
                marginRight: '2.07rem',
                alignSelf: 'flex-end',
                width:30,
            }
        });
        return (
            <TouchableOpacity onPress={this.props.handle} style={styles.button}>
                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    <View style={styles.left}/>
                    <Text style={styles.buttonText}>{this.props.title}</Text>
                    <Icon iconStyle={styles.rightIcon} name={'md-arrow-forward'} type='ionicon' color={this.props.iconColor}/>
                </View>
            </TouchableOpacity>
        )
    }
}

SignInButton.propTypes = {
    title: PropTypes.string,
    handle: PropTypes.func,
    iconColor: PropTypes.string,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
};

SignInButton.defaultProps = {
    iconColor: '#fff'
};

