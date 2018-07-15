import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class AccountListItem extends React.Component {

    constructor(props){
        super(props);
    }

    returnTextStyle = (color) => {
        if(color === undefined){
            return {
                    fontSize: 13,
                    color: '#d8d8d8',
                    alignSelf:'center',
                    alignItems:'center',
                    justifyContent:'center',
            }
        } else {
            return {
                    fontSize: 13,
                    color: color,
                    alignSelf:'center',
                    alignItems:'center',
                    justifyContent:'center',
            }
        }
    };
    render() {
        return (
            <TouchableHighlight
                underlayColor={'#8f96a0'}
                style={styles.container}
                onPress={this.props.handle}>
                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text}>{this.props.title}</Text>
                    <View/>
                    <View style={styles.right}>
                        {this.props.right === undefined ? null:
                            <Text style={this.returnTextStyle(this.props.rightTextColor)}>{this.props.right}</Text>}
                        {this.props.handle === undefined ? <View style={styles.rightIcon}></View>:
                            <Icon style={styles.rightIcon} name='ios-arrow-forward' type='ionicon' color={'#d8d8d8'}/>}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

AccountListItem.propTypes = {
    handle: PropTypes.func,
    title: PropTypes.string,
    right: PropTypes.string,
    rightTextColor: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        height: 34,
        paddingLeft: 14,
        paddingRight: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    text: {
        fontSize: 13,
        alignSelf: 'center',
        justifyContent:'center',
    },
    right:{
        flexDirection:'row',
        alignSelf: 'center',
        justifyContent:'center'
    },
    rightIcon: {
        width:25,
        alignSelf:'center',
    }
});