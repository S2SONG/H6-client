import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

export class InfoListItem extends React.Component{

    render(){

        return(
            <TouchableHighlight
                underlayColor={'#8f96a0'}
                style={styles.container}
                onPress={this.props.handle}>
                <Text style={styles.text}>{this.props.title}</Text>
            </TouchableHighlight>
        )
    }
}

InfoListItem.propTypes = {
    handle: PropTypes.func,
    title: PropTypes.string
};

const styles = StyleSheet.create({
    container:{
        height:40,
        padding:10,
        backgroundColor:'white',
        justifyContent:'center'
    },
    text:{
        fontSize:15
    }
});