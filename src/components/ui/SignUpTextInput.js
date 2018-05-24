import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class SignUpTextInput extends React.Component {

    constructor (props) {
        super(props);
        this.state = {hasFocus: false};
    }

    renderLabel = () => {
        if(this.props.label!==undefined){
            return(
                <View style={{alignSelf:'flex-start'}}>
                    <Text>{this.props.label}</Text>
                </View>
            )
        }
    };
    renderCheckLabel = () => {
        if(this.props.checkNo!==undefined){
            return(
                <View style={{height:10, alignSelf:'flex-start'}}>
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

    setFocus (hasFocus) {
        this.setState({hasFocus});
    };
    render() {
        return (
            <View style = { { marginBottom: 7, alignItems: 'center' } }>
                {this.renderLabel()}
                <View style = {this.state.hasFocus ? styles.focusedTextInput : styles.inputLayout }>
                    {/**<View style = { styles.inputIcon }>
                     <Icon type = "font-awesome" name = { this.props.icon }/>
                     </View>**/}
                    <TextInput
                        //onBlur = {this.props.blur}
                        onChangeText = { this.props.handle }
                        value = { this.props.value }
                        secureTextEntry = { this.props.secureText }
                        style = { styles.input }
                        underlineColorAndroid = "transparent"
                        //placeholder = { this.props.placeholder }
                        onFocus={this.setFocus.bind(this, true)}
                        onBlur={this.setFocus.bind(this, false)}
                    />
                </View>
                {this.renderCheckLabel()}
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

};

const styles = StyleSheet.create({
    inputLayout: {
        flexDirection: 'row',
        height: 50,
        width: '90%',
        backgroundColor: 'white',
        paddingLeft: 10,
        borderRadius:3,
    },
    focusedTextInput: {
        flexDirection: 'row',
        height: 50,
        width: '90%',
        backgroundColor: 'white',
        paddingLeft: 10,
        borderRadius:3,
        borderBottomColor: 'yellow',
        borderBottomWidth:2,
    },
    input: {
        width: '100%',
    },
    inputIcon: {
        marginRight: 10,
        alignItems:'center',
        justifyContent:'center',
    }
});