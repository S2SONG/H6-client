import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

export class VoteListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View>
                <TouchableOpacity onPress={this.props.handle}>
                    <View style={styles.container}>
                        <Text style={styles.voteTopic}>{this.props.topic}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

VoteListItem.propTypes = {
    topic: PropTypes.string,
    handle: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 330,
        height: 68,
        backgroundColor: '#f5f5f5',
        borderRadius: 5
    },
    voteTopic: {
        fontSize: 13,
    },
});
