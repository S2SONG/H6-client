import React from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import {BoxShadow} from 'react-native-shadow';
import PropTypes from 'prop-types';

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
            return (<Icon style={styles.rightIcon} name={this.props.rightIcon} type='ionicon' size={24} color={'black'}
                          onPress={this.props.rightIconHandler}/>);
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


const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#ffffff',
        height: StatusBar.currentHeight
    },
    titleBar: {
        height: 52,
        justifyContent: 'flex-end',
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    titleBarIconView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 52,
        paddingLeft: 20,
        paddingRight: 20,
    },
    titleBarBlank: {
        width: 10,
    },
    titleBarText: {
        color: 'black',
        fontSize: 18,
    },
    leftIcon: {
        alignSelf: 'flex-start',
        width: 50,
    },
    rightIcon: {
        alignSelf: 'flex-end',
        width: 50,
    }
});