import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export class AccountTextView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>{this.props.label}</Text>
                {this.props.link ?
                    <TouchableOpacity onPress={this.props.handle}>
                        <Text style={this.props.link_style}>
                            {this.props.link}
                        </Text>
                    </TouchableOpacity> :
                    <Text style={styles.text}>{this.props.text}</Text>}
            </View>
        )
    }
}

AccountTextView.propTypes = {
    label: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
    handle: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 343,
        height: 34,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(216,216,216)',
    },
    label: {
        marginLeft: 5,
        width: 93,
        height: 16,
        fontSize: 13,
        color: 'black'
    },
    text: {
        fontSize: 14,
        color: 'black'
    },
    link_style: {
        fontSize: 14,
        color: 'black'
    }
});