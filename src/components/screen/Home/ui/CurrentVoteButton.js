import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {BoxShadow, BorderShadow} from 'react-native-shadow';

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
            <View style={{alignItems: 'center'}}>
                <BoxShadow setting={shadowOpt}>
                    {this.props.enable ?
                        <TouchableOpacity onPress={this.props.handle}>
                            <View style={this.props.selected ? styles.selectContainer : styles.container}>
                                <Text
                                    style={this.props.selected ? styles.selectTitleText : styles.titleText}>{this.props.title}</Text>
                                <Text
                                    style={this.props.selected ? styles.selectBodyText : styles.bodyText}>{this.props.itemOrder == 1 ? 'O' : 'X'}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <View style={this.props.selected ? styles.selectContainer : styles.container}>
                            <Text
                                style={this.props.selected ? styles.selectTitleText : styles.titleText}>{this.props.title}</Text>
                            <Text
                                style={this.props.selected ? styles.selectBodyText : styles.bodyText}>{this.props.itemOrder == 1 ? 'O' : 'X'}</Text>
                        </View>
                    }
                </BoxShadow>
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

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'relative',
        width: 107,
        height: 111,
        marginBottom: 7,
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    selectContainer: {
        alignItems: 'center',
        position: 'relative',
        width: 107,
        height: 111,
        marginBottom: 7,
        backgroundColor: '#4a4a4a',
        borderRadius: 5
    },
    titleText: {
        position: 'absolute',
        fontSize: 11,
        color: 'black',
        marginTop: 17,
        marginBottom: 5,
    },
    selectTitleText: {
        position: 'absolute',
        fontSize: 11,
        color: 'white',
        marginTop: 17,
        marginBottom: 5,
    },
    bodyText: {
        marginTop: 15,
        fontSize: 80,
        color: 'black',
    },
    selectBodyText: {
        marginTop: 15,
        fontSize: 80,
        color: 'white',
    },
    selectBottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 63,
        height: 22,
        backgroundColor: '#9b9b9b',
    },
    selectBottomText: {
        fontSize: 11,
        marginLeft: 3,
        color: 'white',
    },

});
