import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

export class SignUpIndicator extends React.Component {

    constructor(props) {
        super(props);
    }

    renderLine = (number) => {
        if (number < this.props.max-1) {
            return (
                <View style={styles.line}>
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
                    const dataStyles = EStyleSheet.create({
                        ds : {
                            height: '1.143rem',
                            width: '1.143rem',
                            borderRadius: '0.71rem',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: i==this.props.position?'#4a4a4a':'white',
                            margin: '0.71rem',
                        },
                        dot : {
                            height:'0.286rem',
                            width:'0.286rem',
                            borderRadius:'0.286rem',
                            backgroundColor:'#4a4a4a',
                        }
                    });
                    return (
                        <View key={i} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={dataStyles.ds}>
                                <View style={dataStyles.dot}>
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

const styles = EStyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorContainer: {
        flexDirection: 'row'
    },
    line : {
        height: '0.143rem',
        width: '2.143rem',
        borderRadius: 1,
        backgroundColor: '#000000'
    }

});

SignUpIndicator.propTypes = {
    max: PropTypes.number,
    position: PropTypes.number,
};