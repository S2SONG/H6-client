import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';

export class SignTextInput extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidUpdate(){
        this.bounce();
    }

    handleViewRef = ref => this.view = ref;

    bounce = () => {
        if(this.props.bounce)
            this.view.bounce(800);

    };


    renderLabel = () => {
        if (this.props.label !== undefined) {
            return (
                <View style={{alignSelf: 'flex-start'}}>
                    <Text>{this.props.label}</Text>
                </View>
            )
        }
    };
    renderCheckLabel = () => {
        if (this.props.checkNo !== undefined) {
            return (
                <View style={{height: 10, alignSelf: 'flex-start'}}>
                    {this.renderCheck()}
                </View>
            )
        }
    };
    renderCheck = () => {
        if (this.props.checkNo == 1) {
            return (
                <Text style={{color: 'red', fontSize: 10}}>{this.props.checkLabel}</Text>
            )
        } else if (this.props.checkNo == 2) {
            return (
                <Text style={{color: 'green', fontSize: 10}}>{this.props.checkLabel}</Text>
            )
        }
    };

    render() {

        return (
            <Animatable.View ref={this.handleViewRef}>
                <View style={{marginBottom: 7, alignItems: 'center'}}>
                    {this.renderLabel()}
                    <View style={styles.inputLayout}>
                        <TextInput
                            onBlur={this.props.blur}
                            onChangeText={this.props.handle}
                            value={this.props.value}
                            secureTextEntry={this.props.secureText}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholderTextColor='black'
                            placeholder={this.props.placeholder}
                        />
                    </View>
                    {this.renderCheckLabel()}
                </View>
            </Animatable.View>
        )
    }
}

SignTextInput.propTypes = {
    secureText: PropTypes.bool,
    handle: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    checkNo: PropTypes.number,
    checkLabel: PropTypes.string,
    blur: PropTypes.func,
    bounce: PropTypes.bool,
};

SignTextInput.defaultProps = {
    bounce: false,
};

const styles = EStyleSheet.create({
    inputLayout: {
        flexDirection: 'row',
        width: '77%',
        aspectRatio: 289/53,
        backgroundColor: 'white',
        borderRadius: 26.5,
        borderWidth: 1,
        borderColor: '#4a4a4a',
    },
    input: {
        paddingLeft: '2rem',
        width: '100%',
        fontSize: '1rem',
    },
    inputIcon: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});