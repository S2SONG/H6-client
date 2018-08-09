import React from 'react';
import {StyleSheet, View, TouchableHighlight, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

export class SignUpPicker extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>{this.props.label}</Text>
                </View>
                <TouchableOpacity style={styles.touch} onPress={this.props.handle}>
                    <Text style={styles.touchText}>
                        {this.props.value === undefined || this.props.value === null ? '선택하기' : this.props.value.length == 0 ? '해당없음' : this.props.value}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

SignUpPicker.propTypes = {
    handle: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    track: PropTypes.array,
};

SignUpPicker.defaultProps = {
    label: '',
};

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '82.93%',
        aspectRatio: 311 / 50,
        justifyContent: 'center',
        paddingLeft: '1.2857rem',
        paddingRight: '0.857rem',
        borderBottomWidth: 2,
        borderBottomColor: '#000000'
    },
    label: {
        flex: 1,
        justifyContent: 'center',
    },
    labelText: {
        fontSize: '1.143rem',
        alignSelf: 'flex-start',
    },
    touch: {
        flex: 1,
        justifyContent: 'center',
    },
    touchText: {
        alignSelf: 'flex-end',
        fontSize: '1.143rem',
        color: '#4a4a4a4d'
    }
});