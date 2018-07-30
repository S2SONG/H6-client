import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

export class VoteListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.handle}>
                <Text style={styles.voteTopic}>{this.props.topic}</Text>
            </TouchableOpacity>
        )
    }
}

VoteListItem.propTypes = {
    topic: PropTypes.string,
    handle: PropTypes.func,
};

const styles = EStyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '91%',
        aspectRatio: 330 / 68,
        backgroundColor: '#f5f5f5',
        borderRadius: '0.357rem'
    },
    voteTopic: {
        fontSize: '0.93rem',
    },
});
