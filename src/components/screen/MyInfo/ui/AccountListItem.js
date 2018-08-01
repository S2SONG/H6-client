import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

export class AccountListItem extends React.Component {

    constructor(props){
        super(props);
    }

    returnTextStyle = (color) => {
        if(color === undefined){
            const dataStyle = EStyleSheet.create({
                text:{
                    fontSize: '1rem',
                    color: '#00000066',
                    alignSelf:'center',
                    alignItems:'center',
                    justifyContent:'center',
                }
            });
            return dataStyle.text;
        } else {
            const dataStyle = EStyleSheet.create({
                text:{
                    fontSize: '1rem',
                    color: color,
                    alignSelf:'center',
                    alignItems:'center',
                    justifyContent:'center',
                }
            });
            return dataStyle.text;
        }
    };
    render() {
        return (
            <TouchableHighlight
                underlayColor={'#8f96a0'}
                style={styles.container}
                onPress={this.props.handle}>
                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text}>{this.props.title}</Text>
                    <View/>
                    <View style={styles.right}>
                        {this.props.right === undefined ? null:
                            <Text style={this.returnTextStyle(this.props.rightTextColor)}>{this.props.right}</Text>}
                        {this.props.handle === undefined ? null:
                            <Icon containerStyle={styles.rightIcon} name='ios-arrow-forward' type='ionicon' color={'#d8d8d8'}/>}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

AccountListItem.propTypes = {
    handle: PropTypes.func,
    title: PropTypes.string,
    right: PropTypes.string,
    rightTextColor: PropTypes.string
};

AccountListItem.defaultProps = {
};

const styles = EStyleSheet.create({
    container: {
        width:'87.2%',
        aspectRatio:327/40,
        paddingLeft:'0.357rem',
        paddingRight:'0.7857rem',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    text: {
        fontSize: '1rem',
        alignSelf: 'center',
        justifyContent:'center',
    },
    right:{
        flexDirection:'row',
        alignSelf: 'center',
        justifyContent:'center'
    },
    rightIcon: {
        marginLeft:'0.7857rem',
        alignSelf:'center',
        alignItems:'flex-end',
    }
});