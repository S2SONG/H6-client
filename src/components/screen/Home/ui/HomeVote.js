import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {BoxShadow, BorderShadow} from 'react-native-shadow';

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
            <View>
                <BoxShadow setting={shadowOpt}>
                    <TouchableOpacity onPress={this.props.handle}>
                        <View style={styles.container}>
                            <Text style={styles.voteTopic}>{this.props.topic}</Text>
                            <Text>{this.props.start_date} - {this.props.end_date}</Text>
                        </View>
                    </TouchableOpacity>
                </BoxShadow>
            </View>
        )
    }
}

HomeVote.propTypes = {
    topic: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    handle: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 330,
        height: 166,
        backgroundColor: '#f5f5f5',
        borderRadius: 5
    },
    voteTopic: {
        fontSize: 17,
        marginBottom: 15
    },
    voteDate: {}
});
