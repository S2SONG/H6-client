import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class SignUpScreen1Icon2 extends React.Component {

    handleIcon=()=>{
        console.log(this.props.iconHandle);
        if(!this.props.iconHandle){
            return(
                <Icon
                    name='check-circle'
                    color='#c5c4c4'
                    size={26}
                />
            )
        }
        else{
            return(
                <Icon
                    name='check-circle'
                    color='#4a4a4a'
                    size={26}
                />
            )
        }
    };
    render() {
        return (
            <View style={styles.container}>
                {this.handleIcon()}
            </View>
        )
    }
}

SignUpScreen1Icon2.propTypes = {
    iconHandle :PropTypes.bool
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft:10
    },
    inputStyle: {
        flex:1,
        fontSize:12,
        paddingLeft:5
    },
    iconStyle: {
        width:30,
        margin:10
    }
});