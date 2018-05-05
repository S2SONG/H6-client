import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export class InfoListItem extends React.Component{

    render(){

        return(
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.handle}>
                <Text style={styles.text}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

InfoListItem.propTypes = {
    handle: PropTypes.func,
    title: PropTypes.string
};

const styles = StyleSheet.create({
    container:{
        height:60,
        padding:10,
        backgroundColor:'white',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderTopColor:'#dddce0',
        borderBottomColor:'#dddce0',
        justifyContent:'center'
    },
    text:{
        fontSize:18
    }
});