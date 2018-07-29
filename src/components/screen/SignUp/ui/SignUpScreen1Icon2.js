import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class SignUpScreen1Icon2 extends React.Component {

    handleIcon=()=>{
        if(!this.props.iconHandle){
            return(
                <Icon
                    name='check-circle'
                    color='#c5c4c4'
                    size={21}
                    onPress={this.props.handle}
                />
            )
        }
        else{
            return(
                <Icon
                    name='check-circle'
                    color='#4a4a4a'
                    size={21}
                    onPress={this.props.handle}
                />
            )
        }
    };
    render() {
        return (
            <View>
                {this.handleIcon()}
            </View>
        )
    }
}

SignUpScreen1Icon2.propTypes = {
    iconHandle :PropTypes.bool,
    handle: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
});