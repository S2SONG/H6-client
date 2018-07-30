import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {BoxShadow, BorderShadow} from 'react-native-shadow';
import config from "../../../../../config";
import EStyleSheet from 'react-native-extended-stylesheet';

export class HomeVote extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const shadowOpt = {
            width: 330,
            height: 166,
            color: "#000",
            border: 2,
            radius: 5,
            opacity: 0.2,
            x: 0,
            y: 2,
            style: {marginVertical: 5}
        };

        return (
            <TouchableOpacity style={[styles.container, config.shadow]} onPress={this.props.handle}>
                    <Text style={styles.voteTopic}>{this.props.topic}</Text>
                    <Text style={styles.voteDate}>{this.props.start_date} - {this.props.end_date}</Text>
            </TouchableOpacity>
        )
    }
}

HomeVote.propTypes = {
    topic: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    handle: PropTypes.func,
};

const styles = EStyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '91%',
        aspectRatio: 330 / 166,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
    },
    voteTopic: {
        fontSize: '1.43rem',
        marginBottom: '1.07rem'
    },
    voteDate: {
        fontSize:'0.786rem'
    }
});
