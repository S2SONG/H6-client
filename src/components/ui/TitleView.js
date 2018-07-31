import React from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {BoxShadow} from 'react-native-shadow';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

export class TitleView extends React.Component {

    renderLeftIcon = () => {
        if (this.props.leftIcon)
            return (
                <Icon
                    iconStyle={styles.leftIcon}
                    onPress={this.props.leftIconHandler}
                    name={this.props.leftIcon}
                    type='ionicon'
                    size={24} color={'black'}
                    underlayColor={'#7c828c00'}
                />);
        return (<View style={styles.leftIcon}></View>);
    };

    renderRightIcon = () => {
        if (this.props.rightIcon)
            return(
                <TouchableOpacity style={styles.rightIcon} onPress={this.props.rightIconHandler}>
                    <Icon
                        containerStyle={{alignItems:'flex-end'}}
                        // iconStyle={styles.rightIcon}
                        name={this.props.rightIcon}
                        type='ionicon'
                        size={24} color={'black'}
                        underlayColor={'#7c828c00'}/>
                </TouchableOpacity>
                );
        return (<View style={styles.rightIcon}></View>);
    };


    render() {
        return (
            <View>
                <View style={styles.statusBar}></View>
                <View style={styles.titleBarIconView}>
                    {this.renderLeftIcon()}
                    <View style={styles.titleBarBlank}></View>
                    {this.renderRightIcon()}
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.titleBarText}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

TitleView.propTypes = {
    title: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    leftIconHandler: PropTypes.func,
    rightIconHandler: PropTypes.func,

};


const styles = EStyleSheet.create({
    statusBar: {
        backgroundColor: 'transparent',
        height: StatusBar.currentHeight
    },
    titleBar: {
        height: '3.7rem',
        justifyContent: 'flex-end',
        paddingLeft: '1.43rem',
        paddingBottom: '1.43rem',
        backgroundColor: 'white',
    },
    titleBarIconView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: '3.7rem',
        paddingLeft: '1.43rem',
        paddingRight: '1.43rem',
    },
    titleBarBlank: {
        width: '0.71rem',
    },
    titleBarText: {
        color: 'black',
        fontSize: '1.21rem',
    },
    leftIcon: {
        alignSelf: 'flex-start',
        width: '3.57rem',
    },
    rightIcon: {
        justifyContent:'flex-end',
        alignSelf: 'flex-end',
        width: '3.57rem',
        backgroundColor:'transparent'
    },
});