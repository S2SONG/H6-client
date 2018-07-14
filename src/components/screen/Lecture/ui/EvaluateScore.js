import React from 'react';
import {View, StyleSheet, Button, TouchableHighlight , TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export class EvaluateScore extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            count:0,
            press: false
        }
    };

    counter =()=> {
        this.press = !this.press;
        if(this.press) this.count ++;
        else if (!this.press) this.count --;
    };

    renderScore = () => {
        const data = Array.from({length: 5});
        return (
            <View style={{flexDirection:'row'}}>
                {data.map((_, i) => {
                    return (
                        <View key={i} style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={ this.state.press ? styles.rectangleFocus : styles.rectangle}
                                              onPress={console.log('점수++')}
                            >
                            </TouchableOpacity>
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

EvaluateScore.propTypes={
    selected:PropTypes.func
};

const styles = StyleSheet.create({
    rectangleFocus: {
        width: 27,
        height: 15,
        backgroundColor: '#f5a623',
        margin:2,
        flexDirection:'column',
        borderRadius:7.5
    },
    rectangle:{
        width: 27,
        height: 15,
        backgroundColor: '#000000',
        opacity:0.2,
        margin:1,
        borderRadius:7.5
    },
    indicatorContainer: {
        flexDirection: 'row'
    }

});
