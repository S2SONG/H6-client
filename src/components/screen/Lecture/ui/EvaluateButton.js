import React from 'react'
import {View, Text, StyleSheet,TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';

export class EvaluateButton extends React.Component{
    getScore = (value,i) => {
        this.state.pressStatus = i;
        this.props.handleGetScore(value);
    };

    constructor(props) {
        super(props)
        this.state = { pressStatus: undefined }
    }

    render(){
        return(
            <View style={styles.container}>
                {this.props.buttonData.map((item,i) => {
                    return (
                        <TouchableHighlight
                            key={i}
                            style={this.state.pressStatus==i ? styles.focus : styles.button }
                            underlayColor='black'
                            onPress={()=>this.getScore(item,i)}
                            value={item}
                        >
                            <Text style={styles.title}>
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
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        width: '100%',
        paddingLeft:10,
    },
    button:{
        backgroundColor: 'rgb(216,216,216)',
        borderRadius: 3,
        alignSelf:'flex-start',
        marginRight:10,
        padding:10,
    },
    focus:{
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'rgb(216,216,216)',
        borderRadius: 3,
        alignSelf:'flex-start',
        marginRight:10,
        padding:10,
    },
    title:{
        fontSize:13,
        color:'black',
        paddingLeft:5,
        paddingRight:5
    }
});