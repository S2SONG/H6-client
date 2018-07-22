import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class PasswordInput extends React.Component {

    renderLabel = () => {
        if(this.props.label!==undefined){
            return(
                <View style={{width:240, marginBottom:10, alignItems:'center'}}>
                    <Text>{this.props.label}</Text>
                </View>
            )
        }
    };
    renderCheckLabel = () => {
        if(this.props.checkNo!==undefined){
            return(
                <View style={{height:10, width:240, marginTop:5}}>
                    {this.renderCheck()}
                </View>
            )
        }
    };
    renderCheck = () => {
        if (this.props.checkNo==1) {
            return(
                <Text style={{color:'red', fontSize:10}}>{this.props.checkLabel}</Text>
            )
        } else if (this.props.checkNo==2) {
            return(
                <Text style={{color:'green', fontSize:10}}>{this.props.checkLabel}</Text>
            )
        }
    };
    render() {
        return (
            <View style = { { marginBottom: 7, alignItems: 'center' } }>
                {this.renderLabel()}
                <View style = { styles.inputLayout }>
                    <TextInput
                        onBlur = {this.props.blur}
                        onChangeText = { this.props.handle }
                        value = { this.props.value }
                        secureTextEntry = { this.props.secureText }
                        style = { styles.input }
                        underlineColorAndroid = "transparent"
                        placeholder = { this.props.placeholder }
                    />
                </View>
                {this.renderCheckLabel()}
            </View>
        )
    }
}

PasswordInput.propTypes = {
    secureText: PropTypes.bool,
    handle: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    checkNo: PropTypes.number,
    checkLabel: PropTypes.string,
    blur: PropTypes.func
};

const styles = StyleSheet.create({
    inputLayout: {
        flexDirection: 'row',
        height: 40,
        width: 240,
        backgroundColor: 'white',
        borderColor: '#979797',
        borderWidth: 1,
        borderRadius: 20,
    },
    input: {
        width: '100%',
        textAlign: 'center'
    },
    inputIcon: {
        marginRight: 10,
        alignItems:'center',
        justifyContent:'center',
    }
});