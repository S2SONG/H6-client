import React from 'react'
import {View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import {BoxShadow} from 'react-native-shadow';

export class EvaluateButton extends React.Component{
    getScore = (value,i) => {
        this.state.pressButton = value;
        this.props.handleGetScore(value);
    };

    constructor(props) {
        super(props);
        this.state = {
            pressButton: this.props.pressStatus
        }
    }

    render(){
        const shadowOpt = {
            color:"#000",
            border:1,
            radius:3,
            opacity:0.2,
            borderRadius: 3,
            alignSelf:'flex-start',
            marginRight:10,
            padding:10,
        }
        return(
            <View style={styles.container}>
                {this.props.buttonData.map((item,i) => {
                    return (
                        <TouchableHighlight
                            key={i}
                            style={this.state.pressButton==item ? styles.focus : styles.button }
                            underlayColor='black'
                            onPress={()=>this.getScore(item,i)}
                            value={item}
                        >
                            <Text style={this.state.pressButton==item  ? styles.focusTitle : styles.title}>
                              {item}
                            </Text>
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
    pressStatus:PropTypes.string
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
        borderBottomWidth:1,
        borderRightWidth:1,
        borderColor:'gray',
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
        shadowOffset:{width:2, height:4},
        borderBottomWidth:1,
        borderRightWidth:1,
        borderColor:'gray',
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