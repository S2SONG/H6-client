import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

export class InfoListItem extends React.Component {

    render() {
        return (
            <TouchableHighlight
                underlayColor={'#8f96a0'}
                style={styles.container}
                onPress={this.props.handle}>
                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between',}}>
                    <Text style={styles.text}>{this.props.title}</Text>
                    {this.props.right === undefined ?
                        <Icon style={styles.rightIcon} name='ios-arrow-forward' type='ionicon' color={'#d8d8d8'}/>:
                        <Text style={styles.rightText}>{this.props.right}</Text>}
                </View>
            </TouchableHighlight>
        )
    }
}

InfoListItem.propTypes = {
    handle: PropTypes.func,
    title: PropTypes.string,
    right: PropTypes.string,
};

const styles = EStyleSheet.create({
    container: {
        width:'87.2%',
        aspectRatio:327/40,
        backgroundColor: 'white',
        paddingLeft:'0.357rem',
        paddingRight:'0.57rem',
        justifyContent: 'center',
    },
    text: {
        fontSize: '1rem',
        alignSelf: 'center'
    },
    rightText: {
        fontSize: '1rem',
        color: '#d8d8d8',
        alignSelf: 'center'
    },
    rightIcon: {
        alignSelf: 'center'
    }
});