import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class MailInputText extends React.Component {

    render() {
        return (
            <TouchableHighlight
                underlayColor={'#8f96a0'}
                style={styles.container}
                onPress={this.props.handle}>
                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between',}}>
                    <Text style={styles.text}>{this.props.title}</Text>
                    {this.props.right === undefined ?
                        <Icon style={styles.rightIcon} name='ios-arrow-forward' type='ionicon'/>:
                        <Text style={styles.rightText}>{this.props.right}</Text>}
                </View>
            </TouchableHighlight>
        )
    }
}

MailInputText.propTypes = {
    handle: PropTypes.func,
    title: PropTypes.string,
    right: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        height: 34,
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 0,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    text: {
        fontSize: 13,
        alignSelf: 'flex-start'
    },
    rightText: {
        fontSize: 13,
        alignSelf: 'flex-end'
    },
    rightIcon: {
        alignSelf: 'flex-end'
    }
});