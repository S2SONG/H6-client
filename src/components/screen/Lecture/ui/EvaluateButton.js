import React from 'react'
import {View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

export class EvaluateButton extends React.Component{
    getScore = (value,i) => {
        this.state.pressButton = i;
        this.props.handleGetScore(value);
    };

    constructor(props) {
        super(props);
        this.state = { pressButton: undefined }
    }

    render(){
        return(
            <View style={[styles.container]}>
                {this.props.buttonData.map((item,i) => {
                    return (
                        <TouchableHighlight
                            key={i}
                            style={this.state.pressButton==i|| this.props.pressStatus==item ? styles.focus : styles.button }
                            underlayColor='black'
                            onPress={()=>this.getScore(item,i)}
                            value={item}
                        >
                            <Text style={this.state.pressButton==i || this.props.pressStatus==item ? styles.focusTitle : styles.title}>
                              {item}
                            </Text>
                            {/*|| this.props.pressStatus==item*/}
                        </TouchableHighlight>
                    )
                })}
            </View>
        );
    }
}

EvaluateButton.propTypes = {
    buttonData:PropTypes.array,
    handleGetScore: PropTypes.func,
    pressStatus:PropTypes.number
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        width: '100%',
        paddingLeft:10,
    },
    button:{
        backgroundColor: 'white',
        borderRadius: 3,
        alignSelf:'flex-start',
        marginRight:10,
        padding:10,
        shadowColor:'gray',
        shadowOpacity:0.5,
        shadowRadius:3,
        shadowOffset:{width:2, height:4},
    },
    focus:{
        backgroundColor: '#4a4a4a',
        borderRadius:3,
        alignSelf:'flex-start',
        marginRight:10,
        padding:10,
        shadowColor:'gray',
        shadowOpacity:0.5,
        shadowRadius:3,
        shadowOffset:{width:2, height:4}
    },
    title:{
        fontSize:13,
        color:'black',
        paddingLeft:5,
        paddingRight:5
    },
    focusTitle:{
        fontSize:13,
        color:'white',
        paddingLeft:5,
        paddingRight:5
    }
});