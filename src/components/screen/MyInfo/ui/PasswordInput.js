import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

export class PasswordInput extends React.Component {

    renderLabel = () => {
        const dataStyle = EStyleSheet.create({
            label:{
                width:'64%',
                alignItems:'center',
                textAlign:'center',
                fontSize:'1rem'
            }
        });
        if(this.props.label!==undefined){
            return(
                <Text style={dataStyle.label}>{this.props.label}</Text>
            )
        }
    };
    renderCheckLabel = () => {
        const dataStyle = EStyleSheet.create({
            label:{
                width:'64%',
                alignItems:'center'
                // marginTop:'0.357rem'
            }
        });
        if(this.props.checkNo!==undefined){
            return(
                <View style={dataStyle.label}>
                    {this.renderCheck()}
                </View>
            )
        }
    };
    renderCheck = () => {
        const dataStyle = EStyleSheet.create({
            checkNo1:{
                width:'100%',
                color:'red',
                fontSize:'0.714rem',
                textAlign:'center'
            },
            checkNo2:{
                width:'100%',
                color:'green',
                fontSize:'0.714rem',
                textAlign:'center'
            }
        });

        if (this.props.checkNo==1) {
            return(
                <Text style={dataStyle.checkNo1}>{this.props.checkLabel}</Text>
            )
        } else if (this.props.checkNo==2) {
            return(
                <Text style={dataStyle.checkNo2}>{this.props.checkLabel}</Text>
            )
        } else {
            return (<Text style={dataStyle.checkNo2}>{' '}</Text>)
        }
    };
    render() {
        return (
            <View style = { {width:'100%',alignItems: 'center', justifyContent:'center' } }>
                {this.renderLabel()}
                <View style={styles.labelSpace}/>
                <View style = { styles.inputLayout }>
                    <TextInput
                        onBlur = {this.props.blur}
                        onChangeText = { this.props.handle }
                        value = { this.props.value }
                        secureTextEntry = { this.props.secureText }
                        style = { styles.input }
                        underlineColorAndroid = "transparent"
                        maxLength={16}
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

const styles = EStyleSheet.create({
    inputLayout: {
        flexDirection: 'row',
        width:'64%',
        aspectRatio:240/40,
        backgroundColor: 'white',
        borderColor: '#979797',
        borderWidth: 1,
        borderRadius: '1.42857rem',
    },
    input: {
        width: '100%',
        textAlign: 'center'
    },
    labelSpace:{
        height:'0.7143rem'
    }
});