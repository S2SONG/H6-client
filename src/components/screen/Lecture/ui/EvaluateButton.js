import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';

export class EvaluateButton extends React.Component{
    getScore = (value) => {
        this.props.handleGetScore(value);
    };
    render(){
        return(
            <View style={styles.container}>
                {this.props.buttonData.map((item,i) => {
                    return (
                        <Button
                            key={i}
                            buttonStyle={styles.button}
                            title={item}
                            titleStyle={{fontSize:13}}
                            color="black"
                            onPress={()=>this.getScore(item)}
                            value={item}
                        />

                    )
                })}
            </View>
        );
    }
}

EvaluateButton.propTypes = {
    buttonData:PropTypes.array,
    handleGetScore: PropTypes.func
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        width: '100%',
    },
    button:{
        backgroundColor: 'rgb(216,216,216)',
        borderRadius: 3,
        alignSelf:'flex-start',
        paddingLeft:12,
    },
    title:{
        fontSize:13,
        color:'black',
    }
});