import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

export class SignUpTextInput extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            hasFocus: false,
            color:'',
            fontSize:16
        };
    }

    renderLabel = () => {
        if(this.props.label!==undefined&&this.state.hasFocus){
            return(

                <View style={{alignSelf:'flex-start',marginLeft:10}}>
                    {this.renderCheck()}
                    <Text style={{color:this.state.color,fontSize:11}}>{this.props.label}</Text>
                </View>
            )
        }
    };

    renderCheck = () => {
        if(this.props.checkNo==0){
            this.state.color='black';
        }
        else if (this.props.checkNo==1) {
            this.state.color='red' ;

        } else if (this.props.checkNo==2) {
            this.state.color='black';
        }
    };
    clear = () => {
        this.textInputRef.clear();
    };
    setFocus (hasFocus) {
        this.setState({hasFocus});
    };
    render() {
        const dataStyles = EStyleSheet.create({

        });
        return (
            <View style = {{width:'82.93%', aspectRatio:311/35, alignItems: 'center'}}>
                {this.renderLabel()}
                <View style = {this.state.hasFocus &&this.state.color ? {flexDirection: 'row',

                    height: 35,
                    width:'100%',
                    backgroundColor: 'transparent',
                    paddingLeft: 10,
                    borderRadius:3,
                    borderBottomColor: this.state.color,
                    borderBottomWidth:2,} : styles.inputLayout }
                      onPress={this.clear}
                >
                    <TextInput
                        onBlur = {this.props.blur}
                        onChangeText = { this.props.handle }
                        value = { this.props.value }
                        secureTextEntry = { this.props.secureText }
                        style = {{
                            width: '100%',
                            fontSize:this.props.inputFontSize
                        }}
                        underlineColorAndroid = "transparent"
                        placeholder = { this.state.hasFocus ? this.props.changePlaceholder : this.props.placeholder }
                        onFocus={this.setFocus.bind(this, true)}
                    />
                </View>
            </View>

        )
    }
}

SignUpTextInput.propTypes = {
    secureText: PropTypes.bool,
    handle: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    checkNo: PropTypes.number,
    checkLabel: PropTypes.string,
    blur: PropTypes.func,
    focus:PropTypes.func,
    changePlaceholder:PropTypes.string,
    colorChange:PropTypes.string,
    inputFontSize:PropTypes.number

};

const styles = EStyleSheet.create({
    inputLayout: {
        flexDirection: 'row',
        height: 50,
        width: 311,
        backgroundColor: 'transparent',
        paddingLeft: 10,
        borderRadius:3,
        borderBottomColor: 'rgb(216,216,216)',
        borderBottomWidth: 2,
    },
    focusedTextInput: {

    },
    labelColor:{
        color: 'black',
    },
    placeholderColor:{
        color:'black'
    },

    inputIcon: {
        marginRight: 10,
        alignItems:'center',
        justifyContent:'center',
    }
});