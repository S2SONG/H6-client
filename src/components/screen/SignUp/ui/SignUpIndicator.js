import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export class SignUpIndicator extends React.Component {

    constructor(props) {
        super(props);
    }

    renderLine = (number) => {
        if (number < this.props.max-1) {
            return (
                <View style={{
                    height: 2,
                    width: 30,
                    borderRadius: 2,
                    backgroundColor: '#000000'
                }}>
                </View>
            )
        } else {
            return;
        }
    };

    renderIndicator = () => {
        const data = Array.from({length: this.props.max});
        return (
            <View style={styles.indicatorContainer}>
                {data.map((_, i) => {
                    return (
                        <View key={i} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{
                                height: 16,
                                width: 16,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: i==this.props.position?'#4a4a4a':'white',
                                margin: 10,
                            }}>
                                <View style={{
                                    height:4,
                                    width:4,
                                    borderRadius:4,
                                    backgroundColor:'#4a4a4a',

                                }}>
                                </View>
                            </View>
                            {this.renderLine(i)}
                        </View>
                    )
                })}
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                {this.renderIndicator()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorContainer: {
        flexDirection: 'row'
    }

});

SignUpIndicator.propTypes = {
    max: PropTypes.number,
    position: PropTypes.number,
};