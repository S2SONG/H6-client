import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {BoxShadow, BorderShadow} from 'react-native-shadow';
import EStyleSheet from 'react-native-extended-stylesheet';
import config from "../../../../../config";

export class CurrentVoteButton extends React.Component {

    constructor(props) {
        super(props);
    }

    renderSelected = () => {
        if (this.props.selected) {
            return (
                <View style={styles.selectBottom}>
                    <Icon name='md-checkmark' type='ionicon' size={11} color={'white'}/>
                    <Text style={styles.selectBottomText}>나의 선택</Text>
                </View>
            )
        } else {
            return null;
        }
    };

    render() {
        const shadowOpt = {
            width: 107,
            height: 111,
            color: "#000",
            border: 2,
            radius: 5,
            opacity: 0.2,
            x: 0,
            y: 2,
            style: {marginVertical: 5}
        };

        return (
            <View style={[{alignItems: 'center'}]}>
                    {this.props.enable ?
                        <TouchableOpacity style={[this.props.selected ? styles.selectContainer : styles.container, config.shadow]} onPress={this.props.handle}>
                                <Text
                                    style={this.props.selected ? styles.selectTitleText : styles.titleText}>{this.props.title}</Text>
                                <Text
                                    style={this.props.selected ? styles.selectBodyText : styles.bodyText}>{this.props.itemOrder == 1 ? 'O' : 'X'}</Text>
                        </TouchableOpacity>
                        :
                        <View style={[this.props.selected ? styles.selectContainer : styles.container, config.shadow]}>
                            <Text
                                style={this.props.selected ? styles.selectTitleText : styles.titleText}>{this.props.title}</Text>
                            <Text
                                style={this.props.selected ? styles.selectBodyText : styles.bodyText}>{this.props.itemOrder == 1 ? 'O' : 'X'}</Text>
                        </View>
                    }
                {this.renderSelected()}
            </View>
        )
    }
}

CurrentVoteButton.propTypes = {
    title: PropTypes.string,
    handle: PropTypes.func,
    selected: PropTypes.bool,
    voteItemIndex: PropTypes.number,
    itemOrder: PropTypes.number,
    enable: PropTypes.bool,
};

CurrentVoteButton.defaultProps = {
    selected: false,
    enable: true,
};

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'relative',
        // width:'7.643rem',
        width: Dimensions.get('window').width*0.285,
        aspectRatio: 107/111,
        marginBottom: '0.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem'
    },
    selectContainer: {
        alignItems: 'center',
        position: 'relative',
        // width:'7.643rem',
        width: Dimensions.get('window').width*0.285,
        aspectRatio: 107/111,
        marginBottom: '0.5rem',
        backgroundColor: '#4a4a4a',
        borderRadius: '0.5rem'
    },
    titleText: {
        position: 'absolute',
        fontSize: '0.7857rem',
        color: 'black',
        marginTop: '1.214rem',
        marginBottom: '0.357rem',
    },
    selectTitleText: {
        position: 'absolute',
        fontSize: '0.7857rem',
        color: 'white',
        marginTop: '1.214rem',
        marginBottom: '0.357rem',
    },
    bodyText: {
        position: 'absolute',
        marginTop: '1.07rem',
        // marginTop:'0.7857rem',
        fontSize: '5.714rem',
        color: 'black',
    },
    selectBodyText: {
        position: 'absolute',
        marginTop: '1.07rem',
        // marginTop:'0.7857rem',
        fontSize: '5.714rem',
        color: 'white',
    },
    selectBottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '4.5rem',
        width: Dimensions.get('window').width*0.168,
        aspectRatio:63/22,
        backgroundColor: '#9b9b9b',
    },
    selectBottomText: {
        fontSize: '0.7857rem',
        marginLeft: '0.213rem',
        color: 'white',
    },

});
