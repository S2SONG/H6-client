import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export class ScoreIndicator extends React.Component {

    constructor(props) {
        super(props);
    }

    renderScore = () => {
        const rating = this.props.rating;
        const no = Math.abs(5-this.props.rating);
        const data = Array.from({length: Math.floor(rating)});
        const data2 = Array.from({length:Math.ceil(no)});
        return (
            <View style={{flexDirection:'row'}}>
                {data.map((_, i) => {
                    return (
                        <View key={i} style={{flexDirection: 'row'}}>
                            <View style={styles.rectangleFocus}/>
                        </View>
                    )
                })}
                {data2.map((_,i) => {
                    return (
                        <View key={i} style={{flexDirection: 'row'}}>
                            <View style={styles.rectangle}/>
                        </View>
                    )
                })}
            </View>
        )
    };

    render() {
        return (
            <View sytle={{flexDirection:'row',justifyContent: 'flex-start'}} >
                {this.renderScore()}
            </View>
        )
    }
}

ScoreIndicator.propTypes={
    rating:PropTypes.number
};

const styles = StyleSheet.create({
    rectangleFocus: {
        width: 15,
        height: 8,
        backgroundColor: '#f5a623',
        margin:1,
        flexDirection:'column',
        borderRadius:7.5
    },
    rectangle:{
        width: 15,
        height: 8,
        backgroundColor: '#000000',
        opacity:0.2,
        margin:1,
        borderRadius:7.5
    },
    indicatorContainer: {
        flexDirection: 'row'
    }

});
