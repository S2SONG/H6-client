import React from 'react';
import {View, StyleSheet, Button, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

export class EvaluateScore extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            count: this.props.rating,
            press: [false,false,false,false,false]
        };
        var num;
        for(num=0; num < this.state.count ; num++){
            this.state.press[num] = true;
        }
        for(num=this.state.count; num<5; num ++){
            this.state.press[num] = false;
        }
    };

    getScore = (i) => {
        this.state.count = i+1;
        var num;
        for(num=0; num < this.state.count ; num++){
            this.state.press[num] = true;
            // console.log(this.state.count, this.state.press[num])
        }
        for(num=this.state.count; num<5; num ++){
            this.state.press[num] = false;
        }
        this.props.handleGetScore(this.state.count);
    };

    renderScore = () => {
        const data = Array.from({length: 5});
        return (
            <View style={{flexDirection:'row'}}>
                {data.map((_, i) => {
                    return (
                        <View key={i} style={{flexDirection: 'row'}}>
                            <TouchableHighlight
                                key={i}
                                style={this.state.press[i]==true ? styles.rectangleFocus : styles.rectangle }
                                onPress={()=>this.getScore(i)}
                            ><View/>
                            </TouchableHighlight>
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
    rating:PropTypes.number,
    handleGetScore: PropTypes.func,
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
